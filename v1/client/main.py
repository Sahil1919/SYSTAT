import json
import time
import os
from dotenv import load_dotenv
import requests
from watchdog.events import FileSystemEventHandler

from src.browser_monitor import FileModifiedHandler
from src.pcstats import PCStats
from src.shut_down_handler import ShutDownPCHandler
from src.cryptogen import DataEncryption
from src.app_monitor import ApplicationMonitor

load_dotenv()
current_path = os.path.dirname(__file__)

# In your main code
if __name__ == "__main__":
    # Initialize your CPU usage object
    state = True
    filehandler = FileModifiedHandler(FileSystemEventHandler)
    filehandler.main()

    shut_down_pc_handler = ShutDownPCHandler(
        default_threshold=5.0,
        dynamic_threshold_update_interval=1,
        shutdown_grace_period=60,
        interval_to_check_cpu_activity=1,
        duration_to_calculate_dynamic_threshold=1,
        multiplier_for_dynamic_threshold=1.5
    )

    while state:

        try:
            pc_stats = PCStats()

            stats = pc_stats.load_stats()

            response = requests.post(
                os.getenv('PARENT_PC_URL'),
                json=DataEncryption(
                    data_to_encrypt=json.dumps(stats)
                ).encrypted_data,
                headers={
                    'Content-Type': 'application/json'}
            )
            if response.status_code == 200:
                data = response.json().get('data')
                print(data)
                if data.get('shutdown'):
                    shut_down_pc_handler.handle_shutdown()

        except Exception as e:
            print(f"Error: {e}")

        time.sleep(1)  # Adjust sleep duration based on your needs
