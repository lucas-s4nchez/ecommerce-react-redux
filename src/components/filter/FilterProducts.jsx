import { useEffect, useState } from "react";
import { styled } from "@mui/system";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { filterbyBrand, filterbyColor } from "../../helpers/filtersFunctions";
import { Button } from "@mui/material";

const WrapperLayoutStyled = styled("div")(({ theme }) => ({
  minHeight: "100vh",
}));
const ProductContainerStyled = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  marginBlock: "30px",
}));

export const FilterProducts = ({ children, handleChange, array }) => {
  const [brand, setBrand] = useState("");
  const [color, setColor] = useState("");
  const [error, setError] = useState(false);

  const onSubmit = () => {
    const newProducts = array
      .filter((product) => filterbyBrand(product, brand))
      .filter((product) => filterbyColor(product, color));
    if (!newProducts.length) {
      setError(true);
    } else {
      setError(false);
    }
    handleChange(newProducts);
  };
  const onReset = () => {
    setColor("");
    setBrand("");
    setError(false);
    handleChange(array);
  };
  const onBandsChange = (event) => {
    event.preventDefault();
    setBrand(event.target.value);
  };
  const onColorsChange = (event) => {
    event.preventDefault();
    setColor(event.target.value);
  };
  return (
    <WrapperLayoutStyled>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Marcas</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={brand}
            label="Marcas"
            onChange={onBandsChange}
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
            onChange={onColorsChange}
          >
            <MenuItem value="rojo">Rojo</MenuItem>
            <MenuItem value="blanco">Blanco</MenuItem>
            <MenuItem value="negro">Negro</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Button type="submit" onClick={onSubmit}>
        Filtrar
      </Button>
      <Button type="submit" onClick={onReset}>
        Resetear
      </Button>
      <ProductContainerStyled>
        {error ? <h3>No hay resultados para esta busqueda</h3> : children}
      </ProductContainerStyled>
    </WrapperLayoutStyled>
  );
};
