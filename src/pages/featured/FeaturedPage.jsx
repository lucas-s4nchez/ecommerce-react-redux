import { useSelector } from "react-redux";
import { CardProduct } from "../../components/card/CardProduct";
import { ProductsContainer } from "../../components/productsContainer/ProductsContainer";

export const FeaturedPage = () => {
  const { featuredProducts } = useSelector((state) => state.products);

  return (
    <ProductsContainer array={featuredProducts}>
      {featuredProducts.map((product) => {
        return <CardProduct key={product.id} {...product} />;
      })}
    </ProductsContainer>
  );
};
