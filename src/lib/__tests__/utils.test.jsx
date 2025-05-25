import { capitalizeFirstLetter, isValidEmail } from "../utils";

describe("capitalizeFirstLetter", () => {
  it("capitalizes the first letter of a word", () => {
    expect(capitalizeFirstLetter("hello")).toBe("Hello");
  });

  it("returns an empty string if input is empty", () => {
    expect(capitalizeFirstLetter("")).toBe("");
  });

  it("does not change already capitalized strings", () => {
    expect(capitalizeFirstLetter("Hello")).toBe("Hello");
  });
});

describe("isValidEmail", () => {
  it("validates a proper email", () => {
    expect(isValidEmail("test@example.com")).toBe(true);
  });

  it("returns false for an invalid email", () => {
    expect(isValidEmail("not-an-email")).toBe(false);
    expect(isValidEmail("missing@domain")).toBe(false);
    expect(isValidEmail("missing.domain@")).toBe(false);
  });

  it("returns false for empty string", () => {
    expect(isValidEmail("")).toBe(false);
  });
});
