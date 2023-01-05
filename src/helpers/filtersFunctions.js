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
