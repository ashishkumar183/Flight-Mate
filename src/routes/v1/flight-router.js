// src/routes/v1/flight-routes.js

const express = require('express');

const { FlightController } = require('../../controllers');
const { FlightMiddlewares } = require('../../middlewares');

const router = express.Router();

// /api/v1/flights POST
// Binds the POST request to the createFlight controller function after validation
router.post('/',
    FlightMiddlewares.validateCreateRequest,
    FlightController.createFlight);

// // /api/v1/airports GET
// // Binds the GET request to the getAirports controller function to fetch all airports
// router.get('/',
//     FlightController.getAirports);

// // /api/v1/airports/:id GET
// // Binds the GET request to the getAirport controller function to fetch a specific airport by ID
// router.get('/:id',
//     FlightController.getAirport);

// // /api/v1/airports/:id DELETE
// // Binds the DELETE request to the destroyAirport controller function to delete an airport by ID
// router.delete('/:id',
//     FlightController.destroyAirport);

// // /api/v1/airports/:id PATCH
// // Binds the PATCH request to the updateAirport controller function to update an airport by ID
// router.patch('/:id',
//     FlightController.updateAirport);

module.exports = router;