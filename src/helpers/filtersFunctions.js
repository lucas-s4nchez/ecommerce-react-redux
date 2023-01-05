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
