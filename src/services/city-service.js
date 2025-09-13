const {StatusCodes} = require('http-status-codes');
const {CityRepository} = require('../repositories');
const AppError = require('../utils/errors');

const cityRepository = new CityRepository();

async function createCity(data) {
    try {
        const city = await cityRepository.create(data);
        return city;
    } catch (error) {
        if(error.name == 'SequelizeValidationError' || error.name == 'SequelizeUniqueConstraintError'){
            let explaination = [];
            error.errors.forEach((err) => {
                explaination.push(err.path + ' ' + err.message);
            });
            throw new AppError('Cannot create a new city Object',StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create a new city Object',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getCities() {
    try {
        const city = await cityRepository.getAll();
        return city;
    } catch (error) {
        throw new AppError('Cannot fetch data of all the cities',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getCity(id){
    try {
        const city = await cityRepository.get(id);
        return city;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError('The requested city is not found',error.statusCode);
        }
        throw new AppError('Cannot fetch data of city',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function destroyCity(id){
    try {
        const response = await cityRepository.destroy(id);
        return response;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError('The requested city is not found',error.statusCode);
        }
        throw new AppError('Cannot fetch data of all the citys',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    createCity,
    getCities,
    getCity,
    destroyCity
}