require('dotenv').config();

const express = require('express');
const app = express();

const { StatusCodes } = require('http-status-codes');

app.get("/", (req, res) => {
    res.status(StatusCodes.OK).send("<h1>ShortStack</h1>");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is listening at port ${PORT}...`);
});