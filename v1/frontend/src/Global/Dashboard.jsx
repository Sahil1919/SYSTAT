import { Box, Card, Container, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import React from "react";
import Datacard from "../components/Datacard";
import ChartCard from "../components/test/ChartCard";


function Dashboard() {
  return (
    <Box
      bgcolor="#161c24"
      color={"whitesmoke"}
      height="calc(100vh - 52.8px)"
      p={2}
      overflow={"auto"}
    >
      <Grid container spacing={3}>
        {['CPU','RAM','DISK','N/W'].map((item, index) => (
          <Grid key={index} xs={12} sm={6} md={3}>
            <Datacard key={index} item={item} index={index} />
          </Grid>
        ))}
        <ChartCard/>
      </Grid>
      <Grid xs={12} md={6} lg={8} mt={3} >
        <Box bgcolor={"#212b35"} color={"whitesmoke"} p={2} height={400} borderRadius={2} >
          <Typography >Average Data</Typography>
        </Box>
      </Grid>
    </Box>
  );
}

export default Dashboard;
