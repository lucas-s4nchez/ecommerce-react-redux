import { Grid } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";
import RouterBreadcrumbs from "../components/breadcrumbs/Breadcrumbs";
import { Navbar } from "../components/navbar/Navbar";
import { Wrapper } from "../styles/Wrapper";

export const Layout = ({ children }) => {
  const location = useLocation();

  return (
    <>
      <Navbar />
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{
          minHeight: "100vh",
          backgroundColor: "background",
        }}
      >
        <Wrapper>
          {location.pathname !== "/" && <RouterBreadcrumbs />}
          {children}
        </Wrapper>
      </Grid>
    </>
  );
};
