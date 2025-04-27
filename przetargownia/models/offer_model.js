const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Offer = sequelize.define('Offer', {
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    submission_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    offer_value: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  });

  return Offer;
};