import { useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import {
  Avatar,
  Box,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import { RouterBreadcrumbs } from "../../components/breadcrumbs/Breadcrumbs";

export const AccountPage = () => {
  const { status, displayName, photoURL } = useSelector((state) => state.auth);
  return (
    <>
      <RouterBreadcrumbs />
      <Box sx={{ minHeight: "80vh" }}>
        <Paper
          sx={{
            with: "100%",
            maxWidth: 720,
            padding: 3,
            backgroundColor: "white.main",
            margin: "auto",
          }}
        >
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            {photoURL !== null ? (
              <Avatar
                alt={displayName}
                src={photoURL}
                sx={{ width: 56, height: 56 }}
              />
            ) : (
              <Avatar
                sx={{
                  width: 56,
                  height: 56,
                  backgroundColor: "primary.main",
                  fontSize: "30px",
                }}
              >
                {displayName?.charAt(0)}
              </Avatar>
            )}
            <Typography sx={{ fontSize: "24px", lineHeight: 1.2 }}>
              {displayName}
            </Typography>
          </Box>
        </Paper>
        <Paper
          sx={{
            with: "100%",
            maxWidth: 720,
            padding: 3,
            backgroundColor: "white.main",
            margin: "30px auto 50px auto",
          }}
        >
          <List>
            <Link
              component={RouterLink}
              sx={{ textDecoration: "none" }}
              to="/userInfo"
            >
              <ListItem sx={{ padding: 0 }}>
                <ListItemButton sx={{ padding: { xs: 1, sm: 2 } }}>
                  <ListItemText
                    primary="Mis Datos"
                    secondary="Gestioná tus datos personales"
                    sx={{ color: "secondary.light" }}
                  />
                  <ListItemIcon sx={{ justifyContent: "end" }}>
                    <ArrowForwardIosIcon />
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
            </Link>
            <Link
              component={RouterLink}
              sx={{ textDecoration: "none" }}
              to="/cards"
            >
              <ListItem sx={{ padding: 0 }}>
                <ListItemButton sx={{ padding: { xs: 1, sm: 2 } }}>
                  <ListItemText
                    primary="Mis Tarjetas"
                    secondary="Gestioná tus tarjetas"
                    sx={{ color: "secondary.light" }}
                  />
                  <ListItemIcon sx={{ justifyContent: "end" }}>
                    <ArrowForwardIosIcon />
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
            </Link>
            <Link
              component={RouterLink}
              sx={{ textDecoration: "none" }}
              to="/addresses"
            >
              <ListItem sx={{ padding: 0 }}>
                <ListItemButton sx={{ padding: { xs: 1, sm: 2 } }}>
                  <ListItemText
                    primary="Direcciones"
                    secondary="Gestioná tus direcciones"
                    sx={{ color: "secondary.light" }}
                  />
                  <ListItemIcon sx={{ justifyContent: "end" }}>
                    <ArrowForwardIosIcon />
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
            </Link>
          </List>
        </Paper>
      </Box>
    </>
  );
};
