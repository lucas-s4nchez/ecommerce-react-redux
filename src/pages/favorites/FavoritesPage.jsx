import { useDispatch, useSelector } from "react-redux";
import { Button, Box } from "@mui/material";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import { startDeletingAllProductsFromFavorites } from "../../store/user/userThunks";
import { FavoritesItem } from "./FavoritesItems";
import {
  FavoritesButtonSkeleton,
  FavoritesItemsSkeleton,
} from "./FavoritesSkeletonLoader";

export const FavoritesPage = () => {
  const { isLoading, favorites } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleDeleteAll = () => {
    dispatch(startDeletingAllProductsFromFavorites());
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        gap: 2,
        marginBottom: 5,
      }}
    >
      {isLoading && <FavoritesButtonSkeleton sx={{ alignSelf: "flex-end" }} />}
      {favorites.length >= 1 && (
        <Button onClick={handleDeleteAll} sx={{ alignSelf: "flex-end" }}>
          Eliminar Todos <DeleteForeverIcon />
        </Button>
      )}
      {isLoading ? (
        <FavoritesItemsSkeleton />
      ) : (
        favorites.map((item) => {
          return <FavoritesItem key={item.id} {...item} />;
        })
      )}
    </Box>
  );
};
