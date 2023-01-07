export const filterbyBrand = (product, brand) => {
  if (!brand.length) {
    return product;
  } else {
    return product.brand === brand;
  }
};
export const filterbyColor = (product, color) => {
  if (!color.length) {
    return product;
  } else {
    return product.colors.includes(color);
  }
};
export const filterbySize = (product, size) => {
  return size ? product.sizes.includes(size) : product;
};
export const filterbyMaxPrice = (product, maxPrice) => {
  return maxPrice ? product.price <= maxPrice : product;
};
export const sortArray = (value, array) => {
  if (value === "Mayor Precio") {
    array.sort((a, b) => b.price - a.price);
  }
  if (value === "Menor Precio") {
    array.sort((a, b) => a.price - b.price);
  }
  if (value === "A-Z") {
    array.sort((a, b) => {
      const productA = a.brand.toLowerCase();
      const productB = b.brand.toLowerCase();
      if (productA < productB) return -1;
      if (productA > productB) return 1;
      return 0;
    });
  }
  if (value === "Z-A") {
    array.sort((a, b) => {
      const productA = a.brand.toLowerCase();
      const productB = b.brand.toLowerCase();
      if (productA < productB) return 1;
      if (productA > productB) return -1;
      return 0;
    });
  }
};
