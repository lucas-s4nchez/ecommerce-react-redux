import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import SaveIcon from "@mui/icons-material/Save";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  startAddingNewAddress,
  startDeletingAddress,
} from "../../store/user/userThunks";
import { useNavigate } from "react-router-dom";

export const AddressesPage = () => {
  const { addresses } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const { getFieldProps, handleSubmit, handleReset, errors, touched } =
    useFormik({
      initialValues: {
        fullName: "",
        postalCode: "",
        province: "",
        city: "",
        street: "",
        streetNumber: "",
        phoneNumber: "",
      },
      validationSchema: Yup.object({
        fullName: Yup.string().required("Campo requerido"),
        postalCode: Yup.number().required("Campo requerido"),
        province: Yup.string().required("Campo requerido"),
        city: Yup.string().required("Campo requerido"),
        street: Yup.string().required("Campo requerido"),
        streetNumber: Yup.number().required("Campo requerido"),
        phoneNumber: Yup.number().required("Campo requerido"),
      }),
      onSubmit: (values, { resetForm }) => {
        dispatch(startAddingNewAddress(values));
        handleCloseForm();
        resetForm();
      },
      onReset: () => {
        handleCloseForm();
      },
    });

  const handleOpenForm = () => {
    setOpen(true);
  };
  const handleCloseForm = () => {
    setOpen(false);
  };
  return (
    <Box sx={{ minHeight: "80vh" }}>
      <IconButton sx={{ marginBlock: 1 }} onClick={() => navigate(-1)}>
        <ArrowBackIosIcon />
      </IconButton>
      <Box sx={{ margin: "10px auto 50px auto", maxWidth: 720 }}>
        <Typography sx={{ fontSize: "18px", fontWeight: "bolder", mb: 2 }}>
          Domicilios
        </Typography>
        <Paper
          sx={{
            padding: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 2,
            backgroundColor: "white.main",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: "100%",
            }}
          >
            {addresses.length < 1 ? (
              <Alert severity="info">
                No tienes ninguna dirección, agregá una
              </Alert>
            ) : (
              addresses.map((address) => {
                return (
                  <Box
                    sx={{
                      padding: 2,
                      display: "flex",
                      gap: 1,
                      border: "1px solid #adadad",
                      borderRadius: "10px",
                    }}
                    key={address.id}
                  >
                    <Box>
                      <LocationOnIcon sx={{ color: "primary.main" }} />
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                        width: "100%",
                      }}
                    >
                      <Typography>
                        {address.street} {address.streetNumber}
                      </Typography>
                      <Box>
                        <Typography
                          sx={{
                            textTransform: "capitalize",
                            fontSize: "12px",
                            color: "GrayText",
                          }}
                        >
                          Código Postal {address.postalCode} -{" "}
                          {address.province} - {address.city}
                        </Typography>
                        <Typography
                          sx={{
                            textTransform: "capitalize",
                            fontSize: "12px",
                            color: "GrayText",
                          }}
                        >
                          {address.fullName} - {address.phoneNumber}
                        </Typography>
                      </Box>
                    </Box>
                    <IconButton
                      onClick={() => dispatch(startDeletingAddress(address.id))}
                      sx={{ height: "max-content", color: "primary.main" }}
                      title="Eliminar"
                      aria-label="Eliminar Direccion"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                );
              })
            )}
          </Box>
          <Button
            onClick={handleOpenForm}
            startIcon={<AddLocationIcon />}
            sx={{ marginBlock: 1 }}
          >
            Agregar nueva dirección
          </Button>
          <Dialog open={open}>
            <DialogTitle>Nueva Dirección</DialogTitle>
            <DialogContent>
              <DialogContentText>
                No utilices tu información verdadera, este sitio web es un
                proyecto personal
              </DialogContentText>
              <Box
                component={"form"}
                onSubmit={handleSubmit}
                onReset={handleReset}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  marginBlock: 2,
                  width: "100%",
                  maxWidth: "500px",
                }}
              >
                <TextField
                  label="Nombre y Apellido"
                  variant="outlined"
                  fullWidth
                  {...getFieldProps("fullName")}
                  error={errors.fullName && touched.fullName}
                  helperText={touched.fullName && errors.fullName}
                />
                <TextField
                  label="Código Postal"
                  variant="outlined"
                  fullWidth
                  {...getFieldProps("postalCode")}
                  error={errors.postalCode && touched.postalCode}
                  helperText={touched.postalCode && errors.postalCode}
                />
                <TextField
                  label="Provincia"
                  variant="outlined"
                  fullWidth
                  {...getFieldProps("province")}
                  error={errors.province && touched.province}
                  helperText={touched.province && errors.province}
                />
                <TextField
                  label="Ciudad"
                  variant="outlined"
                  fullWidth
                  {...getFieldProps("city")}
                  error={errors.city && touched.city}
                  helperText={touched.city && errors.city}
                />
                <TextField
                  label="Calle/Avenida"
                  variant="outlined"
                  fullWidth
                  {...getFieldProps("street")}
                  error={errors.street && touched.street}
                  helperText={touched.street && errors.street}
                />
                <TextField
                  label="Número"
                  variant="outlined"
                  fullWidth
                  {...getFieldProps("streetNumber")}
                  error={errors.streetNumber && touched.streetNumber}
                  helperText={touched.streetNumber && errors.streetNumber}
                />
                <TextField
                  label="Teléfono"
                  variant="outlined"
                  fullWidth
                  {...getFieldProps("phoneNumber")}
                  error={errors.phoneNumber && touched.phoneNumber}
                  helperText={touched.phoneNumber && errors.phoneNumber}
                />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row", gap: "10px" },
                    justifyContent: "flex-end",
                  }}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    endIcon={<SaveIcon />}
                  >
                    Guardar
                  </Button>
                  <Button
                    variant="outlined"
                    type="reset"
                    endIcon={<DoDisturbIcon />}
                  >
                    Cancelar
                  </Button>
                </Box>
              </Box>
            </DialogContent>
          </Dialog>
        </Paper>
      </Box>
    </Box>
  );
};
