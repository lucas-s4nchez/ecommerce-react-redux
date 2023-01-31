import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { NotAuthenticatedRoutes } from "../../src/router/NotAuthenticatedRoutes";

describe("Pruebas en <AuthenticatedRoutes/>", () => {
  test("Si el usuario está no autenticado se renderiza el contenido ", () => {
    render(
      <MemoryRouter initialEntries={["/login"]}>
        <NotAuthenticatedRoutes status="not-authenticated">
          <h1>Soy el contenido</h1>
        </NotAuthenticatedRoutes>
      </MemoryRouter>
    );

    expect(screen.getByText("Soy el contenido")).toBeTruthy();
  });

  test("Si el usuario está autenticado navega al home page ", () => {
    render(
      <MemoryRouter initialEntries={["/login"]}>
        <Routes>
          <Route
            path="/login"
            element={
              <NotAuthenticatedRoutes status="authenticated">
                <h1>Login Page</h1>
              </NotAuthenticatedRoutes>
            }
          />
          <Route path="/" element={<h1>Home Page</h1>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Home Page")).toBeTruthy();
  });
});
