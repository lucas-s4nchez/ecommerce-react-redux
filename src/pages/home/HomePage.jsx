import { useDispatch, useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import { CardProduct } from "../../components/card/CardProduct";
import { HomeCardContainer } from "./HomeCardContainer";
import { ShoppingInfoSection } from "./ShoppingInfoSection";
import { useEffect } from "react";
import {
  setFeaturedProducts,
  setProductsOnOffer,
} from "../../store/products/productsSlice";
import { HeroItem } from "./HeroItem";

export const HomePage = () => {
  const { isLoading, featuredProducts, productsOnOffer } = useSelector(
    (state) => state.products
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setFeaturedProducts());
    dispatch(setProductsOnOffer());
  }, [isLoading]);

  const someProductsOnOffer = [];
  for (let index = 0; index < 3; index++) {
    someProductsOnOffer.push(productsOnOffer[index]);
  }
  const someFeaturedProducts = [];
  for (let index = 0; index < 3; index++) {
    someFeaturedProducts.push(featuredProducts[index]);
  }

  return (
    <>
      <Box sx={{ marginBlock: 5 }}>
        <HeroItem />
      </Box>
      <ShoppingInfoSection />
      <Box>
        <Typography variant="h3" sx={{ fontSize: { xs: 22, sm: 30 } }}>
          Aprevecha las increibles ofertas!
        </Typography>
        <HomeCardContainer redirectTo={"/offers"}>
          {someProductsOnOffer[0] !== undefined &&
            someProductsOnOffer.map((product) => {
              return <CardProduct key={product.id} {...product} />;
            })}
        </HomeCardContainer>
      </Box>
      <Box>
        <Typography variant="h3" sx={{ fontSize: { xs: 22, sm: 30 } }}>
          Los más Destacados
        </Typography>
        <HomeCardContainer redirectTo={"/featured"}>
          {someFeaturedProducts[0] !== undefined &&
            someFeaturedProducts.map((product) => {
              return <CardProduct key={product.id} {...product} />;
            })}
        </HomeCardContainer>
      </Box>
    </>
  );
};
