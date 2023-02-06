import { Link as RouterLink } from "react-router-dom";
import { Box, Button, Link, Paper, Typography } from "@mui/material";

export const HeroItem = () => {
  return (
    <Paper
      sx={{
        height: { xs: "60vh", md: "45vh" },
        padding: 2,
        backgroundImage: `url(https://i.ibb.co/tmm6W37/hero.webp)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "max-content",
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          justifyContent: "center",
        }}
      >
        <Typography
          sx={{ fontSize: { xs: 24, sm: 30 }, textTransform: "uppercase" }}
        >
          hasta
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: 30, sm: 50 },
            textTransform: "uppercase",
            color: "primary.main",
          }}
        >
          30% Off
        </Typography>

        <Button
          variant="contained"
          sx={{
            padding: 0,
          }}
        >
          <Link
            to="/offers"
            component={RouterLink}
            sx={{
              padding: 1,
              color: "white.cream",
              textDecoration: "none",
            }}
          >
            Comprar
          </Link>
        </Button>
      </Box>
    </Paper>
  );
};
