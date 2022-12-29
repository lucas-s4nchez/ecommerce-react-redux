import { Navigate } from "react-router-dom";
import { useCheckAuth } from "../hooks/useCheckAuth";

export const AuthenticatedRoutes = ({ children }) => {
  const status = useCheckAuth();
  return status === "authenticated" ? children : <Navigate to={"/"} />;
};
