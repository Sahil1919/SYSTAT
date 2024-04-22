import psutil
import time
import json
import os
from collections import defaultdict
from datetime import datetime, timedelta

current_path = os.path.dirname(__file__)

def is_user_facing_process(proc):
    # Check if the process has a window associated with it and belongs to a user session
    return proc.info.get('username') is not None and proc.info.get('create_time') > 0

def format_duration(duration):
    duration = int(duration)
    # Format duration as HH:MM:SS
    minutes, seconds = divmod(duration, 60)
    hours, minutes = divmod(minutes, 60)
    return f"{hours:02d}:{minutes:02d}:{seconds:02d}"

def is_current_day(create_time):
    # Convert create_time to a datetime object
    create_datetime = datetime.fromtimestamp(create_time)
    # Get the current date
    current_date = datetime.now().date()
    # Return True if the process was created today, False otherwise
    return create_datetime.date() == current_date

def load_process_info():
    try:
        with open(f'{current_path}/process_info.json', 'r') as f:
            return json.load(f)
    except FileNotFoundError:
        return defaultdict(list)

def save_process_info(process_info):
    with open(f'{current_path}/process_info.json', 'w') as f:
        json.dump(process_info, f, indent=4)

def monitor_processes():
    # Load existing process information from JSON file
    process_info = load_process_info()

    # while True:
        # Get the list of running processes
    for proc in psutil.process_iter(['pid', 'name', 'create_time', 'username']):
        # Check if the process is user-facing and belongs to the current day
        if is_user_facing_process(proc) and is_current_day(proc.info['create_time']):
            # Get process details
            process_name = proc.info['name']
            username = proc.info['username']
            create_time = proc.info['create_time']

            # Calculate the time elapsed since process creation
            current_time = time.time()
            elapsed_time = current_time - create_time

            # Check if the process entry already exists for the user
            existing_process_entry = next((p for p in process_info[username] if p['name'] == process_name), None)
            if existing_process_entry:
                # Update the total time for the existing process entry
                existing_process_entry['total_time'] = format_duration(elapsed_time)
            else:
                # Create a new process entry
                process_info[username].append({
                    "name": process_name,
                    "total_time": format_duration(elapsed_time)
                })

    # Save updated process information to JSON file
    save_process_info(process_info)

        


if __name__ == "__main__":

    while True:
        monitor_processes()
