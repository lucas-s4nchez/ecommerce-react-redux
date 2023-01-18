import { useSelector } from "react-redux";
import { RouterBreadcrumbs } from "../../components/breadcrumbs/Breadcrumbs";
import { CardProduct } from "../../components/card/CardProduct";
import { ProductsContainer } from "../../components/productsContainer/ProductsContainer";

export const FeaturedPage = () => {
  const { featuredProducts } = useSelector((state) => state.products);

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
