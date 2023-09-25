import React, { useMemo } from "react";
import { Box, createTheme, PaletteMode, ThemeProvider } from "@mui/material";
import Navbar from "@/components/Navbar";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { themeSettings } from "@/themes/theme";
const HomePage = () => {
  const modeString = useSelector((state: RootState) => state.mode);
  const mode: PaletteMode = modeString === "dark" ? "dark" : "light";
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <Box>
      <ThemeProvider theme={theme}>
        <Navbar />
      </ThemeProvider>
    </Box>
  );
};

export default HomePage;
