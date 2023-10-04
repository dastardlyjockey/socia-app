import React, { useEffect, useMemo } from "react";
import {
  Box,
  createTheme,
  PaletteMode,
  ThemeProvider,
  useMediaQuery,
} from "@mui/material";
import Navbar from "@/components/Navbar";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { themeSettings } from "@/themes/theme";
import { useRouter } from "next/router";
import UserWidget from "@/widgets/UserWidget";

// export function useAuth() {
//   const token = useSelector((state: RootState) => state.token);
//   const router = useRouter();
//
//   useEffect(() => {
//     if (!token) {
//       router.push("/");
//     }
//   }, [token, router]);
// }
const HomePage = () => {
  const isToken = Boolean(useSelector((state: RootState) => state.token));
  const router = useRouter();
  if (!isToken) {
    router.push("/");
  }

  const modeString = useSelector((state: RootState) => state.mode);
  const mode: PaletteMode = modeString === "dark" ? "dark" : "light";
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const user = useSelector((state: RootState) => state.user);
  return (
    <Box>
      <ThemeProvider theme={theme}>
        <Navbar />
        <UserWidget userId={user?._id} picturePath={user?.picturePath} />
      </ThemeProvider>
    </Box>
  );
};

export default HomePage;
