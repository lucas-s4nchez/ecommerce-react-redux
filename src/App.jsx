import { useEffect } from "react";
import { useProductsStore } from "./hooks/useProductsStore";
import { AppRoutes } from "./router/AppRoutes";
import { Theme } from "./theme/Theme";

export const App = () => {
  const { startLoadingProducts } = useProductsStore();
  useEffect(() => {
    startLoadingProducts();
  }, []);

  return (
    <Theme>
      <AppRoutes />
    </Theme>
  );
};
