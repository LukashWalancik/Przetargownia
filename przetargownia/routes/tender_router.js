const express = require('express');
const router = express.Router();
const Tender = require('../models/tender_model');

async function checkAndUpdateTenders() {
    const { Op } = require('sequelize');
    const now = new Date();
  
    const tendersToFinish = await Tender.findAll({
      where: {
        finished: false,
        deadline: { [Op.lte]: now }  // deadline już minął lub jest teraz
      }
    });
  
    for (const tender of tendersToFinish) {
      tender.finished = true;
      await tender.save();
    }
  }


// Lista przetargów
router.get('/', async (req, res) => {
    try {
      await checkAndUpdateTenders();  // sprawdzamy i aktualizujemy
      const tenders = await Tender.findAll({
        where: { finished: false }
      });
      res.render('tenders', { title: 'Przetargi', tenders });
    } catch (err) {
      console.error(err);
      res.status(500).send('Błąd serwera.');
    }
  });

module.exports = router;