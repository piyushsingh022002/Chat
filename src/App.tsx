import { useAuth } from "./contexts/AuthContext";
import ChatRoom from "./components/ChatRoom";
import Login from "./components/Login";
import GlobalStyle from "./styles/GlobalStyles";

export default function App() {
  const { token } = useAuth();

  return (
    <>
      <GlobalStyle />
      {token ? <ChatRoom /> : <Login />}
    </>
  );
}
