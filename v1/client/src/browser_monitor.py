import os
import shutil
import sqlite3
from datetime import datetime, timedelta
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
import json


class FileModifiedHandler(FileSystemEventHandler):
    def __init__(self, profile_dir):
        super().__init__()
        self.profile_dir = profile_dir
        self.current_path = os.path.dirname(__file__)

        self.dummy_db_dir = f'{self.current_path}/dummy_history_dbs'
        self.get_chrome_user_info(f"{self.profile_dir}/Preferences")

        self.profiles_data_file = f'{self.current_path}/responses/profiles_data.json'
        self.load_profiles_data()

    def get_chrome_user_info(self, preferences_file):
        try:
            with open(preferences_file, 'r', encoding='utf-8') as f:
                preferences_data = json.load(f)
                # Check if account_info exists and is not empty
                if 'account_info' in preferences_data and preferences_data['account_info']:
                    # Assuming only one account info is present
                    account_info = preferences_data['account_info'][0]
                    self.email = account_info.get('email', '')
                    self.full_name = account_info.get('full_name', '')

                else:
                    self.email = ''
                    self.full_name = ''
        except Exception as e:
            # print("Error reading Chrome Preferences:", e)
            self.email = ''
            self.full_name = ''

    def copy_history_database(self, history_db):
        try:
            if not os.path.exists(self.dummy_db_dir):
                os.makedirs(self.dummy_db_dir)

            # Get the profile name

            profile_name = os.path.basename(self.profile_dir)
            # Construct the destination path for the dummy database with profile name
            dummy_db_path = os.path.join(
                self.dummy_db_dir, f"{profile_name}_dummy_history.db")

            shutil.copy2(history_db, dummy_db_path)
            return dummy_db_path
        except Exception as e:
            print(
                f"Error copying history database for profile {self.profile_dir}:", e)

    def process_history_data(self, history_db):
        detailed_output = {}
        try:
            # Connect to the SQLite database
            conn = sqlite3.connect(history_db)

            # Query to retrieve URLs from history
            query = """
                    SELECT
                        datetime(
                            visits.visit_time/1000000-11644473600, 'unixepoch', 'localtime'
                        ) as 'visit_time',
                        urls.url,
                        urls.title
                    FROM
                        visits INNER JOIN urls ON visits.url = urls.id
                    WHERE
                        visits.visit_duration > 0
                    ORDER BY
                        visit_time DESC
                """
            # Execute the query
            cursor = conn.cursor()
            cursor.execute(query)

            # Fetch results
            urls = cursor.fetchall()

            # Close the database connection
            conn.close()

            current_day_urls = [list(url)
                                for url in urls if self.is_current_day(url[0])]

            # Calculate the total time spent on each site
            time_spent = self.calculate_time_spent(current_day_urls)

            if time_spent:
                # Organize the URLs and their visit durations into a dictionary
                for timestamp_str, url, title in current_day_urls:
                    site_name = self.extract_site_name(url)
                    if site_name not in detailed_output:
                        detailed_output[site_name] = []

                    # Calculate duration between timestamps
                    duration = time_spent[url]
                    # Convert duration to %H:%M:%S format
                    duration_str = str(timedelta(seconds=duration))

                    detailed_output[site_name].append({
                        "url": url,
                        "title": title,
                        "timestamp": timestamp_str,
                        "duration": duration_str,
                        "email": self.email,
                        "full_name": self.full_name
                    })

        except sqlite3.Error as e:
            print("SQLite error:", e)

        return detailed_output

    def load_profiles_data(self):
        try:
            with open(self.profiles_data_file, 'r', encoding='utf-8') as f:
                self.profiles_data = json.load(f)
        except FileNotFoundError:
            self.profiles_data = {}

    def save_profiles_data(self):
        with open(self.profiles_data_file, 'w', encoding='utf-8') as f:
            json.dump(self.profiles_data, f, indent=4)

    def on_modified(self, event):
        if event.src_path.endswith('History'):
            # print(f"Chrome history file modified: {event.src_path}")
            dummy_db_path = self.copy_history_database(event.src_path)
            detailed_output = self.process_history_data(dummy_db_path)
            aggregate_duration = self.calculate_aggregate_data(detailed_output)
            profile_name = os.path.basename(self.profile_dir)
            if profile_name in self.profiles_data:
                self.profiles_data[profile_name]['history'] = aggregate_duration
            else:
                self.profiles_data[profile_name] = {
                    'history': aggregate_duration}
            print("Chrome Profile is Modified!!!!")
            self.save_profiles_data()

    def is_current_day(self, timestamp):
        # Convert the string timestamp to a datetime object
        dt_object = datetime.strptime(timestamp, "%Y-%m-%d %H:%M:%S")
        # Get the date part of the datetime object
        dt_date = dt_object.date()
        # Get the current date
        current_date = datetime.now().date()
        return dt_date == current_date

    def calculate_time_spent(self, history_entries):
        time_spent = {}
        previous_timestamp = None

        if history_entries:
            # Convert string timestamp of the first entry to datetime object
            first_entry_timestamp = datetime.strptime(
                history_entries[0][0], "%Y-%m-%d %H:%M:%S")
            previous_timestamp = first_entry_timestamp

            for timestamp_str, url, title in history_entries:
                # Convert string timestamp to datetime object
                timestamp = datetime.strptime(
                    timestamp_str, "%Y-%m-%d %H:%M:%S")

                # Calculate duration between timestamps
                duration = timestamp - previous_timestamp
                # Convert duration to seconds
                duration_seconds = duration.total_seconds()

                # Update time spent for existing or new URL
                time_spent[url] = time_spent.get(
                    url, 0) + abs(duration_seconds)

                # Update previous timestamp for the next iteration
                previous_timestamp = timestamp

            return time_spent

    def calculate_aggregate_data(self, detailed_output):
        aggregate_data = {}
        for domain, links in detailed_output.items():
            total_duration = sum([int(link['duration'].split(':')[0]) * 3600 + int(
                link['duration'].split(':')[1]) * 60 + int(link['duration'].split(':')[2]) for link in links])
            total_time_spent = str(timedelta(seconds=total_duration))
            aggregate_data[domain] = {
                "total_time_spent": total_time_spent,
                "visited_links": links
            }
        return aggregate_data

    def extract_site_name(self, url):
        # Extract the site name from the URL
        return url.split('/')[2]

    @staticmethod
    def main():
        profiles_dir = os.path.expanduser(
            '~\\AppData\\Local\\Google\\Chrome\\User Data')
        handlers = []
        for profile_name in os.listdir(profiles_dir):
            profile_dir = os.path.join(profiles_dir, profile_name)
            if os.path.isdir(profile_dir):
                handler = FileModifiedHandler(profile_dir)
                history_db = os.path.join(profile_dir, 'History')
                if os.path.exists(history_db):
                    dummy_path = handler.copy_history_database(history_db)
                    detailed_output = handler.process_history_data(dummy_path)
                    aggregate_duration = handler.calculate_aggregate_data(
                        detailed_output)
                    profile_name = os.path.basename(profile_dir)
                    if profile_name in handler.profiles_data:
                        handler.profiles_data[profile_name]['history'] = aggregate_duration
                    else:
                        handler.profiles_data[profile_name] = {
                            'history': detailed_output}

                    handler.save_profiles_data()
                    handlers.append(handler)
                else:
                    # print(f"History database not found for profile: {profile_dir}")
                    pass

        observers = []
        for handler in handlers:
            observer = Observer()
            observer.schedule(
                handler, path=handler.profile_dir, recursive=False)
            observers.append(observer)
            observer.start()

        # try:
        #     while True:
        #         pass
        # except KeyboardInterrupt:
        #     for observer in observers:
        #         observer.stop()
        #         observer.join()


if __name__ == '__main__':

    filehandler = FileModifiedHandler(FileSystemEventHandler)
    filehandler.main()
    

