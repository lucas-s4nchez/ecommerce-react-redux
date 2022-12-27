import { InputBase } from "@mui/material";
import { alpha, styled } from "@mui/system";

export const Search = styled("div")(({ theme, open }) => ({
  display: "flex",
  alignItems: "center",
  backgroundColor: alpha(theme.palette.white.cream, 0.15),
  ":hover": {
    backgroundColor: alpha(theme.palette.white.cream, 0.25),
  },
  borderRadius: theme.shape.borderRadius,
  width: "70%",
  [theme.breakpoints.down("sm")]: {
    display: open ? "flex" : "none",
  },
}));

export const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(1),
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: theme.palette.white.cream,
  paddingLeft: theme.spacing(1),
  width: "100%",
}));
