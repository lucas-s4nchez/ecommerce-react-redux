import { Button, Box, Typography } from "@mui/material";

import { FavoritesItem } from "./FavoritesItems";
import { FavoritesItemsSkeleton } from "./FavoritesSkeletonLoader";
import { RouterBreadcrumbs } from "../../components/breadcrumbs/Breadcrumbs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const FavoritesPage = () => {
  const { isLoading, favorites } = useSelector((state) => state.user);
  const navigate = useNavigate();

  return (
    <>
      <RouterBreadcrumbs />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "80vh",
          gap: 2,
          marginBottom: 5,
        }}
      >
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
