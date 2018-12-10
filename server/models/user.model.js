const uniqueValidator = require('mongoose-unique-validator');
const validator = require('validator');
const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
const bcrypt = require('bcryptjs');

const { Schema } = mongoose;

const UserSchema = new Schema (
  {
    username: {
      type: String,
      required: [true, 'A username is required'],
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: [true, 'An email address is required'],
      trim: true,
      unique: true,
      validate: {
        validator(value) {
          return validator.isEmail(value);
        }
      }
    },
    password: String,
  },
  {
    timestamps: true
  }
);

UserSchema.plugin(uniqueValidator, { message: 'Must be a unique value' });

UserSchema.pre('save', function(next) {
  if (!this.isModified('password')){
    return next();
  }

  bcrypt.hash(this.password, 10)
  .then(hashedPassword => {
    this.password = hashedPassword;

    next();
  })
  .catch(next);
});

UserSchema.statics.validatePassword = function(
  candidatePassword,
  hashedPassword
){
  return bcrypt.compare(candidatePassword, hashedPassword);
};

module.exports = mongoose.model('User', UserSchema)
