import { useState } from "react";
import { useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { AppBar, Badge, Box, IconButton, Link, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { Menu } from "../menu/Menu";

export const Navbar = () => {
  const { totalItemsInCart } = useSelector((state) => state.user);
  const [openMenu, setOpenMenu] = useState(false);

  const handleOpenMenu = () => {
    setOpenMenu(!openMenu);
  };
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "secondary.main",
          }}
        >
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "95%",
              maxWidth: "1200px",
              paddingLeft: 0,
              paddingRight: 0,
              gap: "10px",
            }}
          >
            <RouterLink to="/">
              <Box sx={{ width: "120px", height: "100%", display: "flex" }}>
                <img src="../logo-white.svg" width="100%" />
              </Box>
            </RouterLink>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Link component={RouterLink} to="/search" color="inherit">
                <IconButton
                  size="large"
                  color="inherit"
                  aria-label="Buscar un producto"
                  sx={{ padding: { xs: "5px", sm: "12px" } }}
                >
                  <SearchIcon />
                </IconButton>
              </Link>

              <Link component={RouterLink} to="/cart" color="inherit">
                <IconButton
                  size="large"
                  aria-label="Ir al carrito"
                  color="inherit"
                  sx={{ padding: { xs: "5px", sm: "12px" } }}
                >
                  <Badge badgeContent={totalItemsInCart} color="error">
                    <ShoppingBagIcon />
                  </Badge>
                </IconButton>
              </Link>
              <IconButton
                size="large"
                color="inherit"
                aria-label="Abrir Menú"
                onClick={handleOpenMenu}
                sx={{ padding: { xs: "5px", sm: "12px" } }}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      <Menu openMenu={openMenu} handleOpenMenu={handleOpenMenu} />
    </>
  );
};
