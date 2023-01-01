import { Box } from "@mui/material";
import { MUICarousel } from "../../components/carousel/Carousel";
import { CarouselItem } from "./CarouselItem";
import { ShoppingInfoSection } from "./ShoppingInfoSection";
import { ShopSection } from "./ShopSection";

const items = [
  {
    title1: "hasta",
    title2: "30% Off",
    imgUrl: "https://i.ibb.co/tmm6W37/hero.webp",
    button: true,
    redirectTo: "/offers",
  },
  {
    title1: "Los reyes magos",
    title2: "están llegando!",
    imgUrl:
      "https://i.ibb.co/ZVWHgVw/ilustracion-silueta-reyes-magos-plana-23-2149974655.webp",
    button: true,
    redirectTo: "/offers",
  },
  {
    title1: "zapas",
    title2: "urbanas",
    imgUrl:
      "https://i.ibb.co/YbxnwjQ/kristian-egelund-v-Jg-JLz-Wm-XDA-unsplash.jpg",
    button: true,
    redirectTo: "/offers",
  },
  {
    title1: "zapas",
    title2: "running",
    imgUrl:
      "https://i.ibb.co/qxRfqB6/miquel-parera-xag0-Yp-Bq-Nf-Q-unsplash-1.jpg",
    button: true,
    redirectTo: "/offers",
  },
  {
    title1: "envios gratis",
    title2: "a todo el país!",
    imgUrl: "https://i.ibb.co/zftkJjz/item-3.webp",
    button: false,
    redirectTo: "/",
  },
];

export const HomePage = () => {
  return (
    <>
      <Box sx={{ marginBlock: 5 }}>
        <MUICarousel color={"#e53935"} activeColor={"#EA605D"}>
          {items.map((item, i) => (
            <CarouselItem key={i} {...item} />
          ))}
        </MUICarousel>
      </Box>
      <ShoppingInfoSection />
      <ShopSection />
    </>
  );
};
