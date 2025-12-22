'use strict';

const { seatClasses } = require('../utils/common/enums');

const {
  ECONOMY,
  BUSINESS,
  PREMIUM_ECONOMY,
  FIRST
} = seatClasses;

module.exports = {
  async up(queryInterface, Sequelize) {
    const airplanes = await queryInterface.sequelize.query(
      `SELECT id, capacity FROM Airplanes;`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    const seats = [];
    const cols = ['A', 'B', 'C', 'D', 'E', 'F'];
    const now = new Date();

    for (const airplane of airplanes) {
      const totalSeats = airplane.capacity;
      const rows = Math.ceil(totalSeats / cols.length);

      let seatCount = 0;

      for (let row = 1; row <= rows; row++) {
        for (const col of cols) {
          if (seatCount >= totalSeats) break;

          seatCount++;

          let seatClass;

          if (seatCount <= totalSeats * 0.05) {
            seatClass = FIRST;
          } else if (seatCount <= totalSeats * 0.20) {
            seatClass = BUSINESS;
          } else if (seatCount <= totalSeats * 0.40) {
            seatClass = PREMIUM_ECONOMY;
          } else {
            seatClass = ECONOMY;
          }

          seats.push({
            airplaneId: airplane.id,
            row,
            col,
            seatClass,
            createdAt: now,
            updatedAt: now
          });
        }
      }
    }

    await queryInterface.bulkInsert('Seats', seats, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Seats', null, {});
  }
};
