import express from 'express'
import http from "http";
import app from './app.js'
import dotenv from 'dotenv'
dotenv.config();
import logger from './config/logger.js';
import { intialiseWebSocket } from './webSocket/socket.js';
import subscriber from "./redis/subscriber.js";
import { broadCast } from './webSocket/socket.js';



const PORT = process.env.PORT ||3000;


const server = http.createServer(app);

intialiseWebSocket(server);


// Subscribe to Redis Channel
await subscriber.subscribe("QUEUE_EVENTS");

// Listen for published events
subscriber.on("message", (channel, message) => {

    const payload = JSON.parse(message);

    broadCast(
        payload.event,
        payload.data
    );

});

server.listen(PORT, ()=>{
  logger.info(`Server running on port ${PORT}`)
})

