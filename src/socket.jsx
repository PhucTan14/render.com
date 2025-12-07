import { io } from "socket.io-client";

const socket = io("https://main.yumspot.online", {
  path: "/socket.io/",
  transports: ["websocket"],
  autoConnect: true,
  reconnection: true,
  reconnectionAttempts: 10,
  reconnectionDelay: 1000,
});

socket.on("connect", () => console.log("Socket connected:", socket.id));
socket.on("disconnect", () => console.log("Socket disconnected"));

export default socket;
