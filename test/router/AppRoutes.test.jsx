import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { useCheckAuth } from "../../src/hooks";
import { AppRoutes } from "../../src/router/AppRoutes";

jest.mock("../../src/hooks/useCheckAuth");

jest.mock("../../src/pages/home/HomePage", () => ({
  HomePage: () => <h1>Home Page</h1>,
}));

jest.mock("../../src/components/navbar/Navbar", () => ({
  Navbar: () => <h1>Navbar</h1>,
}));

jest.mock("../../src/components/footer/Footer", () => ({
  Footer: () => <h1>Footer</h1>,
}));

describe("Pruebas en <AppRoutes/>", () => {
  test('Si el status está en "checking" debe de mostrar el <CircularProgress/>', () => {
    useCheckAuth.mockReturnValue("checking");

    render(<AppRoutes />);

    expect(screen.findByTestId("circular-progress")).toBeTruthy();
  });

  test('Si el status está en "authenticated" debe de mostrar  <HomePage/>', () => {
    useCheckAuth.mockReturnValue("authenticated");

    render(
      <MemoryRouter>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(screen.getByText("Navbar")).toBeTruthy();
    expect(screen.getByText("Home Page")).toBeTruthy();
    expect(screen.getByText("Footer")).toBeTruthy();
  });
});
