const express = require('express');
const router = express.Router();
const { Tender } = require('../models/index');
const { Offer } = require('../models/index');
const { Op } = require('sequelize');

async function checkAndUpdateTenders() {
  
  const now = new Date();

  const tendersToFinish = await Tender.findAll({
    where: {
      finished: false,
      deadline: { [Op.lte]: now }
    }
  });

  for (const tender of tendersToFinish) {
    tender.finished = true;
    await tender.save();
  }
}

router.get('/', async (req, res) => {
  const success = req.query.success || 0;
  try {
    await checkAndUpdateTenders();
    const tenders = await Tender.findAll({
      where: { finished: false }
    });
    res.render('tenders', { title: 'Przetargi', tenders, success });
  } catch (err) {
    console.error(err);
    res.status(500).send('Błąd serwera.');
  }
});

router.get('/new', async (req, res) => {
  const current_date = new Date().toISOString().split('T')[0];
  try {
    await checkAndUpdateTenders();
    res.render('add_tender', { current_date });
  } catch (err) {
    console.error(err);
    res.status(500).send("Błąd serwera.");
  }
});

router.get('/finished', async (req, res) => {
  try {
    await checkAndUpdateTenders();
    const tenders = await Tender.findAll({
      where: { finished: true }
    });
    res.render('finished_tenders', { title: 'Przetargi', tenders });
  } catch (err) {
    console.error(err);
    res.status(500).send('Błąd serwera.');
  }
});

router.get('/:id', async (req, res) => {
  try {
    await checkAndUpdateTenders();
    const tender = await Tender.findByPk(req.params.id);
    if (!tender) {
      return res.status(404).send('Nie znaleziono przetargu.');
    }

    if (tender.finished) {
      const offers = await Offer.findAll({
        where: {
          tenderId: tender.id,
          offer_value: { [Op.lte]: tender.budget }
        },
        order: [['offer_value', 'ASC']]
      });
      res.render('finished_tender_details', { tender, offers })
    }
    else {
      res.render('tender_details', { title: tender.title, tender });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Błąd serwera.');
  }
});

router.post('/create', async (req, res) => {
  try {
    await checkAndUpdateTenders();
    const { title, description, institution, deadline, deadline_hour, budget } = req.body;
    const deadlineString = `${deadline}T${deadline_hour}:00`
    const deadline_date = new Date(deadlineString);
    await Tender.create({
      title: title,
      description: description,
      institution: institution,
      start_date: new Date(),
      deadline: deadline_date,
      budget: budget,
    });

    res.redirect('/tenders/?success=1');
  } catch (err) {
    console.error(err);
    res.redirect('/tenders/?success=-1')
  }
});

module.exports = router;