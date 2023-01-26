import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouterBreadcrumbs } from "../../components/breadcrumbs/Breadcrumbs";
import { CardProduct } from "../../components/card/CardProduct";
import { CardsSkeleton } from "../../components/cardsSkeleton/CardsSkeleton";
import { ProductsContainer } from "../../components/productsContainer/ProductsContainer";
import { useProductsStore } from "../../hooks/useProductsStore";
import { setFeaturedProducts } from "../../store/products/productsSlice";

export const FeaturedPage = () => {
  const { isLoading, featuredProducts } = useProductsStore();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setFeaturedProducts());
  }, [isLoading]);

  if (isLoading) {
    return <CardsSkeleton />;
  }

  return (
    <>
      <RouterBreadcrumbs />
      <ProductsContainer array={featuredProducts}>
        {featuredProducts.map((product) => {
          return <CardProduct key={product.id} {...product} />;
        })}
      </ProductsContainer>
    </>
  );
};
