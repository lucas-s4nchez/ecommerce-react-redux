import { Navigate } from "react-router-dom";
import { useCheckAuth } from "../hooks/useCheckAuth";

export const NotAuthenticatedRoutes = ({ children }) => {
  const status = useCheckAuth();
  return status === "not-authenticated" ? (
    children
  ) : (
    <Navigate to="/" replace />
  );
  //
};
