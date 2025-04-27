// models/index.js
const { Sequelize } = require('sequelize');
// Tworzymy połączenie z SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite', 
});

module.exports = sequelize;
