import {
  Avatar,
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../../store/user/userSlice";
import { startAddingNewPurchase } from "../../store/user/userThunks";

export const ConfirmPayment = () => {
  const { cards, paymentMethod, activeAddress, cart, isLoading } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (!activeAddress) {
      navigate("/buying/selectAddress");
    }
    if (!paymentMethod) {
      navigate("/buying/selectPaymentMethod");
    }
  }, []);

  const handleCompleteBuy = () => {
    const newPurchase = cart.map((element) => {
      return {
        productId: element.productId,
        image: element.image,
        brand: element.brand,
        model: element.model,
        version: element.version,
        quantity: element.quantity,
      };
    });
    newPurchase.forEach((product) => dispatch(startAddingNewPurchase(product)));
    dispatch(clearCart());
    navigate("/purchases");
  };

  if (isLoading) {
    return <h1>jiji</h1>;
  }
  return (
    <Box
      sx={{
        padding: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 2,
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
            ? ` Tarjeta termina en ${paymentMethod.number.split("").splice(12)}`
            : ` ${paymentMethod.name}`}
        </Typography>
      </Typography>
      <Button
        variant="contained"
        disabled={!paymentMethod}
        sx={{ alignSelf: "flex-end" }}
        onClick={handleCompleteBuy}
      >
        Continuar
      </Button>
    </Box>
  );
};
