import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useLocation } from "react-router-dom";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CardActionArea,
  Button,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { FavoriteItemContainerStyled } from "./FavoritesPageStyles";
import { ProductNameStyled } from "../../components/card/CardProductStyles";
import { ProductPrice } from "../../components/card/CardProduct";
import { startDeletingProductFromFavorites } from "../../store/user/userThunks";

export const FavoritesItem = ({
  id,
  docId,
  model,
  featured,
  discount,
  images,
  price,
  brand,
}) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { isLoading } = useSelector((state) => state.products);

  const handleDelete = () => {
    dispatch(startDeletingProductFromFavorites(docId, id));
  };
  const setPathname = () => {
    if (location.pathname === "/favorites") {
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
    <Card sx={{ width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardActionArea
          component={RouterLink}
          to={`${setPathname()}/${id}`}
          sx={{
            display: { sm: "flex" },
            justifyContent: "flex-start",
            gap: 2,
            "&:hover img": {
              transform: "scale(1.05)",
            },
          }}
        >
          <CardMedia
            component="img"
            height="194"
            image={images[0]}
            alt="Zapatilla"
            sx={{
              width: { sm: 250 },
              objectFit: "contain",
              transition: "transform .3s ease",
            }}
          />

          <CardContent>
            <ProductNameStyled>{`${brand} ${model}`}</ProductNameStyled>

            <ProductPrice
              discount={discount}
              price={price}
              isLoading={isLoading}
            />
          </CardContent>
        </CardActionArea>
        <CardActions
          disableSpacing
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Button onClick={handleDelete}>
            Eliminar <DeleteIcon />
          </Button>
        </CardActions>
      </Box>
    </Card>
  );
};
