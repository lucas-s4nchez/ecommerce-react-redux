import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CardProduct } from "../../components/card/CardProduct";
import { FilterProducts } from "../../components/filter/FilterProducts";
import { startLoadingFeaturedProducts } from "../../store/products/productsThunks";

export const FeaturedPage = () => {
  const { featuredProducts } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const [filteredProducts, setFilteredProducts] = useState([]);

  const handleChange = (newValue) => {
    setFilteredProducts([...newValue]);
  };
  useEffect(() => {
    dispatch(startLoadingFeaturedProducts());
  }, []);
  return (
    <FilterProducts array={featuredProducts} handleChange={handleChange}>
      {!filteredProducts.length
        ? featuredProducts.map((product) => {
            return <CardProduct key={product.id} {...product} />;
          })
        : filteredProducts.map((product) => {
            return <CardProduct key={product.id} {...product} />;
          })}
    </FilterProducts>
  );
};
