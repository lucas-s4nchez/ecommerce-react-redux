import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CardProduct } from "../../components/card/CardProduct";
import { startLoadingKidProducts } from "../../store/products/productsThunks";

export const KidsShopPage = () => {
  const { kidProducts } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(startLoadingKidProducts());
  }, []);
  return (
    <>
      {kidProducts.map((product) => (
        <CardProduct key={product.id} {...product} />
      ))}
    </>
  );
};
