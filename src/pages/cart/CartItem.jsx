import {
  Box,
  Button,
  CardActions,
  CardMedia,
  Divider,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import { formatPrice } from "../../helpers/formatPrice";
import { useDispatch, useSelector } from "react-redux";
import {
  startAddingUnitToProduct,
  startDeletingProductFromCart,
  startRemoveUnitToProduct,
} from "../../store/user/userThunks";

export const CartItem = ({
  id,
  model,
  productId,
  version,
  discount,
  image,
  price,
  colors,
  brand,
  size,
  quantity,
  stock,
}) => {
  const { disabled, cart } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const cartProduct = cart.find((product) => product.id === id);

  const handleDelete = () => {
    dispatch(startDeletingProductFromCart(cartProduct.id));
  };
  const handleAddUnitProduct = () => {
    if (quantity >= stock) return;
    dispatch(
      startAddingUnitToProduct({ ...cartProduct, quantity: quantity + 1 })
    );
  };
  const handleRemoveUnitProduct = () => {
    if (quantity <= 1) return;
    dispatch(
      startRemoveUnitToProduct({ ...cartProduct, quantity: quantity - 1 })
    );
  };

  return (
    <Box sx={{ width: "100%", paddingBlock: 1 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            gap: 2,
          }}
        >
          <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
            <CardMedia
              component="img"
              height="auto"
              image={image}
              alt="Zapatilla"
              sx={{
                width: "100px",
                objectFit: "contain",
                transition: "transform .3s ease",
              }}
            />
            <Box>
              <Typography
                sx={{ fontSize: { xs: "14px", sm: "16px" } }}
              >{`${brand} ${model} ${version}`}</Typography>
              <Typography
                sx={{ fontSize: { xs: "14px", sm: "16px" }, color: "GrayText" }}
              >
                {`Color: ${colors.toString().split(",").join("/")}`}
              </Typography>
              <Typography
                sx={{ fontSize: { xs: "14px", sm: "16px" }, color: "GrayText" }}
              >{`Talle: ${size} `}</Typography>
              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  color: "green.main",
                  alignItems: "center",
                }}
              >
                <Typography sx={{ fontSize: { xs: "12px", sm: "14px" } }}>
                  Envío Gratis
                </Typography>
                <LocalShippingOutlinedIcon sx={{ fontSize: "20px" }} />
              </Box>

              <Typography>{formatPrice(price)}</Typography>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 1,
            padding: 0,
          }}
        >
          <Box>
            <IconButton
              sx={{ color: "primary.main" }}
              onClick={handleRemoveUnitProduct}
              disabled={quantity <= 1 || disabled}
            >
              <RemoveIcon />
            </IconButton>
            <TextField
              type="text"
              value={quantity}
              size="small"
              sx={{ width: "70px" }}
            />
            <IconButton
              sx={{ color: "primary.main" }}
              onClick={handleAddUnitProduct}
              disabled={quantity >= stock || disabled}
            >
              <AddIcon />
            </IconButton>
            <Typography
              sx={{ fontSize: "12px", color: "GrayText", textAlign: "center" }}
            >
              {stock} disponibles
            </Typography>
          </Box>
          <Box>
            <Typography>Subtotal: {formatPrice(quantity * price)}</Typography>
          </Box>
        </Box>
        <CardActions
          disableSpacing
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            padding: 0,
            marginBlock: 1,
          }}
        >
          <Button onClick={handleDelete}>
            Eliminar <DeleteIcon />
          </Button>
        </CardActions>
      </Box>
      <Divider />
    </Box>
  );
};
