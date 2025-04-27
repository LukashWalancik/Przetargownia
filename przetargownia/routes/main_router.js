// mainRouter.js

const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  const success = req.query.success || 0;
  res.render('index', { title: 'Strona główna', success });
});

module.exports = router;
