import { Box, Skeleton } from "@mui/material";

export const FavoritesButtonSkeleton = () => {
  return (
    <Skeleton
      variant="rectangular"
      width={150}
      height={36}
      sx={{ alignSelf: "flex-end" }}
    />
  );
};
export const FavoritesItemsSkeleton = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Skeleton
        variant="rectangular"
        sx={{ width: "100%", height: { xs: 363, sm: 246 } }}
      />
      <Skeleton
        variant="rectangular"
        sx={{ width: "100%", height: { xs: 363, sm: 246 } }}
      />
      <Skeleton
        variant="rectangular"
        sx={{ width: "100%", height: { xs: 363, sm: 246 } }}
      />
    </Box>
  );
};
