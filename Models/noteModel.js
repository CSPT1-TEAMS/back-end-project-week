const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxlength: 20
    },
    content: {
        type: String
    },
    user: [{
        type: ObjectId,
        ref: "User"
    }],
});

module.exports = mongoose.model("Note", noteSchema);