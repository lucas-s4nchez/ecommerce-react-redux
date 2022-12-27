import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useCheckAuth } from "../hooks/useCheckAuth";
import { Layout } from "../layout/Layout";
import { HomePage, LoginPage, RegisterPage } from "../pages";
import { NotAuthenticatedRoutes } from "./NotAuthenticatedRoutes";

export const AppRoutes = () => {
  const status = useCheckAuth();
  if (status === "checking") {
    return <h1>Cargando</h1>;
  }
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={
            <NotAuthenticatedRoutes>
              <LoginPage />
            </NotAuthenticatedRoutes>
          }
        />
        <Route
          path="/register"
          element={
            <NotAuthenticatedRoutes>
              <RegisterPage />
            </NotAuthenticatedRoutes>
          }
        />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </Layout>
  );
};
