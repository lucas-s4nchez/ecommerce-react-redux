import { styled } from "@mui/system";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TuneIcon from "@mui/icons-material/Tune";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Slider,
} from "@mui/material";
import { useFilterProducts } from "../../hooks";

const WrapperLayoutStyled = styled("div")(({ theme }) => ({
  minHeight: "100vh",
}));
const ProductContainerStyled = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  marginBlock: "30px",
}));
const marks = [
  {
    value: 15000,
    label: "$15.000",
  },

  {
    value: 90000,
    label: "$90.000",
  },
];

export const FilterProducts = ({ children, handleChange, array }) => {
  const {
    open,
    isEmpty,
    brand,
    color,
    size,
    maxPrice,
    handleOpenModal,
    handleCloseModal,
    handleBrandChange,
    handleColorChange,
    handleSizeChange,
    handleMaxPriceChange,
    handleSubmit,
    handleReset,
  } = useFilterProducts(array, handleChange);

  return (
    <WrapperLayoutStyled>
      <Button variant="outlined" onClick={handleOpenModal} sx={{ gap: 1 }}>
        Filtros <TuneIcon />
      </Button>
      <Dialog open={open} onClose={handleCloseModal} fullWidth>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            padding: 5,
          }}
        >
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Marcas</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={brand}
                label="Marcas"
                onChange={handleBrandChange}
              >
                <MenuItem value="Adidas">Adidas</MenuItem>
                <MenuItem value="Nike">Nike</MenuItem>
                <MenuItem value="Fila">Fila</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Color</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={color}
                label="Color"
                onChange={handleColorChange}
              >
                <MenuItem value="rojo">Rojo</MenuItem>
                <MenuItem value="blanco">Blanco</MenuItem>
                <MenuItem value="negro">Negro</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Talles</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={size}
                label="Talles"
                onChange={handleSizeChange}
              >
                <MenuItem value={35}>35</MenuItem>
                <MenuItem value={36}>36</MenuItem>
                <MenuItem value={37}>37</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ minWidth: "100%" }}>
            <InputLabel id="demo-simple-select-label">Precio Máximo</InputLabel>
            <Slider
              label="jiji"
              aria-label="Precio Máximo"
              valueLabelDisplay="auto"
              step={5000}
              marks={marks}
              value={maxPrice}
              min={15000}
              max={90000}
              color="primary"
              onChange={handleMaxPriceChange}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button type="submit" onClick={handleSubmit}>
            Filtrar
          </Button>
          <Button type="submit" onClick={handleReset}>
            Resetear
          </Button>
        </DialogActions>
      </Dialog>
      <ProductContainerStyled>
        {isEmpty ? <h3>No hay resultados para esta busqueda</h3> : children}
      </ProductContainerStyled>
    </WrapperLayoutStyled>
  );
};
