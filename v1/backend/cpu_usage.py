from datetime import datetime
import platform
from utils import utils
import psutil
import netifaces
import socket

class CPU_Usage:

    def __init__(self) -> dict:

        self.load_stats()

    def load_stats(self) -> dict:

        sys_info = self.system_info_stats()

        boot_time = self.system_boot_time_stats()

        cpu_info = self.system_cpu_info_stats()

        memory_stats = self.system_memory_usage_stats()

        disk_stats = self.system_disk_usage_stats()

        newtwork_stats = self.system_network_info_stats()

        curr_time = datetime.now().strftime("%d/%m/%Y, %H:%M:%S")

        cpu_stats = {"CPU Stats": {
            "Curr_time": curr_time, "System Info": sys_info, "Boot Time": boot_time, "CPU Info": cpu_info,
            "Memory Usage": memory_stats, "Disk Usage": disk_stats, "Network Info": newtwork_stats,
        }}

        return cpu_stats

    def system_info_stats(self) -> dict:

        uname = platform.uname()

        sys_info_stats = {"sys_type": uname.system, "sys_name": uname.node, "release_version": uname.release,
                          'sys_version': uname.version, 'machine_verion': uname.machine, 'sys_processor': uname.processor}

        return sys_info_stats

    def system_boot_time_stats(self) -> dict:

        boot_time_timestamp = psutil.boot_time()
        bt = datetime.fromtimestamp(boot_time_timestamp)

        boot_time_stats = {"year": bt.year, "month": bt.month,
                           "day": bt.day, "hour": bt.hour, "minute": bt.minute, "second": bt.second}

        return boot_time_stats

    def system_cpu_info_stats(self) -> dict:

        cpufreq = psutil.cpu_freq()

        cpu_stats = {"physical_cores": f"{psutil.cpu_count(logical=False)}", "total_cores": f"{psutil.cpu_count(logical=True)}",
                     "maxfrequency": f"{cpufreq.max:.2f}Mhz", "minfrequency": f"{cpufreq.min:.2f}Mhz",
                     "current_frequency": f"{cpufreq.current:.2f}Mhz", "total_cpu_usage": f"{psutil.cpu_percent()}%"}

        return cpu_stats

    def system_memory_usage_stats(self) -> dict:

        svmem = psutil.virtual_memory()

        swap = psutil.swap_memory()

        memory_stats = {
            "main_memory_details": {"total": f"{utils.get_size(svmem.total)}", "available": f"{utils.get_size(svmem.available)}",
                                    "used": f"{utils.get_size(svmem.used)}", "percentage": f"{svmem.percent}%"},

            "swap_memory_details": {"total": f"{utils.get_size(swap.total)}", "free": f"{utils.get_size(swap.free)}",
                                    "used": f"{utils.get_size(swap.used)}",  "percentage": f"{swap.percent}%"}
        }

        return memory_stats

    def system_disk_usage_stats(self) -> dict:

        partitions = psutil.disk_partitions()

        disk_io = psutil.disk_io_counters()

        disk_partitions = []

        for partition in partitions:
            try:
                partition_usage = psutil.disk_usage(partition.mountpoint)
            except PermissionError:
                continue

            disk_partition = {"partition_name": partition.device, "mountpoint": f"{partition.mountpoint}",
                              "file_system_type": f"{partition.fstype}", "total_size": f"{utils.get_size(partition_usage.total)}",
                              "used": f"{utils.get_size(partition_usage.used)}", "free": f"{utils.get_size(partition_usage.free)}",
                              "percentage": f"{partition_usage.percent}%"}

            disk_partitions.append(disk_partition)

        disk_usage_stats = {"disk_partition": disk_partitions, "total_read": f"{utils.get_size(disk_io.read_bytes)}",
                            "total_write": f"{utils.get_size(disk_io.write_bytes)}"}

        return disk_usage_stats

    def system_network_info_stats(self) -> dict:

        hostname = socket.gethostname()
        ip_address = socket.gethostbyname(hostname)

        interfaces = netifaces.interfaces()

        net_io = psutil.net_io_counters()

        info_interfaces = []
        count = 0
        for interface in interfaces:
            if_addresses = netifaces.ifaddresses(interface)
            if netifaces.AF_INET in if_addresses:
                addresses = if_addresses[netifaces.AF_INET]
                for address in addresses:
                    count += 1
                    info_interface = {f"interface {count}": f"{interface}", "ip_address": f"{address['addr']}",
                                      "netmask": f"{address['netmask']}", "broadcast_ip": f"{address['broadcast']}"}

                    info_interfaces.append(info_interface)

        network_info_stats = {"hostname": hostname, "ip_address": ip_address, "network_interfaces": info_interfaces,
                              "total_bytes_sent": f"{utils.get_size(net_io.bytes_sent)}", "total_bytes_received": f"{utils.get_size(net_io.bytes_recv)}"}

        return network_info_stats


if __name__ == '__main__':

    stats = CPU_Usage()
    print(stats.load_stats())
