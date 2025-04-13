import { Article, Computer, Home, Menu, Person } from "@mui/icons-material";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@mui/material";
import React, { useState } from "react";

const SidebarWidth = 240;
const SidebarMinimizedWidth = 80;

const listItems = [
  {
    text: "Dashboard",
    textmin: "DashBD",
    icon: <Home />,
  },
  {
    text: "ActivePC",
    textmin: "ActPC",
    icon: <Computer />,
  },
  {
    text: "About",
    textmin: "About",
    icon: <Person />,
  },
  {
    text: "Documentation",
    textmin: "Doc",
    icon: <Article />,
  },
];

const docItems = [

];

const CollapseBar = () => {
  const [open, setOpen] = useState(SidebarWidth);

  return (
    <Box
      sx={{
        width: {
          sm: SidebarMinimizedWidth,
          md: SidebarMinimizedWidth,
          lg: SidebarWidth,
        },
      }}
    >
      <Stack sx={{}}>
        <List sx={{ bgcolor: "#161c24", color: "whitesmoke", height: "100vh" }}>
          {listItems.map((item, index) => (
            <ListItem key={index}>
              <ListItemButton
                sx={{
                  display: "flex",
                  flexDirection: { sm: "column", md: "column", lg: "row" },
                  alignItems: "center",
                  justifyContent: "center",
                  gap: { sm: 0, md: 0, lg: 2 },
                }}
              >
                <ListItemIcon sx={{ color: "whitesmoke", minWidth: "0" }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText sx={{}} primary={`${item.text}`} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Stack>
    </Box>
  );
};

export default CollapseBar;
