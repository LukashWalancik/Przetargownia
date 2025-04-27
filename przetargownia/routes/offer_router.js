const express = require('express');
const router = express.Router();
const { Tender } = require('../models/index'); 

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

module.exports = router;