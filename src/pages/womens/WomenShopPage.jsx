import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouterBreadcrumbs } from "../../components/breadcrumbs/Breadcrumbs";
import { CardProduct } from "../../components/card/CardProduct";
import { CardsSkeleton } from "../../components/cardsSkeleton/CardsSkeleton";
import { ProductsContainer } from "../../components/productsContainer/ProductsContainer";
import { useProductsStore } from "../../hooks/useProductsStore";
import { setWomenProducts } from "../../store/products/productsSlice";

export const WomenShopPage = () => {
  const { isLoading, womenProducts } = useProductsStore();
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
        {womenProducts.map((product) => (
          <CardProduct key={product.id} {...product} />
        ))}
      </ProductsContainer>
    </>
  );
};
