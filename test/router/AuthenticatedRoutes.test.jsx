import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { AuthenticatedRoutes } from "../../src/router/AuthenticatedRoutes";

describe("Pruebas en <AuthenticatedRoutes/>", () => {
  test("Si el usuario está autenticado se renderiza el contenido ", () => {
    render(
      <MemoryRouter initialEntries={["/cart"]}>
        <AuthenticatedRoutes status="authenticated">
          <h1>Soy el contenido</h1>
        </AuthenticatedRoutes>
      </MemoryRouter>
    );

    expect(screen.getByText("Soy el contenido")).toBeTruthy();
  });

  test("Si el usuario no está autenticado navega al login page ", () => {
    render(
      <MemoryRouter initialEntries={["/cart"]}>
        <Routes>
          <Route
            path="/cart"
            element={
              <AuthenticatedRoutes status="not-authenticated">
                <h1>Soy el Carrito de compras</h1>
              </AuthenticatedRoutes>
            }
          />
          <Route path="/login" element={<h1>Login Page</h1>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Login Page")).toBeTruthy();
  });
});
