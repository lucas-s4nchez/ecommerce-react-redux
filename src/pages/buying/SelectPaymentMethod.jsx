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
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import AddCardIcon from "@mui/icons-material/AddCard";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import SaveIcon from "@mui/icons-material/Save";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import { CreditCard } from "../../components/creditCard/CreditCard";
import { startAddingNewCard } from "../../store/user/userThunks";
import { setPaymentMethod } from "../../store/user/userSlice";

const months = [
  { value: 1, text: "Enero" },
  { value: 2, text: "Febrero" },
  { value: 3, text: "Marzo" },
  { value: 4, text: "Abril" },
  { value: 5, text: "Mayo" },
  { value: 6, text: "Junio" },
  { value: 7, text: "Julio" },
  { value: 8, text: "Agosto" },
  { value: 9, text: "Septiembre" },
  { value: 10, text: "Octubre" },
  { value: 11, text: "Noviembre" },
  { value: 12, text: "Diciembre" },
];
const years = [
  { value: 23, text: "2023" },
  { value: 24, text: "2024" },
  { value: 25, text: "2025" },
  { value: 26, text: "2026" },
  { value: 27, text: "2027" },
  { value: 28, text: "2028" },
  { value: 29, text: "2029" },
  { value: 30, text: "2030" },
  { value: 31, text: "2031" },
  { value: 32, text: "2032" },
];
const cashPaymentMethods = [
  {
    id: "pago5678",
    name: "Pago Fácil",
    image: "../pago-facil-icon.png",
    description: "Acreditación en 1 día hábil",
  },
  {
    id: "rapi1234",
    name: "Rapipago",
    image: "../rapipago-icon.png",
    description: "Acreditación instantánea",
  },
  {
    id: "mercado9182",
    name: "Mercado Pago",
    image: "../mercado-pago-icon.png",
    description: "Acreditación instantánea",
  },
];

const numberRegex = /^\d*$/;
const nameRegex = /[a-zA-Z]$/;

export const SelectPaymentMethod = () => {
  const { cards, paymentMethod, activeAddress } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [rotateCard, setRotateCard] = useState(false);
  const { getFieldProps, handleSubmit, handleReset, errors, touched, values } =
    useFormik({
      initialValues: {
        number: "",
        name: "",
        expiryMonth: "",
        expiryYear: "",
        cvc: "",
      },
      validationSchema: Yup.object({
        number: Yup.string()
          .required("Campo requerido")
          .length(16, "Completa el número")
          .matches(numberRegex, "No es un númro válido"),
        name: Yup.string()
          .required("Campo requerido")
          .matches(nameRegex, "No es un nombre válido")
          .min(3, "Mínimo 3 caracteres")
          .max(30, "Máximo 30 caracteres"),
        expiryMonth: Yup.number().required("Campo requerido"),
        expiryYear: Yup.number().required("Campo requerido"),
        cvc: Yup.string()
          .required("Campo requerido")
          .matches(numberRegex, "No es un cvc válido")
          .min(3, "Mínimo 3 caracteres"),
      }),
      onSubmit: (values, { resetForm }) => {
        dispatch(startAddingNewCard(values));
        handleCloseForm();
        resetForm();
      },
      onReset: () => {
        handleCloseForm();
      },
    });

  const handleRotateBackCard = () => {
    setRotateCard(true);
  };
  const handleRotateFrontCard = () => {
    setRotateCard(false);
  };
  const handleOpenForm = () => {
    setOpen(true);
  };
  const handleCloseForm = () => {
    setOpen(false);
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 2,
      }}
    >
      <Typography sx={{ fontWeight: "bolder" }}>
        ¿Cómo quieres pagar?
      </Typography>
      <Box
        sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}
      >
        <Box>
          <Typography sx={{ marginBlock: 2 }}>Tarjetas</Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {cards.length < 1 ? (
              <Alert severity="info" variant="filled">
                No tienes ninguna tarjeta, agregá una
              </Alert>
            ) : (
              cards.map((card) => {
                return (
                  <Box
                    sx={{
                      padding: { xs: 1, sm: 2 },
                      display: "flex",
                      gap: 1,
                      borderRadius: "10px",
                      border: "1px solid #adadad",
                    }}
                    key={card.id}
                  >
                    <Box>
                      <CreditCardIcon />
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
                        Terminada en {card.number.split("").splice(12)}
                      </Typography>
                      <Box>
                        <Typography
                          sx={{
                            textTransform: "capitalize",
                            fontSize: "12px",
                            color: "GrayText",
                          }}
                        >
                          Vencimiento:{" "}
                          {card.expiryMonth < 10
                            ? `0${card.expiryMonth}`
                            : card.expiryMonth}
                          /{card.expiryYear}
                        </Typography>
                      </Box>
                      {paymentMethod && paymentMethod.id === card.id ? (
                        <Alert
                          severity="success"
                          variant="filled"
                          sx={{ justifyContent: "center" }}
                        >
                          Método de pago Seleccionado
                        </Alert>
                      ) : (
                        <Button
                          variant="contained"
                          sx={{ alignSelf: "flex-end" }}
                          onClick={() => {
                            dispatch(setPaymentMethod(card));
                          }}
                        >
                          Elegir
                        </Button>
                      )}
                    </Box>
                  </Box>
                );
              })
            )}
          </Box>
          <Button
            startIcon={<AddCardIcon />}
            sx={{ marginBlock: 1 }}
            onClick={handleOpenForm}
          >
            Agregar nueva tarjeta
          </Button>
          <Dialog open={open}>
            <DialogTitle>Nueva Tarjeta</DialogTitle>
            <DialogContent>
              <DialogContentText>
                No utilices tu información verdadera, este sitio web es un
                proyecto personal
              </DialogContentText>
              <CreditCard
                number={values.number}
                name={values.name}
                expiryMonth={values.expiryMonth}
                expiryYear={values.expiryYear}
                cvc={values.cvc}
                rotateCard={rotateCard}
              />
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
                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    flexDirection: { xs: "column", sm: "row" },
                  }}
                >
                  <TextField
                    label="Número de la tarjeta"
                    variant="outlined"
                    fullWidth
                    inputProps={{
                      maxLength: 16,
                    }}
                    {...getFieldProps("number")}
                    error={errors.number && touched.number}
                    helperText={touched.number && errors.number}
                  />
                  <TextField
                    label="Nombre del titular"
                    variant="outlined"
                    fullWidth
                    {...getFieldProps("name")}
                    error={errors.name && touched.name}
                    helperText={touched.name && errors.name}
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    flexDirection: { xs: "column", sm: "row" },
                  }}
                >
                  <TextField
                    label="Mes de vencimiento"
                    variant="outlined"
                    fullWidth
                    select
                    {...getFieldProps("expiryMonth")}
                    error={errors.expiryMonth && touched.expiryMonth}
                    helperText={touched.expiryMonth && errors.expiryMonth}
                  >
                    {months.map((month) => {
                      return (
                        <MenuItem key={month.value} value={month.value}>
                          {month.text}
                        </MenuItem>
                      );
                    })}
                  </TextField>
                  <TextField
                    label="Año de vencimiento"
                    variant="outlined"
                    fullWidth
                    select
                    {...getFieldProps("expiryYear")}
                    error={errors.expiryYear && touched.expiryYear}
                    helperText={touched.expiryYear && errors.expiryYear}
                  >
                    {years.map((year) => {
                      return (
                        <MenuItem key={year.value} value={year.value}>
                          {year.text}
                        </MenuItem>
                      );
                    })}
                  </TextField>
                </Box>

                <TextField
                  label="CVC"
                  variant="outlined"
                  fullWidth
                  inputProps={{
                    maxLength: 3,
                  }}
                  onMouseEnter={handleRotateBackCard}
                  onMouseLeave={handleRotateFrontCard}
                  {...getFieldProps("cvc")}
                  error={errors.cvc && touched.cvc}
                  helperText={touched.cvc && errors.cvc}
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
        </Box>
        <Box>
          <Typography sx={{ marginBlock: 2 }}>En efectivo</Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {cashPaymentMethods.map((item) => {
              return (
                <Box
                  sx={{
                    padding: { xs: 1, sm: 2 },
                    display: "flex",
                    gap: 1,
                    borderRadius: "10px",
                    border: "1px solid #adadad",
                  }}
                  key={item.id}
                >
                  <Box
                    component="img"
                    src={item.image}
                    sx={{ width: "50px", objectFit: "contain" }}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 1,
                      width: "100%",
                    }}
                  >
                    <Typography>{item.name}</Typography>
                    <Box>
                      <Typography
                        sx={{
                          textTransform: "capitalize",
                          fontSize: "12px",
                          color: "GrayText",
                        }}
                      >
                        {item.description}
                      </Typography>
                    </Box>
                    {paymentMethod && paymentMethod.id === item.id ? (
                      <Alert
                        severity="success"
                        variant="filled"
                        sx={{ justifyContent: "center" }}
                      >
                        Método de pago Seleccionado
                      </Alert>
                    ) : (
                      <Button
                        variant="contained"
                        sx={{ alignSelf: "flex-end" }}
                        onClick={() => {
                          dispatch(setPaymentMethod(item));
                        }}
                      >
                        Elegir
                      </Button>
                    )}
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
