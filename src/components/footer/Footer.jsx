import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { Link, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Wrapper } from "../../styles/Wrapper";
import {
  FooterContainerStyled,
  FooterCopyright,
  FooterItemContainerStyled,
  FooterItemTitleStyled,
} from "./FooterStyles";

import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";

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
                {" "}
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

        <FooterCopyright>
          Sitio diseñado por{" "}
          <Typography
            sx={{ textDecoration: "none" }}
            component={Link}
            href="https://github.com/lucas-s4nchez"
            target="_blank"
          >
            Lucas Sánchez
          </Typography>
        </FooterCopyright>
      </Wrapper>
    </Box>
  );
};
