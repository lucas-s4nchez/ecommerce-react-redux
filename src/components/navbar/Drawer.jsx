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
  IconButton,
} from "@mui/material";

import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

import { startLogout } from "../../store/auth/authThunks";
import { LinkItem } from "./LinkItem";

const drawerWidth = 300;

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
            <Box
              sx={{
                height: "auto",
                padding: "12px 16px",
                backgroundColor: "secondary.main",
                color: "white.cream",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "end",
                  marginBottom: "10px",
                }}
              >
                <IconButton
                  onClick={handleOpenMenu}
                  sx={{ color: "white.cream", padding: 0 }}
                >
                  <CloseOutlinedIcon />
                </IconButton>
              </Box>
              <Box
                sx={{
                  height: "56px",
                  width: "56px",
                  backgroundColor: "background",
                  borderRadius: "50%",
                  float: "left",
                  marginRight: "16px",
                  textAlign: "center",
                }}
              >
                <AccountCircleOutlinedIcon sx={{ fontSize: "56px" }} />
              </Box>
              <Typography>Bienvenido!</Typography>
              <Typography sx={{ fontSize: "14px" }}>
                Ingresa a tu cuenta para ver tus compras, favoritos, etc.
              </Typography>
              <List sx={{ display: "flex", gap: 2 }}>
                <ListItem
                  sx={{
                    padding: 0,
                    backgroundColor: "primary.main",
                    borderRadius: "10px",
                  }}
                >
                  <ListItemButton
                    sx={{ padding: 0, color: "white" }}
                    onClick={handleOpenMenu}
                  >
                    <LinkItem
                      redirectTo={"/login"}
                      text="Ingresá"
                      color="white.cream"
                      activeColor="white.cream"
                      padding="8px"
                    >
                      <LoginOutlinedIcon sx={{ fontSize: 24 }} />
                    </LinkItem>
                  </ListItemButton>
                </ListItem>

                <ListItem
                  sx={{
                    padding: 0,
                    backgroundColor: "background.default",
                    borderRadius: "10px",
                    border: "1px solid",
                    borderColor: "primary.main",
                  }}
                >
                  <ListItemButton sx={{ padding: 0 }} onClick={handleOpenMenu}>
                    <LinkItem
                      redirectTo={"/register"}
                      text="Resgistrate"
                      color="primary.main"
                      activeColor="primary.main"
                      padding="8px"
                    >
                      <PersonAddAltOutlinedIcon sx={{ fontSize: 24 }} />
                    </LinkItem>
                  </ListItemButton>
                </ListItem>
              </List>
            </Box>
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
                    <ManageAccountsOutlinedIcon sx={{ fontSize: 30 }} />
                  </LinkItem>
                </ListItemButton>
              </ListItem>

              <Toolbar />
              <Divider />
              {isAuthenticated && (
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
              )}
            </List>
          </div>
        </Drawer>
      </Box>
    </Box>
  );
};
