export const formatPrice = (value) => {
  const formatter = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2,
  });
  return formatter.format(value);
};
export const getNewPrice = (price, discount) => {
  const newPrice =
    parseInt(price) - (parseInt(price) * parseInt(discount)) / 100;
  return newPrice;
};
