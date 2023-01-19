import { Box, Skeleton } from "@mui/material";

export const PurchasesItemsSkeleton = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Skeleton variant="rectangular" sx={{ width: "100%", height: 200 }} />
      <Skeleton variant="rectangular" sx={{ width: "100%", height: 200 }} />
      <Skeleton variant="rectangular" sx={{ width: "100%", height: 200 }} />
    </Box>
  );
};
