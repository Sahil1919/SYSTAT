import psutil
import time
import json
import os
from collections import defaultdict
from datetime import datetime


class ApplicationMonitor(object):
    def __init__(self, output_dir='responses', file_name='process_info.json'):
        self.current_path = os.path.dirname(__file__)
        self.output_path = os.path.join(self.current_path, output_dir, file_name)
        self.process_info = self.load_process_info()

    @classmethod
    def is_user_facing_process(cls, proc):
        """Check if the process is user-facing and belongs to a user session."""
        return proc.info.get('username') is not None and proc.info.get('create_time') > 0

    @staticmethod
    def format_duration(duration):
        """Format duration in HH:MM:SS format."""
        minutes, seconds = divmod(int(duration), 60)
        hours, minutes = divmod(minutes, 60)
        return f"{hours:02d}:{minutes:02d}:{seconds:02d}"

    @staticmethod
    def is_current_day(create_time):
        """Check if the process was created today."""
        create_datetime = datetime.fromtimestamp(create_time)
        return create_datetime.date() == datetime.now().date()

    def load_process_info(self):
        """Load process information from a JSON file."""
        try:
            with open(self.output_path, 'r') as f:
                return json.load(f)
        except (FileNotFoundError, json.JSONDecodeError):
            return defaultdict(list)

    def save_process_info(self):
        """Save updated process information to a JSON file."""
        os.makedirs(os.path.dirname(self.output_path), exist_ok=True)
        with open(self.output_path, 'w') as f:
            json.dump(self.process_info, f, indent=4)

    def update_process_entry(self, username, process_name, elapsed_time):
        """Update or create a new process entry for the given process."""
        existing_process_entry = next(
            (p for p in self.process_info[username] if p['name'] == process_name), None
        )

        if existing_process_entry:
            # Update the total time for the existing process entry
            existing_process_entry['total_time'] = self.format_duration(elapsed_time)
        else:
            # Create a new process entry
            self.process_info[username].append({
                "name": process_name,
                "total_time": self.format_duration(elapsed_time)
            })

    def monitor_processes(self):
        """Monitor running processes and update process info."""
        # Get the list of running processes
        for proc in psutil.process_iter(['pid', 'name', 'create_time', 'username']):
            try:
                # Check if the process is user-facing and created today
                if self.is_user_facing_process(proc) and self.is_current_day(proc.info['create_time']):
                    process_name = proc.info['name']
                    username = proc.info['username']
                    create_time = proc.info['create_time']

                    # Calculate the time elapsed since process creation
                    elapsed_time = time.time() - create_time

                    # Update or create process entry
                    self.update_process_entry(username, process_name, elapsed_time)

            except (psutil.NoSuchProcess, psutil.AccessDenied, psutil.ZombieProcess):
                # Skip processes that may have ended or cannot be accessed
                continue

        # Save updated process information to JSON
        self.save_process_info()


if __name__ == "__main__":
    process_monitor = ApplicationMonitor()
