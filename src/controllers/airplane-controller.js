const {StatusCodes} = require('http-status-codes');
const {AirplaneService} = require('../services');
const { response } = require('express');

/* POST: /airplanes
   request-body { modelNumber: 'airbus320 , capacity: 200}
*/ 

async function createAirplane(req,res){
    try {
        console.log(req.body);
        const airplane = await AirplaneService.createAirplane({
            modelNumber: req.body.modelNumber,
            capacity: req.body.capacity
        });
        return res
        .status(StatusCodes.CREATED)
        .json({
            success: true,
            message: 'Successfully created an Airplane.',
            data: response,
            error: {}
        })
    } catch (error) {
        return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
            success: false,
            message: 'Something went wrong while creating an Airplane.',
            data: {},
            error: error
        })
        
    }
}

module.exports = {
    createAirplane
}
