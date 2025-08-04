import { useState } from "react";
import styled from "styled-components";
import api from "../services/api";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

const Container = styled.div`
display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin: 2rem 2rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  margin: 0.5rem 0;
  display: block;
  width: 100%;
  border:none;
  border-radius: 4px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  font-size: 1rem;
`;

const Button = styled.button`
disaply: flex;
  width: 35%;
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
      <p style={{ marginTop: "1rem" }}>
  Already have an account? <Link to="/login">Login</Link>
</p>

    </Container>
  );
}
