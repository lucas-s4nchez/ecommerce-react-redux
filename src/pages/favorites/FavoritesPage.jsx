import { useDispatch, useSelector } from "react-redux";
import { Button, Box, Typography } from "@mui/material";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import { startDeletingAllProductsFromFavorites } from "../../store/user/userThunks";
import { FavoritesItem } from "./FavoritesItems";
import {
  FavoritesButtonSkeleton,
  FavoritesItemsSkeleton,
} from "./FavoritesSkeletonLoader";
import { RouterBreadcrumbs } from "../../components/breadcrumbs/Breadcrumbs";
import { useNavigate } from "react-router-dom";

export const FavoritesPage = () => {
  const { isLoading, favorites } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleDeleteAll = () => {
    dispatch(startDeletingAllProductsFromFavorites());
  };
  return (
    <>
      <RouterBreadcrumbs />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          gap: 2,
          marginBottom: 5,
        }}
      >
        {isLoading && (
          <FavoritesButtonSkeleton sx={{ alignSelf: "flex-end" }} />
        )}
        {favorites.length >= 1 && (
          <Button onClick={handleDeleteAll} sx={{ alignSelf: "flex-end" }}>
            Eliminar Todos <DeleteForeverIcon />
          </Button>
        )}
        {isLoading ? (
          <FavoritesItemsSkeleton />
        ) : favorites.length < 1 ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: 3,
              alignItems: "center",
              gap: 1,
            }}
          >
            <Typography>Tu lista de favoritos está vacía</Typography>
            <Typography sx={{ fontSize: "14px", textAlign: "center" }}>
              Échale un vistazo a nuestros productos mas destacados
            </Typography>
            <Button variant="contained" onClick={() => navigate("/featured")}>
              Ir a productos destacados
            </Button>
          </Box>
        ) : (
          favorites.map((item) => {
            return <FavoritesItem key={item.id} {...item} />;
          })
        )}
      </Box>
    </>
  );
};
