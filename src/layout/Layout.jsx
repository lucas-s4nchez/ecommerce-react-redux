import { Grid } from "@mui/material";
import { Footer } from "../components/footer/Footer";
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
          backgroundColor: "background",
        }}
      >
        <Wrapper>{children}</Wrapper>
      </Grid>
      <Footer />
    </>
  );
};
