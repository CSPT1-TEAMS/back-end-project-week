const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 5
    },
    password: {
        type: String,
        required: true
    },
    notes: [{
        type: ObjectId,
        ref: "Note"
    }],
});

module.exports = mongoose.model("User", userSchema);