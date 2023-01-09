import { useSelector } from "react-redux";
import { CardProduct } from "../../components/card/CardProduct";
import { ProductsContainer } from "../../components/productsContainer/ProductsContainer";

export const KidsShopPage = () => {
  const { kidProducts } = useSelector((state) => state.products);

  return (
    <ProductsContainer array={kidProducts}>
      {kidProducts.map((product) => (
        <CardProduct key={product.id} {...product} />
      ))}
    </ProductsContainer>
  );
};
