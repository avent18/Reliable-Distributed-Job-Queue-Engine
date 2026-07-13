const socket = new WebSocket("ws://localhost:3000");

socket.addEventListener("open", () => {
  console.log("WebSocket Connected");
});

socket.addEventListener("message", (event) => {
  console.log("SOCKET FILE RECEIVED:", event.data);
});

socket.addEventListener("close", () => {
  console.log("WebSocket Disconnected");
});

socket.addEventListener("error", (error) => {
  console.error(error);
});

export default socket;