const {StatusCodes} = require('http-status-codes');
const {AirplaneRepository} = require('../repositories');
const AppError = require('../utils/errors');

const airplaneRepository = new AirplaneRepository();

async function createAirplane(data) {
    try {
        const airplane = await airplaneRepository.create(data);
        return airplane;
    } catch (error) {
        if(error.name == 'SequelizeValidationError'){
            let explaination = [];
            error.errors.forEach((err) => {
                explaination.push(err.message);
            });
            throw new AppError('Cannot create a new Airplane Object',StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create a new Airplane Object',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    createAirplane
}