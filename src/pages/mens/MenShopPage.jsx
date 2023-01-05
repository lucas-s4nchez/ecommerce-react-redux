import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CardProduct } from "../../components/card/CardProduct";
import { startLoadingMenProducts } from "../../store/products/productsThunks";

export const MenShopPage = () => {
  const { menProducts } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(startLoadingMenProducts());
  }, []);
  return (
    <>
      {menProducts.map((product) => (
        <CardProduct key={product.id} {...product} />
      ))}
    </>
  );
};
