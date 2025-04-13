import { Box, Stack } from "@mui/material";
import React, { useId, useState } from "react";
import PC_data_section from "../components/PC_data_section";
import PC_card from "../components/PC_card";
import CPUInfoChart from "../components/CPUInfoChart";
import Active_inActive_switch from "../components/test/Active_inActive_switch";

const ActivePC = () => {
  const [activeTabs, setActiveTabs] = useState([
    { id: useId(), name: "PC1", isActive: true },
    { id: useId(), name: "PC2", isActive: false },
    { id: useId(), name: "PC3", isActive: true },
    { id: useId(), name: "PC4", isActive: true },
    { id: useId(), name: "PC5", isActive: false },
    { id: useId(), name: "PC6", isActive: true },
    { id: useId(), name: "PC7", isActive: true },
    { id: useId(), name: "PC8", isActive: true },
    { id: useId(), name: "PC9", isActive: false },
    { id: useId(), name: "PC10", isActive: true },
    { id: useId(), name: "PC11", isActive: false },
    { id: useId(), name: "PC12", isActive: true },
    { id: useId(), name: "PC13", isActive: true },
    { id: useId(), name: "PC14", isActive: true },
    { id: useId(), name: "PC15", isActive: false },
  ]);

  // create a state to store inactive pc's

  const [selectedTab, setSelectedTab] = useState(null);

  const handleTabClick = (tabId) => {
    const selected = activeTabs.find((item) => item.id === tabId);
    setSelectedTab(selected);
    console.log(selected)
  };

  const [isOn, setIsOn] = useState(true);

  const toggleSwitch = () => {
    setIsOn(!isOn);
  };

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
          {activeTabs.map(
            (item, index) =>
              item.isActive === isOn && (
                <PC_card key={index} item={item} selectedTab={selectedTab} handleTabClick={handleTabClick} />
              )
          )}
        </Box>
      </Stack>
    </Box>
  );
};

export default ActivePC;
