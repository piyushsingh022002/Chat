import * as signalR from "@microsoft/signalr";

let connection: signalR.HubConnection | null = null;


export const connectToChat = async (
  token: string,
  onReceive: (user: string, msg: string) => void,
  onJoin: (user: string) => void,
  onLeave: (user: string) => void
) => {
  if (connection) {
    connection.off("ReceiveMessage");
    connection.off("UserJoined");
    connection.off("UserLeft");
  }

  connection = new signalR.HubConnectionBuilder()
    .withUrl(`${process.env.REACT_APP_SIGNALR_URL}?access_token=${token}`)
    .withAutomaticReconnect()
    .configureLogging(signalR.LogLevel.Information)
    .build();

  connection.on("ReceiveMessage", onReceive);
  connection.on("UserJoined", onJoin);
  connection.on("UserLeft", onLeave);

  connection.onclose((e) => {
    console.warn("SignalR disconnected", e);
  });

  await connection.start();
  console.log("SignalR connected");
};


export const sendMessage = async (message: string) => {
  if (connection?.state === signalR.HubConnectionState.Connected) {
    await connection.invoke("SendMessage", message);
  } else {
    console.warn("🚫 SignalR not connected");
  }
};