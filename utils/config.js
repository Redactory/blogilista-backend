require('dotenv').config();

let PORT = process.env.PORT;
let MONGODB_URI = process.env.MONGODB_URI;
let MONGODB_USER = process.env.MONGODB_USER;

if (process.env.NODE_ENV === 'test') {
  MONGODB_URI = process.env.TEST_MONGODB_URI;
}

module.exports = {
  MONGODB_URI,
  MONGODB_USER,
  PORT,
};
