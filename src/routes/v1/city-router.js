const express = require('express')

const {CityController} = require('../../controllers');
const {CityMiddlewares} = require('../../middlewares')

const router = express.Router();

// /api/v1/cities POST
router.post('/',
    CityMiddlewares.validateCreateRequest,
    CityController.createCity);

// // /api/v1/airplanes GET
// router.get('/',
//     AirplaneController.getAirplanes);

// // /api/v1/airplanes/:id GET
// router.get('/:id',
//     AirplaneController.getAirplane);   

// // /api/v1/airplanes/:id DELETE
// router.delete('/:id',
//     AirplaneController.destroyAirplane);    

module.exports = router;