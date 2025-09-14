'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const now = new Date();

    await queryInterface.bulkInsert('Airplanes', [
      
      { modelNumber: 'A320-200', capacity: 180, createdAt: now, updatedAt: now },
      { modelNumber: 'B737-800', capacity: 189, createdAt: now, updatedAt: now },
      { modelNumber: 'ATR-72-600', capacity: 70,  createdAt: now, updatedAt: now },
      { modelNumber: 'A350-900', capacity: 300, createdAt: now, updatedAt: now },
      { modelNumber: 'B787-9 Dreamliner', capacity: 296, createdAt: now, updatedAt: now },
      { modelNumber: 'A380-800', capacity: 555, createdAt: now, updatedAt: now },
      { modelNumber: 'B747-8', capacity: 410, createdAt: now, updatedAt: now },
      { modelNumber: 'Embraer E190', capacity: 100, createdAt: now, updatedAt: now },
      { modelNumber: 'Bombardier Q400', capacity: 78, createdAt: now, updatedAt: now },
      { modelNumber: 'B777-300ER', capacity: 368, createdAt: now, updatedAt: now },

    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Airplanes', {
      modelNumber: [
        'A320-200', 'B737-800', 'ATR-72-600', 'A350-900',
        'B787-9 Dreamliner', 'A380-800', 'B747-8',
        'Embraer E190', 'Bombardier Q400', 'B777-300ER'
      ]
    }, {});
  }
};
