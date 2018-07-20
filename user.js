const mongoose = require('mongoose');
const { Schema } = mongoose;


const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    lowercase: true,
    required: true
  },
  password: {
    type: String,
    required: false,
  }
});

UserSchema.pre('save', function (next) {
  bcrypt.hash(this.password, 11, (err, hash) => {
      if (err) { 
          return next(err) 
      } else {
          this.password = hash;
          return next()
      }
  })
})

const User = mongoose.model('User', UserSchema);

module.exports = User;
