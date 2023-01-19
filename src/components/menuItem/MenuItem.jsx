import { NavLink as RouterLink } from "react-router-dom";
import { Link, Typography } from "@mui/material";

export const MenuItem = ({
  children,
  redirectTo,
  text,
  color = "secondary.main",
  activeColor = "primary.main",
  padding = "8px 16px",
}) => {
  return (
    <Link
      to={redirectTo}
      component={RouterLink}
      sx={{
        padding: padding,
        minWidth: "100%",
        textDecoration: "none",
        display: "flex",
        alignItems: "center",
        gap: 1,
        width: "100%",
        color: color,
        "&.active": {
          color: activeColor,
        },
      }}
    >
      {children}
      <Typography
        sx={{
          width: "100%",
          textAlign: "start",
          textTransform: "none",
          display: "flex",
          alignItems: "center",
        }}
      >
        {text}
      </Typography>
    </Link>
  );
};
