import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CardProduct } from "../../components/card/CardProduct";
import { startLoadingWomenProducts } from "../../store/products/productsThunks";

export const WomenShopPage = () => {
  const { womenProducts } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(startLoadingWomenProducts());
  }, []);
  return (
    <>
      {womenProducts.map((product) => (
        <CardProduct key={product.id} {...product} />
      ))}
    </>
  );
};
