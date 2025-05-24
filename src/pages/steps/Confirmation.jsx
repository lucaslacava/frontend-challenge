import { useNavigate } from "react-router-dom";
import { useForm } from "@/context/FormContext";
import { useState } from "react";
import { capitalizeFirstLetter } from "@/lib/utils";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { Title } from "@/components/layout/Title";
import { submitForm } from "@/service/api";

export const Confirmation = () => {
  const navigate = useNavigate();
  const { formData } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await submitForm(formData);
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
      <ul className="list-disc pl-6 w-full">
        <li>
          <strong>First Name: </strong> {formData.name}
        </li>
        <li>
          <strong>E-mail: </strong> {formData.email}
        </li>
        <li>
          <strong>Password: </strong>
          {formData.password && "•".repeat(formData.password.length)}
        </li>
        <li>
          <strong>Favorite Color:</strong>{" "}
          {capitalizeFirstLetter(formData.color)}
        </li>
        <li>
          <strong>Terms and Conditions: </strong>
          {formData.terms ? "Agreed" : "Disagreed"}
        </li>
      </ul>
    </PageWrapper>
  );
};
