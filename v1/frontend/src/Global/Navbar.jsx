import { Box, Button, Stack, Typography, styled } from "@mui/material";
import React from "react";
import { theme } from "../../theme";
import { Menu } from "@mui/icons-material";

const CustomBox = styled(Box)({
  display: { sm: "block", md: "none", lg: "none", xl: "none" },
  // position:{sm:'fixed', md:'sticky', lg:'sticky', xl:'sticky' },
});

function Navbar() {
  return (
    <Box p={2} bgcolor={"#161c24"} height={52.8} color={"whitesmoke"} borderBottom={'dashed 1px #7e8aac'} >
      <Stack
        direction="row"
        display={"flex"}
        alignItems={"center"}
        justifyContent="space-between"
      >
        <Box>{/* <Typography>LOGO</Typography> */}</Box>
        <Box>
          <Typography>LOGO</Typography>
        </Box>
        <Box></Box>
      </Stack>
    </Box>
  );
}

export default Navbar;
