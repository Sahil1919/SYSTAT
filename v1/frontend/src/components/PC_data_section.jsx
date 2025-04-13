import { Box } from "@mui/material";
import React from "react";
import Active_inActive_switch from "./test/Active_inActive_switch";

const PC_data_section = ({selectedTab }) => {
  return (
    <Box
      bgcolor={"#161c24"}
      color={"whitesmoke"}
      p={2}
      flex={{ xs: 6, sm: 6, md: 6, lg: 8 }}
    >
      {selectedTab && (
          <div>
            <p className="text-xl font-semibold py-2">Selected PC:</p>
            <p>Id = {selectedTab.id}</p>
            <p>Name = {selectedTab.name}</p>
          </div>
        )}
      {/* ActivePC */}
    </Box>
  );
};

export default PC_data_section;
