import { Navigate } from "react-router-dom";

export const AuthenticatedRoutes = ({ children, status }) => {
  return status === "authenticated" ? children : <Navigate to={"/login"} />;
};
