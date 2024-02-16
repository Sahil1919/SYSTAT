import json
import time
import os
import psutil
import requests
from cpu_usage import CPU_Usage
import pygetwindow as gw
from win10toast import ToastNotifier
from cryptogen import DataEncryption


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
    try:
        active_window = gw.getActiveWindow()
        print(active_window.title)
        if active_window is not None :
            if active_window.title != "" or "Lock" in active_window.title:
                return True
            else :
                False

    except Exception as e:
        print(f"Error checking user activity: {e}")
        return False


def handle_shutdown(threshold):
    try:
        # Check if CPU usage is above the threshold for safe shutdown
        current_cpu = psutil.cpu_percent()
        print("Current CPU usage : ", current_cpu,"Threshold :", threshold)
        if is_user_active():
            return True
        
        elif (current_cpu < threshold ):
                print("Performing safe shutdown operation...")
                toaster = ToastNotifier()
                toaster.show_toast(
                    "Shutdown Prompt", "Shutdown will take place in 10 seconds !", duration=20)
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

    # Main loop
    while state:
        try:
            # Check if it's time to update the dynamic threshold
            if is_time_to_update_threshold():
                dynamic_threshold = calculate_dynamic_threshold()
                last_threshold_update_time = time.time()

            parent_pc_url = 'http://192.168.1.206:8000/api/v1/systat/getstats'

            current_path = os.path.dirname(__file__)
            cpu_usage = CPU_Usage()

            stats = cpu_usage.load_stats()

            stats['pc_no'] = 1

            with open(f'{current_path}/stats.json', "w+", encoding='utf8') as f:
                f.write(json.dumps(stats))

            encrypted_data = DataEncryption(data_to_encrypt=json.dumps(stats)).encrypted_data
            
            with open(f"{current_path}/temp.json",'w+',encoding='utf8') as f:
                f.write(json.dumps(encrypted_data))
            try:
                response = requests.post(parent_pc_url, json=encrypted_data,  headers={'Content-Type': 'application/json'})
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
