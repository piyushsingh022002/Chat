import { useEffect, useState } from "react";
import styled from "styled-components";
import { connectToChat, sendMessage, onMessageReceived, onUserJoined, onUserLeft } from "../services/signalr";
import { useAuth } from "../contexts/AuthContext";

const ChatContainer = styled.div`
  padding: 2rem;
  max-width: 600px;
  margin: auto;
`;

const MessageList = styled.div`
  height: 300px;
  overflow-y: auto;
  margin-bottom: 1rem;
  background: #fff;
  padding: 1rem;
  border: 1px solid #ddd;
`;

const InputRow = styled.div`
  display: flex;
  gap: 1rem;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.5rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
`;

export default function ChatRoom() {
  const { token, username } = useAuth();
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    if (token) {
      connectToChat(token);

      onMessageReceived((user, message) =>
        setMessages((prev) => [...prev, `${user}: ${message}`])
      );

      onUserJoined((user) =>
        setMessages((prev) => [...prev, `🔔 ${user} joined the chat`])
      );

      onUserLeft((user) =>
        setMessages((prev) => [...prev, `👋 ${user} left the chat`])
      );
    }
  }, [token]);

  const handleSend = async () => {
    if (input.trim()) {
      await sendMessage(input);
      setInput("");
    }
  };

  return (
    <ChatContainer>
      <h2>Global Chat</h2>
      <MessageList>
        {messages.map((msg, i) => (
          <div key={i}>{msg}</div>
        ))}
      </MessageList>
      <InputRow>
        <Input
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <Button onClick={handleSend}>Send</Button>
      </InputRow>
    </ChatContainer>
  );
}
