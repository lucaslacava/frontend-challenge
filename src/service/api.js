const BASE_URL = "http://localhost:3001/api";

export const fetchColors = async () => {
  const res = await fetch(`${BASE_URL}/colors`);
  if (!res.ok) throw new Error("Failed to fetch colors");
  return res.json();
};

export const submitForm = async (formData) => {
  const res = await fetch(`${BASE_URL}/submit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!res.ok) {
    throw new Error("Submission failed");
  }
};
