import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CardProduct } from "../../components/card/CardProduct";
import { ProductsContainer } from "../../components/productsContainer/ProductsContainer";
import { startLoadingFeaturedProducts } from "../../store/products/productsThunks";

export const FeaturedPage = () => {
  const { featuredProducts } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startLoadingFeaturedProducts());
  }, []);
  return (
    <ProductsContainer array={featuredProducts}>
      {featuredProducts.map((product) => {
        return <CardProduct key={product.id} {...product} />;
      })}
    </ProductsContainer>
  );
};
