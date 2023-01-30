import {
  Box,
  Button,
  Step,
  StepContent,
  StepLabel,
  Stepper,
} from "@mui/material";
import { ConfirmPayment } from "./ConfirmPayment";
import { SelectAddress } from "./SelectAddress";
import { SelectPaymentMethod } from "./SelectPaymentMethod";

export const MobileStepper = ({
  steps,
  activeStep,
  handleBack,
  handleNext,
  handleCancelBuy,
  handleCompleteBuy,
}) => {
  const { paymentMethod, activeAddress } = useSelector((state) => state.user);

  return (
    <>
      <Stepper
        orientation="vertical"
        activeStep={activeStep}
        sx={{ pt: 3, pb: 5 }}
      >
        <Step>
          <StepLabel>{steps[0]}</StepLabel>
          <StepContent>
            <SelectAddress />
          </StepContent>
        </Step>
        <Step>
          <StepLabel>{steps[1]}</StepLabel>
          <StepContent>
            <SelectPaymentMethod />
          </StepContent>
        </Step>
        <Step>
          <StepLabel>{steps[2]}</StepLabel>
          <StepContent>
            <ConfirmPayment />
          </StepContent>
        </Step>
      </Stepper>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 1,
          flexDirection: { xs: "column-reverse", sm: "row" },
        }}
      >
        {activeStep !== 0 && (
          <Button onClick={handleBack} variant="outlined">
            Volver
          </Button>
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
