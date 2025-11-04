const { client } = require('../database/redis');
const { generateRandomCode } = require('../util/randomCode');
const { BadRequest } = require('../errors/errors');
const { StatusCodes } = require('http-status-codes');

const shortenURL = async(req, res) => {
    const { url, customCode } = req.body;
    
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

    await client.set(code, url);
    return res.status(StatusCodes.OK).json({
        url: `${shortendURLBase}/${code}`
    });
}

module.exports = {
    shortenURL
};