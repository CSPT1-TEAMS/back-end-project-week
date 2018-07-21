const mongoose = require('mongoose');

const note = {
    user: {
      username: {
        type: String,
        unique: true
      }  
    },
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    content: {
        type: String,
        required: [true, 'content is required']
    },
    created : {
        type: Date,
        default: Date.now
    }
}

const noteSchema = new mongoose.Schema(note);

module.exports = mongoose.model('Note', noteSchema);