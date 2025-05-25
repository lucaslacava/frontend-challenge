import {
  fillPersonalInfoStep,
  fillMoreInfoStep,
  completeFormFlow,
  validatePersonalInfoStep,
} from "../support/utils/form-utils";

const personalInfoDefault = {
  firstName: "John",
  email: "john.doe@example.com",
  password: "omggreatpassword",
};

const moreInfoDefault = {
  colorIndex: 0,
  acceptTerms: true,
};

describe("Sign up form flow", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should complete the entire form flow successfully", () => {
    completeFormFlow(personalInfoDefault, moreInfoDefault);

    // Verify success page
    cy.url().should("include", "/success");
    cy.contains("You should receive a confirmation email soon.");
  });

  it("should handle form validation", () => {
    // fills form with a non valid email
    fillPersonalInfoStep({ ...personalInfoDefault, email: "john" }, false);

    // Check for validation messages
    cy.get('input[name="email"]').should("have.attr", "aria-invalid", "true");
  });

  it("should handle navigation between steps", () => {
    // Fill first step and goes to second one
    fillPersonalInfoStep(personalInfoDefault);

    // Go back to first step
    cy.get("button").contains("Back").click();
    cy.url().should("eq", Cypress.config().baseUrl + "/");

    // Verify data persistence
    validatePersonalInfoStep(personalInfoDefault);
  });

  it("should handle error state", () => {
    // Mock API error
    cy.intercept("POST", "/api/submit", {
      statusCode: 500,
      body: { error: "Internal Server Error" },
    });

    completeFormFlow(personalInfoDefault, moreInfoDefault);

    // Should show error page
    cy.url().should("include", "/error");
    cy.contains("Uh oh, something went wrong. Please try again later.");
  });

  it("should validate More Info form fields", () => {
    const moreInfo = {
      acceptTerms: false,
    };

    fillPersonalInfoStep(personalInfoDefault);
    fillMoreInfoStep(moreInfo, false);

    // Try to submit without filling required fields
    cy.get('button[type="submit"]').should("be.disabled");

    // Fill form correctly
    fillMoreInfoStep(moreInfoDefault);

    // checks confirmation page
    cy.url().should("include", "/confirmation");
  });
});
