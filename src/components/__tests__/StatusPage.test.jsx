import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { StatusPage } from "../layout/StatusPage";
import { useForm } from "@/context/FormContext";
import { useNavigate } from "react-router-dom";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

jest.mock("@/context/FormContext", () => ({
  useForm: jest.fn(),
}));

describe("StatusPage", () => {
  const mockResetForm = jest.fn();
  const mockNavigate = jest.fn();

  beforeEach(() => {
    useForm.mockReturnValue({ resetForm: mockResetForm });
    useNavigate.mockReturnValue(mockNavigate);
  });

  it("renders success icon and green color", () => {
    render(
      <StatusPage
        type="success"
        title="Success!"
        message="You should receive a confirmation email soon."
      />
    );
    expect(screen.getByText("Success!")).toBeInTheDocument();
    expect(
      screen.getByText("You should receive a confirmation email soon.")
    ).toBeInTheDocument();
    expect(screen.getByTestId("icon-success")).toBeInTheDocument();
  });

  it("renders error icon and red color", () => {
    render(
      <StatusPage
        type="error"
        title="Error!"
        message="Uh oh, something went wrong. Please try again later."
      />
    );
    expect(screen.getByText("Error!")).toBeInTheDocument();
    expect(
      screen.getByText("Uh oh, something went wrong. Please try again later.")
    ).toBeInTheDocument();
    expect(screen.getByTestId("icon-error")).toBeInTheDocument();
  });

  it("calls custom onButtonClick when provided", () => {
    const customHandler = jest.fn();
    render(
      <StatusPage
        type="success"
        title="Done"
        message="It worked"
        onButtonClick={customHandler}
      />
    );
    fireEvent.click(screen.getByRole("button", { name: /restart/i }));
    expect(customHandler).toHaveBeenCalled();
  });

  it("calls navigate and resetForm on default button click", () => {
    render(<StatusPage type="error" title="Error" message="Restart" />);
    fireEvent.click(screen.getByRole("button", { name: /restart/i }));
    expect(mockNavigate).toHaveBeenCalledWith("/");
    expect(mockResetForm).toHaveBeenCalled();
  });
});
