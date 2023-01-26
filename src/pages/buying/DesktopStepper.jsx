import { Box, Button, Step, StepLabel, Stepper } from "@mui/material";
import { ConfirmPayment } from "./ConfirmPayment";
import { SelectAddress } from "./SelectAddress";
import { SelectPaymentMethod } from "./SelectPaymentMethod";
import { useUserStore } from "../../hooks/useUserStore";

function getStepContent(step) {
  switch (step) {
    case 0:
      return <SelectAddress />;
    case 1:
      return <SelectPaymentMethod />;
    case 2:
      return <ConfirmPayment />;
    default:
      throw new Error("Unknown step");
  }
}

export const DesktopStepper = ({
  steps,
  activeStep,
  handleBack,
  handleNext,
  handleCancelBuy,
  handleCompleteBuy,
}) => {
  const { paymentMethod, activeAddress } = useUserStore();

  return (
    <>
      <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {getStepContent(activeStep)}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 1,
          flexDirection: { xs: "column-reverse", sm: "row" },
        }}
      >
        {activeStep !== 0 && (
          <>
            <Button onClick={handleBack} variant="outlined">
              Volver
            </Button>
          </>
        )}
        <Button onClick={handleCancelBuy} variant="contained" color="error">
          Cancelar compra
        </Button>
        {activeStep === steps.length - 1 && (
          <Button
            variant="contained"
            color="success"
            onClick={handleCompleteBuy}
          >
            Confirmar compra
          </Button>
        )}
        {activeStep === 0 && (
          <Button
            onClick={handleNext}
            variant="contained"
            color="success"
            disabled={!activeAddress}
          >
            Siguiente
          </Button>
        )}
        {activeStep === 1 && (
          <Button
            onClick={handleNext}
            variant="contained"
            color="success"
            disabled={!paymentMethod}
          >
            Siguiente
          </Button>
        )}
      </Box>
    </>
  );
};
