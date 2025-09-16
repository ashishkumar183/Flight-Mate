'use strict';
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Airports', 'newColumn', {
      type: Sequelize.STRING,
      allowNull: true
    });
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Airports', 'newColumn');
  }
};