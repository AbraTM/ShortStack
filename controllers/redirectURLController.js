const crypto = require('crypto');
const { client } = require('../database/redis');
const { NotFound, BadRequest } = require('../errors/errors');

const redirectTo = async(req, res) => {
    const { code } = req.params;

    if(!code){
        throw new BadRequest("No code provided.");
    }
    
    const data = await client.hGetAll(`link:${code}`);
    if(!data || !data.url){
        throw new NotFound("Short URL not found.");
    }

    const visitorId = crypto.createHash('sha256').update(req.ip).digest('hex');

    Promise.all([
        await client.hIncrBy(`link:${code}`, "clicks", 1),
        await client.hSet(`link:${code}`, "last_visited", Date.now()),
        await client.sAdd(`link:${code}:visitors`, visitorId)
    ]);

    const uniqueVisitors = await client.sCard(`link:${code}:visitors`);
    await client.hSet(`link:${code}`, 'unique_visitors', uniqueVisitors);
    
    res.redirect(data.url);
}

module.exports = {
    redirectTo
}