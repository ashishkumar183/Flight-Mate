// src/routes/v1/airport-routes.js

const express = require('express');

const { AirportController } = require('../../controllers');
// const { AirportMiddlewares } = require('../../middlewares');

const router = express.Router();

// /api/v1/airports POST
// Binds the POST request to the createAirport controller function after validation
router.post('/',
    // AirportMiddlewares.validateCreateRequest,
    AirportController.createAirport);

// /api/v1/airports GET
// Binds the GET request to the getAirports controller function to fetch all airports
router.get('/',
    AirportController.getAirports);

// /api/v1/airports/:id GET
// Binds the GET request to the getAirport controller function to fetch a specific airport by ID
router.get('/:id',
    AirportController.getAirport);

// /api/v1/airports/:id DELETE
// Binds the DELETE request to the destroyAirport controller function to delete an airport by ID
router.delete('/:id',
    AirportController.destroyAirport);

// /api/v1/airports/:id PATCH
// Binds the PATCH request to the updateAirport controller function to update an airport by ID
router.patch('/:id',
    AirportController.updateAirport);

module.exports = router;