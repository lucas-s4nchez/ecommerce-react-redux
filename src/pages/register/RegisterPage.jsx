import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Alert,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { startRegisterUserwithEmailAndPassword } from "../../store/auth/authThunks";
import { isError } from "../../store/auth/authSlice";
import { AuthLayout } from "../../layout/AuthLayout";
import { RouterBreadcrumbs } from "../../components/breadcrumbs/Breadcrumbs";

export const RegisterPage = () => {
  const { status, errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const isCheckingAuthentication = useMemo(
    () => status === "checking",
    [status]
  );
  const { getFieldProps, handleSubmit, errors, touched } = useFormik({
    initialValues: {
      displayName: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      displayName: Yup.string()
        .trim()
        .required("Campo requerido")
        .min(3, "Minimo 3 caracteres"),
      email: Yup.string()
        .email("Correo electronico invalido")
        .required("Campo requerido"),
      password: Yup.string()
        .min(6, "Minimo 6 caracteres")
        .required("Campo requerido"),
    }),
    onSubmit: (values) => {
      dispatch(startRegisterUserwithEmailAndPassword(values));
    },
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const onRedirect = () => {
    dispatch(isError({ errorMessage: null }));
  };

  return (
    <>
      <RouterBreadcrumbs />
      <AuthLayout title="Crear cuenta">
        <form onSubmit={handleSubmit}>
          <Grid container>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <TextField
                label="Nombre completo"
                type="text"
                placeholder="Tu nombre"
                fullWidth
                name="displayName"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                }}
                {...getFieldProps("displayName")}
                error={errors.displayName && touched.displayName}
                helperText={touched.displayName && errors.displayName}
              />
            </Grid>
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
              <Grid item xs={12} display={!!errorMessage ? "" : "none"}>
                <Alert severity="error">{errorMessage}</Alert>
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={isCheckingAuthentication}
                >
                  <Typography>Crear cuenta</Typography>
                </Button>
              </Grid>
            </Grid>
            <Grid container direction="row" justifyContent="end">
              <Typography sx={{ mr: 1, fontSize: 14 }}>
                ¿Ya tienes una cuenta?
              </Typography>
              <Link
                onClick={onRedirect}
                component={RouterLink}
                sx={{ fontSize: 14 }}
                color="inherit"
                to={"/login"}
              >
                ingresa
              </Link>
            </Grid>
          </Grid>
        </form>
      </AuthLayout>
    </>
  );
};
