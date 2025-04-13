import React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import { theme } from "../../theme";
import { Button, Stack, Tooltip } from "@mui/material";
import { Area, AreaChart, ResponsiveContainer, YAxis } from "recharts";
import ActivePC from "../pages/ActivePC";
import ActivePC2 from "../pages/ActivePC2";

const PC_card = ({ item, handleTabClick, isOn }) => {
  // console.log(item)

  // if ((isOn && item.isActive) || (!isOn && !item.isActive)) {
    return (
      <Box mt={2} display={"flex"} justifyContent={"start"}>
        <Button
          sx={{
            height: 100,
            width: "100%",
            backgroundColor: "#212b36",
            borderRadius: 3,
            padding: 1.5,
            scale: 0.8,
            ...{ "&:hover": { scale: 1, backgroundColor: "#3fb79060" } },
          }}
          onClick={() => {
            handleTabClick(item.id);
          }}
        >
          <Stack spacing={0}>
            <Box flex={1} sx={{ backgroundColor: "", color: "whitesmoke" }}>
              {item.pcNo}
            </Box>
            <Box
              flex={2}
              height={80}
              sx={{ backgroundColor: "whitesmoke", color: "#212b36" }}
            ></Box>
          </Stack>
        </Button>
      </Box>
    );
  // }
};

export default PC_card;
