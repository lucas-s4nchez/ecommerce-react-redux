import { NavLink as RouterLink } from "react-router-dom";
import { Link, Typography } from "@mui/material";

export const LinkItem = ({ children, redirectTo, text }) => {
  return (
    <Link
      to={redirectTo}
      component={RouterLink}
      sx={{
        padding: "8px 16px",
        minWidth: "100%",
        textDecoration: "none",
        display: "flex",
        alignItems: "center",
        gap: "20px",
        width: "100%",
        color: "secondary.main",
        "&.active": {
          color: "primary.main",
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
