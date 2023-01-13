import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  CardActions,
  IconButton,
  MenuItem,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import UndoOutlinedIcon from "@mui/icons-material/UndoOutlined";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  ProductDetailsForm,
  ProductDetailsGreenTextStyled,
  ProductDetailsStyled,
  ProductDetailsTitleStyled,
} from "./ProductDetailsStyles";
import { ProductPrice } from "../../components/card/CardProduct";
import {
  startAddingProductToCart,
  startAddingProductToFavorites,
  startAddingUnitToProduct,
  startDeletingProductFromFavorites,
} from "../../store/user/userThunks";
import { ProductDetailsActionsSkeleton } from "./ProductDetailsSkeleton";

export const ProductContent = ({ product, id }) => {
  const { isLoading } = useSelector((state) => state.products);
  const { favorites, cart } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const { getFieldProps, handleSubmit, errors, touched } = useFormik({
    initialValues: {
      size: "",
    },
    validationSchema: Yup.object({
      size: Yup.number().required("Por favor selecciona un talle"),
    }),
    onSubmit: (values) => {
      const isExistingProduct = cart.find(
        (cartProduct) =>
          cartProduct.productId === product.id &&
          cartProduct.size === values.size
      );
      if (isExistingProduct) {
        dispatch(
          startAddingUnitToProduct(isExistingProduct.id, quantity, values.size)
        );
      } else {
        dispatch(startAddingProductToCart(product.id, quantity, values.size));
      }
    },
  });

  const handleAddProductToFavorites = () => {
    const isExistingProduct = favorites.find((product) => product.id === id);
    if (isExistingProduct) {
      dispatch(startDeletingProductFromFavorites(isExistingProduct.docId, id));
    } else {
      dispatch(startAddingProductToFavorites(id));
    }
  };

  const handleAddUnitProduct = () => {
    setQuantity(quantity + 1);
  };
  const handleRemoveUnitProduct = () => {
    if (quantity <= 1) return;
    setQuantity(quantity - 1);
  };

  if (isLoading) {
    return (
      <ProductDetailsStyled>
        <ProductDetailsActionsSkeleton />
        <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
        <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
        <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
        <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
        <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
        <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
        <Skeleton
          variant="rectangular"
          sx={{ width: "100%", height: "56px" }}
        />
        <Skeleton
          variant="rectangular"
          sx={{ width: "100%", height: "40px" }}
        />
        <Skeleton
          variant="rectangular"
          sx={{ width: "100%", height: "36px" }}
        />
      </ProductDetailsStyled>
    );
  }

  return (
    <ProductDetailsStyled>
      <CardActions
        disableSpacing
        sx={{ display: "flex", justifyContent: "flex-end", padding: 0 }}
      >
        <IconButton
          aria-label="añadir a favoritos"
          onClick={handleAddProductToFavorites}
          title={
            favorites.find((product) => product.id === id)
              ? "Eliminar de Favoritos"
              : "Agregar a Favoritos"
          }
        >
          {favorites.find((product) => product.id === id) ? (
            <FavoriteOutlinedIcon sx={{ color: "primary.main" }} />
          ) : (
            <FavoriteBorderOutlinedIcon sx={{ color: "primary.main" }} />
          )}
        </IconButton>
      </CardActions>

      <ProductDetailsTitleStyled>
        {`Zapatillas ${product.brand} ${product.model} ${product.version}`}
      </ProductDetailsTitleStyled>
      <ProductPrice
        discount={product.discount}
        price={product.price}
        isLoading={isLoading}
      />
      <ProductDetailsGreenTextStyled>
        <LocalShippingOutlinedIcon />
        <span>Envío Gratis</span>
      </ProductDetailsGreenTextStyled>
      <ProductDetailsGreenTextStyled>
        <UndoOutlinedIcon />
        <span>Devolución Gratis</span>
      </ProductDetailsGreenTextStyled>
      <Typography variant="span" sx={{ textTransform: "capitalize" }}>
        {`Color: ${product.colors.toString().split(",").join("/")}`}
      </Typography>
      <ProductDetailsForm onSubmit={handleSubmit}>
        <TextField
          select
          label="Talles"
          {...getFieldProps("size")}
          error={errors.size && touched.size}
          helperText={touched.size && errors.size}
        >
          {product.sizes.map((size) => (
            <MenuItem key={size} value={size}>{`${size}`}</MenuItem>
          ))}
        </TextField>
        <Box>
          <Typography variant="span">Cantidad: </Typography>
          <IconButton
            sx={{ color: "primary.main" }}
            onClick={handleRemoveUnitProduct}
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
          >
            <AddIcon />
          </IconButton>
        </Box>
        <Button
          type="submit"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            lineHeight: "unset",
            backgroundColor: "primary.main",
            color: "white.cream",
            "&:hover": {
              backgroundColor: "primary.dark",
            },
          }}
        >
          <Typography variant="span">Añadir al Carrito</Typography>
          <ShoppingBagIcon />
        </Button>
      </ProductDetailsForm>
    </ProductDetailsStyled>
  );
};
