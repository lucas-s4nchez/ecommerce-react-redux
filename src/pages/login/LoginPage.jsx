import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import Google from "@mui/icons-material/Google";
import EmailIcon from "@mui/icons-material/Email";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { useFormik } from "formik";
import * as Yup from "yup";
import { isError } from "../../store/auth/authSlice";
import { AuthLayout } from "../../layout/AuthLayout";
import { RouterBreadcrumbs } from "../../components/breadcrumbs/Breadcrumbs";
import {
  startGoogleSigIn,
  startLoginWithEmailAndPassword,
} from "../../store/auth/authThunks";

export const LoginPage = () => {
  const { errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const { getFieldProps, handleSubmit, errors, touched } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Correo electronico invalido")
        .required("Campo requerido"),
      password: Yup.string()
        .min(6, "Minimo 6 caracteres")
        .required("Campo requerido"),
    }),
    onSubmit: (values) => {
      dispatch(startLoginWithEmailAndPassword(values));
    },
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const onGoogleSignIn = () => {
    dispatch(startGoogleSigIn());
    history.back();
  };
  const onRedirect = () => {
    dispatch(isError({ errorMessage: "" }));
  };
  return (
    <>
      <RouterBreadcrumbs />
      <Box sx={{ minHeight: "80vh", marginBlock: 5 }}>
        <AuthLayout title={"Iniciar sesión"}>
          <form onSubmit={handleSubmit}>
            <Grid container>
              <Grid item xs={12} sx={{ mt: 2 }}>
                <TextField
                  label="Correo"
                  type="email"
                  placeholder="correo@correo.com"
                  fullWidth
                  name="email"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <EmailIcon />
                      </InputAdornment>
                    ),
                  }}
                  {...getFieldProps("email")}
                  error={errors.email && touched.email}
                  helperText={touched.email && errors.email}
                />
              </Grid>
              <Grid item xs={12} sx={{ mt: 2 }}>
                <TextField
                  label="Contraseña"
                  type={showPassword ? "text" : "password"}
                  placeholder="Contraseña"
                  fullWidth
                  name="password"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  {...getFieldProps("password")}
                  error={errors.password && touched.password}
                  helperText={touched.password && errors.password}
                />
              </Grid>
              <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
                {errorMessage && (
                  <Grid item xs={12}>
                    <Alert severity="error" variant="filled">
                      {errorMessage}
                    </Alert>
                  </Grid>
                )}

                <Grid item xs={12} sm={6}>
                  <Button type="submit" variant="contained" fullWidth>
                    <Typography>Iniciar sesion</Typography>
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    onClick={onGoogleSignIn}
                    variant="contained"
                    fullWidth
                  >
                    <Google />
                    <Typography sx={{ ml: 1 }}>Google</Typography>
                  </Button>
                </Grid>
              </Grid>
              <Grid container direction="row" justifyContent="end">
                <Typography sx={{ mr: 1, fontSize: 14 }}>
                  ¿No tienes una cuenta?
                </Typography>
                <Link
                  onClick={onRedirect}
                  component={RouterLink}
                  sx={{ fontSize: 14 }}
                  color="inherit"
                  to={"/register"}
                >
                  registrarse
                </Link>
              </Grid>
            </Grid>
          </form>
        </AuthLayout>
      </Box>
    </>
  );
};
