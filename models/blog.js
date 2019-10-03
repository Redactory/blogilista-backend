const mongoose = require('mongoose');

const url = process.env.MONGODB_URI;

mongoose
    .connect(url, {useNewUrlParser: true})
    .then(result => {
        console.log('Database connection created successfully');
    })
    .catch(error => {
        console.log('Error in forming connection with the database', error.message)
    });

    const blogSchema = new mongoose.Schema({
        title: String,
        author: String,
        url: String,
        likes: Number
      });

      
    blogSchema.set('toJSON', {
        transform: (document, returnedObject) => {
            delete returnedObject._id;
            delete returnedObject.__v;
        }
    });

      module.exports = mongoose.model('Blog', blogSchema);