const {StatusCodes} = require('http-status-codes');
const {CityService} = require('../services');
const { response } = require('express');
const {SuccessResponse,ErrorResponse} = require('../utils/common')

/* POST: /cities
   request-body { name: "London"}
*/ 
async function createCity(req,res){
    try {
        // console.log("BODY:", req.body);   
        // console.log("QUERY:", req.query);
        const city = await CityService.createCity({
            name: req.body.name,
        });
        SuccessResponse.data = city;
        return res
        .status(StatusCodes.CREATED)
        .json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error;
        return res
        .status(error.statusCode || 500)
        .json(ErrorResponse)
    }
}

/* DELETE: /cities/:id
   request-body {}
*/ 
async function destroyCity(req,res){
    try {
        const city = await CityService.destroyCity(req.params.id);
        SuccessResponse.data = city;
        return res
        .status(StatusCodes.OK)
        .json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error;
        return res
        .status(error.statusCode || 500)
        .json(ErrorResponse)
    }
}

module.exports = {
    createCity,
    destroyCity
}