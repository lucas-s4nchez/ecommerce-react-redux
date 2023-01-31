import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  Skeleton,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";

export const ConfirmPayment = () => {
  const { paymentMethod, activeAddress, cart, isLoading } = useSelector(
    (state) => state.user
  );

  if (isLoading) {
    return <Skeleton width="100%" height={400} />;
  }
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 2,
        marginBottom: 3,
      }}
    >
      <Typography sx={{ fontWeight: "bolder" }}>Completa tu compra</Typography>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {cart.map((product) => {
          return (
            <Box key={product.id}>
              <ListItem
                alignItems="flex-start"
                sx={{ alignItems: "center", gap: 1, padding: 0 }}
              >
                <ListItemAvatar>
                  <Box
                    component="img"
                    alt={product.model}
                    src={product.image}
                    sx={{ width: "70px" }}
                  />
                </ListItemAvatar>
                <Box>
                  <Typography>{`${product.brand} ${product.model} ${product.version}`}</Typography>
                  <Typography
                    sx={{
                      textTransform: "capitalize",
                      fontSize: "12px",
                      color: "GrayText",
                    }}
                  >
                    Talle: {product.size}
                  </Typography>
                  <Typography
                    sx={{
                      textTransform: "capitalize",
                      fontSize: "12px",
                      color: "GrayText",
                    }}
                  >
                    Cantidad: {product.quantity}
                  </Typography>
                </Box>
              </ListItem>
              <Divider />
            </Box>
          );
        })}
      </List>
      <Typography sx={{ fontWeight: "bolder" }}>
        Entregar en:
        <Typography sx={{ textTransform: "capitalize" }} component="span">
          {` ${activeAddress.street} ${activeAddress.streetNumber} - ${activeAddress.city}`}
        </Typography>
      </Typography>
      <Typography sx={{ fontWeight: "bolder" }}>
        Forma de pago:
        <Typography sx={{ textTransform: "capitalize" }} component="span">
          {paymentMethod.cvc
            ? ` Tarjeta termina en ${paymentMethod.number
                .split("")
                .splice(12)
                .join("")}`
            : ` ${paymentMethod.name}`}
        </Typography>
      </Typography>
    </Box>
  );
};
