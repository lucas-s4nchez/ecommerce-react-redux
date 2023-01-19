import { Box, Paper, Typography } from "@mui/material";
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
import PaymentRoundedIcon from "@mui/icons-material/PaymentRounded";
import SwapHorizRoundedIcon from "@mui/icons-material/SwapHorizRounded";

export const ShoppingInfoSection = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: 2,
        marginBlock: 5,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          backgroundColor: "white.cream",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          alignItems: "center",
          padding: 1,
          "&:hover svg": {
            color: "primary.main",
          },
        }}
      >
        <LocalShippingRoundedIcon sx={{ fontSize: "50px" }} />
        <Typography variant="h6">Envío gratis a todo el país</Typography>
        <Typography>
          Brindamos seguimiento de tus compra, por lo que podés tener la certeza
          de que va a llegar a la dirección elegida.
        </Typography>
      </Paper>
      <Paper
        elevation={3}
        sx={{
          backgroundColor: "white.cream",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          alignItems: "center",
          padding: 1,
          "&:hover svg": {
            color: "primary.main",
          },
        }}
      >
        <PaymentRoundedIcon
          sx={{
            fontSize: "50px",
          }}
        />
        <Typography variant="h6">Métodos de pago</Typography>
        <Typography>
          Trabajamos con Mercado Pago, Rapipago, Pago fácil y con tarjetas de
          crédito, débito y prepagas!
        </Typography>
      </Paper>
      <Paper
        elevation={3}
        sx={{
          backgroundColor: "white.cream",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          alignItems: "center",
          padding: 1,
          "&:hover svg": {
            color: "primary.main",
          },
        }}
      >
        <SwapHorizRoundedIcon sx={{ fontSize: "50px" }} />
        <Typography variant="h6">Garantizamos calidad</Typography>
        <Typography>
          ¿No estás conforme con la calidad del producto? No te preocupes, te
          reponemos el producto o te devolvemos el dinero.
        </Typography>
      </Paper>
    </Box>
  );
};
