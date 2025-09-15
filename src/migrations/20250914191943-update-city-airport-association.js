'use strict';

const { Model } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('Airports',{
      type: 'FOREIGN KEY',
      name: 'City_foreignKey_Constraint',
      fields: ['CityId'],
      references: {
        table: 'Cities',
        field:'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Airport','City_foreignKey_Constraint')
  }
};
