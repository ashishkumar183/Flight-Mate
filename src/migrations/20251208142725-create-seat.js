'use strict';

const { seatClasses } = require('../utils/common/enums');
const {
  ECONOMY,
  BUSINESS,
  PREMIUM_ECONOMY,
  FIRST
} = seatClasses;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Seats', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      airplaneId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Airplanes',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },

      row: {
        type: Sequelize.INTEGER,
        allowNull: false
      },

      col: {
        type: Sequelize.STRING,
        allowNull: false
      },

      seatClass: {
        type: Sequelize.ENUM(
          ECONOMY,
          BUSINESS,
          PREMIUM_ECONOMY,
          FIRST
        ),
        allowNull: false,
        defaultValue: ECONOMY
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },

      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Seats');
  }
};
