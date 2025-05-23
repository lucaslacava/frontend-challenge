import Input from "../components/input";
import Button from "../components/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const PersonalInfo = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  return (
    <div>
      <h1>Sign Up</h1>
      <main>
        <Input
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="primary" onClick={() => navigate("/more-info")}>
          Next
        </Button>
      </main>
    </div>
  );
};
