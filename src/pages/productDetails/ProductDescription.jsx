import { useSelector } from "react-redux";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  Skeleton,
  Typography,
} from "@mui/material";

import { GiRolledCloth } from "react-icons/gi";
import { MdCloseFullscreen } from "react-icons/md";
import { FaShoePrints } from "react-icons/fa";
import { GiConverseShoe } from "react-icons/gi";
import { useProductsStore } from "../../hooks/useProductsStore";

export const ProductDescription = ({ product }) => {
  const { isLoading } = useProductsStore();
  if (isLoading) {
    return (
      <>
        <Skeleton variant="text" width="100%" sx={{ fontSize: "2rem" }} />
        <Skeleton variant="text" width="100%" />
        <Skeleton variant="text" width="100%" />
        <Skeleton variant="text" width="100%" />
        <Skeleton variant="text" width="100%" />
      </>
    );
  }
  return (
    <Box sx={{ paddingLeft: { md: "50px" } }}>
      <Typography variant="h5">Características del producto</Typography>
      <List>
        <ListItem sx={{ gap: 2 }}>
          <ListItemIcon sx={{ minWidth: "max-content" }}>
            <GiConverseShoe color="#000" fontSize={20} />
          </ListItemIcon>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            <Typography fontWeight="bolder">Estilo: </Typography>
            <Typography>{product.style}</Typography>
          </Box>
        </ListItem>

        <ListItem sx={{ gap: 2 }}>
          <ListItemIcon sx={{ minWidth: "max-content" }}>
            <GiRolledCloth color="#000" fontSize={20} />
          </ListItemIcon>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            <Typography fontWeight="bolder">
              Materiales del exterior:{" "}
            </Typography>
            <Typography>{product.exterior}</Typography>
          </Box>
        </ListItem>

        <ListItem sx={{ gap: 2 }}>
          <ListItemIcon sx={{ minWidth: "max-content" }}>
            <FaShoePrints color="#000" fontSize={20} />
          </ListItemIcon>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            <Typography fontWeight="bolder">
              Materiales de la suela:{" "}
            </Typography>
            <Typography>{product.sole}</Typography>
          </Box>
        </ListItem>

        <ListItem sx={{ gap: 1 }}>
          <ListItemIcon sx={{ minWidth: "max-content" }}>
            <MdCloseFullscreen color="#000" fontSize={20} />
          </ListItemIcon>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            <Typography fontWeight="bolder">Tipo de ajuste: </Typography>
            <Typography>{product.adjustment}</Typography>
          </Box>
        </ListItem>
      </List>
    </Box>
  );
};
