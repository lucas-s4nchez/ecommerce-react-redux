import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useCheckAuth } from "../hooks/useCheckAuth";
import { Layout } from "../layout/Layout";
import {
  FavoritesPage,
  HomePage,
  LoginPage,
  OffersPage,
  PurchasesPage,
  RegisterPage,
} from "../pages";
import { AccountPage } from "../pages/AccountPage";
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
        <Route path="/purchases" element={<PurchasesPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/offers" element={<OffersPage />} />
        <Route path="/account" element={<AccountPage />} />
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
