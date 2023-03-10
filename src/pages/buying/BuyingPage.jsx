import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Container, Divider, Typography } from "@mui/material";
import { formatPrice } from "../../helpers";
import { useState } from "react";
import {
  clearActiveAddress,
  clearCart,
  clearPaymentMethod,
} from "../../store/user/userSlice";
import { MobileStepper } from "./MobileStepper";
import { DesktopStepper } from "./DesktopStepper";
import { startAddingNewPurchase } from "../../store/user/userThunks";

const steps = [
  "Selecciona tu domicilio",
  "Selecciona el método de pago",
  "Confirmar compra",
];

export const BuyingPage = () => {
  const { totalToPay, cart } = useSelector((state) => state.user);
  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleCompleteBuy = () => {
    const newPurchase = cart.map((element) => {
      const currentProduct = {
        ...products.find((product) => product.id === element.productId),
      };
      const newProduct = {
        ...currentProduct,
        stock: currentProduct.stock - element.quantity,
        sold: currentProduct.sold + element.quantity,
      };
      const newPurchase = {
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
      return { purchase: newPurchase, product: newProduct };
    });
    newPurchase.forEach((product) => dispatch(startAddingNewPurchase(product)));
    dispatch(clearCart());
    navigate("/purchases");
  };
  const handleCancelBuy = () => {
    setActiveStep(0);
    dispatch(clearActiveAddress());
    dispatch(clearPaymentMethod());
    navigate("/cart");
  };

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
        <Container component="main" sx={{ mb: 4 }}>
          <Box sx={{ my: { xs: 3, md: 6 }, p: { xs: 0, md: 3 } }}>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <DesktopStepper
                steps={steps}
                activeStep={activeStep}
                handleBack={handleBack}
                handleNext={handleNext}
                handleCancelBuy={handleCancelBuy}
                handleCompleteBuy={handleCompleteBuy}
              />
            </Box>
            <Box sx={{ display: { xs: "block", sm: "none" } }}>
              <MobileStepper
                steps={steps}
                activeStep={activeStep}
                handleBack={handleBack}
                handleNext={handleNext}
                handleCancelBuy={handleCancelBuy}
                handleCompleteBuy={handleCompleteBuy}
              />
            </Box>
          </Box>
        </Container>

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
