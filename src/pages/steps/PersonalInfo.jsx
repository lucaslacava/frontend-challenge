import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { Title } from "@/components/layout/Title";
import { useForm } from "@/context/FormContext";
import { isValidEmail } from "@/lib/utils";

export const PersonalInfo = () => {
  const navigate = useNavigate();
  const { setFormData, formData } = useForm();

  const [name, setName] = useState(formData.name || "");
  const [email, setEmail] = useState(formData.email || "");
  const [password, setPassword] = useState(formData.password || "");

  const isNextDisabled = !name || !isValidEmail(email) || !password;
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isNextDisabled) return;
    setFormData((prev) => ({
      ...prev,
      name,
      email,
      password,
    }));
    navigate("/more-info");
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-2">
      <PageWrapper onNext={handleSubmit} isNextDisabled={isNextDisabled}>
        <Title>Sign Up</Title>
        <Input
          placeholder="First name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          name="firstName"
          required
        />
        <Input
          placeholder="E-mail"
          value={email}
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={email && !isValidEmail(email)}
          required
        />
        {email && !isValidEmail(email) && (
          <p className="text-red-500 text-xs text-left w-full">
            Please enter a valid email address
          </p>
        )}
        <Input
          placeholder="Password"
          value={password}
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </PageWrapper>
    </form>
  );
};
