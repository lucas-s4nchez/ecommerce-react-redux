import { useSelector } from "react-redux";
import { CardProduct } from "../../components/card/CardProduct";
import { ProductsContainer } from "../../components/productsContainer/ProductsContainer";

export const OffersPage = () => {
  const { productsOnOffer } = useSelector((state) => state.products);

  return (
    <ProductsContainer array={productsOnOffer}>
      {productsOnOffer.map((product) => {
        return <CardProduct key={product.id} {...product} />;
      })}
    </ProductsContainer>
  );
};
