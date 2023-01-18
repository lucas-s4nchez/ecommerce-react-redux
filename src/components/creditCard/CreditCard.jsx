import { Box, Typography } from "@mui/material";
import {
  BackCardStyled,
  CardContainerStyled,
  FrontCardStyled,
} from "./CreditCardStyled";

export const CreditCard = ({
  number,
  name,
  expiryMonth,
  expiryYear,
  cvc,
  rotateCard,
}) => {
  const numberFormatted = number.split("");
  return (
    <CardContainerStyled>
      <FrontCardStyled rotateCard={rotateCard}>
        <Typography
          sx={{
            fontWeight: "bolder",
            color: "white.main",
            fontSize: { xs: 30, sm: 40 },
          }}
        >
          Tarjeta
        </Typography>
        <Box sx={{ height: "auto" }}>
          <Box
            component="img"
            src="./chip.png"
            sx={{ width: { xs: 25, sm: 45 } }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: 1,
            color: "white.main",
          }}
        >
          <Box>
            <Typography
              sx={{ letterSpacing: 2, fontSize: { xs: "12px", sm: "16px" } }}
            >
              {numberFormatted[0] ? numberFormatted[0] : "*"}
              {numberFormatted[1] ? numberFormatted[1] : "*"}
              {numberFormatted[2] ? numberFormatted[2] : "*"}
              {numberFormatted[3] ? numberFormatted[3] : "*"}
            </Typography>
          </Box>
          <Box>
            <Typography
              sx={{ letterSpacing: 2, fontSize: { xs: "12px", sm: "16px" } }}
            >
              {numberFormatted[4] ? numberFormatted[4] : "*"}
              {numberFormatted[5] ? numberFormatted[5] : "*"}
              {numberFormatted[6] ? numberFormatted[6] : "*"}
              {numberFormatted[7] ? numberFormatted[7] : "*"}
            </Typography>
          </Box>
          <Box>
            <Typography
              sx={{ letterSpacing: 2, fontSize: { xs: "12px", sm: "16px" } }}
            >
              {numberFormatted[8] ? numberFormatted[8] : "*"}
              {numberFormatted[9] ? numberFormatted[9] : "*"}
              {numberFormatted[10] ? numberFormatted[10] : "*"}
              {numberFormatted[11] ? numberFormatted[11] : "*"}
            </Typography>
          </Box>
          <Box>
            <Typography
              sx={{ letterSpacing: 2, fontSize: { xs: "12px", sm: "16px" } }}
            >
              {numberFormatted[12] ? numberFormatted[12] : "*"}
              {numberFormatted[13] ? numberFormatted[13] : "*"}
              {numberFormatted[14] ? numberFormatted[14] : "*"}
              {numberFormatted[15] ? numberFormatted[15] : "*"}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography sx={{ fontSize: "10px", color: "white.main" }}>
            Vencimiento
          </Typography>
          <Box
            sx={{
              display: "flex",
              color: "white.main",
              fontSize: { xs: "12px", sm: "16px" },
            }}
          >
            <Typography sx={{ fontSize: { xs: "12px", sm: "16px" } }}>
              {expiryMonth && expiryMonth < 10
                ? `0${expiryMonth}`
                : expiryMonth}
            </Typography>
            /
            <Typography sx={{ fontSize: { xs: "12px", sm: "16px" } }}>
              {expiryYear}
            </Typography>
          </Box>
        </Box>
        <Typography
          sx={{
            textTransform: "uppercase",
            letterSpacing: 2,
            color: "white.main",
            fontSize: { xs: "12px", sm: "16px" },
          }}
        >
          {name}
        </Typography>
      </FrontCardStyled>
      <BackCardStyled rotateCard={rotateCard}>
        <Box
          sx={{
            width: "100%",
            height: { xs: "30px", sm: "50px" },
            backgroundColor: "#000000",
            marginTop: 3,
          }}
        ></Box>
        <Box
          sx={{
            width: "60%",
            height: { xs: "20px", sm: "30px" },
            backgroundColor: "#ffffff",
            marginLeft: "10px",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Typography
            sx={{ fontFamily: "cursive", fontSize: { xs: "12px", sm: "16px" } }}
          >
            {cvc}
          </Typography>
        </Box>
      </BackCardStyled>
    </CardContainerStyled>
  );
};
