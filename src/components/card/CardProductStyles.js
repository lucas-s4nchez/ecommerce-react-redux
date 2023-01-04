import { Typography } from "@mui/material";
import { styled } from "@mui/system";

export const ProductNameStyled = styled(Typography)(({ theme }) => ({
  fontSize: "18px",
  fontWeight: "bolder",
  marginBottom: "10px",
}));
export const ProductPriceStyled = styled(Typography)(({ theme }) => ({
  fontSize: "20px",
}));
export const ProductPriceWithDiscountStyled = styled(Typography)(
  ({ theme }) => ({
    fontSize: "16px",
    color: "GrayText",
    textDecoration: "line-through",
  })
);

export const ProductContainerDiscountStyled = styled("div")(({ theme }) => ({
  display: "flex",
  gap: "10px",
  alignItems: "center",
}));
export const ProductDiscountStyled = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  textTransform: "uppercase",
  backgroundColor: theme.palette.primary.main,
  borderRadius: "10px",
  padding: "5px",
  color: theme.palette.white.cream,
}));
