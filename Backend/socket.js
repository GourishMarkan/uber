import { Server } from "socket.io";
import { User } from "./models/user.model.js";
import { Caption } from "./models/caption.model.js";

let io;
export const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("client connected:", socket.id);

    socket.on("join", async (data) => {
      const { userId, userType } = data;
      if (userType === "user") {
        await User.findByIdAndUpdate(userId, { socketId: socket.id });
      } else if (userType === "caption") {
        await Caption.findByIdAndUpdate(userId, { socketId: socket.id });
      }
    });

    socket.on("disconnect", () => {
      console.log(`Client disconnected:${socket.id}`);
    });
  });
};

export const sendMessageToSocketId = async (socketId, messageObject) => {
  if (io) {
    io.to(socketId).emit(messageObject.event, messageObject.data);
  } else {
    console.log("socket is not initialized");
  }
};
