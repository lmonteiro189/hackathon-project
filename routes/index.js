'use strict';

const { Router } = require('express');
const router = new Router();
const routeGuard = require('./../middleware/route-guard');

router.get('/', (req, res, next) => {
  const apiKey = process.env.GOOGLE_MAPS_KEY;
  res.render('index', { apiKey });
});

router.get('/homeview', routeGuard, (req, res, next) => {
  res.render('homeview');
});

module.exports = router;
