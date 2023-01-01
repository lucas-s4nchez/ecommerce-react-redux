import { Link as RouterLink } from "react-router-dom";
import { Box, Button, Link, Paper, Typography } from "@mui/material";

export const CarouselItem = ({
  title1,
  title2,
  imgUrl,
  button,
  redirectTo,
}) => {
  return (
    <Paper
      sx={{
        height: { xs: "60vh", md: "45vh" },
        padding: 2,
        backgroundImage: `url(${imgUrl})`,
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
          {title1}
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: 30, sm: 50 },
            textTransform: "uppercase",
            color: "primary.main",
          }}
        >
          {title2}
        </Typography>
        {button && (
          <Button
            variant="contained"
            sx={{
              padding: 0,
            }}
          >
            <Link
              to={redirectTo}
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
        )}
      </Box>
    </Paper>
  );
};
