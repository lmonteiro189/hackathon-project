'use strict';

const { Router } = require('express');
const router = new Router();
const User = require('./../models/user');
const routeGuard = require('./../middleware/route-guard');

router.get('/', (req, res, next) => {
  const apiKey = process.env.GOOGLE_MAPS_KEY;
  if (res.locals.user) {
    res.redirect('/homeview');
  } else {
    res.render('index', { apiKey });
  }
});

router.get('/homeview', routeGuard, (req, res, next) => {
  User.find()
    .then((users) => {
      //TODO Remove own profile from view
      const updatedUsers = users.filter((user) => {
        let userId = user._id;
        userId = userId.toString();
        let currentUserid = res.locals.user._id;
        currentUserid = currentUserid.toString();
        console.log(userId === currentUserid);
        return !(userId === currentUserid);
      });
      console.log(updatedUsers);
      res.render('homeview', { updatedUsers });
    })
    .catch((error) => {});
});

router.get('/users/:id', routeGuard, (req, res, next) => {
  const id = req.params.id;
  let isOwner = false;
  User.findById(id)
    .then((userSingle) => {
      let user = userSingle._id;
      user = user.toString();
      let currentUserid = res.locals.user._id;
      currentUserid = currentUserid.toString();
      console.log(typeof currentUserid);
      if (user === currentUserid) {
        isOwner = true;
        console.log('sadas');
      }
      console.log(userSingle._id, res.locals.user._id);
      res.render('user/profile-view', { userSingle, isOwner });
    })
    .catch((error) => {});
});

module.exports = router;
