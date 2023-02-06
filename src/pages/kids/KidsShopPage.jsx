import { Alert } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouterBreadcrumbs } from "../../components/breadcrumbs/Breadcrumbs";
import { CardProduct } from "../../components/card/CardProduct";
import { CardsSkeleton } from "../../components/cardsSkeleton/CardsSkeleton";
import { ProductsContainer } from "../../components/productsContainer/ProductsContainer";
import { setKidProducts } from "../../store/products/productsSlice";

export const KidsShopPage = () => {
  const { isLoading, kidProducts } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setKidProducts());
  }, [isLoading]);

  if (isLoading) {
    return <CardsSkeleton />;
  }

  return (
    <>
      <RouterBreadcrumbs />
      <ProductsContainer array={kidProducts}>
        {!kidProducts.length && (
          <Alert severity="error" variant="filled">
            Lo sentimos, no disponemos de stock en este momento
          </Alert>
        )}
        {kidProducts.map((product) => (
          <CardProduct key={product.id} {...product} />
        ))}
      </ProductsContainer>
    </>
  );
};
