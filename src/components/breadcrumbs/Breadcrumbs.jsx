import { Link as RouterLink, useLocation } from "react-router-dom";
import { Box, Link, Typography, Breadcrumbs } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import HomeIcon from "@mui/icons-material/Home";

const breadcrumbNameMap = {
  "/offers": "Ofertas",
  "/favorites": "Favoritos",
  "/purchases": "Mis compras",
  "/account": "Mi cuenta",
  "/login": "Iniciar sesión",
  "/register": "Crear cuenta",
};

function LinkRouter(props) {
  return <Link {...props} component={RouterLink} />;
}

export default function RouterBreadcrumbs() {
  const location = useLocation();

  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <Box sx={{ padding: "20px 0" }}>
      <Breadcrumbs
        aria-label="breadcrumb"
        separator={<NavigateNextIcon fontSize="small" />}
        sx={{ fontSize: "14px" }}
      >
        <LinkRouter
          underline="none"
          color="inherit"
          to="/"
          sx={{ display: "flex", alignItems: "center" }}
        >
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Inicio
        </LinkRouter>
        {pathnames.map((value, index) => {
          const last = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;

          return last ? (
            <Typography color="primary.main" key={to} sx={{ fontSize: "14px" }}>
              {breadcrumbNameMap[to]}
            </Typography>
          ) : (
            <LinkRouter
              color="inherit"
              to={to}
              key={to}
              sx={{ fontSize: "14px" }}
            >
              {breadcrumbNameMap[to]}
            </LinkRouter>
          );
        })}
      </Breadcrumbs>
    </Box>
  );
}
