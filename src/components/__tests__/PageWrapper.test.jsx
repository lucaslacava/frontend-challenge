import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { PageWrapper } from "../layout/PageWrapper";

describe("PageWrapper", () => {
  it("renders children", () => {
    render(<PageWrapper>Sign up</PageWrapper>);
    expect(screen.getByText("Sign up")).toBeInTheDocument();
  });

  it("renders and triggers Back button", () => {
    const onBack = jest.fn();
    render(<PageWrapper onBack={onBack}>Additional Info</PageWrapper>);
    fireEvent.click(screen.getByText("Back"));
    expect(onBack).toHaveBeenCalled();
  });

  it("renders and triggers Next button", () => {
    const onNext = jest.fn();
    render(<PageWrapper onNext={onNext}>Additional Info</PageWrapper>);
    fireEvent.click(screen.getByText("Next"));
    expect(onNext).toHaveBeenCalled();
  });

  it("disables buttons when loading", () => {
    render(
      <PageWrapper onNext={() => {}} onBack={() => {}} isLoading>
        Loading
      </PageWrapper>
    );
    expect(screen.getByText("Loading...")).toBeInTheDocument();
    expect(screen.getByText("Back")).toBeDisabled();
  });
});
