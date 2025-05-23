import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { PageWrapper } from "../components/PageWrapper";
import { Title } from "../components/Title";
import { useForm } from "../context/FormContext";

export const PersonalInfo = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setFormData } = useForm();

  const navigate = useNavigate();

  const handleNextClick = () => {
    setFormData((prev) => ({
      ...prev,
      name,
      email,
      password,
    }));

    navigate("/more-info");
  };

  return (
    <div>
      <PageWrapper onNext={handleNextClick}>
        <Title>Sign Up</Title>
        <Input
          placeholder="First name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Password"
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </PageWrapper>
    </div>
  );
};
