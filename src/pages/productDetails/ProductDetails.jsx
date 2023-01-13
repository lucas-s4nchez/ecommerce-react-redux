import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import { ProductContainerStyled } from "./ProductDetailsStyles";

import { ProductImage } from "./ProductImage";
import { ProductContent } from "./ProductContent";

export const ProductDetails = () => {
  const { products, isLoading } = useSelector((state) => state.products);
  const { id } = useParams();
  const product = useMemo(
    () => products.find((product) => product.id === id),
    [id, products]
  );

  return (
    <ProductContainerStyled>
      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}>
        <ProductImage product={product} />
        <ProductContent product={product} id={id} />
      </Box>
    </ProductContainerStyled>
  );
};
