import {
  Box,
  Button,
  Chip,
  Divider,
  Drawer,
  FormControlLabel,
  ImageList,
  ImageListItem,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Switch,
  Typography,
  styled,
} from "@mui/material";
import {
  Analytics,
  Article,
  Computer,
  Dvr,
  Groups3,
  Home,
  Menu,
  Person,
} from "@mui/icons-material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { theme } from "../../theme";
import logo from "../assets/logo.svg";

const listItems = [
  {
    id: 1,
    text: "Dashboard",
    textmin: "DashBD",
    icon: <Analytics />,
  },
  {
    id: 2,
    text: "ActivePC",
    textmin: "ActPC",
    icon: <Dvr />,
  },
  {
    id: 3,
    text: "About",
    textmin: "About",
    icon: <Groups3 />,
  },
  {
    id: 4,
    text: "Documentation",
    textmin: "Doc",
    icon: <Article />,
  },
];

const SidebarWidth = 200;
const SidebarMinimizedWidth = 80;

const screenWidth = window.innerWidth;

function Sidebar({ setMode, mode }) {
  const [state, setState] = useState(false);
  const [active, setActive] = useState(1);

  return (
    <Box
      sx={{
        bgcolor: "#161c24",
        color: "whitesmoke",
        width: {
          xs: SidebarMinimizedWidth,
          sm: SidebarMinimizedWidth,
          md: SidebarMinimizedWidth,
          lg: SidebarWidth,
        },
        transition: "width 0.5s",
      }}
    >
      <Stack sx={{}}>
        <List
          sx={{
            height: "100vh",
            borderRight: "dashed 1px #7e8aac",
          }}
        >
          <Box
            p={1.25}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <ImageList
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ImageListItem
                sx={{
                  height: {xs:30, sm: 30, md: 30, lg: 35, xl: 35 },
                  width: {xs:30, sm: 30, md: 30, lg: 35, xl: 35 },
                  mr:1
                }}
              >
                <img src={logo} alt="" />
              </ImageListItem>
              <Typography
                variant="h6"
                sx={{
                  color: "#3fb790",
                  display: {
                    xs: "none",
                    sm: "none",
                    md: "none",
                    lg: "block",
                    xl: "block",
                  },
                }}
              >
                LOGO
              </Typography>
            </ImageList>
          </Box>
          <Divider variant="middle" sx={{ backgroundColor: "#3fb790" }} />
          {listItems.map((item) => (
            <ListItem key={item.id}>
              <ListItemButton
                component={Link}
                to={item.text}
                sx={{
                  display: "flex",
                  flexDirection: {
                    xs: "column",
                    sm: "column",
                    md: "column",
                    lg: "row",
                  },

                  px: 2,
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: { sm: 0, md: 0, lg: 1, xl: 1 },
                  color: "#919eab",
                  backgroundColor: "transparent",
                  borderRadius: "12px",
                  ...(item.id === active && {
                    backgroundColor: "#3fb79040",
                    color: "#3fb790",
                    "&:hover": {
                      backgroundColor: "#3fb79060",
                    },
                  }),
                }}
                onClick={() => {
                  setActive(item.id);
                }}
              >
                <ListItemIcon
                  sx={{
                    color: item.id === active ? "#3fb790" : "#919eab",
                    minWidth: "0",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  component={Typography}
                  primary={item.text}
                  sx={{
                    scale: {
                      xs: 0.8,
                      sm: 0.8,
                      md: 0.8,
                      lg: 1,
                      xl: 1,
                    },
                    display: {
                      xs: "none",
                      sm: "none",
                      md: "none",
                      lg: "block",
                      xl: "block",
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Stack>
    </Box>
  );
}

export default Sidebar;
