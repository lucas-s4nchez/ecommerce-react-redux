import { useMemo } from "react";
import { useSelector } from "react-redux";
import { NotAuthenticatedView } from "../views/NotAuthenticatedView";

export const NotAuthenticatedLayout = ({ children }) => {
  const { status } = useSelector((state) => state.auth);
  const isAuthenticated = useMemo(() => status === "authenticated", [status]);

  if (!isAuthenticated) return <NotAuthenticatedView />;

  return children;
};
