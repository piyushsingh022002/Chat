import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { connectToChat, joinRoom, sendMessage, onMessageReceived, onUserJoined, onUserLeft } from '../services/signalr';
import { useAuth } from '../contexts/AuthContext';

const ChatBox = styled.div`padding: 2rem;`;
const Input = styled.input`padding: 0.5rem; width: 80%;`;
const Button = styled.button`padding: 0.5rem; margin-left: 1rem;`;

export default function ChatRoom() {
  const { token, username } = useAuth();
  const [messages, setMessages] = useState<string[]>([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (token) {
      connectToChat(token).then(() => joinRoom("general"));
      onMessageReceived((user, message) => setMessages((prev) => [...prev, `${user}: ${message}`]));
      onUserJoined((user) => setMessages((prev) => [...prev, `${user} joined the room`]));
      onUserLeft((user) => setMessages((prev) => [...prev, `${user} left the room`]));
    }
  }, [token]);

  const handleSend = async () => {
    await sendMessage(msg);
    setMsg("");
  };

  return (
    <ChatBox>
      <h2>Welcome, {username}</h2>
      <div>
        {messages.map((m, idx) => <div key={idx}>{m}</div>)}
      </div>
      <Input value={msg} onChange={(e) => setMsg(e.target.value)} />
      <Button onClick={handleSend}>Send</Button>
    </ChatBox>
  );
}
