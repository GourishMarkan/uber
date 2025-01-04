import { io } from "socket.io-client";

let socket;

export const initializeSocket = (BASE_URL) => {
  if (!socket) {
    socket = io(BASE_URL, {
      withCredentials: true,
    });

    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });
  }
  return socket;
};

export const getSocket = () => {
  return socket;
};
