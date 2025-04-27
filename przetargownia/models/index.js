const { Sequelize } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite', 
});

// IMPORTUJEMY FUNKCJE (NIE MODELE)
const TenderModel = require('./tender_model');
const OfferModel = require('./offer_model');

// WYWOŁUJEMY FUNKCJE PRZEKAZUJĄC sequelize
const Tender = TenderModel(sequelize);
const Offer = OfferModel(sequelize);

// DEFINIUJEMY RELACJE
Tender.hasMany(Offer, { foreignKey: 'tenderId' });
Offer.belongsTo(Tender, { foreignKey: 'tenderId', onDelete: 'CASCADE' });

// EKSPORTUJEMY
module.exports = {
  sequelize,
  Tender,
  Offer,
};