const redis = require('redis');
const client = redis.createClient();

client.on('connect', () => {
    console.log("Connected to Redis Successfully !!");
})

client.on('error', () => {
    console.log("Failed to connect to Redis !!");
})

const redisTest = async() => {
    await client.connect();

    await client.set('runtime', 'NodeJS');
    const reply = await client.get('runtime');
    console.log(reply);

    await client.quit();
}

redisTest();