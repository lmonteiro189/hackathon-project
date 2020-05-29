'use strict';

const { Router } = require('express');

const bcryptjs = require('bcryptjs');
const User = require('./../models/user');

const router = new Router();

//GITHUB ROUTER
const passport = require('passport');
const routeGuard = require('./../middleware/route-guard');
//

router.get('/sign-up', (req, res, next) => {
  res.render('sign-up');
});

router.post('/sign-up', (req, res, next) => {
  const { name, email, password } = req.body;
  bcryptjs
    .hash(password, 10)
    .then((hash) => {
      return User.create({
        name,
        email,
        passwordHash: hash
      });
    })
    .then((user) => {
      req.session.user = user._id;
      res.redirect('/homeview');
    })
    .catch((error) => {
      next(error);
    });
});

router.get('/sign-in', (req, res, next) => {
  res.render('sign-in');
});

router.post('/sign-in', (req, res, next) => {
  let user;
  const { email, password } = req.body;
  User.findOne({ email })
    .then((document) => {
      if (!document) {
        return Promise.reject(new Error("There's no user with that email."));
      } else {
        user = document;
        return bcryptjs.compare(password, user.passwordHash);
      }
    })
    .then((result) => {
      if (result) {
        req.session.user = user._id;
        res.redirect('/homeview');
      } else {
        return Promise.reject(new Error('Wrong password.'));
      }
    })
    .catch((error) => {
      next(error);
    });
});

router.post('/sign-out', (req, res, next) => {
  req.session.destroy();
  res.redirect('/');
});


//GITHUB AUTHENTICATION

router.get(
  '/github',
  passport.authenticate('github', {
    successRedirect: '/',
    failureRedirect: '/error'
  })
);

router.get(
  '/github-callback',
  passport.authenticate('github', {
    successRedirect: '/',
    failureRedirect: '/error'
  })
);

//SIGN-UP

router.get('/join-us', (req, res, next) => {
  //console.log(req.user);
  res.render('join-us');
});

router.post(
  '/join-us',
  passport.authenticate('join-us', {
    successRedirect: '/',
    failureRedirect: '/join-us'
  })
);

//SIGN-IN

router.get('/join-us', (req, res, next) => {
  res.render('join-us');
});

router.post(
  '/join-us',
  passport.authenticate('join-us', {
    successRedirect: '/',
    failureRedirect: '/join-us'
  })
);

router.get('/user/private', routeGuard, (req, res, next) => {
  res.render('user/private');
});

router.post('/sign-out', (req, res, next) => {
  req.logout();
  res.redirect('/');
});


module.exports = router;