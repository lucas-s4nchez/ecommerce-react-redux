import { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Alert, Box, Button, TextField } from "@mui/material";
import { RouterBreadcrumbs } from "../../components/breadcrumbs/Breadcrumbs";
import { CardProduct } from "../../components/card/CardProduct";

export const SearchPage = () => {
  const { isLoading, products } = useSelector((state) => state.products);
  const navigate = useNavigate();
  const location = useLocation();

  const query = queryString.parse(location.search); //extrae los query params
  const { q = "" } = query;
  const searchedProducts =
    q.toLocaleLowerCase().trim().length === 0
      ? []
      : products.filter((product) =>
          `${product.brand.toLowerCase()} ${product.model.toLowerCase()} ${product.version.toLowerCase()}`.includes(
            q.toLowerCase().trim()
          )
        );
  const showSearch = q.length === 0;
  const showError = q.length > 0 && searchedProducts.length === 0;

  const { getFieldProps, handleSubmit, errors, touched, values } = useFormik({
    initialValues: {
      search: q,
    },
    validationSchema: Yup.object({
      search: Yup.string()
        .required("Campo requerido")
        .min(3, "Mínimo 3 caracteres")
        .max(100, "Máximo 100 caracteres"),
    }),
    onSubmit: (values) => {
      navigate(`?q=${values.search.toLowerCase()}`);
    },
  });
  if (isLoading) {
    return <h1>Cargando...</h1>;
  }
  return (
    <>
      <RouterBreadcrumbs />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "80vh",
          gap: 2,
          marginBottom: 5,
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" } }}
        >
          <TextField
            type="search"
            label="Buscar zapatillas"
            sx={{ width: "100%" }}
            inputProps={{
              maxLength: 100,
            }}
            {...getFieldProps("search")}
            error={errors.search && touched.search}
            helperText={touched.search && errors.search}
          />
          <Button
            variant="contained"
            type="submit"
            sx={{ width: { sm: 200, md: 300 }, height: 56 }}
          >
            Buscar
          </Button>
        </Box>
        <Box>
          {showSearch && (
            <Alert severity="info" variant="filled">
              Busca una zapatilla por su marca, modelo o versión
            </Alert>
          )}
          {showError && (
            <Alert severity="error" variant="filled">
              Lo siento, no tenemos ninguna zapatilla que coincida con: {q}
            </Alert>
          )}
          {searchedProducts.map((product) => (
            <CardProduct
              key={product.id}
              {...product}
              onSearch={`?q=${values.search.toLowerCase()}`}
            />
          ))}
        </Box>
      </Box>
    </>
  );
};
