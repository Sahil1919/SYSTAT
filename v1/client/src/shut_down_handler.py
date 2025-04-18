import time
import platform
import psutil
import threading
from plyer import notification


class ShutDownPCHandler(object):

    def __init__(
            self,
            default_threshold: float,
            dynamic_threshold_update_interval: int,
            shutdown_grace_period: int,
            interval_to_check_cpu_activity: int,
            duration_to_calculate_dynamic_threshold: int,
            multiplier_for_dynamic_threshold: float
    ):
        self.default_threshold = default_threshold
        self.dynamic_threshold_update_interval = dynamic_threshold_update_interval
        self.duration = duration_to_calculate_dynamic_threshold
        self.multiplier = multiplier_for_dynamic_threshold
        self.interval_to_check_cpu_activity = interval_to_check_cpu_activity
        self.shutdown_grace_period = shutdown_grace_period
        self.last_threshold_update_time = time.time()
        self.shutdown_in_progress = False  # To avoid duplicate shutdown triggers
        self.dynamic_threshold = 0

        # Start the monitoring in the background without auto shutdown
        self.monitoring_thread = threading.Thread(target=self._monitor_system)
        self.monitoring_thread.daemon = True  # Daemon thread to run in the background
        self.monitoring_thread.start()

    def _monitor_system(self):
        """Main method that continuously checks CPU usage but does not auto-shutdown."""
        while True:
            if self.is_time_to_update_threshold():
                self.dynamic_threshold = self.calculate_dynamic_threshold()
                self.last_threshold_update_time = time.time()
            time.sleep(self.interval_to_check_cpu_activity)

    def calculate_dynamic_threshold(self):
        """Calculate dynamic threshold based on average CPU usage."""
        try:
            cpu_percentages = [psutil.cpu_percent(interval=1) for _ in range(self.duration)]
            average_cpu_usage = sum(cpu_percentages) / len(cpu_percentages)
            return average_cpu_usage * self.multiplier
        except Exception as e:
            print(f"Error calculating dynamic threshold: {e}")
            return self.default_threshold

    def is_time_to_update_threshold(self):
        """Check if it's time to update the dynamic threshold."""
        current_time = time.time()
        return current_time - self.last_threshold_update_time >= self.dynamic_threshold_update_interval

    def handle_shutdown(self):
        """Initiate shutdown when triggered externally."""
        try:
            current_cpu = psutil.cpu_percent()
            print("Current CPU usage:", current_cpu, "Threshold:", self.dynamic_threshold)

            if current_cpu < self.dynamic_threshold and not self.shutdown_in_progress:
                return self._initiate_shutdown_sequence()

        except Exception as e:
            print(f"Error handling shutdown: {e}")
            return True  # Fail-safe: avoid shutdown on error

    def _initiate_shutdown_sequence(self):
        """Initiate the shutdown process with a grace period for user cancellation."""
        self.shutdown_in_progress = True

        if not self.is_user_active():
            print(f"Shutdown will start in {self.shutdown_grace_period} seconds...")
            title = "Shutdown Alert"
            message = f"System will shutdown in {self.shutdown_grace_period} seconds"
            notification.notify(title=title, message=message, timeout=10)

        for i in range(self.shutdown_grace_period, 0, -1):
            if self.is_user_active():
                print("Shutdown canceled due to user activity.")
                self.shutdown_in_progress = False
                return True
            print(f"Shutdown in {i} seconds...")
            time.sleep(1)

        self._perform_shutdown()

    def is_user_active(self):
        system = platform.system()

        if system == 'Windows':
            return self._is_user_active_windows()
        elif system == 'Linux':
            return self._is_user_active_linux()
        else:
            print("Unsupported platform")
            return False

    @classmethod
    def _is_user_active_windows(cls):
        """Enhanced user activity check for Windows."""
        import pygetwindow as gw
        import ctypes
        from ctypes import wintypes
        import win32api

        try:
            # Check if there is an active window
            active_window = gw.getActiveWindow()
            if active_window and (active_window.title != "" and "Lock" not in active_window.title):
                return True

            # Additionally, check if there was any recent mouse or keyboard activity
            class LASTINPUTINFO(ctypes.Structure):
                _fields_ = [('cbSize', wintypes.UINT), ('dwTime', wintypes.DWORD)]

            def get_idle_duration():
                lii = LASTINPUTINFO()
                lii.cbSize = ctypes.sizeof(LASTINPUTINFO)
                if ctypes.windll.user32.GetLastInputInfo(ctypes.byref(lii)):
                    millis = win32api.GetTickCount() - lii.dwTime
                    return millis / 1000.0
                else:
                    return 0

            idle_duration = get_idle_duration()
            print(f"User idle for {idle_duration} seconds.")

            # Consider user active if they were idle for less than a threshold (e.g., 60 seconds)
            return idle_duration < 60

        except Exception as e:
            print(f"Error checking user activity on Windows: {e}")
            return False

    @classmethod
    def _is_user_active_linux(cls):
        """Check user activity on Linux."""
        try:
            from Xlib import X, display
            d = display.Display()
            root = d.screen().root
            windowIDs = root.get_full_property(
                d.intern_atom('_NET_CLIENT_LIST'), X.AnyPropertyType).value
            for windowID in windowIDs:
                window = d.create_resource_object('window', windowID)
                if window.get_wm_name():
                    return True
            return False
        except Exception as e:
            print(f"Error checking user activity on Linux: {e}")
            return False

    def _perform_shutdown(self):
        """Perform the actual shutdown operation."""
        print("Performing system shutdown now.")
        self.shutdown_in_progress = False
        # os.system("shutdown /s /t 1")
        # os.system("shutdown /r /t 1")
        exit(0)
