const { client } = require('../database/redis');
const { randomCodeGenerator } = require('../util/randomCode');

const shortenURL = async(req, res) => {
    const { url } = req.params;
    console.log(url);
    res.send("<h1>Perma URL Shortener</h1>");
}

module.exports = {
    shortenURL
};