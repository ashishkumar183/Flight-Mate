const express = require('express');

const {InfoController} = require('../../controllers')

const AirplaneRoutes = require('./airplane-router')
const CityRoutes = require('./city-router')
const AirportRoutes = require('./airport-router')
const FlightRoutes = require('./flight-router')

const router = express.Router();

router.use('/airplanes',AirplaneRoutes);

router.use('/cities',CityRoutes)

router.use('/airports',AirportRoutes)

router.use('/flights',FlightRoutes)

router.get('/info',InfoController.info);

module.exports = router;
