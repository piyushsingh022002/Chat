import { useState } from "react";
import styled from "styled-components";
import api from "../services/api";
import { useAuth } from "../contexts/AuthContext";

const Container = styled.div`
  padding: 2rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  margin: 0.5rem 0;
  display: block;
  width: 100%;
`;

const Button = styled.button`
  padding: 0.6rem 1rem;
  background-color: #0077ff;
  color: white;
  border: none;
  margin-top: 1rem;
  cursor: pointer;
`;

export default function Register() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const response = await api.post("/auth/register", {
        email,
        username,
        password,
      });
      login(response.data.token); // log the user in automatically
    } catch (err) {
      alert("Registration failed. Check console.");
      console.error(err);
    }
  };

  return (
    <Container>
      <h2>Create an Account</h2>
      <Input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={handleRegister}>Register</Button>
    </Container>
  );
}
