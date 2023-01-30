import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouterBreadcrumbs } from "../../components/breadcrumbs/Breadcrumbs";
import { CardProduct } from "../../components/card/CardProduct";
import { CardsSkeleton } from "../../components/cardsSkeleton/CardsSkeleton";
import { ProductsContainer } from "../../components/productsContainer/ProductsContainer";
import { setProductsOnOffer } from "../../store/products/productsSlice";

export const OffersPage = () => {
  const { isLoading, productsOnOffer } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setProductsOnOffer());
  }, [isLoading]);

  if (isLoading) {
    return <CardsSkeleton />;
  }

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
