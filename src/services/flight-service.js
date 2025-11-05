// src/services/flight-service.js

const { StatusCodes } = require('http-status-codes');
const { FlightRepository } = require('../repositories');
const {Op} = require('sequelize');
const AppError = require('../utils/errors/app-error');

const flightRepository = new FlightRepository();

async function createFlight(data) {
    try {
        const flight = await flightRepository.create(data);
        return flight;
    } catch (error) {
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create a new flight object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAllFlights(query) {
    let customFilter = {};
    let sortFilter = [];
    // trips = MUM-DEL
    // By GET request in params MUM-DEL we will get all MUM-DEL flights.
    if(query.trips){
        [departureAirportId,arrivalAirportId] = query.trips.split("-");
        customFilter.departureAirportId = departureAirportId;
        customFilter.arrivalAirportId = arrivalAirportId;
        // TODO:- departure and arrival airport id should not be same
    }

    // Filter for price
    if(query.price){
        [minPrice,maxPrice] = query.price.split("-");
        customFilter.price = {
            [Op.between]: [minPrice,((maxPrice == undefined) ? 100000: maxPrice)]
        }
    }

    // Total available Seats.
    if(query.travellers){
        customFilter.totalSeat = {
            [Op.gte] : query.travellers
        }
    }

    // Filters for particular date
    if (query.tripDate) {
        const startOfDay = new Date(query.tripDate);
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(query.tripDate);
        endOfDay.setHours(23, 59, 59, 999);

        customFilter.departureTime = {
            [Op.between]: [startOfDay, endOfDay]
        };
    }

    // Sorting by departureTime
    if(query.sort){
        const params = query.sort.split(',');
        const sortFilters = params.map((param) => param.split('_'));
        sortFilter = sortFilters
    }

    try {
        const flights = await flightRepository.getAllFlights(customFilter);
        return flights;
    } catch (error) {
        throw new AppError('Cannot fetch data of all flights', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}



module.exports = {
    createFlight,getAllFlights
};