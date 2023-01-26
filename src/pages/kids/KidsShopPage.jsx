import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouterBreadcrumbs } from "../../components/breadcrumbs/Breadcrumbs";
import { CardProduct } from "../../components/card/CardProduct";
import { CardsSkeleton } from "../../components/cardsSkeleton/CardsSkeleton";
import { ProductsContainer } from "../../components/productsContainer/ProductsContainer";
import { useProductsStore } from "../../hooks/useProductsStore";
import { setKidProducts } from "../../store/products/productsSlice";

export const KidsShopPage = () => {
  const { isLoading, kidProducts } = useProductsStore();
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
        {kidProducts.map((product) => (
          <CardProduct key={product.id} {...product} />
        ))}
      </ProductsContainer>
    </>
  );
};
