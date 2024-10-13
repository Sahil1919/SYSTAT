import json
import os
from datetime import datetime
import platform
import psutil
import netifaces
import socket

from .app_monitor import ApplicationMonitor
from .utils import utils

current_path = os.path.dirname(__file__)


class PCStats(object):

    def __init__(self):

        self.load_stats()
        self.cpu_stats = None

    def load_stats(self) -> dict:

        self.cpu_stats = dict(
            cpu_stats=dict(
                curr_time=datetime.now().strftime("%d/%m/%Y, %H:%M:%S"),
                system_overview=self.system_info_stats(),
                boot_time=self.system_boot_time_stats(),
                cpu_info=self.system_cpu_info_stats(),
                memory_usage=self.system_memory_usage_stats(),
                disk_usage=self.system_disk_usage_stats(),
                network_info=self.system_network_info_stats(),
            ),
            pc_no=os.getenv('PC_NO'),
            browser_history=self.browser_history(),
            application_history=self.application_history()
        )

        with open(f'{current_path}/responses/stats.json', "w+", encoding='utf8') as f:
            f.write(json.dumps(self.cpu_stats))

        return self.cpu_stats

    @classmethod
    def system_info_stats(cls) -> dict:

        uname = platform.uname()

        sys_info_stats = dict(
            sys_type=uname.system,
            sys_name=uname.node,
            release_version=uname.release,
            sys_version=uname.version,
            machine_version=uname.machine,
            sys_processor=uname.processor
        )

        return sys_info_stats

    @classmethod
    def system_boot_time_stats(cls) -> dict:

        boot_time_timestamp = psutil.boot_time()
        bt = datetime.fromtimestamp(boot_time_timestamp)

        boot_time_stats = dict(
            year=bt.year,
            month=bt.month,
            day=bt.day,
            hour=bt.hour,
            minute=bt.minute,
            second=bt.second
        )

        return boot_time_stats

    @classmethod
    def system_cpu_info_stats(cls) -> dict:

        cpufreq = psutil.cpu_freq()

        cpu_stats = dict(
            physical_cores=f"{psutil.cpu_count(logical=False)}",
            total_cores=f"{psutil.cpu_count(logical=True)}",
            maxfrequency=f"{cpufreq.max:.2f}Mhz",
            minfrequency=f"{cpufreq.min:.2f}Mhz",
            current_frequency=f"{cpufreq.current:.2f}Mhz",
            total_cpu_usage=f"{psutil.cpu_percent()}%"
        )

        return cpu_stats

    @classmethod
    def system_memory_usage_stats(cls) -> dict:

        virtual_memory = psutil.virtual_memory()

        swap_memory = psutil.swap_memory()

        memory_stats = dict(
            main_memory_details=dict(
                total=f"{utils.get_size(virtual_memory.total)}",
                available=f"{utils.get_size(virtual_memory.available)}",
                used=f"{utils.get_size(virtual_memory.used)}",
                percentage=f"{virtual_memory.percent}%"
            ),

            swap_memory_details=dict(
                total=f"{utils.get_size(swap_memory.total)}",
                free=f"{utils.get_size(swap_memory.free)}",
                used=f"{utils.get_size(swap_memory.used)}",
                percentage=f"{swap_memory.percent}%"
            )
        )

        return memory_stats

    @classmethod
    def system_disk_usage_stats(cls) -> dict:

        partitions = psutil.disk_partitions()

        disk_io = psutil.disk_io_counters()

        disk_partitions = []

        for partition in partitions:
            try:
                partition_usage = psutil.disk_usage(partition.mountpoint)
            except PermissionError:
                continue

            disk_partition = dict(
                partition_name=partition.device,
                mount_point=f"{partition.mountpoint}",
                file_system_type=f"{partition.fstype}",
                total_size=f"{utils.get_size(partition_usage.total)}",
                used=f"{utils.get_size(partition_usage.used)}",
                free=f"{utils.get_size(partition_usage.free)}",
                percentage=f"{partition_usage.percent}%"
            )

            disk_partitions.append(disk_partition)

        disk_usage_stats = {
            "disk_partition": disk_partitions,
            "total_read": f"{utils.get_size(disk_io.read_bytes)}",
            "total_write": f"{utils.get_size(disk_io.write_bytes)}"
        }

        return disk_usage_stats

    @classmethod
    def system_network_info_stats(cls) -> dict:

        hostname = socket.gethostname()
        ip_address = socket.gethostbyname(hostname)

        interfaces = netifaces.interfaces()

        net_io = psutil.net_io_counters()

        info_interfaces = []
        for count, interface in enumerate(interfaces, start=1):
            if_addresses = netifaces.ifaddresses(interface)
            if netifaces.AF_INET in if_addresses:
                addresses = if_addresses[netifaces.AF_INET]
                for address in addresses:
                    info_interface = {
                        f"interface_{count}": f"{interface}",
                        "ip_address": f"{address['addr']}",
                        "netmask": f"{address['netmask']}",
                        "broadcast_ip": f"{address.get('broadcast', '')}"
                    }

                    info_interfaces.append(info_interface)

        network_info_stats = dict(
            hostname=hostname,
            ip_address=ip_address,
            network_interfaces=info_interfaces,
            total_bytes_sent=f"{utils.get_size(net_io.bytes_sent)}",
            total_bytes_received=f"{utils.get_size(net_io.bytes_recv)}"
        )

        return network_info_stats

    @classmethod
    def browser_history(cls) -> dict:
        with open(f'{current_path}/responses/profiles_data.json', 'r', encoding='utf8') as f:
            return json.loads(f.read())

    @classmethod
    def application_history(cls) -> dict:
        ApplicationMonitor().monitor_processes()
        with open(f'{current_path}/responses/process_info.json', 'r', encoding='utf8') as f:
            return json.loads(f.read())


if __name__ == '__main__':
    stats = PCStats()
    print(stats.load_stats())
