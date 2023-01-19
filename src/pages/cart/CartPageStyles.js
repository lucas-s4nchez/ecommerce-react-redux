import { styled } from "@mui/system";

export const CartContainerStyled = styled("div")(({ theme }) => ({
  padding: "10px",
  paddingBlock: "30px",
  width: "100%",
  height: "100%",
  borderRadius: "10px",
  border: "1px solid #adadad",
  backgroundColor: theme.palette.white.main,
}));
