import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Alert,
  Box,
  Button,
  CardActions,
  IconButton,
  MenuItem,
  Rating,
  Skeleton,
  Snackbar,
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
  const { status } = useSelector((state) => state.auth);
  const { isLoading } = useSelector((state) => state.products);
  const { favorites, cart } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [messageOfNotAuthenticatedUser, setMessageOfNotAuthenticatedUser] =
    useState(false);
  const [messageAddProductToFavorites, setMessageAddProductToFavorites] =
    useState(false);
  const [messageRemoveProductToFavorites, setMessageRemoveProductToFavorites] =
    useState(false);

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

  const isAuthenticated = useMemo(() => status === "authenticated", [status]);
  const isExistingProduct = favorites.find((product) => product.id === id);

  const handleAddProductToFavorites = () => {
    if (!isAuthenticated) {
      setMessageOfNotAuthenticatedUser(true);
      return;
    }

    if (isExistingProduct) {
      dispatch(startDeletingProductFromFavorites(isExistingProduct.docId, id));
      setMessageRemoveProductToFavorites(true);
    } else {
      dispatch(startAddingProductToFavorites(id));
      setMessageAddProductToFavorites(true);
    }
  };
  const handleAddUnitProduct = () => {
    if (quantity >= product.stock) return;
    setQuantity(quantity + 1);
  };
  const handleRemoveUnitProduct = () => {
    if (quantity <= 1) return;
    setQuantity(quantity - 1);
  };
  const handleCloseMessageOfNotAuthenticatedUser = () => {
    setMessageOfNotAuthenticatedUser(false);
  };
  const handleCloseMessageAddProductToFavorites = () => {
    setMessageAddProductToFavorites(false);
  };
  const handleCloseMessageRemoveProductToFavorites = () => {
    setMessageRemoveProductToFavorites(false);
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

  const averageRating = Number(
    (
      product.reviews.reduce((acc, curr) => acc + curr.rating, 0) /
      product.reviews.length
    ).toFixed(1)
  );

  return (
    <ProductDetailsStyled>
      <Typography sx={{ fontSize: "14px", color: "GrayText" }}>
        {product.sold} vendidos
      </Typography>
      <CardActions
        disableSpacing
        sx={{ display: "flex", justifyContent: "flex-end", padding: 0 }}
      >
        {/* //alerta cuando agrega/elimina un producto a favoritos y no está autenticado */}
        <Snackbar
          open={messageOfNotAuthenticatedUser}
          autoHideDuration={6000}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          onClose={handleCloseMessageOfNotAuthenticatedUser}
        >
          <Alert
            onClose={handleCloseMessageOfNotAuthenticatedUser}
            severity="info"
            variant="filled"
            sx={{ width: "100%" }}
          >
            Para agregar un producto a favoritos, primero debes iniciar sesión
            con tu cuenta
          </Alert>
        </Snackbar>
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
        {/* //alerta cuando agrega un producto a favoritos */}
        <Snackbar
          open={messageAddProductToFavorites}
          autoHideDuration={2000}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          onClose={handleCloseMessageAddProductToFavorites}
        >
          <Alert
            onClose={handleCloseMessageAddProductToFavorites}
            severity="success"
            variant="filled"
            sx={{ width: "100%" }}
          >
            {`Agregaste a "${product.brand} ${product.model}" a tus favoritos`}
          </Alert>
        </Snackbar>
        {/* //alerta cuando elimina un producto a favoritos */}
        <Snackbar
          open={messageRemoveProductToFavorites}
          autoHideDuration={2000}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          onClose={handleCloseMessageRemoveProductToFavorites}
        >
          <Alert
            onClose={handleCloseMessageRemoveProductToFavorites}
            severity="error"
            variant="filled"
            sx={{ width: "100%" }}
          >
            {`Eliminaste a "${product.brand} ${product.model}" de tus favoritos`}
          </Alert>
        </Snackbar>
      </CardActions>
      <ProductDetailsTitleStyled>
        {`Zapatillas ${product.brand} ${product.model} ${product.version}`}
      </ProductDetailsTitleStyled>
      <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
        <Rating
          readOnly
          value={averageRating}
          size="small"
          sx={{ color: "primary.main" }}
        />
        <Typography
          sx={{ fontSize: "14px" }}
        >{`(${product.reviews.length})`}</Typography>
      </Box>
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
      <Typography variant="span" sx={{ textTransform: "capitalize", mb: 1 }}>
        {`Color: ${product.colors.toString().split(",").join("/")}`}
      </Typography>
      <ProductDetailsForm onSubmit={handleSubmit}>
        <TextField
          select
          label="Talles"
          {...getFieldProps("size")}
          error={errors.size && touched.size}
          helperText={touched.size && errors.size}
          sx={{ mb: 1 }}
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
            disabled={quantity <= 1}
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
            disabled={quantity >= product.stock}
          >
            <AddIcon />
          </IconButton>
        </Box>
        <Typography
          sx={{ fontSize: "12px", color: "GrayText", mb: 2 }}
        >{`(${product.stock} disponibles)`}</Typography>
        <Button
          type="submit"
          variant="contained"
          disabled={!isAuthenticated}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            lineHeight: "unset",
          }}
        >
          <Typography variant="span">Añadir al Carrito</Typography>
          <ShoppingBagIcon />
        </Button>
        {!isAuthenticated && (
          <Alert severity="info" variant="filled" sx={{ mt: 2 }}>
            Para agregar un producto al carrito, primero debes iniciar sesión
            con tu cuenta
          </Alert>
        )}
      </ProductDetailsForm>
    </ProductDetailsStyled>
  );
};
