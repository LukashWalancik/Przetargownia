const { Sequelize } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite', 
});

const TenderModel = require('./tender_model');
const OfferModel = require('./offer_model');

const Tender = TenderModel(sequelize);
const Offer = OfferModel(sequelize);

Tender.hasMany(Offer, { foreignKey: 'tenderId' });
Offer.belongsTo(Tender, { foreignKey: 'tenderId', onDelete: 'CASCADE' });

module.exports = {
  sequelize,
  Tender,
  Offer,
};