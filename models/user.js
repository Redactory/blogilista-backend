/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const config = require('../utils/config');

const url = config.MONGODB_USER;

mongoose
  .connect(url, { useNewUrlParser: true, useFindAndModify: false })
  .then((result) => {
    console.log('Database connection created successfully');
  })
  .catch((error) => {
    console.log('Error in forming connection with the database', error.message);
  });

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
  },
  name: {
    type: String,
    required: true,
  },
  passwordHash: {
    type: String,
    required: true,
    minlength: 3,
  },
  id: Number,
});

userSchema.plugin(uniqueValidator);

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject.id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

module.exports = mongoose.model('User', userSchema);
