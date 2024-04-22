import json
import time
import os
import psutil
import requests
from cpu_usage import CPU_Usage
import platform
from plyer import notification
from cryptogen import DataEncryption
from browser_monitor import FileModifiedHandler
from watchdog.events import FileSystemEventHandler
from app_monitor import monitor_processes

DEFAULT_THRESHOLD = 10.0  # Set your default threshold value, e.g., 10% usage
# Update dynamic threshold every 60 seconds
DYNAMIC_THRESHOLD_UPDATE_INTERVAL = 60

dynamic_threshold = DEFAULT_THRESHOLD
last_threshold_update_time = time.time()


def calculate_dynamic_threshold(duration=3, multiplier=1.2):
    try:
        cpu_percentages = []

        for _ in range(duration):
            cpu_percent = psutil.cpu_percent(interval=1)
            cpu_percentages.append(cpu_percent)

        average_cpu_usage = sum(cpu_percentages) / len(cpu_percentages)
        suggested_threshold = average_cpu_usage * multiplier
        return suggested_threshold
    except Exception as e:
        print(f"Error calculating dynamic threshold: {e}")
        return None


def is_time_to_update_threshold():
    current_time = time.time()
    return current_time - last_threshold_update_time >= DYNAMIC_THRESHOLD_UPDATE_INTERVAL


def is_user_active():
    system = platform.system()
    if system == 'Windows':
        # Use Windows-specific code to check if the user is active
        import pygetwindow as gw
        try:
            active_window = gw.getActiveWindow()
            if active_window is not None:
                if active_window.title != "" or "Lock" in active_window.title:
                    return True
                else:
                    return False
        except Exception as e:
            print(f"Error checking user activity on Windows: {e}")
            return False
    # elif system == 'Darwin':
    #     # Use macOS-specific code to check if the user is active
    #     try:
    #         import Quartz
    #         active_app = Quartz.CGWindowListCopyWindowInfo(
    #             Quartz.kCGWindowListOptionOnScreenOnly | Quartz.kCGWindowListExcludeDesktopElements,
    #             Quartz.kCGNullWindowID
    #         )
    #         for window in active_app:
    #             if window.get("kCGWindowIsOnscreen", 0) == 1:
    #                 return True
    #         return False
    #     except Exception as e:
    #         print(f"Error checking user activity on macOS: {e}")
    #         return False
    elif system == 'Linux':
        # Use Linux-specific code to check if the user is active
        try:
            from Xlib import X, display
            d = display.Display()
            root = d.screen().root
            windowIDs = root.get_full_property(
                d.intern_atom('_NET_CLIENT_LIST'), X.AnyPropertyType).value
            for windowID in windowIDs:
                window = d.create_resource_object('window', windowID)
                wm_name = window.get_wm_name()
                if wm_name:
                    return True
            return False
        except Exception as e:
            print(f"Error checking user activity on Linux: {e}")
            return False
    else:
        print("Unsupported platform")
        return False


def handle_shutdown(threshold):
    try:
        # Check if CPU usage is above the threshold for safe shutdown
        current_cpu = psutil.cpu_percent()
        print("Current CPU usage : ", current_cpu, "Threshold :", threshold)
        if is_user_active():
            return True

        elif (current_cpu < threshold):
            print("Performing safe shutdown operation...")
            title = "Shutdown Prompt"
            message = "Shutdown will take place in 10 seconds !"
            # Display the notification
            notification.notify(
                title=title,
                message=message,
                timeout=10

            )
            return False
            # Add your shutdown logic here
        else:
            return True
        # Continue with the rest of your shutdown logic
    except Exception as e:
        print(f"Error handling shutdown: {e}")
        return True


# In your main code
if __name__ == "__main__":
    # Initialize your CPU usage object
    state = True
    filehandler = FileModifiedHandler(FileSystemEventHandler)
    filehandler.main()
    print('Started......')
    # Main loop
    while state:
        monitor_processes()
        try:
            # print(ok)
            # Check if it's time to update the dynamic threshold
            if is_time_to_update_threshold():
                dynamic_threshold = calculate_dynamic_threshold()
                last_threshold_update_time = time.time()

            parent_pc_url = 'http://192.168.1.218:8000/api/v1/getstats'

            current_path = os.path.dirname(__file__)
            cpu_usage = CPU_Usage()

            stats = cpu_usage.load_stats()

            stats['pc_no'] = 1

            with open(f'{current_path}/stats.json', "w+", encoding='utf8') as f:
                f.write(json.dumps(stats))

            with open(f'{current_path}/profiles_data.json', 'r', encoding='utf8') as f:

                history = json.loads(f.read())
                stats['browser_history'] = history

            with open(f'{current_path}/process_info.json', 'r', encoding='utf8') as f:

                history = json.loads(f.read())
                stats['app_history'] = history

            encrypted_data = DataEncryption(
                data_to_encrypt=json.dumps(stats)).encrypted_data

            with open(f"{current_path}/temp.json", 'w+', encoding='utf8') as f:
                f.write(json.dumps(encrypted_data))
            try:
                response = requests.post(parent_pc_url, json=encrypted_data,  headers={
                                         'Content-Type': 'application/json'})
                if response.status_code == 200:
                    print(response.json())

                if response.json().get('shutdown'):
                    state = handle_shutdown(dynamic_threshold)

                    if not state:
                        time.sleep(10)
                        print("done")
                        # os.system("shutdown /s /t 1")
                        # os.system("shutdown /r /t 1")
            except Exception as e:
                print(f"Error in the inside loop: {e}")

        except Exception as e:
            print(f"Error in the main loop: {e}")

        time.sleep(1)  # Adjust sleep duration based on your needs
