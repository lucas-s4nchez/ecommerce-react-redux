import { useSelector } from "react-redux";
import { CardProduct } from "../../components/card/CardProduct";
import { ProductsContainer } from "../../components/productsContainer/ProductsContainer";

export const MenShopPage = () => {
  const { menProducts } = useSelector((state) => state.products);

  return (
    <ProductsContainer array={menProducts}>
      {menProducts.map((product) => (
        <CardProduct key={product.id} {...product} />
      ))}
    </ProductsContainer>
  );
};
