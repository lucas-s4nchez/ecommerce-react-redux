import { useState } from "react";
import {
  filterbyBrand,
  filterbyColor,
  filterbyMaxPrice,
  filterbySize,
  sortArray,
} from "../helpers/filtersFunctions";

export const useFilterProducts = (array) => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sort, setSort] = useState("");
  const [brand, setBrand] = useState("");
  const [color, setColor] = useState("");
  const [maxPrice, setMaxPrice] = useState(90000);
  const [size, setSize] = useState("");
  const [isEmpty, setIsEmpty] = useState(false);
  const [open, setOpen] = useState(false);

  const handleChange = (newValue) => {
    setFilteredProducts([...newValue]);
  };
  const handleOpenModal = () => {
    setOpen(true);
  };
  const handleCloseModal = () => {
    setOpen(false);
  };
  const handleSubmit = () => {
    const newProducts = array
      .filter((product) => filterbyBrand(product, brand))
      .filter((product) => filterbyColor(product, color))
      .filter((product) => filterbySize(product, size))
      .filter((product) => filterbyMaxPrice(product, maxPrice));
    sortArray(sort, newProducts);
    if (!newProducts.length) {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }
    handleChange(newProducts);
    setOpen(false);
  };
  const handleReset = () => {
    setSort("");
    setColor("");
    setBrand("");
    setSize("");
    setMaxPrice(90000);
    setIsEmpty(false);
    setOpen(false);
    handleChange(array);
  };
  const handleSortChange = (e) => {
    e.preventDefault();
    setSort(e.target.value);
  };
  const handleBrandChange = (event) => {
    event.preventDefault();
    setBrand(event.target.value);
  };
  const handleColorChange = (event) => {
    event.preventDefault();
    setColor(event.target.value);
  };
  const handleSizeChange = (event) => {
    event.preventDefault();
    setSize(event.target.value);
  };
  const handleMaxPriceChange = (event) => {
    event.preventDefault();
    setMaxPrice(event.target.value);
  };
  return {
    handleOpenModal,
    handleCloseModal,
    handleSubmit,
    handleReset,
    handleSortChange,
    handleBrandChange,
    handleColorChange,
    handleSizeChange,
    handleMaxPriceChange,
    filteredProducts,
    isEmpty,
    open,
    sort,
    brand,
    color,
    size,
    maxPrice,
  };
};
