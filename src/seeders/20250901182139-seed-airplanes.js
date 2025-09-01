'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const now = new Date();

    // IMPORTANT: default table name is pluralized ('Airplanes').
    // If you use freezeTableName / custom table name, adjust below.
    await queryInterface.bulkInsert('Airplanes', [
      { modelNumber: 'A320-200', capacity: 180, createdAt: now, updatedAt: now },
      { modelNumber: 'B737-800', capacity: 189, createdAt: now, updatedAt: now },
      { modelNumber: 'ATR-72-600', capacity: 70,  createdAt: now, updatedAt: now },
      { modelNumber: 'A350-900',  capacity: 300, createdAt: now, updatedAt: now }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    // Delete only the rows we inserted (safe to run multiple times)
    await queryInterface.bulkDelete('Airplanes', {
      modelNumber: ['A320-200', 'B737-800', 'ATR-72-600', 'A350-900']
    }, {});
  }
};
