const express = require('express')

const Airplane = require('../../controllers')

const router = express.Router();

router.post('/',AirplaneController.createAirplane);

module.exports = router;