const { client } = require('../database/redis');
const { NotFound, BadRequest } = require('../errors/errors');

const redirectTo = async(req, res) => {
    const { code } = req.params;

    if(!code){
        throw new BadRequest("No code provided.");
    }
    const reply = await client.get(code);
    if(!reply){
        throw new NotFound("Short URL not found.");
    }
    
    res.redirect(reply);
}

module.exports = {
    redirectTo
}