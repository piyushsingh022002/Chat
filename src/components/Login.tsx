import { useState } from 'react';
import styled from 'styled-components';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Box = styled.div`padding: 2rem;`;
const Input = styled.input`padding: 0.5rem; margin-bottom: 1rem; display: block;`;

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
  try {
    const res = await api.post("/auth/login", { email, password });
    login(res.data.token);
    navigate("/chat");
  } catch (err) {
    alert("Login failed");
    console.error(err);
  }
};


  return (
    <Box>
      <h2>Login</h2>
      <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
      <p style={{ marginTop: "1rem" }}>
  Don’t have an account? <Link to="/register">Register</Link>
</p>

    </Box>
  );
}
