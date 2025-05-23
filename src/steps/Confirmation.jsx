import { useNavigate } from "react-router-dom";
import { PageWrapper } from "../components/PageWrapper";
import { Title } from "../components/Title";
import { useForm } from "../context/FormContext";
import { useState } from "react";
import { capitalizeFirstLetter } from "../lib/utils";
import { SUBMIT_FORM } from "../api";

export const Confirmation = () => {
  const navigate = useNavigate();
  const { formData } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(SUBMIT_FORM, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      navigate("/success");
    } catch (error) {
      console.error(error);
      navigate("/error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageWrapper
      onBack={() => navigate("/more-info")}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      aria-busy={isLoading}
    >
      <Title>Confirmation</Title>
      <ul className="list-disc pl-6">
        <li>
          <strong>Name:</strong> {formData.name}
        </li>
        <li>
          <strong>Email:</strong> {formData.email}
        </li>
        <li>
          <strong>Password:</strong>
          {formData.password && "•".repeat(formData.password.length)}
        </li>
        <li>
          <strong>Favorite Color:</strong>{" "}
          {capitalizeFirstLetter(formData.color)}
        </li>
        <li>
          <strong>Accepted Terms:</strong>
          {formData.terms ? "Agreed" : "Disagreed"}
        </li>
      </ul>
    </PageWrapper>
  );
};
