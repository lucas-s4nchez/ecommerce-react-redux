import { Navigate } from "react-router-dom";

export const NotAuthenticatedRoutes = ({ children, status }) => {
  return status === "not-authenticated" ? (
    children
  ) : (
    <Navigate to="/" replace />
  );
  //
};
