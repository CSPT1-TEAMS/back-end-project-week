const mongoose = require('mongoose');
const { Schema } = mongoose;

const note = {
    title: {
        type: String,
        required: true,
        maxlength: 15
    },
    content: {
        type: String,
        required: true,
        maxlength: 100
    }
    //postedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
}

const options = {
    timestamps: true,
}

const noteSchema = new mongoose.Schema(note, options);

module.exports = mongoose.model('Note', noteSchema);
