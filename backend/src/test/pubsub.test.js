import publisher from "../redis/publisher.js";
import subscriber from "../redis/subscriber.js";

subscriber.subscribe("QUEUE_EVENTS");

subscriber.on("message", (channel, message) => {
    console.log(channel);
    console.log(message);
});

setTimeout(async () => {

    await publisher.publish(
        "QUEUE_EVENTS",
        JSON.stringify({
            event: "TEST",
            message: "Hello Redis Pub/Sub"
        })
    );

}, 2000);