import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useCheckAuth } from "../hooks/useCheckAuth";
import { Layout } from "../layout/Layout";
import {
  AccountPage,
  FavoritesPage,
  FeaturedPage,
  HomePage,
  LoginPage,
  OffersPage,
  PurchasesPage,
  RegisterPage,
} from "../pages";
import { AuthenticatedRoutes } from "./AuthenticatedRoutes";
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
        <Route path="/featured" element={<FeaturedPage />} />
        <Route
          path="/account"
          element={
            <AuthenticatedRoutes>
              <AccountPage />
            </AuthenticatedRoutes>
          }
        />
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
