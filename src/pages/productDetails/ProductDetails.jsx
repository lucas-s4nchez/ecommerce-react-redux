import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

export const ProductDetails = () => {
  const { products, isLoading } = useSelector((state) => state.products);
  const location = useLocation();
  const pathname = location.pathname.split("/");

  const productId = pathname[pathname.length - 1];
  const currentProduct = products.find((product) => product.id === productId);
  if (isLoading) {
    return <h1>Cargando...</h1>;
  }

  return (
    <>
      <h1>{currentProduct.model}</h1>
    </>
  );
};
