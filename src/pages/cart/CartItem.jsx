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
import { useState } from "react";
import { useUserStore } from "../../hooks/useUserStore";

export const CartItem = ({
  id,
  model,
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
  const {
    disabled,
    startAddingUnitToProduct,
    startDeletingProductFromCart,
    startRemoveUnitToProduct,
  } = useUserStore();

  const [newQuantity, setNewQuantity] = useState(quantity);

  const handleDelete = () => {
    startDeletingProductFromCart(id);
  };
  const handleAddUnitProduct = () => {
    if (newQuantity >= stock) return;

    setNewQuantity(newQuantity + 1);
    startAddingUnitToProduct(id, 1, size);
  };
  const handleRemoveUnitProduct = () => {
    if (newQuantity <= 1) return;

    setNewQuantity(newQuantity - 1);
    startRemoveUnitToProduct(id, 1, size);
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
              disabled={newQuantity <= 1 || disabled}
            >
              <RemoveIcon />
            </IconButton>
            <TextField
              type="text"
              value={newQuantity}
              size="small"
              sx={{ width: "70px" }}
            />
            <IconButton
              sx={{ color: "primary.main" }}
              onClick={handleAddUnitProduct}
              disabled={newQuantity >= stock || disabled}
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
            <Typography>
              Subtotal: {formatPrice(newQuantity * price)}
            </Typography>
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
