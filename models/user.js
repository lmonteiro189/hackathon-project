'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  photo: {
    type: String
  },
  githubId: {
    type: String
  },
  passwordHash: {
    type: String
  },
  coordinates: [
    {
      type: Number,
      min: -180,
      max: 180
    }
  ]
});

module.exports = mongoose.model('User', schema);
