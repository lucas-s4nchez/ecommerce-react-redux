import { Box, Grid } from "@mui/material";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  ProductContainerStyled,
  ProductDetailsStyled,
  ProductImageContainerStyled,
  ProductImagesListItemStyled,
  ProductImagesListStyled,
  ProductImagesStyled,
} from "./ProductDetailsStyles";

export const ProductDetails = () => {
  const { products, isLoading } = useSelector((state) => state.products);
  const { id } = useParams();
  const product = useMemo(
    () => products.find((product) => product.id === id),
    [id, products]
  );
  const [currentImage, setCurrentImage] = useState(product.images[0]);

  const handleChangeImage = (e) => {
    setCurrentImage(e.target.src);
  };

  if (isLoading) {
    return <h1>Cargando...</h1>;
  }

  return (
    <ProductContainerStyled>
      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}>
        <ProductImagesStyled>
          <ProductImagesListStyled>
            {product.images.map((image) => {
              return (
                <ProductImagesListItemStyled key={image}>
                  <img
                    src={image}
                    alt="Imagen del Producto"
                    style={{
                      objectFit: "contain",
                      maxWidth: "100%",
                      maxHeight: "100%",
                      cursor: "pointer",
                    }}
                    onMouseEnter={handleChangeImage}
                  />
                </ProductImagesListItemStyled>
              );
            })}
          </ProductImagesListStyled>
          <ProductImageContainerStyled
            style={{
              backgroundImage: `url(${currentImage})`,
            }}
          />
        </ProductImagesStyled>
        <ProductDetailsStyled>
          <h6>{product.model}</h6>
        </ProductDetailsStyled>
      </Box>
    </ProductContainerStyled>
  );
};
