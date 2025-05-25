import "@testing-library/jest-dom";
import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "../ProtectedRoute";
import { FormProvider } from "../../context/FormContext";

// Mock Navigate to intercept redirects
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  Navigate: ({ to }) => <div data-testid="navigate" data-to={to} />,
}));

const renderWithRouter = (ui, { formData = {} } = {}) => {
  return render(
    <BrowserRouter>
      <FormProvider initialData={formData}>{ui}</FormProvider>
    </BrowserRouter>
  );
};

describe("ProtectedRoute", () => {
  it("renders children for personalInfo step", () => {
    renderWithRouter(
      <ProtectedRoute step="personalInfo">
        <div>Protected Content</div>
      </ProtectedRoute>
    );

    expect(screen.getByText("Protected Content")).toBeInTheDocument();
  });

  it("redirects to / for moreInfo step if name/email missing", () => {
    renderWithRouter(
      <ProtectedRoute step="moreInfo">
        <div>Protected Content</div>
      </ProtectedRoute>,
      { formData: {} }
    );

    const redirect = screen.getByTestId("navigate");
    expect(redirect).toHaveAttribute("data-to", "/");
  });

  it.each(["confirmation", "success", "error"])(
    "redirects to / for %s step if required data is missing",
    (step) => {
      renderWithRouter(
        <ProtectedRoute step={step}>
          <div>Protected Content</div>
        </ProtectedRoute>,
        { formData: {} }
      );

      const redirect = screen.getByTestId("navigate");
      expect(redirect).toHaveAttribute("data-to", "/");
    }
  );

  it("redirects to / for unknown step", () => {
    renderWithRouter(
      <ProtectedRoute step="banana">
        <div>Protected Content</div>
      </ProtectedRoute>
    );

    const redirect = screen.getByTestId("navigate");
    expect(redirect).toHaveAttribute("data-to", "/");
  });
});
