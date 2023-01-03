import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CardProduct } from "../../components/card/CardProduct";
import { startLoadingFeaturedProducts } from "../../store/products/productsThunks";

export const FeaturedPage = () => {
  const { isLoading, featuredProducts } = useSelector(
    (state) => state.products
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(startLoadingFeaturedProducts());
  }, []);
  return (
    <>
      {featuredProducts.map((product) => {
        return <CardProduct key={product.id} {...product} />;
      })}
    </>
  );
};
