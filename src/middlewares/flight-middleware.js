const { StatusCodes } = require('http-status-codes');
const { ErrorResponse } = require('../utils/common');
const AppError = require('../utils/errors/app-error');

function validateCreateRequest(req, res, next) {
    if (!req.body.flightNumber) {
        ErrorResponse.message = 'Something went wrong while creating flight';
        ErrorResponse.error = new AppError(['flightNumber not found in the incoming request']);
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    }

    if (!req.body.airplaneId) {
        ErrorResponse.message = 'Something went wrong while creating flight';
        ErrorResponse.error = new AppError(['airplaneId not found in the incoming request']);
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    }

    if (!req.body.departureAirportId) {
        ErrorResponse.message = 'Something went wrong while creating flight';
        ErrorResponse.error = new AppError(['departureAirportId not found in the incoming request']);
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    }

    if (!req.body.arrivalAirportId) {
        ErrorResponse.message = 'Something went wrong while creating airport';
        ErrorResponse.error = new AppError(['arrivalAirportId not found in the incoming request']);
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    }

    if (!req.body.arrivaTime) {
        ErrorResponse.message = 'Something went wrong while creating airport';
        ErrorResponse.error = new AppError(['arrivaTime not found in the incoming request']);
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    }

    if (!req.body.departureTime) {
        ErrorResponse.message = 'Something went wrong while creating flight';
        ErrorResponse.error = new AppError(['departureTime not found in the incoming request']);
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    }

    if (!req.body.price) {
        ErrorResponse.message = 'Something went wrong while creating airport';
        ErrorResponse.error = new AppError(['price not found in the incoming request']);
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    }

    if (!req.body.boardingGate) {
        ErrorResponse.message = 'Something went wrong while creating airport';
        ErrorResponse.error = new AppError(['boardingGate not found in the incoming request']);
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    }

    if (!req.body.totalSeat) {
        ErrorResponse.message = 'Something went wrong while creating flight';
        ErrorResponse.error = new AppError(['totalSeat not found in the incoming request']);
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    }

    next();
}

module.exports = {
    validateCreateRequest
};
