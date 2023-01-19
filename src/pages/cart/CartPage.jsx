import { Alert, Box, Button, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RouterBreadcrumbs } from "../../components/breadcrumbs/Breadcrumbs";
import { formatPrice } from "../../helpers/formatPrice";
import { CartItem } from "./CartItem";
import { CartItemsSkeleton } from "./CartPageSkeletonLoader";
import { CartContainerStyled } from "./CartPageStyles";

export const CartPage = () => {
  const { isLoading, cart, totalToPay } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleBuying = () => {
    navigate("/buying/selectAddress", { replace: true });
  };

  return (
    <>
      <RouterBreadcrumbs />
      <Box
        sx={{ display: "flex", minHeight: "100vh", gap: 2, marginBottom: 5 }}
      >
        <CartContainerStyled>
          {isLoading ? (
            <CartItemsSkeleton />
          ) : cart.length < 1 ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                padding: 3,
                alignItems: "center",
                gap: 1,
              }}
            >
              <Typography>Tu carrito está vacío</Typography>
              <Typography sx={{ fontSize: "14px", textAlign: "center" }}>
                ¿No sabés qué comprar? ¡increíbles ofertas te esperan!
              </Typography>
              <Button variant="contained" onClick={() => navigate("/offers")}>
                Descubrir ofertas
              </Button>
            </Box>
          ) : (
            cart.map((product) => {
              return <CartItem key={product.id} {...product} />;
            })
          )}
          <Box
            sx={{
              mt: 2,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              alignItems: "flex-end",
            }}
          >
            {!!cart.length && (
              <>
                <Typography sx={{ fontWeight: "bold", fontSize: "18px" }}>
                  Total: {formatPrice(totalToPay)}
                </Typography>
                <Button onClick={handleBuying} variant="contained">
                  Continuar compra
                </Button>
              </>
            )}
          </Box>
        </CartContainerStyled>
      </Box>
    </>
  );
};
