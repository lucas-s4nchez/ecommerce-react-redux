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
  Avatar,
} from "@mui/material";

import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import MaleOutlinedIcon from "@mui/icons-material/MaleOutlined";
import FemaleOutlinedIcon from "@mui/icons-material/FemaleOutlined";
import ChildCareOutlinedIcon from "@mui/icons-material/ChildCareOutlined";

import { MenuItem } from "../menuItem/MenuItem";
import { startLogout } from "../../store/auth/authThunks";

const drawerWidth = 300;

export const Menu = (props) => {
  const { window, openMenu, handleOpenMenu } = props;
  const { status, displayName, photoURL } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  // const firstLetterUser = useMemo(() => displayName.charAt(0), [displayName]);
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
                padding: "12px 16px 32px 16px",
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
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Box
                  sx={{
                    backgroundColor: "background",
                    textAlign: "center",
                  }}
                >
                  {isAuthenticated ? (
                    photoURL !== null ? (
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
                    )
                  ) : (
                    <AccountCircleOutlinedIcon sx={{ fontSize: "56px" }} />
                  )}
                </Box>
                <Box>
                  <Typography>Bienvenid@,</Typography>
                  <Typography sx={{ fontSize: "20px" }}>
                    {!!displayName && `${displayName}`}
                  </Typography>
                </Box>
              </Box>
              {!isAuthenticated && (
                <Typography sx={{ fontSize: "14px" }}>
                  Ingresa a tu cuenta para ver tus compras, favoritos, etc.
                </Typography>
              )}
              {!isAuthenticated && (
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
                      <MenuItem
                        redirectTo={"/login"}
                        text="Ingresá"
                        color="white.cream"
                        activeColor="white.cream"
                        padding="8px"
                      >
                        <LoginOutlinedIcon sx={{ fontSize: 24 }} />
                      </MenuItem>
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
                    <ListItemButton
                      sx={{ padding: 0 }}
                      onClick={handleOpenMenu}
                    >
                      <MenuItem
                        redirectTo={"/register"}
                        text="Resgistrate"
                        color="primary.main"
                        activeColor="primary.main"
                        padding="8px"
                      >
                        <PersonAddAltOutlinedIcon sx={{ fontSize: 24 }} />
                      </MenuItem>
                    </ListItemButton>
                  </ListItem>
                </List>
              )}
            </Box>
            <Divider />
            <List>
              <ListItem sx={{ padding: 0 }}>
                <ListItemButton sx={{ padding: 0 }} onClick={handleOpenMenu}>
                  <MenuItem redirectTo={"/"} text="Inicio">
                    <HomeOutlinedIcon sx={{ fontSize: 30 }} />
                  </MenuItem>
                </ListItemButton>
              </ListItem>

              {isAuthenticated && (
                <>
                  <ListItem sx={{ padding: 0 }}>
                    <ListItemButton
                      sx={{ padding: 0 }}
                      onClick={handleOpenMenu}
                    >
                      <MenuItem redirectTo={"/purchases"} text="Mis compras">
                        <ShoppingBagOutlinedIcon sx={{ fontSize: 30 }} />
                      </MenuItem>
                    </ListItemButton>
                  </ListItem>

                  <ListItem sx={{ padding: 0 }}>
                    <ListItemButton
                      sx={{ padding: 0 }}
                      onClick={handleOpenMenu}
                    >
                      <MenuItem redirectTo={"/favorites"} text="Favoritos">
                        <FavoriteBorderOutlinedIcon sx={{ fontSize: 30 }} />
                      </MenuItem>
                    </ListItemButton>
                  </ListItem>
                </>
              )}

              <ListItem sx={{ padding: 0 }}>
                <ListItemButton sx={{ padding: 0 }} onClick={handleOpenMenu}>
                  <MenuItem redirectTo={"/mens"} text="Hombres">
                    <MaleOutlinedIcon sx={{ fontSize: 30 }} />
                  </MenuItem>
                </ListItemButton>
              </ListItem>

              <ListItem sx={{ padding: 0 }}>
                <ListItemButton sx={{ padding: 0 }} onClick={handleOpenMenu}>
                  <MenuItem redirectTo={"/womens"} text="Mujeres">
                    <FemaleOutlinedIcon sx={{ fontSize: 30 }} />
                  </MenuItem>
                </ListItemButton>
              </ListItem>

              <ListItem sx={{ padding: 0 }}>
                <ListItemButton sx={{ padding: 0 }} onClick={handleOpenMenu}>
                  <MenuItem redirectTo={"/kids"} text="Niños">
                    <ChildCareOutlinedIcon sx={{ fontSize: 30 }} />
                  </MenuItem>
                </ListItemButton>
              </ListItem>

              <ListItem sx={{ padding: 0 }}>
                <ListItemButton sx={{ padding: 0 }} onClick={handleOpenMenu}>
                  <MenuItem redirectTo={"/offers"} text="Ofertas">
                    <LocalOfferOutlinedIcon sx={{ fontSize: 30 }} />
                  </MenuItem>
                </ListItemButton>
              </ListItem>

              <ListItem sx={{ padding: 0 }}>
                <ListItemButton sx={{ padding: 0 }} onClick={handleOpenMenu}>
                  <MenuItem redirectTo={"/featured"} text="Destacados">
                    <StarBorderOutlinedIcon sx={{ fontSize: 30 }} />
                  </MenuItem>
                </ListItemButton>
              </ListItem>

              {isAuthenticated && (
                <ListItem sx={{ padding: 0 }}>
                  <ListItemButton sx={{ padding: 0 }} onClick={handleOpenMenu}>
                    <MenuItem redirectTo={"/account"} text="Mi cuenta">
                      <ManageAccountsOutlinedIcon sx={{ fontSize: 30 }} />
                    </MenuItem>
                  </ListItemButton>
                </ListItem>
              )}

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
