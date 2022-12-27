import { CssBaseline, ThemeProvider } from "@mui/material";
import { myTheme } from "./myTheme";

export const Theme = ({ children }) => {
  return (
    <ThemeProvider theme={myTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
