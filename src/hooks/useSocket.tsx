import { io } from "socket.io-client";
import { useChat } from "./useChat";
import { useCallback, useEffect } from "react";

const socket = io("https://3dcute.up.railway.app", {
  transports: ["websocket"], // ⚡ Fuerza WebSockets
  auth: {},
});

socket.on("connection", () => {
  console.log("Socket connected");
});

export function useSocket() {
  const { addMessageToChat } = useChat();

  useEffect(() => {
    console.log("Ha cambiado la funcion --------------------------------");
    const handleNewMessage = (message: string) => {
      const parsedMessage = JSON.parse(message);
      console.log("New message from admin: ", parsedMessage);
      addMessageToChat(parsedMessage);
    };

    socket.off("newMessage");
    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [addMessageToChat]);

  const connectUserToMessageChannel = useCallback(({ id }: { id: string }) => {
    socket.disconnect();
    socket.auth = { userId: id };
    socket.connect();

    console.log(`User ${id} Connected To Chat`);
    socket.emit("connectChat");
  }, []);

  return { connectUserToMessageChannel };
}
