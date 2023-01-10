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
  price,
  discount,
  featured,
}) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { favorites, cart } = useSelector((state) => state.user);
  const { isLoading } = useSelector((state) => state.products);

  const handleAddProductToFavorites = () => {
    const isExistingProduct = favorites.find((product) => product.id === id);
    if (isExistingProduct) {
      dispatch(startDeletingProductFromFavorites(isExistingProduct.docId, id));
    } else {
      dispatch(startAddingProductToFavorites(id));
    }
  };
  const handleAddProductToCart = () => {
    const isExistingProduct = cart.find((product) => product.id === id);
    if (isExistingProduct) {
      dispatch(startAddingUnitToProduct(isExistingProduct.docId, id));
    } else {
      dispatch(startAddingProductToCart(id));
    }
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
  return (
    <Card sx={{ minWidth: 250, maxWidth: 250 }}>
      <CardActions
        disableSpacing
        sx={{ display: "flex", justifyContent: "flex-end" }}
      >
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
        <Button onClick={handleAddProductToCart}>Agregar al carrito</Button>
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
            <ProductNameStyled>{`${brand} ${model}`}</ProductNameStyled>
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
