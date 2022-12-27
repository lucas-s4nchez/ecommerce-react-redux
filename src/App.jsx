import React from "react";
import { AppRoutes } from "./router/AppRoutes";
import { Theme } from "./theme/Theme";

export const App = () => {
  return (
    <Theme>
      <AppRoutes />
    </Theme>
  );
};
