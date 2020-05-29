'use strict';

const { Router } = require('express');
const router = new Router();
const User = require('./../models/user');
const routeGuard = require('./../middleware/route-guard');

router.get('/', (req, res, next) => {
  const apiKey = process.env.GOOGLE_MAPS_KEY;
  res.render('index', { apiKey });
});

router.get('/homeview', routeGuard, (req, res, next) => {
  User.find()
    .then((users) => {
      //TODO Remove own profile from view
      res.render('homeview', { users });
    })
    .catch((error) => {});
});

router.get('/users/:id', routeGuard, (req, res, next) => {
  const id = req.params.id;
  User.findById(id)
    .then((userSingle) => {
      //TODO Remove own profile from view
      res.render('user/profile-view', { userSingle });
    })
    .catch((error) => {});
});

module.exports = router;
