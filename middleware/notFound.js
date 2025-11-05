const notFoundMiddleware = (req, res) => {
    res.send("<h1>Page Not Found</h1>");
}

module.exports = notFoundMiddleware;