import subscriber from "../redis/subscriber.js";

await subscriber.subscribe("QUEUE_EVENTS");

console.log("Waiting for events...");

subscriber.on("message", (channel, message) => {
    console.log("Channel:", channel);
    console.log("Message:", message);
});