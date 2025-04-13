import { Box, Stack } from "@mui/material";
import React, { useEffect, useId, useState } from "react";
import PC_data_section from "../components/PC_data_section";
import PC_card from "../components/PC_card";
import CPUInfoChart from "../components/CPUInfoChart";
import Active_inActive_switch from "../components/test/Active_inActive_switch";
import axios from "axios";

const ActivePC2 = () => {
  const [activeTabs, setActiveTabs] = useState([]);
  const [inActiveTabs, setInActiveTabs] = useState([]);

  const pcData = {
    1: {
      systemInfo: {
        Curr_time: "07/02/2024, 20:33:38",
        "System Info": {
          sys_type: "Windows",
          sys_name: "DESKTOP-OJ1INJO",
          release_version: "10",
          sys_version: "10.0.22631",
          machine_verion: "AMD64",
          sys_processor: "Intel64 Family 6 Model 154 Stepping 3, GenuineIntel",
        },
        "Boot Time": {
          year: 2024,
          month: 2,
          day: 7,
          hour: 11,
          minute: 51,
          second: 3,
        },
        "CPU Info": {
          physical_cores: "12",
          total_cores: "16",
          maxfrequency: "1700.00Mhz",
          minfrequency: "0.00Mhz",
          current_frequency: "1700.00Mhz",
          total_cpu_usage: "8.9%",
        },
        "Memory Usage": {
          main_memory_details: {
            total: "15.69GB",
            available: "3.91GB",
            used: "11.79GB",
            percentage: "75.1%",
          },
          swap_memory_details: {
            total: "4.50GB",
            free: "4.32GB",
            used: "188.91MB",
            percentage: "4.1%",
          },
        },
        "Disk Usage": {
          disk_partition: [
            {
              partition_name: "C:\\",
              mountpoint: "C:\\",
              file_system_type: "NTFS",
              total_size: "360.56GB",
              used: "191.25GB",
              free: "169.31GB",
              percentage: "53.0%",
            },
            {
              partition_name: "D:\\",
              mountpoint: "D:\\",
              file_system_type: "NTFS",
              total_size: "97.66GB",
              used: "9.67GB",
              free: "87.99GB",
              percentage: "9.9%",
            },
          ],
          total_read: "11.11GB",
          total_write: "11.96GB",
        },
        "Network Info": {
          hostname: "DESKTOP-OJ1INJO",
          ip_address: "192.168.1.207",
          network_interfaces: [
            {
              "interface 1": "{719BE818-3A10-44BD-A6D2-9627E6FA17AE}",
              ip_address: "192.168.1.207",
              netmask: "255.255.255.0",
              broadcast_ip: "192.168.1.255",
            },
            {
              "interface 2": "{AD00B695-2781-11ED-B9A9-806E6F6E6963}",
              ip_address: "127.0.0.1",
              netmask: "255.0.0.0",
              broadcast_ip: "127.255.255.255",
            },
          ],
          total_bytes_sent: "123.55MB",
          total_bytes_received: "1.31GB",
        },
      },
      pcNo: 1,
      lastResponseTime: 1707318230560,
      isActive: false,
    },
    2: {
      systemInfo: {
        Curr_time: "07/02/2024, 20:34:15",
        "System Info": {
          sys_type: "Windows",
          sys_name: "DESKTOP-OJ1INJO",
          release_version: "10",
          sys_version: "10.0.22631",
          machine_verion: "AMD64",
          sys_processor: "Intel64 Family 6 Model 154 Stepping 3, GenuineIntel",
        },
        "Boot Time": {
          year: 2024,
          month: 2,
          day: 7,
          hour: 11,
          minute: 51,
          second: 3,
        },
        "CPU Info": {
          physical_cores: "12",
          total_cores: "16",
          maxfrequency: "1700.00Mhz",
          minfrequency: "0.00Mhz",
          current_frequency: "1700.00Mhz",
          total_cpu_usage: "6.2%",
        },
        "Memory Usage": {
          main_memory_details: {
            total: "15.69GB",
            available: "3.91GB",
            used: "11.78GB",
            percentage: "75.1%",
          },
          swap_memory_details: {
            total: "4.50GB",
            free: "4.33GB",
            used: "173.40MB",
            percentage: "3.8%",
          },
        },
        "Disk Usage": {
          disk_partition: [
            {
              partition_name: "C:\\",
              mountpoint: "C:\\",
              file_system_type: "NTFS",
              total_size: "360.56GB",
              used: "191.25GB",
              free: "169.31GB",
              percentage: "53.0%",
            },
            {
              partition_name: "D:\\",
              mountpoint: "D:\\",
              file_system_type: "NTFS",
              total_size: "97.66GB",
              used: "9.67GB",
              free: "87.99GB",
              percentage: "9.9%",
            },
          ],
          total_read: "11.11GB",
          total_write: "11.98GB",
        },
        "Network Info": {
          hostname: "DESKTOP-OJ1INJO",
          ip_address: "192.168.1.207",
          network_interfaces: [
            {
              "interface 1": "{719BE818-3A10-44BD-A6D2-9627E6FA17AE}",
              ip_address: "192.168.1.207",
              netmask: "255.255.255.0",
              broadcast_ip: "192.168.1.255",
            },
            {
              "interface 2": "{AD00B695-2781-11ED-B9A9-806E6F6E6963}",
              ip_address: "127.0.0.1",
              netmask: "255.0.0.0",
              broadcast_ip: "127.255.255.255",
            },
          ],
          total_bytes_sent: "123.68MB",
          total_bytes_received: "1.31GB",
        },
      },
      pcNo: 2,
      lastResponseTime: 1707318271066,
      isActive: true,
    },
    3: {
      systemInfo: {
        Curr_time: "07/02/2024, 20:33:38",
        "System Info": {
          sys_type: "Windows",
          sys_name: "DESKTOP-OJ1INJO",
          release_version: "10",
          sys_version: "10.0.22631",
          machine_verion: "AMD64",
          sys_processor: "Intel64 Family 6 Model 154 Stepping 3, GenuineIntel",
        },
        "Boot Time": {
          year: 2024,
          month: 2,
          day: 7,
          hour: 11,
          minute: 51,
          second: 3,
        },
        "CPU Info": {
          physical_cores: "12",
          total_cores: "16",
          maxfrequency: "1700.00Mhz",
          minfrequency: "0.00Mhz",
          current_frequency: "1700.00Mhz",
          total_cpu_usage: "8.9%",
        },
        "Memory Usage": {
          main_memory_details: {
            total: "15.69GB",
            available: "3.91GB",
            used: "11.79GB",
            percentage: "75.1%",
          },
          swap_memory_details: {
            total: "4.50GB",
            free: "4.32GB",
            used: "188.91MB",
            percentage: "4.1%",
          },
        },
        "Disk Usage": {
          disk_partition: [
            {
              partition_name: "C:\\",
              mountpoint: "C:\\",
              file_system_type: "NTFS",
              total_size: "360.56GB",
              used: "191.25GB",
              free: "169.31GB",
              percentage: "53.0%",
            },
            {
              partition_name: "D:\\",
              mountpoint: "D:\\",
              file_system_type: "NTFS",
              total_size: "97.66GB",
              used: "9.67GB",
              free: "87.99GB",
              percentage: "9.9%",
            },
          ],
          total_read: "11.11GB",
          total_write: "11.96GB",
        },
        "Network Info": {
          hostname: "DESKTOP-OJ1INJO",
          ip_address: "192.168.1.207",
          network_interfaces: [
            {
              "interface 1": "{719BE818-3A10-44BD-A6D2-9627E6FA17AE}",
              ip_address: "192.168.1.207",
              netmask: "255.255.255.0",
              broadcast_ip: "192.168.1.255",
            },
            {
              "interface 2": "{AD00B695-2781-11ED-B9A9-806E6F6E6963}",
              ip_address: "127.0.0.1",
              netmask: "255.0.0.0",
              broadcast_ip: "127.255.255.255",
            },
          ],
          total_bytes_sent: "123.55MB",
          total_bytes_received: "1.31GB",
        },
      },
      pcNo: 3,
      lastResponseTime: 1707318230560,
      isActive: false,
    },
    4: {
      systemInfo: {
        Curr_time: "07/02/2024, 20:34:15",
        "System Info": {
          sys_type: "Windows",
          sys_name: "DESKTOP-OJ1INJO",
          release_version: "10",
          sys_version: "10.0.22631",
          machine_verion: "AMD64",
          sys_processor: "Intel64 Family 6 Model 154 Stepping 3, GenuineIntel",
        },
        "Boot Time": {
          year: 2024,
          month: 2,
          day: 7,
          hour: 11,
          minute: 51,
          second: 3,
        },
        "CPU Info": {
          physical_cores: "12",
          total_cores: "16",
          maxfrequency: "1700.00Mhz",
          minfrequency: "0.00Mhz",
          current_frequency: "1700.00Mhz",
          total_cpu_usage: "6.2%",
        },
        "Memory Usage": {
          main_memory_details: {
            total: "15.69GB",
            available: "3.91GB",
            used: "11.78GB",
            percentage: "75.1%",
          },
          swap_memory_details: {
            total: "4.50GB",
            free: "4.33GB",
            used: "173.40MB",
            percentage: "3.8%",
          },
        },
        "Disk Usage": {
          disk_partition: [
            {
              partition_name: "C:\\",
              mountpoint: "C:\\",
              file_system_type: "NTFS",
              total_size: "360.56GB",
              used: "191.25GB",
              free: "169.31GB",
              percentage: "53.0%",
            },
            {
              partition_name: "D:\\",
              mountpoint: "D:\\",
              file_system_type: "NTFS",
              total_size: "97.66GB",
              used: "9.67GB",
              free: "87.99GB",
              percentage: "9.9%",
            },
          ],
          total_read: "11.11GB",
          total_write: "11.98GB",
        },
        "Network Info": {
          hostname: "DESKTOP-OJ1INJO",
          ip_address: "192.168.1.207",
          network_interfaces: [
            {
              "interface 1": "{719BE818-3A10-44BD-A6D2-9627E6FA17AE}",
              ip_address: "192.168.1.207",
              netmask: "255.255.255.0",
              broadcast_ip: "192.168.1.255",
            },
            {
              "interface 2": "{AD00B695-2781-11ED-B9A9-806E6F6E6963}",
              ip_address: "127.0.0.1",
              netmask: "255.0.0.0",
              broadcast_ip: "127.255.255.255",
            },
          ],
          total_bytes_sent: "123.68MB",
          total_bytes_received: "1.31GB",
        },
      },
      pcNo: 4,
      lastResponseTime: 1707318271066,
      isActive: true,
    },
    5: {
      systemInfo: {
        Curr_time: "07/02/2024, 20:34:15",
        "System Info": {
          sys_type: "Windows",
          sys_name: "DESKTOP-OJ1INJO",
          release_version: "10",
          sys_version: "10.0.22631",
          machine_verion: "AMD64",
          sys_processor: "Intel64 Family 6 Model 154 Stepping 3, GenuineIntel",
        },
        "Boot Time": {
          year: 2024,
          month: 2,
          day: 7,
          hour: 11,
          minute: 51,
          second: 3,
        },
        "CPU Info": {
          physical_cores: "12",
          total_cores: "16",
          maxfrequency: "1700.00Mhz",
          minfrequency: "0.00Mhz",
          current_frequency: "1700.00Mhz",
          total_cpu_usage: "6.2%",
        },
        "Memory Usage": {
          main_memory_details: {
            total: "15.69GB",
            available: "3.91GB",
            used: "11.78GB",
            percentage: "75.1%",
          },
          swap_memory_details: {
            total: "4.50GB",
            free: "4.33GB",
            used: "173.40MB",
            percentage: "3.8%",
          },
        },
        "Disk Usage": {
          disk_partition: [
            {
              partition_name: "C:\\",
              mountpoint: "C:\\",
              file_system_type: "NTFS",
              total_size: "360.56GB",
              used: "191.25GB",
              free: "169.31GB",
              percentage: "53.0%",
            },
            {
              partition_name: "D:\\",
              mountpoint: "D:\\",
              file_system_type: "NTFS",
              total_size: "97.66GB",
              used: "9.67GB",
              free: "87.99GB",
              percentage: "9.9%",
            },
          ],
          total_read: "11.11GB",
          total_write: "11.98GB",
        },
        "Network Info": {
          hostname: "DESKTOP-OJ1INJO",
          ip_address: "192.168.1.207",
          network_interfaces: [
            {
              "interface 1": "{719BE818-3A10-44BD-A6D2-9627E6FA17AE}",
              ip_address: "192.168.1.207",
              netmask: "255.255.255.0",
              broadcast_ip: "192.168.1.255",
            },
            {
              "interface 2": "{AD00B695-2781-11ED-B9A9-806E6F6E6963}",
              ip_address: "127.0.0.1",
              netmask: "255.0.0.0",
              broadcast_ip: "127.255.255.255",
            },
          ],
          total_bytes_sent: "123.68MB",
          total_bytes_received: "1.31GB",
        },
      },
      pcNo: 5,
      lastResponseTime: 1707318271066,
      isActive: true,
    },
    6: {
      systemInfo: {
        Curr_time: "07/02/2024, 20:34:15",
        "System Info": {
          sys_type: "Windows",
          sys_name: "DESKTOP-OJ1INJO",
          release_version: "10",
          sys_version: "10.0.22631",
          machine_verion: "AMD64",
          sys_processor: "Intel64 Family 6 Model 154 Stepping 3, GenuineIntel",
        },
        "Boot Time": {
          year: 2024,
          month: 2,
          day: 7,
          hour: 11,
          minute: 51,
          second: 3,
        },
        "CPU Info": {
          physical_cores: "12",
          total_cores: "16",
          maxfrequency: "1700.00Mhz",
          minfrequency: "0.00Mhz",
          current_frequency: "1700.00Mhz",
          total_cpu_usage: "6.2%",
        },
        "Memory Usage": {
          main_memory_details: {
            total: "15.69GB",
            available: "3.91GB",
            used: "11.78GB",
            percentage: "75.1%",
          },
          swap_memory_details: {
            total: "4.50GB",
            free: "4.33GB",
            used: "173.40MB",
            percentage: "3.8%",
          },
        },
        "Disk Usage": {
          disk_partition: [
            {
              partition_name: "C:\\",
              mountpoint: "C:\\",
              file_system_type: "NTFS",
              total_size: "360.56GB",
              used: "191.25GB",
              free: "169.31GB",
              percentage: "53.0%",
            },
            {
              partition_name: "D:\\",
              mountpoint: "D:\\",
              file_system_type: "NTFS",
              total_size: "97.66GB",
              used: "9.67GB",
              free: "87.99GB",
              percentage: "9.9%",
            },
          ],
          total_read: "11.11GB",
          total_write: "11.98GB",
        },
        "Network Info": {
          hostname: "DESKTOP-OJ1INJO",
          ip_address: "192.168.1.207",
          network_interfaces: [
            {
              "interface 1": "{719BE818-3A10-44BD-A6D2-9627E6FA17AE}",
              ip_address: "192.168.1.207",
              netmask: "255.255.255.0",
              broadcast_ip: "192.168.1.255",
            },
            {
              "interface 2": "{AD00B695-2781-11ED-B9A9-806E6F6E6963}",
              ip_address: "127.0.0.1",
              netmask: "255.0.0.0",
              broadcast_ip: "127.255.255.255",
            },
          ],
          total_bytes_sent: "123.68MB",
          total_bytes_received: "1.31GB",
        },
      },
      pcNo: 6,
      lastResponseTime: 1707318271066,
      isActive: true,
    },
    7: {
      systemInfo: {
        Curr_time: "07/02/2024, 20:33:38",
        "System Info": {
          sys_type: "Windows",
          sys_name: "DESKTOP-OJ1INJO",
          release_version: "10",
          sys_version: "10.0.22631",
          machine_verion: "AMD64",
          sys_processor: "Intel64 Family 6 Model 154 Stepping 3, GenuineIntel",
        },
        "Boot Time": {
          year: 2024,
          month: 2,
          day: 7,
          hour: 11,
          minute: 51,
          second: 3,
        },
        "CPU Info": {
          physical_cores: "12",
          total_cores: "16",
          maxfrequency: "1700.00Mhz",
          minfrequency: "0.00Mhz",
          current_frequency: "1700.00Mhz",
          total_cpu_usage: "8.9%",
        },
        "Memory Usage": {
          main_memory_details: {
            total: "15.69GB",
            available: "3.91GB",
            used: "11.79GB",
            percentage: "75.1%",
          },
          swap_memory_details: {
            total: "4.50GB",
            free: "4.32GB",
            used: "188.91MB",
            percentage: "4.1%",
          },
        },
        "Disk Usage": {
          disk_partition: [
            {
              partition_name: "C:\\",
              mountpoint: "C:\\",
              file_system_type: "NTFS",
              total_size: "360.56GB",
              used: "191.25GB",
              free: "169.31GB",
              percentage: "53.0%",
            },
            {
              partition_name: "D:\\",
              mountpoint: "D:\\",
              file_system_type: "NTFS",
              total_size: "97.66GB",
              used: "9.67GB",
              free: "87.99GB",
              percentage: "9.9%",
            },
          ],
          total_read: "11.11GB",
          total_write: "11.96GB",
        },
        "Network Info": {
          hostname: "DESKTOP-OJ1INJO",
          ip_address: "192.168.1.207",
          network_interfaces: [
            {
              "interface 1": "{719BE818-3A10-44BD-A6D2-9627E6FA17AE}",
              ip_address: "192.168.1.207",
              netmask: "255.255.255.0",
              broadcast_ip: "192.168.1.255",
            },
            {
              "interface 2": "{AD00B695-2781-11ED-B9A9-806E6F6E6963}",
              ip_address: "127.0.0.1",
              netmask: "255.0.0.0",
              broadcast_ip: "127.255.255.255",
            },
          ],
          total_bytes_sent: "123.55MB",
          total_bytes_received: "1.31GB",
        },
      },
      pcNo: 7,
      lastResponseTime: 1707318230560,
      isActive: false,
    },
  };

  const [activePCs, setActivePCs] = useState([]);
  const [inactivePCs, setInactivePCs] = useState([]);

  useEffect(() => {
    // Loop through each PC object in the pcData
    for (const pcId in pcData) {
      // Check if the property is a direct property of the object (not inherited)
      if (pcData.hasOwnProperty(pcId)) {
        // Access the isActive property for each PC
        const isActive = pcData[pcId].isActive;

        // Check if the PC is already present in the list
        if (isActive && !activePCs.some((pc) => pc.pcId === pcId)) {
          setActivePCs((prevActivePCs) => [
            ...prevActivePCs,
            { pcId, ...pcData[pcId] },
          ]);
        } else if (!isActive && !inactivePCs.some((pc) => pc.pcId === pcId)) {
          setInactivePCs((prevInactivePCs) => [
            ...prevInactivePCs,
            { pcId, ...pcData[pcId] },
          ]);
        }
      }
    }
  }, [pcData]);

  console.log(activePCs);
  console.log(inactivePCs);

  const [selectedTab, setSelectedTab] = useState(null);

  const handleTabClick = (tabId) => {
    // const selected = activeTabs.find((item) => item.id === tabId);
    // setSelectedTab(selected);
    // console.log(selected)
  };

  const [isOn, setIsOn] = useState(true);

  const toggleSwitch = () => {
    setIsOn(!isOn);
  };

  const renderPCs = isOn ? activePCs : inactivePCs;

  console.log(renderPCs);

  return (
    <Box flex={6}>
      <Stack
        direction="row"
        justifyContent="space-between"
        height="calc(100vh - 52.8px)"
      >
        <PC_data_section isOn={isOn} toggleSwitch={toggleSwitch} />
        <Box
          bgcolor={"#161c24"}
          color={"whitesmoke"}
          flex={1.2}
          px={2}
          sx={{
            overflow: "auto",
            borderLeft: "dashed 1px #7e8aac",
          }}
        >
          <Box
            sx={{
              position: "sticky",
              top: 0,
              display: "flex",
              justifyContent: "center",
              bgcolor: "#161c24",
              py: 1.2,
              zIndex: 1,
            }}
          >
            <Active_inActive_switch isOn={isOn} toggleSwitch={toggleSwitch} />
          </Box>
          {renderPCs.map(
            (item, index) =>
              isOn (
                <PC_card
                  key={item.pcId}
                  item={item}
                  isOn={isOn}
                  selectedTab={selectedTab}
                  handleTabClick={handleTabClick}
                />
              ) || !isOn (
                <PC_card
                  key={item.pcId}
                  item={item}
                  isOn={isOn}
                  selectedTab={selectedTab}
                  handleTabClick={handleTabClick}
                />
              )
          )}
        </Box>
      </Stack>
    </Box>
  );
};

export default ActivePC2;
