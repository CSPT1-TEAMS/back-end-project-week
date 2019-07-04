const mongoose = require('mongoose');
const { Schema } = mongoose;


const NoteSchema= new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: false,
  },
  date: String,
});

NoteSchema.methods.getNoteTitle = function() {
  return this.title;
};

const Note = mongoose.model('Note', NoteSchema);

module.exports = Note;
