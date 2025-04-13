import { Box, Card, Stack, Tooltip } from "@mui/material";
import React from "react";
import { Area, AreaChart, ResponsiveContainer, YAxis } from "recharts";
import ChartCard from "./test/ChartCard";

const Datacard = ({ item, index }) => {


  return (
    <Card
      component={Stack}
      spacing={3}
      direction="row"
      sx={{
        height:100,
        px: 2.5,
        py: 2.5,
        borderRadius: 2,
        backgroundColor: "#212b35",
        color: "whitesmoke",
        ...{
          "&:hover": {
            backgroundColor: "#3fb79060",
            color: "white",
            cursor: "pointer",
          },
        },
      }}
    >
      <Box sx={{ width: '20%', height: 50}}>{item}</Box>
      <Box sx={{ width: '80%',}}  >
        <ChartCard index={index} />
      </Box>
    </Card>
  );
};

export default Datacard;
