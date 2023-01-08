import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  CardActionArea,
  Skeleton,
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
  startAddingANewProductToFavorites,
  startDeletingProductFromFavorites,
} from "../../store/user/userThunks";

const ProductPrice = ({ discount, price, isLoading }) => {
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

export const CardProduct = ({ id, model, brand, images, price, discount }) => {
  const dispatch = useDispatch();
  const { favorites } = useSelector((state) => state.user);
  const { isLoading } = useSelector((state) => state.products);

  const handleAddProductToFavorites = () => {
    const newProduct = favorites.find((product) => product.id === id);
    if (newProduct) {
      const docId = newProduct.docId;
      dispatch(startDeletingProductFromFavorites(docId, id));
      return;
    }
    dispatch(startAddingANewProductToFavorites(id));
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
      </CardActions>
      <CardActionArea
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
