// src/controllers/airport-controller.js

const {StatusCodes} = require('http-status-codes');
const {AirportService} = require('../services');
const {SuccessResponse, ErrorResponse} = require('../utils/common');

/* POST: /airports
   request-body { name: 'Indira Gandhi International Airport', code: 'DEL', address: 'New Delhi, India', cityId: 1}
*/ 
async function createAirport(req, res){
    try {
        const airport = await AirportService.createAirport({
            name: req.body.name,
            code: req.body.code,
            address: req.body.address,
            cityId: req.body.cityId
        });
        SuccessResponse.data = airport;
        return res
            .status(StatusCodes.CREATED)
            .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res
            .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
            .json(ErrorResponse);
    }
}

/* GET: /airports
   request-body {}
*/ 
async function getAirports(req, res){
    try {
        const airports = await AirportService.getAirports();
        SuccessResponse.data = airports;
        return res
            .status(StatusCodes.OK)
            .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res
            .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
            .json(ErrorResponse);
    }
}

/* GET: /airports/:id
   request-body {}
*/ 
async function getAirport(req, res){
    try {
        const airport = await AirportService.getAirport(req.params.id);
        SuccessResponse.data = airport;
        return res
            .status(StatusCodes.OK)
            .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res
            .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
            .json(ErrorResponse);
    }
}

/* DELETE: /airports/:id
   request-body {}
*/ 
async function destroyAirport(req, res){
    try {
        const response = await AirportService.destroyAirport(req.params.id);
        SuccessResponse.data = response;
        return res
            .status(StatusCodes.OK)
            .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res
            .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
            .json(ErrorResponse);
    }
}

/* PATCH: /airports/:id
   request-body { name: 'New Airport Name' }
*/
async function updateAirport(req, res) {
    try {
        const response = await AirportService.updateAirport(req.params.id, req.body);
        SuccessResponse.data = response;
        return res
            .status(StatusCodes.OK)
            .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res
            .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
            .json(ErrorResponse);
    }
}


module.exports = {
    createAirport,
    getAirports,
    getAirport,
    destroyAirport,
    updateAirport
};