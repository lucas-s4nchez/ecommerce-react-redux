import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink as RouterLink } from "react-router-dom";
import {
  Drawer,
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  Toolbar,
  Link,
  Typography,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from "@mui/icons-material/Login";

import { startLogout } from "../../store/auth/authThunks";

const drawerWidth = 240;

const DrawerContent = () => {
  const { status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const isAuthenticated = useMemo(() => status === "authenticated", [status]);
  const onLogout = () => {
    dispatch(startLogout());
  };
  return (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <ListItem sx={{ padding: 0 }}>
          <ListItemButton sx={{ padding: 0 }}>
            <Link
              to={"/"}
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
              <HomeIcon sx={{ fontSize: 30 }} />
              <Typography
                sx={{
                  width: "100%",
                  textAlign: "start",
                  textTransform: "none",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                Inicio
              </Typography>
            </Link>
          </ListItemButton>
        </ListItem>

        <Divider />
        {isAuthenticated ? (
          <ListItem sx={{ padding: 0 }}>
            <ListItemButton sx={{ gap: "20px" }} onClick={onLogout}>
              <LoginIcon sx={{ fontSize: 30 }} />
              <Typography
                sx={{
                  width: "100%",
                  textAlign: "start",
                  textTransform: "none",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                Salir
              </Typography>
            </ListItemButton>
          </ListItem>
        ) : (
          <ListItem sx={{ padding: 0 }}>
            <ListItemButton sx={{ padding: 0 }}>
              <Link
                to={"/login"}
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
                <LoginIcon sx={{ fontSize: 30 }} />
                <Typography
                  sx={{
                    width: "100%",
                    textAlign: "start",
                    textTransform: "none",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  Iniciar sesión
                </Typography>
              </Link>
            </ListItemButton>
          </ListItem>
        )}
      </List>

      {/* <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
    </div>
  );
};

export const DrawerResponsive = (props) => {
  const { window, openMenu, handleOpenMenu } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: openMenu ? "flex" : "none" }}>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={openMenu}
          onClose={handleOpenMenu}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          <DrawerContent />
        </Drawer>
      </Box>
    </Box>
  );
};
