import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  AppBar,
  Badge,
  Box,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

import { Search, SearchIconWrapper, StyledInputBase } from "./NavbarStyles";

import { DrawerResponsive } from "./Drawer";
import { useSelector } from "react-redux";

export const Navbar = () => {
  const { totalItemsInCart } = useSelector((state) => state.user);
  const [openSearch, setOpenSearch] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const handleOpenSearch = () => {
    setOpenSearch(true);
    console.log(openSearch);
  };
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
                <img src="../../../public/logo-white.svg" width="100%" />
              </Box>
            </RouterLink>
            <Search open={openSearch}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
              <CancelOutlinedIcon
                sx={{
                  mr: 1,
                  ml: 1,
                  display: { sm: "none" },
                }}
                onClick={() => setOpenSearch(false)}
              />
            </Search>
            <Box
              sx={{
                display: openSearch ? "none" : "flex",
                alignItems: "center",
              }}
            >
              <IconButton
                size="large"
                color="inherit"
                aria-label="serach"
                onClick={handleOpenSearch}
                sx={{ display: { sm: "none" } }}
              >
                <SearchIcon />
              </IconButton>
              <IconButton
                size="large"
                color="inherit"
                aria-label="open drawer"
                onClick={handleOpenMenu}
              >
                <MenuIcon />
              </IconButton>
              <IconButton
                size="large"
                aria-label="show 4 new mails"
                color="inherit"
              >
                <Badge badgeContent={totalItemsInCart} color="error">
                  <ShoppingBagIcon />
                </Badge>
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      <DrawerResponsive openMenu={openMenu} handleOpenMenu={handleOpenMenu} />
    </>
  );
};
