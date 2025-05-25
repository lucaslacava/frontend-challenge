import { fetchColors, submitForm } from "@/service/api";

global.fetch = jest.fn();

describe("fetchColors", () => {
  afterEach(() => jest.clearAllMocks());

  it("fetches colors and returns JSON", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ["red", "green", "blue"],
    });

    const result = await fetchColors();
    expect(fetch).toHaveBeenCalledWith("http://localhost:3001/api/colors");
    expect(result).toEqual(["red", "green", "blue"]);
  });

  it("throws an error if the response is not OK", async () => {
    fetch.mockResolvedValueOnce({ ok: false });

    await expect(fetchColors()).rejects.toThrow("Failed to fetch colors");
  });
});

describe("submitForm", () => {
  afterEach(() => jest.clearAllMocks());

  const mockFormData = { name: "John", email: "john@doe.com" };

  it("submits the form successfully", async () => {
    fetch.mockResolvedValueOnce({ ok: true });

    await submitForm(mockFormData);

    expect(fetch).toHaveBeenCalledWith("http://localhost:3001/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(mockFormData),
    });
  });

  it("throws an error if submission fails", async () => {
    fetch.mockResolvedValueOnce({ ok: false });

    await expect(submitForm(mockFormData)).rejects.toThrow("Submission failed");
  });
});
