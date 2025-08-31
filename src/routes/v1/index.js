const express = require('express');

const {InfoController} = require('../../controllers')

const AirplaneRoutes = require('./airplane-router')

const router = express.Router();

router.use('/airplanes',AirplaneRoutes);

router.get('/info',InfoController.info);

module.exports = router;
