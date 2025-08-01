import { useState } from "react";
import { useAuth } from "./contexts/AuthContext";
import ChatRoom from "./components/ChatRoom";
import Login from "./components/Login";
import Register from "./components/Register";
import GlobalStyle from "./styles/GlobalStyles";

export default function App() {
  const { token } = useAuth();
  const [mode, setMode] = useState<"login" | "register">("login");

  if (token) return <ChatRoom />;

  return (
    <>
      <GlobalStyle />
      {mode === "login" ? <Login /> : <Register />}
      <p style={{ textAlign: "center", marginTop: "1rem" }}>
        {mode === "login" ? (
          <span>
            Don't have an account?{" "}
            <button onClick={() => setMode("register")}>Register</button>
          </span>
        ) : (
          <span>
            Already registered?{" "}
            <button onClick={() => setMode("login")}>Login</button>
          </span>
        )}
      </p>
    </>
  );
}
