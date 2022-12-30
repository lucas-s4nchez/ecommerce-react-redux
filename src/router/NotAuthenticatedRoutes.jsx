import { Navigate } from "react-router-dom";
import { useCheckAuth } from "../hooks/useCheckAuth";

export const NotAuthenticatedRoutes = ({ children }) => {
  const status = useCheckAuth();
  console.log(location);
  return status === "not-authenticated" ? (
    children
  ) : (
    <Navigate to="/" replace />
  );
  //
};
