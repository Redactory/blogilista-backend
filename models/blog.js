/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
const config = require('../utils/config');

const url = config.MONGODB_URI;

mongoose
  .connect(url, { useNewUrlParser: true })
  .then((result) => {
    console.log('Database connection created successfully');
  })
  .catch((error) => {
    console.log('Error in forming connection with the database', error.message);
  });

const blogSchema = new mongoose.Schema({
  id: Number,
  title: String,
  author: String,
  url: String,
  likes: Number,
});

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject.id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Blog', blogSchema);
