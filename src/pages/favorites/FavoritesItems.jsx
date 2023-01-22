import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CardActionArea,
  Button,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { ProductNameStyled } from "../../components/card/CardProductStyles";
import { ProductPrice } from "../../components/card/CardProduct";
import { startDeletingProductFromFavorites } from "../../store/user/userThunks";
import { useState } from "react";

export const FavoritesItem = ({
  id,
  docId,
  model,
  featured,
  discount,
  images,
  price,
  gender,
  brand,
}) => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.products);

  const handleDelete = () => {
    dispatch(startDeletingProductFromFavorites(docId, id));
  };

  const setPathname = () => {
    if (featured) {
      return "/featured";
    }
    if (discount > 0) {
      return "/offers";
    }
    if (gender === "Hombre") {
      return "/mens";
    }
    if (gender === "Mujer") {
      return "/womens";
    }
    if (gender === "Niños") {
      return "/kids";
    }
  };
  return (
    <>
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
      {/* <Snackbar
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
          {`Eliminaste a "${brand} ${model}" de tus favoritos`}
        </Alert>
      </Snackbar> */}
    </>
  );
};
