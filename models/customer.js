const mongoose = require('mongoose');

module.exports = mongoose.model(
  'Customer',
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      min: 3,
      max: 255
    },
    phone: {
      type: String,
      required: true,
      min: 5,
      max: 255
    },
    isGold: {
      type: Boolean,
      default: false
    }
  })
);
