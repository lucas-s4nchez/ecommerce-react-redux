import { useSelector } from "react-redux";
import { RouterBreadcrumbs } from "../../components/breadcrumbs/Breadcrumbs";
import { CardProduct } from "../../components/card/CardProduct";
import { ProductsContainer } from "../../components/productsContainer/ProductsContainer";

export const MenShopPage = () => {
  const { menProducts } = useSelector((state) => state.products);

  return (
    <>
      <RouterBreadcrumbs />
      <ProductsContainer array={menProducts}>
        {menProducts.map((product) => (
          <CardProduct key={product.id} {...product} />
        ))}
      </ProductsContainer>
    </>
  );
};
