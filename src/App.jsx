import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppRoutes } from "./router/AppRoutes";
import { startLoadingProducts } from "./store/products/productsThunks";
import { Theme } from "./theme/Theme";

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startLoadingProducts());
  }, []);

  return (
    <Theme>
      <AppRoutes />
    </Theme>
  );
};
