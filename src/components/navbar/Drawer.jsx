import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Drawer,
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  Toolbar,
  Typography,
} from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

import { startLogout } from "../../store/auth/authThunks";
import { LinkItem } from "./LinkItem";

const drawerWidth = 240;

export const DrawerResponsive = (props) => {
  const { window, openMenu, handleOpenMenu } = props;
  const { status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const isAuthenticated = useMemo(() => status === "authenticated", [status]);

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const onLogout = () => {
    dispatch(startLogout());
    handleOpenMenu();
  };

  return (
    <Box sx={{ display: openMenu ? "flex" : "none" }}>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
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
          <div>
            <Toolbar />
            <Divider />
            <List>
              <ListItem sx={{ padding: 0 }}>
                <ListItemButton sx={{ padding: 0 }} onClick={handleOpenMenu}>
                  <LinkItem redirectTo={"/"} text="Inicio">
                    <HomeOutlinedIcon sx={{ fontSize: 30 }} />
                  </LinkItem>
                </ListItemButton>
              </ListItem>

              <ListItem sx={{ padding: 0 }}>
                <ListItemButton sx={{ padding: 0 }} onClick={handleOpenMenu}>
                  <LinkItem redirectTo={"/purchases"} text="Mis compras">
                    <ShoppingBagOutlinedIcon sx={{ fontSize: 30 }} />
                  </LinkItem>
                </ListItemButton>
              </ListItem>

              <ListItem sx={{ padding: 0 }}>
                <ListItemButton sx={{ padding: 0 }} onClick={handleOpenMenu}>
                  <LinkItem redirectTo={"/favorites"} text="Favoritos">
                    <FavoriteBorderOutlinedIcon sx={{ fontSize: 30 }} />
                  </LinkItem>
                </ListItemButton>
              </ListItem>

              <ListItem sx={{ padding: 0 }}>
                <ListItemButton sx={{ padding: 0 }} onClick={handleOpenMenu}>
                  <LinkItem redirectTo={"/offers"} text="Ofertas">
                    <LocalOfferOutlinedIcon sx={{ fontSize: 30 }} />
                  </LinkItem>
                </ListItemButton>
              </ListItem>

              <ListItem sx={{ padding: 0 }}>
                <ListItemButton sx={{ padding: 0 }} onClick={handleOpenMenu}>
                  <LinkItem redirectTo={"/account"} text="Mi cuenta">
                    <AccountCircleOutlinedIcon sx={{ fontSize: 30 }} />
                  </LinkItem>
                </ListItemButton>
              </ListItem>

              <Divider />
              {isAuthenticated ? (
                <ListItem sx={{ padding: 0 }}>
                  <ListItemButton sx={{ gap: "20px" }} onClick={onLogout}>
                    <LogoutOutlinedIcon sx={{ fontSize: 30 }} />
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
                  <ListItemButton sx={{ padding: 0 }} onClick={handleOpenMenu}>
                    <LinkItem redirectTo={"/login"} text="Iniciar sesión">
                      <LoginOutlinedIcon sx={{ fontSize: 30 }} />
                    </LinkItem>
                  </ListItemButton>
                </ListItem>
              )}
            </List>
          </div>
        </Drawer>
      </Box>
    </Box>
  );
};
