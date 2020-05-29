'use strict';

const { Router } = require('express');
const router = new Router();

router.get('/', (req, res, next) => {
  const apiKey = process.env.GOOGLE_MAPS_KEY;
  res.render('places', { apiKey });
});

module.exports = router;
