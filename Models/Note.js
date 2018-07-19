const mongoose = require('mongoose');
const { Schema } = mongoose;

const note = {
  title: {
    type: String,
    required: true,
    maxlength: 19
  },
  content: {
    type: String,
    required: true,
    maxlength: 99
  },
  // id: {
  //   type: number,
  //   default: Date.now()
  // }
}

const options = {
  timestamps: true
}

const schemaNotes = new mongoose.Schema(note, options);
module.exports = mongoose.model('Note', schemaNotes);