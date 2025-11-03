const redis = require('redis');
const client = redis.createClient();

const connectRedis = async () => {
    try {
        await client.connect();
        console.log("Redis Connected");
    } catch (error) {
        console.error("Redis Connection Failed: ", error);
    }
};

module.exports = {
    client,
    connectRedis
};