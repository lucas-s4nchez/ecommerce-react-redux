import { Box, Link, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export const ShopSection = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: 2,
        marginBlock: 5,
      }}
    >
      <Box width="100%">
        <Link sx={{ textDecoration: "none" }} component={RouterLink} to="/mens">
          <Box
            sx={{
              borderRadius: 1,
              height: "150px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundImage:
                "linear-gradient(to left, #000000cc 100%, #000000cc 100%), url(https://i.ibb.co/MnHt5t9/paul-volkmer-upd-W-QUcc-FE-unsplash-1.webp)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <Typography
              variant="h6"
              sx={{ color: "white.cream", textTransform: "uppercase" }}
            >
              Hombres
            </Typography>
          </Box>
        </Link>
      </Box>
      <Box width="100%">
        <Link
          sx={{ textDecoration: "none" }}
          component={RouterLink}
          to="/womens"
        >
          <Box
            sx={{
              borderRadius: 1,
              height: "150px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundImage:
                "linear-gradient(to left, #000000cc 100%, #000000cc 100%), url(https://i.ibb.co/CwR6yj3/kelsey-k-a-7-TZ6-FJZ1-U-unsplash.webp)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <Typography
              variant="h6"
              sx={{ color: "white.cream", textTransform: "uppercase" }}
            >
              Mujeres
            </Typography>
          </Box>
        </Link>
      </Box>
      <Box width="100%">
        <Link sx={{ textDecoration: "none" }} component={RouterLink} to="/kids">
          <Box
            sx={{
              borderRadius: 1,
              height: "150px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundImage:
                "linear-gradient(to left, #000000cc 100%, #000000cc 100%), url(https://i.ibb.co/WFVtqkk/julian-hochgesang-z2-Jrye-B-ac-unsplash.webp)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <Typography
              variant="h6"
              sx={{ color: "white.cream", textTransform: "uppercase" }}
            >
              Niños
            </Typography>
          </Box>
        </Link>
      </Box>
    </Box>
  );
};
