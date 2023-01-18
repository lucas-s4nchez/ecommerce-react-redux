import { useSelector } from "react-redux";
import { RouterBreadcrumbs } from "../../components/breadcrumbs/Breadcrumbs";
import { CardProduct } from "../../components/card/CardProduct";
import { ProductsContainer } from "../../components/productsContainer/ProductsContainer";

export const KidsShopPage = () => {
  const { kidProducts } = useSelector((state) => state.products);

  return (
    <>
      <RouterBreadcrumbs />
      <ProductsContainer array={kidProducts}>
        {kidProducts.map((product) => (
          <CardProduct key={product.id} {...product} />
        ))}
      </ProductsContainer>
    </>
  );
};
