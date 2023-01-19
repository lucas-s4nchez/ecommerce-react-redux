import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  Skeleton,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  clearActiveAddress,
  clearCart,
  clearPaymentMethod,
} from "../../store/user/userSlice";
import { startAddingNewPurchase } from "../../store/user/userThunks";

export const ConfirmPayment = () => {
  const { paymentMethod, activeAddress, cart, isLoading } = useSelector(
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
        colors: element.colors,
        size: element.size,
        price: element.price,
        waitingToReceiveRating: true,
      };
    });
    newPurchase.forEach((product) => dispatch(startAddingNewPurchase(product)));
    dispatch(clearCart());
    navigate("/purchases");
  };
  const handleCancelBuy = () => {
    dispatch(clearActiveAddress());
    dispatch(clearPaymentMethod());
    navigate("/cart");
  };
  if (isLoading) {
    return <Skeleton width="100%" height={400} />;
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
            ? ` Tarjeta termina en ${paymentMethod.number
                .split("")
                .splice(12)
                .join("")}`
            : ` ${paymentMethod.name}`}
        </Typography>
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column-reverse", sm: "row" },
          justifyContent: "flex-end",
          width: "100%",
          gap: 2,
          marginTop: 2,
        }}
      >
        <Button variant="outlined" onClick={() => navigate(-1)}>
          Volver
        </Button>
        <Box
          sx={{
            display: "flex",
            gap: 2,
          }}
        >
          <Button
            variant="contained"
            onClick={handleCancelBuy}
            sx={{ width: { xs: "100%", sm: "max-content" } }}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            color="success"
            disabled={!paymentMethod}
            onClick={handleCompleteBuy}
            sx={{ width: { xs: "100%", sm: "max-content" } }}
          >
            Confirmar
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
