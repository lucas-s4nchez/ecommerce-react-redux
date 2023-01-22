import { styled } from "@mui/system";

export const WrapperLayoutStyled = styled("div")(({ theme }) => ({
  minHeight: "80vh",
}));
export const ProductContainerStyled = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "center",
  gap: "20px",
  marginBlock: "30px",
}));
export const FiltersContainerStyled = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "end",
  gap: "20px",
}));
