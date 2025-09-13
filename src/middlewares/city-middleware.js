const {StatusCodes} = require('http-status-codes');
const {ErrorResponse} = require('../utils/common');
const { AppError } = require('../utils/errors');

function validateCreateRequest(req,res,next) {
    if(!req.body.name){
        ErrorResponse.message = 'Something went wrong while creating a City.'
        ErrorResponse.error = new AppError(['City name in the incoming request is not in correct format.',StatusCodes.BAD_REQUEST])
        return res.
        status(StatusCodes.BAD_REQUEST).
        json(ErrorResponse)
    }
    next();
}

module.exports = {
    validateCreateRequest
}