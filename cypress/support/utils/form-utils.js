/**
 * Fills the personal info step of the form
 * @param {Object} data - The personal info data
 * @param {string} data.firstName - User's first name
 * @param {string} data.email - User's email
 * @param {string} data.password - User's password
 * @param {boolean} shouldSubmit - flag to submit the form
 */
export const fillPersonalInfoStep = (data, shouldSubmit = true) => {
  const { firstName, email, password } = data;

  cy.get('input[name="firstName"]').type(firstName);
  cy.get('input[name="email"]').type(email);
  cy.get('input[name="password"]').type(password);
  shouldSubmit && clickSubmitButton();
};

/**
 * Fills the more info step of the form
 * @param {Object} data - The more info data
 * @param {number} data.colorIndex - Index of the color to select
 * @param {boolean} data.acceptTerms - Whether to accept terms and conditions
 * @param {boolean} shouldSubmit - flag to submit the form
 */
export const fillMoreInfoStep = (data, shouldSubmit = true) => {
  const { colorIndex = 0, acceptTerms = true } = data;

  // Select color if provided
  if (colorIndex !== undefined) {
    cy.get('[role="combobox"]').click();
    cy.get('[role="option"]').eq(colorIndex).click();
  }

  // Handle terms and conditions
  if (acceptTerms) {
    cy.get("#terms").click();
  }
  shouldSubmit && clickSubmitButton();
};

/**
 * Click submit button
 */
export const clickSubmitButton = () => {
  cy.get('button[type="submit"]').click();
};

/**
 * Completes the entire form flow
 * @param {Object} personalInfo - Personal info data
 * @param {Object} moreInfo - More info data
 */
export const completeFormFlow = (personalInfo, moreInfo) => {
  fillPersonalInfoStep(personalInfo);
  fillMoreInfoStep(moreInfo);
  clickSubmitButton();
};

/**
 * Validates the personal info step
 * @param {Object} data - The personal info data to validate
 */
export const validatePersonalInfoStep = (data) => {
  const { firstName, email, password } = data;

  cy.get('input[name="firstName"]').should("have.value", firstName);
  cy.get('input[name="email"]').should("have.value", email);
  cy.get('input[name="password"]').should("have.value", password);
};
