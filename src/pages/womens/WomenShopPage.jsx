import { useSelector } from "react-redux";
import { RouterBreadcrumbs } from "../../components/breadcrumbs/Breadcrumbs";
import { CardProduct } from "../../components/card/CardProduct";
import { ProductsContainer } from "../../components/productsContainer/ProductsContainer";

export const WomenShopPage = () => {
  const { womenProducts } = useSelector((state) => state.products);

  return (
    <>
      <RouterBreadcrumbs />
      <ProductsContainer array={womenProducts}>
        {womenProducts.map((product) => (
          <CardProduct key={product.id} {...product} />
        ))}
      </ProductsContainer>
    </>
  );
};
