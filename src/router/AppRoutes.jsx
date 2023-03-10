import { CircularProgress, Grid } from "@mui/material";
import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useCheckAuth } from "../hooks/useCheckAuth";
import { Layout } from "../layout/Layout";
import {
  AccountPage,
  AddressesPage,
  BuyingPage,
  CardsPage,
  CartPage,
  FavoritesPage,
  FeaturedPage,
  HomePage,
  KidsShopPage,
  LoginPage,
  MenShopPage,
  OffersPage,
  ProductDetails,
  PurchasesPage,
  RegisterPage,
  SearchPage,
  UserInfoPage,
  WomenShopPage,
} from "../pages";
import { AuthenticatedRoutes } from "./AuthenticatedRoutes";
import { NotAuthenticatedRoutes } from "./NotAuthenticatedRoutes";

export const AppRoutes = () => {
  const status = useCheckAuth();
  if (status === "checking") {
    return (
      <Grid
        container
        display="flex"
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{ backgroundColor: "white.cream", minHeight: "100vh" }}
      >
        <CircularProgress data-testid="circular-progress" />
      </Grid>
    );
  }
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="search/:id" element={<ProductDetails />} />
        <Route path="/offers" element={<OffersPage />} />
        <Route path="offers/:id" element={<ProductDetails />} />
        <Route path="/featured" element={<FeaturedPage />} />
        <Route path="featured/:id" element={<ProductDetails />} />
        <Route path="/mens" element={<MenShopPage />} />
        <Route path="mens/:id" element={<ProductDetails />} />
        <Route path="/womens" element={<WomenShopPage />} />
        <Route path="womens/:id" element={<ProductDetails />} />
        <Route path="/kids" element={<KidsShopPage />} />
        <Route path="kids/:id" element={<ProductDetails />} />
        <Route
          path="/favorites"
          element={
            <AuthenticatedRoutes status={status}>
              <FavoritesPage />
            </AuthenticatedRoutes>
          }
        />
        <Route
          path="/cart"
          element={
            <AuthenticatedRoutes status={status}>
              <CartPage />
            </AuthenticatedRoutes>
          }
        />
        <Route
          path="/buying"
          element={
            <AuthenticatedRoutes status={status}>
              <BuyingPage />
            </AuthenticatedRoutes>
          }
        />

        <Route
          path="/purchases"
          element={
            <AuthenticatedRoutes status={status}>
              <PurchasesPage />
            </AuthenticatedRoutes>
          }
        />
        <Route
          path="/account"
          element={
            <AuthenticatedRoutes status={status}>
              <AccountPage />
            </AuthenticatedRoutes>
          }
        />
        <Route
          path="/addresses"
          element={
            <AuthenticatedRoutes status={status}>
              <AddressesPage />
            </AuthenticatedRoutes>
          }
        />
        <Route
          path="/cards"
          element={
            <AuthenticatedRoutes status={status}>
              <CardsPage />
            </AuthenticatedRoutes>
          }
        />
        <Route
          path="/userInfo"
          element={
            <AuthenticatedRoutes status={status}>
              <UserInfoPage />
            </AuthenticatedRoutes>
          }
        />
        <Route
          path="/login"
          element={
            <NotAuthenticatedRoutes status={status}>
              <LoginPage />
            </NotAuthenticatedRoutes>
          }
        />
        <Route
          path="/register"
          element={
            <NotAuthenticatedRoutes status={status}>
              <RegisterPage />
            </NotAuthenticatedRoutes>
          }
        />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </Layout>
  );
};
