'use strict';

const { Router } = require('express');
const router = new Router();
const routeGuard = require('./../middleware/route-guard');
const User = require('./../models/user');

const multer = require('multer');
const cloudinary = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
//END IMG

//UPLOAD IMG => CONECTED WITH .ENV
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'hackathon-user-img'
  }
});
//END UPLOAD

const uploader = multer({ storage });

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Hackathon Project' });
});

/* CREATE INFO ON THE USER */

router.get('/user-profile-edit', routeGuard, (req, res) => {
  res.render('user/user-profile-edit');
});

router.post(
  '/:userId/user-profile-edit',
  routeGuard,
  uploader.single('images'),
  (req, res, next) => {
    const name = req.body.name;
    let images;
    if (req.file) {
      images = req.file.path;
    }

    User.findOne({ name })
      .then((document) => {
        if (!document) {
          return User.findByIdAndUpdate(res.locals.user._id, {
            profession: req.body.profession,
          });
        } else {
          const error = new Error("There's already a user with that name.");
          return Promise.reject(error);
        }
      })
      .then((user) => {
        res.redirect('/home');
      })
      .catch((error) => {
        next(error);
      });
  }
);

module.exports = router;
