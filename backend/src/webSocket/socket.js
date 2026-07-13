/** @format */

import { WebSocketServer } from "ws";

let wss = null;

export const intialiseWebSocket = (server) => {

  wss = new WebSocketServer({ server });

  wss.on("connection", (socket) => {
    console.log("Dashboard connected");
    console.log("Clients after connect:", wss.clients.size);

    socket.on("close", () => {
      console.log("Dashboard disconnected");
      console.log("Clients after disconnect:", wss.clients.size);
    });
  });
};

export const broadCast = (event, data) => {
  if (!wss) {
    return;
  }
  console.log("Clients before broadcast:", wss.clients.size);
  console.log("Broadcasting:", event, data);
  

  const message = JSON.stringify({
    event,
    data,
  });

  wss.clients.forEach((client) => {
    if (client.readyState == 1) {
      client.send(message);
    }
  });
};
