import { Link as RouterLink, useLocation } from "react-router-dom";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  CardActionArea,
  Skeleton,
  Button,
  Rating,
  Typography,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

import { useDispatch, useSelector } from "react-redux";
import {
  ProductContainerDiscountStyled,
  ProductDiscountStyled,
  ProductNameStyled,
  ProductPriceStyled,
  ProductPriceWithDiscountStyled,
} from "./CardProductStyles";
import { formatPrice, getNewPrice } from "../../helpers/formatPrice";
import {
  startAddingProductToCart,
  startAddingProductToFavorites,
  startAddingUnitToProduct,
  startDeletingProductFromFavorites,
} from "../../store/user/userThunks";
import { useMemo, useState } from "react";

export const ProductPrice = ({ discount, price, isLoading }) => {
  return (
    <>
      {discount > 0 &&
        (isLoading ? (
          <Skeleton variant="text" sx={{ fontSize: "1.5rem" }} />
        ) : (
          <ProductPriceWithDiscountStyled>
            {formatPrice(price)}
          </ProductPriceWithDiscountStyled>
        ))}
      {discount ? (
        isLoading ? (
          <Skeleton variant="text" sx={{ fontSize: "1.5rem" }} />
        ) : (
          <ProductContainerDiscountStyled>
            <ProductPriceStyled>
              {formatPrice(getNewPrice(price, discount))}
            </ProductPriceStyled>
            <ProductDiscountStyled>{discount}% off</ProductDiscountStyled>
          </ProductContainerDiscountStyled>
        )
      ) : isLoading ? (
        <Skeleton variant="text" sx={{ fontSize: "1.5rem" }} />
      ) : (
        <ProductPriceStyled>{formatPrice(price)}</ProductPriceStyled>
      )}
    </>
  );
};

export const CardProduct = ({
  id,
  docId,
  model,
  brand,
  images,
  reviews,
  price,
  discount,
  featured,
}) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { status } = useSelector((state) => state.auth);
  const { favorites } = useSelector((state) => state.user);
  const { isLoading } = useSelector((state) => state.products);
  const [openAlert, setOpenAlert] = useState(false);

  const isAuthenticated = useMemo(() => status === "authenticated", [status]);

  const handleAddProductToFavorites = () => {
    if (!isAuthenticated) {
      setOpenAlert(true);
      return;
    }
    const isExistingProduct = favorites.find((product) => product.id === id);
    if (isExistingProduct) {
      dispatch(startDeletingProductFromFavorites(isExistingProduct.docId, id));
    } else {
      dispatch(startAddingProductToFavorites(id));
    }
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  const setPathname = () => {
    if (location.pathname === "/") {
      if (featured) {
        return "/featured";
      }
      if (discount > 0) {
        return "/offers";
      }
    } else {
      return location.pathname;
    }
  };
  const averageRating = Number(
    (
      reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length
    ).toFixed(1)
  );
  return (
    <Card sx={{ minWidth: 250, maxWidth: 250 }}>
      <CardActions
        disableSpacing
        sx={{ display: "flex", justifyContent: "flex-end" }}
      >
        <Snackbar
          open={openAlert}
          autoHideDuration={6000}
          onClose={handleCloseAlert}
        >
          <Alert
            onClose={handleCloseAlert}
            severity="info"
            variant="filled"
            sx={{ width: "100%" }}
          >
            Para agregar un producto a favoritos, primero debes iniciar sesión
            con tu cuenta
          </Alert>
        </Snackbar>
        <IconButton
          aria-label="add to favorites"
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
      <CardActionArea
        component={RouterLink}
        to={`${setPathname()}/${id}`}
        sx={{
          "&:hover img": {
            transform: "scale(1.05)",
          },
        }}
      >
        {isLoading ? (
          <Skeleton variant="rectangular" width="100%" height={194} />
        ) : (
          <CardMedia
            component="img"
            height="194"
            image={images[0]}
            alt="Zapatilla"
            sx={{
              objectFit: "contain",
              transition: "transform .3s ease",
            }}
          />
        )}

        <CardContent>
          {isLoading ? (
            <Skeleton variant="text" sx={{ fontSize: "1.5rem" }} />
          ) : (
            <>
              <ProductNameStyled>{`${brand} ${model}`}</ProductNameStyled>
              {reviews.length >= 1 && (
                <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
                  <Rating
                    name="read-only"
                    value={averageRating}
                    precision={0.1}
                    readOnly
                    size="small"
                    sx={{ color: "primary.main" }}
                  />
                  <Typography
                    sx={{ fontSize: "14px" }}
                  >{`(${reviews.length})`}</Typography>
                </Box>
              )}
            </>
          )}
          <ProductPrice
            discount={discount}
            price={price}
            isLoading={isLoading}
          />
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
