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
      submission_date = new Date();
      const offer = await Offer.create({
          name,
          offer_value,
          submission_date,
          tenderId
      });

      res.redirect('/?success=1');
  } catch (err) {
      console.error(err);
      res.redirect('/?success=-1')
  }
});

module.exports = router;