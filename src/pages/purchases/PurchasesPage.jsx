import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Alert,
  Box,
  Button,
  CardMedia,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import { RouterBreadcrumbs } from "../../components/breadcrumbs/Breadcrumbs";

import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import CheckIcon from "@mui/icons-material/Check";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import RateReviewIcon from "@mui/icons-material/RateReview";
import { formatPrice } from "../../helpers/formatPrice";
import { startAddingNewReview } from "../../store/user/userThunks";
import { useNavigate } from "react-router-dom";
import { PurchasesItemsSkeleton } from "./PurchaseSkeletonLoader";

const labels = {
  1: "Inutil",
  2: "Malo",
  3: "Bueno",
  4: "Muy bueno",
  5: "Excelente",
};

export const PurchasesPage = () => {
  const { isLoading, purchases } = useSelector((state) => state.user);
  const { displayName } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState("");
  const {
    getFieldProps,
    handleSubmit,
    handleReset,
    handleChange,
    errors,
    touched,
    values,
  } = useFormik({
    initialValues: {
      rating: 0,
      review: "",
    },
    validationSchema: Yup.object({
      rating: Yup.number()
        .required("Campo requerido")
        .min(1, "Campo requerido"),
      review: Yup.string()
        .required("Campo requerido")
        .min(5, "Mínimo 5 caracteres")
        .max(250, "Máximo 250 caracteres"),
    }),
    onSubmit: (values, { resetForm }) => {
      values.rating = Number(values.rating);
      const newProduct = {
        id: currentProduct.productId,
        purchaseId: currentProduct.id,
        date: new Date().getTime(),
        comment: values.review,
        rating: values.rating,
        userName: displayName,
      };
      dispatch(startAddingNewReview(newProduct));
      resetForm();
      setOpen(false);
    },
    onReset: () => {
      setOpen(false);
    },
  });
  const handleAddReview = (item) => {
    setOpen(true);
    setCurrentProduct(item);
  };

  return (
    <>
      <RouterBreadcrumbs />
      <Box
        sx={{ display: "flex", minHeight: "100vh", gap: 2, marginBottom: 5 }}
      >
        <Box
          sx={{
            padding: "10px",
            paddingBlock: "30px",
            width: "100%",
            height: "100%",
            borderRadius: "10px",
            border: "1px solid #adadad",
            backgroundColor: "white.main",
          }}
        >
          {isLoading ? (
            <PurchasesItemsSkeleton />
          ) : purchases.length < 1 ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                padding: 3,
                alignItems: "center",
                gap: 1,
              }}
            >
              <Typography>Aún no compraste nada</Typography>
              <Typography sx={{ fontSize: "14px", textAlign: "center" }}>
                Échale un vistazo a nuestros productos mas destacados
              </Typography>
              <Button variant="contained" onClick={() => navigate("/featured")}>
                Ir a productos destacados
              </Button>
            </Box>
          ) : (
            purchases.map((item, index) => {
              return (
                <Box
                  sx={{
                    width: "100%",
                    paddingBlock: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                  }}
                  key={index}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        gap: 2,
                      }}
                    >
                      <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                        <CardMedia
                          component="img"
                          height="auto"
                          image={item.image}
                          alt="Zapatilla"
                          sx={{
                            width: "100px",
                            objectFit: "contain",
                            transition: "transform .3s ease",
                          }}
                        />
                        <Box>
                          <Typography
                            sx={{ fontSize: { xs: "14px", sm: "16px" } }}
                          >{`${item.brand} ${item.model} ${item.version}`}</Typography>
                          <Typography
                            sx={{
                              fontSize: { xs: "14px", sm: "16px" },
                              color: "GrayText",
                            }}
                          >
                            {`Color: ${item.colors
                              .toString()
                              .split(",")
                              .join("/")}`}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: { xs: "14px", sm: "16px" },
                              color: "GrayText",
                            }}
                          >{`Talle: ${item.size} `}</Typography>
                          <Box
                            sx={{
                              display: "flex",
                              gap: 1,
                              color: "green.main",
                              alignItems: "center",
                            }}
                          >
                            <Typography
                              sx={{ fontSize: { xs: "12px", sm: "14px" } }}
                            >
                              Envío Gratis
                            </Typography>
                            <LocalShippingOutlinedIcon
                              sx={{ fontSize: "20px" }}
                            />
                          </Box>

                          <Typography>{formatPrice(item.price)}</Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    {item.waitingToReceiveRating ? (
                      <Button
                        variant="contained"
                        color="success"
                        sx={{ gap: 1 }}
                        onClick={() => handleAddReview(item)}
                      >
                        Deja una calificación <RateReviewIcon />
                      </Button>
                    ) : (
                      <Alert severity="success">
                        Gracias por calificar nuestro producto :)
                      </Alert>
                    )}
                  </Box>
                  <Divider />
                </Box>
              );
            })
          )}
          <Dialog
            open={open}
            sx={{
              "& .css-1t1j96h-MuiPaper-root-MuiDialog-paper": { width: "100%" },
            }}
          >
            <DialogTitle sx={{ textAlign: "center" }}>
              Califica tu compra :)
            </DialogTitle>
            <DialogContent sx={{ width: "100%", maxWidth: "600px" }}>
              <Box
                component={"form"}
                onSubmit={handleSubmit}
                onReset={handleReset}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  marginBlock: 2,
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      flexDirection: { xs: "column-reverse", sm: "row" },
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Rating
                      size="large"
                      name="rating"
                      value={parseInt(values.rating)}
                      onChange={handleChange}
                      helpertext="jiji"
                      // {...getFieldProps("rating")}
                    />
                    <Box sx={{ ml: { sm: 2 } }}>{labels[values.rating]}</Box>
                  </Box>
                  {errors.rating && touched.rating ? (
                    <Typography
                      sx={{
                        color: "#ff1744",
                        fontWeight: 400,
                        fontSize: "0.75rem",
                        lineHeight: 1.66,
                        letterSpacing: "0.03333em",
                        textAlign: "left",
                        marginTop: "3px",
                        marginRight: "14px",
                        marginBottom: 0,
                        marginLeft: "14px",
                      }}
                    >
                      {errors.rating}
                    </Typography>
                  ) : null}
                </Box>
                <TextField
                  label="Escribe tu reseña"
                  multiline
                  fullWidth
                  inputProps={{
                    maxLength: 250,
                  }}
                  {...getFieldProps("review")}
                  error={errors.review && touched.review}
                  helperText={touched.review && errors.review}
                />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: {
                      xs: "column",
                      sm: "row-reverse",
                      gap: "10px",
                    },
                    justifyContent: "flex-end",
                  }}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    endIcon={<CheckIcon />}
                  >
                    Confirmar
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
      </Box>
    </>
  );
};
