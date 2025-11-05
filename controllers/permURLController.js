const { client } = require('../database/redis');
const { generateRandomCode } = require('../util/randomCode');
const { BadRequest } = require('../errors/errors');
const { StatusCodes } = require('http-status-codes');

const shortenURL = async(req, res) => {
    const { url, customCode, tags } = req.body;
    
    if(!url){
        throw new BadRequest("No URL provided.");
    }

    const shortendURLBase = process.env.BASE_SHORTENED_URL;
    const code = customCode || generateRandomCode()

    if(customCode){
        const exists = await client.exists(customCode);
        if(exists){
            throw new BadRequest("Custome Code Already Exists.");
        }
    }

    let tagList = "";
    if(tags && tags.length > 0){
        tagList = tags.join(",");
    }

    await client.hSet(
        `link:${code}`, {
            url: url,
            clicks: 0,
            unique_visitors: 0,
            created_on: Date.now(),
            last_visited: Date.now(),
            tags: tagList
        }
    )
    
    return res.status(StatusCodes.OK).json({
        url: `${shortendURLBase}/${code}`
    });
}

module.exports = {
    shortenURL
};