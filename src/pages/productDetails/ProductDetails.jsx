import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Box, Divider } from "@mui/material";
import { ProductContainerStyled } from "./ProductDetailsStyles";

import { ProductImage } from "./ProductImage";
import { ProductContent } from "./ProductContent";
import { ProductDescription } from "./ProductDescription";
import { ProductReviews } from "./ProductReviews";
import { RouterBreadcrumbs } from "../../components/breadcrumbs/Breadcrumbs";

export const ProductDetails = () => {
  const { products, isLoading } = useSelector((state) => state.products);
  const { id } = useParams();
  const product = useMemo(
    () => products.find((product) => product.id === id),
    [id, products]
  );

  return (
    <>
      <RouterBreadcrumbs />
      <Box sx={{ minHeight: "80vh" }}>
        <ProductContainerStyled>
          <Box
            sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}
          >
            <ProductImage product={product} />
            <ProductContent product={product} id={id} />
          </Box>
          <Divider />
          <ProductDescription product={product} />
          <Divider />
          <ProductReviews product={product} />
        </ProductContainerStyled>
      </Box>
    </>
  );
};
