import { Grid } from "@mui/material";
import React from "react";
import { Navbar } from "../components/navbar/Navbar";
import { Wrapper } from "../styles/Wrapper";

export const Layout = ({ children }) => {
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
        <Wrapper>{children}</Wrapper>
      </Grid>
    </>
  );
};
