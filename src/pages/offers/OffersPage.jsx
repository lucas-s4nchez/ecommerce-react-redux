import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CardProduct } from "../../components/card/CardProduct";
import { ProductsContainer } from "../../components/productsContainer/ProductsContainer";
import { startLoadingProductsOnOffer } from "../../store/products/productsThunks";

export const OffersPage = () => {
  const { productsOnOffer } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(startLoadingProductsOnOffer());
  }, []);
  return (
    <ProductsContainer array={productsOnOffer}>
      {productsOnOffer.map((product) => {
        return <CardProduct key={product.id} {...product} />;
      })}
    </ProductsContainer>
  );
};
