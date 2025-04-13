import { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Stack, ThemeProvider, createTheme } from "@mui/material";
import Sidebar from "./Global/Sidebar";
import Navbar from "./Global/Navbar";
import Dashboard from "./Global/Dashboard";
import { Route, Routes } from "react-router";
import About from "./pages/About";
import ActivePC from "./pages/ActivePC";
import ActivePC2 from "./pages/ActivePC2";
import CollapseBar from "./components/test/collapseBar";

function App() {
  const [mode, setMode] = useState("light");

  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <Box>
        <Stack direction="row">
          {/* <CollapseBar/> */}
          <Sidebar mode={mode} setMode={setMode} />
          <Stack flex={6}>
            <Navbar />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/Dashboard" element={<Dashboard />} />
              <Route path="/ActivePC" element={<ActivePC2/>} />
              <Route path="/About" element={<About />} />
              <Route path="/Documentation" element={<About />} />
            </Routes>
          </Stack>
        </Stack>
      </Box>
    </ThemeProvider>
  );
}

export default App;
