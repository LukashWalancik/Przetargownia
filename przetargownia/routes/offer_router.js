const express = require('express');
const router = express.Router();
const { Tender } = require('../models/index'); 
const { Offer } = require('../models/index')
router.get('/new/:id', async (req, res) => {
    try {
        const tender = await Tender.findByPk(req.params.id);

        if (!tender) {
            return res.status(404).send('Nie znaleziono przetargu.');
        }

        res.render('make_offer', { tender });
    } catch (err) {
        console.error(err);
        res.status(500).send('Błąd serwera.');
    }
});

router.post('/create', async (req, res) => {
    try {
      const { name, offer_value, tenderId } = req.body;
      const submission_date = new Date();
  
      const tender = await Tender.findByPk(tenderId);
      if (!tender) {
        console.warn('Próba złożenia oferty do nieistniejącego przetargu!');
        return res.redirect('/?success=-4');
      }
  
      const now = new Date();
      if (tender.deadline <= now || tender.finished) {
        console.warn('Próba złożenia oferty po zakończonym przetargu!');
        return res.redirect(`/?success=-3`);
      }
  
      await Offer.create({
        name,
        offer_value,
        submission_date,
        tenderId
      });
  
      res.redirect(`/?success=1`);
    } catch (err) {
      console.error(err);
      res.redirect('/?success=-1');
    }
  });

module.exports = router;