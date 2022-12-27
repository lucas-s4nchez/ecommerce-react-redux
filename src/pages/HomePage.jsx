import { Button } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { startLogout } from "../store/auth/authThunks";
import { Navbar } from "../ui/components/Navbar";

export const HomePage = () => {
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(startLogout());
  };
  return <Button onClick={onLogout}>Logout</Button>;
};
