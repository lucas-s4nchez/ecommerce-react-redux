import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { Box, Divider, Typography } from "@mui/material";
import { formatPrice } from "../../helpers";

export const BuyingPage = () => {
  const { totalToPay } = useSelector((state) => state.user);
  return (
    <Box sx={{ minHeight: "80vh" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "white.main",
          borderRadius: "10px",
          marginBlock: 5,
        }}
      >
        <Outlet />

        <Divider />
        <Box sx={{ padding: 2 }}>
          <Typography sx={{ fontWeight: "bolder" }}>
            Pagás {formatPrice(totalToPay)}
          </Typography>
          <Typography sx={{ color: "green.main" }}>Envío Gratis</Typography>
        </Box>
      </Box>
    </Box>
  );
};
