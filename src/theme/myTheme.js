import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

export const myTheme = createTheme({
  palette: {
    primary: {
      main: "#e53935",
    },
    secondary: {
      main: "#000000",
    },
    background: {
      default: "#e7e7e7",
    },
    error: {
      main: red.A400,
    },
    white: {
      main: "#FFFFFF",
      cream: "#F2F7F2",
    },
  },
});
