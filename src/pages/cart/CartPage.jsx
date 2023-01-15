import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { formatPrice } from "../../helpers/formatPrice";
import { CartItem } from "./CartItem";
import { CartContainerStyled } from "./CartPageStyles";

export const CartPage = () => {
  const { isLoading, cart, totalToPay } = useSelector((state) => state.user);

  if (isLoading) {
    return <h1>Cargando...</h1>;
  }
  return (
    <Box sx={{ display: "flex", minHeight: "100vh", gap: 2, marginBottom: 5 }}>
      <CartContainerStyled>
        {!cart.length && <h1>Tu carrito esta vacio</h1>}
        {cart.map((product) => {
          return <CartItem key={product.id} {...product} />;
        })}
        <Box>
          <Typography sx={{ fontWeight: "bold", fontSize: "18px" }}>
            Total: {formatPrice(totalToPay)}
          </Typography>
        </Box>
      </CartContainerStyled>
    </Box>
  );
};
