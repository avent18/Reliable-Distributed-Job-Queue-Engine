import Redis from "ioredis";

const subscriber = new Redis(process.env.REDIS_URL);

subscriber.on("connect", () => {
    console.log("Redis Subscriber Connected");
});

subscriber.on("error", (err) => {
    console.error("Redis Subscriber Error:", err);
});

export default subscriber;