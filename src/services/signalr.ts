import * as signalR from "@microsoft/signalr";

let connection: signalR.HubConnection;

export const connectToChat = async (token: string) => {
  connection = new signalR.HubConnectionBuilder()
    .withUrl(`${process.env.REACT_APP_SIGNALR_URL}?access_token=${token}`)
    .withAutomaticReconnect()
    .configureLogging(signalR.LogLevel.Information)
    .build();

  connection.onclose((e) => {
    console.warn("SignalR disconnected", e);
  });

  await connection.start();
  console.log("SignalR connected");
};

export const sendMessage = async (message: string) => {
  if (connection) {
    await connection.invoke("SendMessage", message);
  }
};

export const onMessageReceived = (cb: (user: string, message: string) => void) => {
  if (connection) {
    connection.on("ReceiveMessage", cb);
  }
};

export const onUserJoined = (cb: (user: string) => void) => {
  if (connection) {
    connection.on("UserJoined", cb);
  }
};

export const onUserLeft = (cb: (user: string) => void) => {
  if (connection) {
    connection.on("UserLeft", cb);
  }
};
