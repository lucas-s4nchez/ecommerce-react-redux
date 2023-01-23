import { useSelector } from "react-redux";
import { RouterBreadcrumbs } from "../../components/breadcrumbs/Breadcrumbs";
import { CardProduct } from "../../components/card/CardProduct";
import { CardsSkeleton } from "../../components/cardsSkeleton/CardsSkeleton";
import { ProductsContainer } from "../../components/productsContainer/ProductsContainer";

export const FeaturedPage = () => {
  const { isLoading, featuredProducts } = useSelector(
    (state) => state.products
  );

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
