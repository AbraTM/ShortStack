const CustomError = require('./customError');
const { StatusCodes } = require('http-status-codes');

class NotFound extends CustomError{
    constructor(messsage){
        super(messsage);
        this.statusCode = StatusCodes.NOT_FOUND
    };
};

module.exports = NotFound