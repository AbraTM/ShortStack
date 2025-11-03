require('dotenv').config();

const express = require('express');
const app = express();
const path = require('path');
const { connectRedis } = require('./database/redis');
const { StatusCodes } = require('http-status-codes');

const errorHandlerMiddleware = require('./middleware/errorHandler');
const notFoundMiddleware = require('./middleware/notFound');

// Routers
const permURLRouter = require('./routes/permURL');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/permURL', permURLRouter);

// Core Middlewares
app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

const PORT = process.env.PORT || 5000;
const start = async() => {
    try {
        await connectRedis();
        app.listen(PORT, () => {
            console.log(`Server is listening at port ${PORT}...`);
        });
    } catch (error) {
        console.error("Failed to start up server ", error);
        process.exit(1);
    }
}
start();