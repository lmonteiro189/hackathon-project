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
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'hackathon-user-img',
  },
});
//END UPLOAD

const uploader = multer({ storage });

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Hackathon Project' });
});

/* CREATE INFO ON THE USER */

router.get('/user-profile-edit', routeGuard, (req, res) => {
  const apiKey = process.env.GOOGLE_MAPS_KEY;
  res.render('user/user-profile-edit', { apiKey });
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
    const age = req.body.dob;
    const gender = req.body.gender;
    const profession = req.body.profession;
    const orientation = req.body.sexualOrientation;
    const disability = req.body.disability;
    const latitude = req.body.latitude;
    const longitude = req.body.longitude;
    return User.findByIdAndUpdate(res.locals.user._id, {
      name,
      age,
      gender,
      profession,
      sexualOrientation: orientation,
      disability,
      photo: images,
    })
      .then((user) => {
        res.redirect(`/users/${res.locals.user._id}`);
      })
      .catch((error) => {
        next(error);
      });
  }
);

module.exports = router;
