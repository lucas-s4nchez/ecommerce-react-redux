import { useEffect, useState } from "react";
import { useProductsStore } from "../../hooks/useProductsStore";
import {
  ProductImageContainerSkeleton,
  ProductImagesListSkeleton,
} from "./ProductDetailsSkeleton";
import {
  ProductImageContainerStyled,
  ProductImagesListItemStyled,
  ProductImagesListStyled,
  ProductImagesStyled,
} from "./ProductDetailsStyles";

export const ProductImage = ({ product }) => {
  const { isLoading } = useProductsStore();
  const [currentImage, setCurrentImage] = useState("");
  useEffect(() => {
    setCurrentImage(product?.images[0]);
  }, [isLoading]);
  const handleImageChange = (e) => {
    setCurrentImage(e.target.src);
  };

  if (isLoading) {
    return (
      <ProductImagesStyled>
        <ProductImagesListSkeleton />
        <ProductImageContainerSkeleton />
      </ProductImagesStyled>
    );
  }
  return (
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
                onMouseEnter={handleImageChange}
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
  );
};
