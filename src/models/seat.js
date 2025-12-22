'use strict';
const { Model } = require('sequelize');

const { seatClasses } = require('../utils/common/enums');
const { ECONOMY, BUSINESS, PREMIUM_ECONOMY, FIRST } = seatClasses;

module.exports = (sequelize, DataTypes) => {
  class Seat extends Model {
    static associate(models) {
      this.belongsTo(models.Airplane, {
        foreignKey: 'airplaneId'
      });
    }
  }

  Seat.init({
    airplaneId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    row: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    col: {
      type: DataTypes.STRING,
      allowNull: false
    },
    seatClass: {
      type: DataTypes.ENUM,
      values: [ECONOMY, BUSINESS, PREMIUM_ECONOMY, FIRST],
      defaultValue: ECONOMY,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Seat'
  });

  return Seat;
};
