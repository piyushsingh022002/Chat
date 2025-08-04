import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import ChatRoom from "./components/ChatRoom";
import Login from "./components/Login";
import Register from "./components/Register";
import GlobalStyle from "./styles/GlobalStyles";

export default function App() {
  const { token } = useAuth();

  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route
          path="/"
          element={<Navigate to={token ? "/chat" : "/login"} />}
        />
        <Route
          path="/chat"
          element={token ? <ChatRoom /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={token ? <Navigate to="/chat" /> : <Login />}
        />
        <Route
          path="/register"
          element={token ? <Navigate to="/chat" /> : <Register />}
        />
        <Route
          path="*"
          element={<p style={{ textAlign: "center" }}>404 - Page not found</p>}
        />
      </Routes>
    </>
  );
}
