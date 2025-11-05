const { client } = require('../database/redis');
const { BadRequest, NotFound } = require('../errors/errors');
const { StatusCodes } = require('http-status-codes');

const getStats = async(req, res) => {
    const { code } = req.params;
    if(!code){
        throw new BadRequest("No Code provided.");
    }
    const data = await client.hGetAll(`link:${code}`);
    if(!data){
        throw new NotFound("Short URL not found.");
    }
    const tagList = data.tags.split(",");
    return res.status(StatusCodes.OK).json({ 
        data: {
            ...data,
            tags: tagList
        }
     });
}

module.exports = {
    getStats
}