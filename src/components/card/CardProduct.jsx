import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  CardActionArea,
  Skeleton,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useSelector } from "react-redux";
import {
  ProductContainerDiscountStyled,
  ProductDiscountStyled,
  ProductNameStyled,
  ProductPriceStyled,
  ProductPriceWithDiscountStyled,
} from "./CardProductStyles";
import { formatPrice, getNewPrice } from "../../helpers/formatPrice";

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

export const CardProduct = ({ model, images, price, discount }) => {
  const { isLoading } = useSelector((state) => state.products);
  return (
    <Card sx={{ width: 250 }}>
      <CardActions
        disableSpacing
        sx={{ display: "flex", justifyContent: "flex-end" }}
      >
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
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
            <ProductNameStyled>{model}</ProductNameStyled>
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
