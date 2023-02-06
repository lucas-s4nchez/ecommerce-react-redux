import { Alert } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouterBreadcrumbs } from "../../components/breadcrumbs/Breadcrumbs";
import { CardProduct } from "../../components/card/CardProduct";
import { CardsSkeleton } from "../../components/cardsSkeleton/CardsSkeleton";
import { ProductsContainer } from "../../components/productsContainer/ProductsContainer";
import { setWomenProducts } from "../../store/products/productsSlice";

export const WomenShopPage = () => {
  const { isLoading, womenProducts } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setWomenProducts());
  }, [isLoading]);

  if (isLoading) {
    return <CardsSkeleton />;
  }

  return (
    <>
      <RouterBreadcrumbs />
      <ProductsContainer array={womenProducts}>
        {!womenProducts.length && (
          <Alert severity="error" variant="filled">
            Lo sentimos, no disponemos de stock en este momento
          </Alert>
        )}
        {womenProducts.map((product) => (
          <CardProduct key={product.id} {...product} />
        ))}
      </ProductsContainer>
    </>
  );
};
