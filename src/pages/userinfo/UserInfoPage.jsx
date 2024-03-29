import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogContent,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import EditIcon from "@mui/icons-material/Edit";
import { isError, isSuccess } from "../../store/auth/authSlice";
import { isDisabled } from "../../store/user/userSlice";
import { changePassword } from "../../firebase/providers";
import {
  startChangingDisplayName,
  startChangingEmail,
} from "../../store/auth/authThunks";

export const UserInfoPage = () => {
  const { email, displayName, errorMessage, successUpdate } = useSelector(
    (state) => state.auth
  );
  const { disabled } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openEmailModal, setOpenEmailModal] = useState(false);
  const [openDisplayNameModal, setOpenDisplayNameModal] = useState(false);
  const [openPasswordModal, setOpenPasswordModal] = useState(false);

  const startChangingPassword = async (oldPassword, newPassword) => {
    dispatch(isDisabled());
    const { ok, errorMessage } = await changePassword(
      email,
      oldPassword,
      newPassword
    );
    if (!ok && errorMessage) {
      dispatch(isDisabled());
      dispatch(isError({ errorMessage }));
      return;
    }

    dispatch(isError(""));
    dispatch(isSuccess(true));
    dispatch(isDisabled());
  };

  const handleOpenEmailModal = () => {
    dispatch(isError(""));
    setOpenEmailModal(true);
  };
  const handleCloseEmailModal = () => {
    setOpenEmailModal(false);
  };
  const handleOpenDisplayNameModal = () => {
    dispatch(isError(""));
    setOpenDisplayNameModal(true);
  };
  const handleCloseDisplayNameModal = () => {
    setOpenDisplayNameModal(false);
  };
  const handleOpenPasswordModal = () => {
    dispatch(isError(""));
    setOpenPasswordModal(true);
  };
  const handleClosePasswordModal = () => {
    setOpenPasswordModal(false);
  };

  return (
    <Box sx={{ minHeight: "80vh" }}>
      <IconButton sx={{ marginBlock: 1 }} onClick={() => navigate(-1)}>
        <ArrowBackIosIcon />
      </IconButton>
      <Box sx={{ margin: "10px auto 50px auto", maxWidth: 720 }}>
        <Typography sx={{ fontSize: "18px", fontWeight: "bolder", mb: 2 }}>
          Mis datos
        </Typography>
        <Paper
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 2,
            backgroundColor: "white.main",
          }}
        >
          <List sx={{ width: "100%" }}>
            <ListItem sx={{ flexDirection: { xs: "column", sm: "row" } }}>
              <ListItemText
                primary="E-mail"
                secondary={email}
                sx={{ color: "secondary.light", alignSelf: "start" }}
              />
              <Button
                endIcon={<EditIcon sx={{ fontSize: 20 }} />}
                variant="contained"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  alignSelf: "flex-end",
                }}
                onClick={handleOpenEmailModal}
              >
                Modificar
              </Button>
              <Dialog open={openEmailModal}>
                <Formik
                  initialValues={{ email: "", password: "" }}
                  validationSchema={Yup.object({
                    email: Yup.string()
                      .email("Correo electronico invalido")
                      .required("Campo requerido"),
                    password: Yup.string()
                      .trim()
                      .min(6, "Minimo 6 caracteres")
                      .required("Campo requerido"),
                  })}
                  onSubmit={(values, { resetForm }) => {
                    dispatch(startChangingEmail(values.email, values.password));
                  }}
                  onReset={() => {
                    handleCloseEmailModal();
                  }}
                >
                  {({
                    touched,
                    errors,
                    handleSubmit,
                    handleChange,
                    handleReset,
                  }) => (
                    <DialogContent>
                      <Box
                        component="form"
                        onSubmit={handleSubmit}
                        onReset={handleReset}
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 2,
                        }}
                      >
                        <TextField
                          label="Nuevo correo"
                          variant="outlined"
                          fullWidth
                          name="email"
                          onChange={handleChange}
                          error={errors.email && touched.email}
                          helperText={touched.email && errors.email}
                        />
                        <TextField
                          label="Contraseña"
                          variant="outlined"
                          fullWidth
                          name="password"
                          type="password"
                          onChange={handleChange}
                          error={errors.password && touched.password}
                          helperText={touched.password && errors.password}
                        />
                        {!!errorMessage && (
                          <Alert severity="error" variant="filled">
                            {errorMessage}
                          </Alert>
                        )}
                        {successUpdate ? (
                          <>
                            <Alert severity="success" variant="filled">
                              Email actualizado con éxito
                            </Alert>{" "}
                            <Button
                              variant="contained"
                              onClick={() => {
                                dispatch(isSuccess(false));
                                handleCloseEmailModal();
                              }}
                            >
                              Ok
                            </Button>
                          </>
                        ) : (
                          <Box sx={{ display: "flex", gap: 1 }}>
                            <Button
                              type="reset"
                              variant="outlined"
                              disabled={disabled}
                            >
                              Cancelar
                            </Button>
                            <Button
                              type="submit"
                              variant="contained"
                              disabled={disabled}
                            >
                              Cambiar
                            </Button>
                          </Box>
                        )}
                      </Box>
                    </DialogContent>
                  )}
                </Formik>
              </Dialog>
            </ListItem>
            <Divider />

            <ListItem sx={{ flexDirection: { xs: "column", sm: "row" } }}>
              <ListItemText
                primary="Usuario"
                secondary={displayName}
                sx={{ color: "secondary.light", alignSelf: "start" }}
              />
              <Button
                endIcon={<EditIcon sx={{ fontSize: 20 }} />}
                variant="contained"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  alignSelf: "flex-end",
                }}
                onClick={handleOpenDisplayNameModal}
              >
                Modificar
              </Button>
              <Dialog open={openDisplayNameModal}>
                <Formik
                  initialValues={{ displayName: "" }}
                  validationSchema={Yup.object({
                    displayName: Yup.string()
                      .trim()
                      .required("Campo requerido")
                      .min(3, "Minimo 3 caracteres"),
                  })}
                  onSubmit={(values, { resetForm }) => {
                    dispatch(startChangingDisplayName(values.displayName));
                  }}
                  onReset={() => {
                    handleCloseDisplayNameModal();
                  }}
                >
                  {({
                    touched,
                    errors,
                    handleSubmit,
                    handleChange,
                    handleReset,
                  }) => (
                    <DialogContent>
                      <Box
                        component="form"
                        onSubmit={handleSubmit}
                        onReset={handleReset}
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 2,
                        }}
                      >
                        <TextField
                          label="Nuevo nombre de usuario"
                          variant="outlined"
                          fullWidth
                          name="displayName"
                          onChange={handleChange}
                          error={errors.displayName && touched.displayName}
                          helperText={touched.displayName && errors.displayName}
                        />
                        {!!errorMessage && (
                          <Alert severity="error" variant="filled">
                            {errorMessage}
                          </Alert>
                        )}
                        {successUpdate ? (
                          <>
                            <Alert severity="success" variant="filled">
                              Usuario actualizado con éxito
                            </Alert>
                            <Button
                              variant="contained"
                              onClick={() => {
                                dispatch(isSuccess(false));
                                handleCloseDisplayNameModal();
                              }}
                            >
                              Ok
                            </Button>
                          </>
                        ) : (
                          <Box sx={{ display: "flex", gap: 1 }}>
                            <Button
                              type="reset"
                              variant="outlined"
                              disabled={disabled}
                            >
                              Cancelar
                            </Button>
                            <Button
                              type="submit"
                              variant="contained"
                              disabled={disabled}
                            >
                              Cambiar
                            </Button>
                          </Box>
                        )}
                      </Box>
                    </DialogContent>
                  )}
                </Formik>
              </Dialog>
            </ListItem>
            <Divider />

            <ListItem sx={{ flexDirection: { xs: "column", sm: "row" } }}>
              <ListItemText
                primary="Contraseña"
                secondary="******"
                sx={{ color: "secondary.light", alignSelf: "start" }}
              />
              <Button
                endIcon={<EditIcon sx={{ fontSize: 20 }} />}
                variant="contained"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  alignSelf: "flex-end",
                }}
                onClick={handleOpenPasswordModal}
              >
                Modificar
              </Button>
              <Dialog open={openPasswordModal}>
                <Formik
                  initialValues={{ password: "", newPassword: "" }}
                  validationSchema={Yup.object({
                    password: Yup.string()
                      .trim()
                      .min(6, "Minimo 6 caracteres")
                      .required("Campo requerido"),
                    newPassword: Yup.string()
                      .trim()
                      .min(6, "Minimo 6 caracteres")
                      .required("Campo requerido"),
                  })}
                  onSubmit={(values, { resetForm }) => {
                    startChangingPassword(values.password, values.newPassword);
                  }}
                  onReset={() => {
                    handleClosePasswordModal();
                  }}
                >
                  {({
                    touched,
                    errors,
                    handleSubmit,
                    handleChange,
                    handleReset,
                  }) => (
                    <DialogContent>
                      <Box
                        component="form"
                        onSubmit={handleSubmit}
                        onReset={handleReset}
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 2,
                        }}
                      >
                        <TextField
                          label="Contraseña actual"
                          variant="outlined"
                          fullWidth
                          type="password"
                          name="password"
                          onChange={handleChange}
                          error={errors.password && touched.password}
                          helperText={touched.password && errors.password}
                        />
                        <TextField
                          label="Nueva contraseña"
                          variant="outlined"
                          fullWidth
                          type="password"
                          name="newPassword"
                          onChange={handleChange}
                          error={errors.newPassword && touched.newPassword}
                          helperText={touched.newPassword && errors.newPassword}
                        />
                        {!!errorMessage && (
                          <Alert severity="error" variant="filled">
                            {errorMessage}
                          </Alert>
                        )}
                        {successUpdate ? (
                          <>
                            <Alert severity="success" variant="filled">
                              Contraseña actualizada con éxito
                            </Alert>{" "}
                            <Button
                              variant="contained"
                              onClick={() => {
                                dispatch(isSuccess(false));
                                handleClosePasswordModal();
                              }}
                            >
                              Ok
                            </Button>
                          </>
                        ) : (
                          <Box sx={{ display: "flex", gap: 1 }}>
                            <Button
                              type="reset"
                              variant="outlined"
                              disabled={disabled}
                            >
                              Cancelar
                            </Button>
                            <Button
                              type="submit"
                              variant="contained"
                              disabled={disabled}
                            >
                              Cambiar
                            </Button>
                          </Box>
                        )}
                      </Box>
                    </DialogContent>
                  )}
                </Formik>
              </Dialog>
            </ListItem>
          </List>
        </Paper>
      </Box>
    </Box>
  );
};
