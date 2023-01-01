import Carousel from "react-material-ui-carousel";

export const MUICarousel = ({ children, color, activeColor }) => {
  return (
    <Carousel
      navButtonsProps={{
        style: {
          backgroundColor: `${color}`,
        },
      }}
      indicatorIconButtonProps={{
        style: {
          color: `${activeColor}`,
        },
      }}
      activeIndicatorIconButtonProps={{
        style: {
          backgroundColor: `${color}`,
        },
      }}
      indicatorContainerProps={{
        style: {
          textAlign: "center",
        },
      }}
    >
      {children}
    </Carousel>
  );
};
