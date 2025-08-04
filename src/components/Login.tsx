import { useState } from 'react';
import styled from 'styled-components';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Box = styled.div`
padding: 2rem;
display: flex;
flex-direction: column;
align-items: center;
box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
border-radius: 8px;
margin: 2rem 4rem;
`;
const Input = styled.input`
padding: 0.5rem;
 margin-bottom: 1rem; 
 display: block;
  width: 100%;
  border: none;
 `;

 const LoginButton = styled.button`
 background-color: #8ee0ebff;
 padding: 0.6rem 1rem;
 color: black;
 border-radius: 4px;
  border: none;
  
 `;

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
      <h2 style={{ margin: '2rem', fontFamily:'cursive'}}>Login Here</h2>
      <Input placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input placeholder="Your Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <LoginButton onClick={handleLogin}>Login</LoginButton>
      <p style={{ marginTop: "1rem" }}>
  Don’t have an account? <Link to="/register">Register</Link>
</p>

    </Box>
  );
}
