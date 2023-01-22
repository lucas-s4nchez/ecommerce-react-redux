import { useState } from "react";

export const useAlerts = () => {
  const [messageOfNotAuthenticatedUser, setMessageOfNotAuthenticatedUser] =
    useState(false);
  const [messageAddProductToFavorites, setMessageAddProductToFavorites] =
    useState(false);
  const [messageRemoveProductToFavorites, setMessageRemoveProductToFavorites] =
    useState(false);
  const [messageAddProductToCart, setMessageAddProductToCart] = useState(false);
  const [messageAddUnitProductToCart, setMessageAddUnitProductToCart] =
    useState(false);

  const handleOpenMessageOfNotAuthenticatedUser = () => {
    setMessageOfNotAuthenticatedUser(true);
  };
  const handleCloseMessageOfNotAuthenticatedUser = () => {
    setMessageOfNotAuthenticatedUser(false);
  };
  const handleOpenMessageAddProductToFavorites = () => {
    setMessageAddProductToFavorites(true);
  };
  const handleCloseMessageAddProductToFavorites = () => {
    setMessageAddProductToFavorites(false);
  };
  const handleOpenMessageRemoveProductToFavorites = () => {
    setMessageRemoveProductToFavorites(true);
  };
  const handleCloseMessageRemoveProductToFavorites = () => {
    setMessageRemoveProductToFavorites(false);
  };
  const handleOpenMessageAddProductToCart = () => {
    setMessageAddProductToCart(true);
  };
  const handleCloseMessageAddProductToCart = () => {
    setMessageAddProductToCart(false);
  };
  const handleOpenMessageAddUnitProductToCart = () => {
    setMessageAddUnitProductToCart(true);
  };
  const handleCloseMessageAddUnitProductToCart = () => {
    setMessageAddUnitProductToCart(false);
  };

  return {
    messageOfNotAuthenticatedUser,
    handleOpenMessageOfNotAuthenticatedUser,
    handleCloseMessageOfNotAuthenticatedUser,
    messageAddProductToFavorites,
    handleOpenMessageAddProductToFavorites,
    handleCloseMessageAddProductToFavorites,
    messageRemoveProductToFavorites,
    handleOpenMessageRemoveProductToFavorites,
    handleCloseMessageRemoveProductToFavorites,
    messageAddProductToCart,
    handleOpenMessageAddProductToCart,
    handleCloseMessageAddProductToCart,
    messageAddUnitProductToCart,
    handleOpenMessageAddUnitProductToCart,
    handleCloseMessageAddUnitProductToCart,
  };
};
