const moongose = require('mongoose');

const archiveSchema = new moongose.Schema({
  Number: {
    type: Number,
    required: true,
    unique: true
  },
  Name: {
    type: String,
    required: true
  },
  Area: {
    type: String,
    required: true
  },
  Status: {
    type: String,
    required: true
  },
  BarCode: {
    type: String,
    required: true,
    unique: true
  }
})

module.exports = moongose.model('Process', archiveSchema);

