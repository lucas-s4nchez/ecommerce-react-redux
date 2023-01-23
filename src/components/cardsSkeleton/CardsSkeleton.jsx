import { Box, Skeleton } from "@mui/material";

export const CardsSkeleton = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "20px",
        margin: "130px 0px 30px 0px",
      }}
    >
      <Skeleton variant="rectangular" width={250} height={368} />
      <Skeleton variant="rectangular" width={250} height={368} />
      <Skeleton variant="rectangular" width={250} height={368} />
      <Skeleton variant="rectangular" width={250} height={368} />
      <Skeleton variant="rectangular" width={250} height={368} />
      <Skeleton variant="rectangular" width={250} height={368} />
      <Skeleton variant="rectangular" width={250} height={368} />
      <Skeleton variant="rectangular" width={250} height={368} />
    </Box>
  );
};
