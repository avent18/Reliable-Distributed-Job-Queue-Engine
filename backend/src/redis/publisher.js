import Redis from "ioredis";

const publisher = new Redis(process.env.REDIS_URL);

publisher.on("connect", () => {
    console.log("Redis Publisher Connected");
});

publisher.on("error", (err) => {
    console.error("Redis Publisher Error:", err);
});

export default publisher;