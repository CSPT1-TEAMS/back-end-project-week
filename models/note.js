const mongoose = require('mongoose');

const note = {
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    content: {
        type: String,
        required: [true, 'content is required']
    }
}

const noteSchema = new mongoose.Schema(note);

module.exports = mongoose.model('Note', noteSchema);