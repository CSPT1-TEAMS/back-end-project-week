const mongoose = require('mongoose');

const note = {
    
      username: {
        type: String,
        unique: true
    }  
    ,
    id: {
        type: Number,
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


