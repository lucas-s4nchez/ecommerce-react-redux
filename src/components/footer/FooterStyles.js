import { Typography } from "@mui/material";
import { styled } from "@mui/system";

export const FooterContainerStyled = styled("div")(({ theme }) => ({
  display: "grid",
  paddingBlock: "50px",
  gap: "20px",
  [theme.breakpoints.up("sm")]: {
    gridTemplateColumns: "repeat(2, 1fr)",
  },
  [theme.breakpoints.up("lg")]: {
    gridTemplateColumns: "repeat(4, 1fr)",
  },
}));
export const FooterItemContainerStyled = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  color: theme.palette.white.cream,
}));
export const FooterItemTitleStyled = styled(Typography)(({ theme }) => ({
  fontSize: 20,
  position: "relative",
  display: "block",
  marginBottom: "20px",
  "&::after": {
    content: '""',
    width: "12%",
    height: "2px",
    background: theme.palette.primary.main,
    position: " absolute",
    bottom: "-4px",
    left: "0px",
  },
}));
export const FooterCopyrightStyled = styled(Typography)(({ theme }) => ({
  color: theme.palette.white.cream,
  margin: 0,
  padding: "20px 0",
  textAlign: "center",
}));
