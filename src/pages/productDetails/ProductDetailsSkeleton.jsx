import { Skeleton } from "@mui/material";
import {
  ProductImageContainerStyled,
  ProductImagesListStyled,
} from "./ProductDetailsStyles";

export const ProductDetailsActionsSkeleton = () => {
  return (
    <Skeleton
      variant="circular"
      width={30}
      height={30}
      sx={{ alignSelf: "flex-end" }}
    />
  );
};

export const ProductImagesListSkeleton = () => {
  return (
    <ProductImagesListStyled>
      <Skeleton variant="rectangular" width={80} height={80} />
      <Skeleton variant="rectangular" width={80} height={80} />
      <Skeleton variant="rectangular" width={80} height={80} />
      <Skeleton variant="rectangular" width={80} height={80} />
    </ProductImagesListStyled>
  );
};

export const ProductImageContainerSkeleton = () => {
  return (
    <ProductImageContainerStyled>
      <Skeleton
        sx={{
          width: "100%",
          height: { xs: 300, sm: 400 },
        }}
      />
    </ProductImageContainerStyled>
  );
};
