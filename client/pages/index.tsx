import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { useMemo } from "react";
import {
  createTheme,
  CssBaseline,
  PaletteMode,
  ThemeProvider,
} from "@mui/material";
import { themeSettings } from "@/themes/theme";
import Navbar from "@/components/Navbar";

export default function Home() {
  const modeString = useSelector((state: RootState) => state.mode);
  const mode: PaletteMode = modeString === "dark" ? "dark" : "light";
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <>
      <ThemeProvider theme={theme}>
        <div className={"app"}>Football</div>
      </ThemeProvider>
    </>
  );
}
