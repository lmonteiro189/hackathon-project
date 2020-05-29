'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  gender: {
    type: String,
    enum: [
      'Male',
      'Female',
      'Agender',
      'Androgyne',
      'Bigender',
      'Cis',
      'Cisgender',
      'Gender Fluid',
      'Intersex',
      'Neutrois',
      'Non-binary',
      'Pangender',
      'Trans',
      'Transgender',
      'Transsexual',
      'Two-Spirit',
      'Neither',
      'Other',
    ],
  },
  age: {
    type: Number,
  },
  profession: {
    type: String,
  },
  sexualOrientation: {
    type: String,
    enum: ['Heterosexual', 'Homosexual', 'Bisexual', 'Asexual'],
  },
  disability: {
    type: String,
    enum: [
      'Blindness',
      'Low-Vision',
      'Deuteranomaly',
      'Protanomaly',
      'Protanopia',
      'Deuteranopia',
      'Tritanomaly',
      'Tritanopia',
      'Complete color blindness',
      'Leprosy Cured Persons',
      'Hearing Impairment',
      'Locomotor Disability',
      'Dwarfism',
      'Intellectual Disability',
      'Mental Illness',
      'Autism Spectrum Disorder',
      'Cerebral Palsy',
      'Muscular Dystrophy',
      'Multiple Sclerosis',
      'Speech and Language Disability',
      'Hemophilia',
      'Thalassemia',
      'Multiple Disabilities',
      'Acid Attack Survivors',
      'Parkinson’s Disease',
      'Other',
    ],
  },
  about: {
    type: String,
  },
  photo: {
    type: String,
  },
  githubId: {
    type: String,
  },
  passwordHash: {
    type: String,
  },
  location: {
    type: {
      type: String,
      default: 'Point',
    },
    coordinates: [
      {
        type: Number,
        min: -180,
        max: 180,
      },
    ],
  },
});

module.exports = mongoose.model('User', schema);
