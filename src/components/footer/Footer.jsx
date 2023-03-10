import { useMemo } from "react";
import { Link as RouterLink } from "react-router-dom";

import { Wrapper } from "../../styles/Wrapper";
import {
  FooterContainerStyled,
  FooterCopyrightStyled,
  FooterItemContainerStyled,
  FooterItemTitleStyled,
} from "./FooterStyles";

import { Link, Typography, Box } from "@mui/material";

import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import { useSelector } from "react-redux";

export const Footer = () => {
  const { status } = useSelector((state) => state.auth);
  const isAuthenticated = useMemo(() => status === "authenticated", [status]);
  return (
    <Box sx={{ backgroundColor: "secondary.main" }}>
      <Wrapper>
        <FooterContainerStyled>
          <FooterItemContainerStyled>
            <FooterItemTitleStyled variant="h3">Contacto</FooterItemTitleStyled>
            <Typography>
              <Typography fontWeight="bold" variant="span">
                Direccion:{" "}
              </Typography>
              Av. Dibu Martínez 1812
            </Typography>
            <Typography>
              <Typography fontWeight="bold" variant="span">
                Telefono:{" "}
              </Typography>
              2183621733213
            </Typography>
            <Typography>
              <Typography fontWeight="bold" variant="span">
                Horario:{" "}
              </Typography>
              Lun - Vie de 09:00 a 18:00
            </Typography>
          </FooterItemContainerStyled>

          <FooterItemContainerStyled>
            <FooterItemTitleStyled variant="h3">
              Mi cuenta
            </FooterItemTitleStyled>
            {isAuthenticated ? (
              <>
                <Link
                  sx={{ textDecoration: "none", color: "white.cream" }}
                  component={RouterLink}
                  to="/purchases"
                >
                  Mis compras
                </Link>
                <Link
                  sx={{ textDecoration: "none", color: "white.cream" }}
                  component={RouterLink}
                  to="/cart"
                >
                  Carrito
                </Link>
                <Link
                  sx={{ textDecoration: "none", color: "white.cream" }}
                  component={RouterLink}
                  to="/favorites"
                >
                  Favoritos
                </Link>
                <Link
                  sx={{ textDecoration: "none", color: "white.cream" }}
                  component={RouterLink}
                  to="/account"
                >
                  Ajustes
                </Link>
              </>
            ) : (
              <>
                <Link
                  sx={{ textDecoration: "none", color: "white.cream" }}
                  component={RouterLink}
                  to="/login"
                >
                  Iniciar sesión
                </Link>
                <Link
                  sx={{ textDecoration: "none", color: "white.cream" }}
                  component={RouterLink}
                  to="/register"
                >
                  Registrarse
                </Link>
              </>
            )}
          </FooterItemContainerStyled>

          <FooterItemContainerStyled>
            <FooterItemTitleStyled variant="h3">
              Acerca de
            </FooterItemTitleStyled>
            <Typography>Quienes somos</Typography>
            <Typography>Políticas de privacidad</Typography>
            <Typography>Términos y condiciones</Typography>
          </FooterItemContainerStyled>

          <FooterItemContainerStyled>
            <FooterItemTitleStyled variant="h3">Síguenos</FooterItemTitleStyled>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Link href="https://instagram.com" target="_blank">
                <InstagramIcon />
              </Link>
              <Link href="https://facebook.com" target="_blank">
                <FacebookIcon />
              </Link>
              <Link href="https://twitter.com" target="_blank">
                <TwitterIcon />
              </Link>
            </Box>
          </FooterItemContainerStyled>
        </FooterContainerStyled>
        <Typography
          sx={{
            color: "HighlightText",
            margin: 0,
            textAlign: "center",
            fontSize: "14px",
          }}
        >
          Este sitio web no tiene como objetivo vender nada, es un proyecto
          personal para demostrar mis habilidades. Por favor no utilices
          información real
        </Typography>
        <FooterCopyrightStyled>
          Sitio diseñado por{" "}
          <Typography
            sx={{ textDecoration: "none" }}
            component={Link}
            href="https://github.com/lucas-s4nchez"
            target="_blank"
          >
            Lucas Sánchez
          </Typography>
        </FooterCopyrightStyled>
      </Wrapper>
    </Box>
  );
};
