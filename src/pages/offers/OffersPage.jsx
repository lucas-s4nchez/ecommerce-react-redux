import { useSelector } from "react-redux";
import { RouterBreadcrumbs } from "../../components/breadcrumbs/Breadcrumbs";
import { CardProduct } from "../../components/card/CardProduct";
import { ProductsContainer } from "../../components/productsContainer/ProductsContainer";

export const OffersPage = () => {
  const { productsOnOffer } = useSelector((state) => state.products);

  return (
    <>
      <RouterBreadcrumbs />
      <ProductsContainer array={productsOnOffer}>
        {productsOnOffer.map((product) => {
          return <CardProduct key={product.id} {...product} />;
        })}
      </ProductsContainer>
    </>
  );
};
