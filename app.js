require('dotenv').config();

const express = require('express');
const app = express();
const path = require('path');
const { setKV, getKV } = require('./database/redis');

const { StatusCodes } = require('http-status-codes');

app.use(express.static(path.join(__dirname, 'public')));

app.get("/express", (req, res) => {
    res.send("<h1>Test Successfull</h1>");
});

app.get("/setRedisKey", (req, res) => {
    setKV("T", "Man");
    res.send("<h1>Key Set</h1>")
})

app.get("/redis", (req, res) => {
    const value = getKV("T");
    res.send(`<h2>${value}</h2>`)
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is listening at port ${PORT}...`);
});