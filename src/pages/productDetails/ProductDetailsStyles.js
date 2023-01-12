import { styled } from "@mui/system";

export const ProductContainerStyled = styled("div")(({ theme }) => ({
  marginBlock: "30px",
  padding: "10px",
  border: "1px solid #adadad",
  borderRadius: "10px",
  display: "flex",
  flexDirection: "column",
  gap: "30px",
  backgroundColor: theme.palette.white.main,
}));
export const ProductDetailsStyled = styled("div")(({ theme }) => ({
  padding: "10px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  width: "100%",
}));
export const ProductImagesStyled = styled("div")(({ theme }) => ({
  display: "flex",
  width: "100%",
  flexDirection: "column-reverse",
  [theme.breakpoints.up("sm")]: {
    flexDirection: "row",
  },
}));
export const ProductImageContainerStyled = styled("div")(({ theme }) => ({
  width: "100%",
  height: "300px",
  [theme.breakpoints.up("sm")]: {
    height: "400px",
  },
  backgroundRepeat: "no-repeat",
  backgroundSize: "contain",
  backgroundPosition: "center center",
}));
export const ProductImagesListStyled = styled("div")(({ theme }) => ({
  display: "flex",
  [theme.breakpoints.up("sm")]: {
    flexDirection: "column",
  },
  [theme.breakpoints.down("sm")]: {
    justifyContent: "space-around",
  },
  gap: "5px",
  padding: "5px",
}));
export const ProductImagesListItemStyled = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "80px",
  height: "80px",
  [theme.breakpoints.down("sm")]: {
    maxHeight: "60px",
  },
}));
