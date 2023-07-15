require('dotenv').config();
const mongoose = require('mongoose');
const { DB_URL } = require('./keys');
mongoose.set('strictQuery', true);
const url = process.env.DB_URL.toString();

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const database = mongoose.connection;

database.on('error', (error) => {
  console.error('Connection error:', error);
  process.exit(1);
});
database.once('open', function () {
  console.log('Connected to MongoDB');
});

module.exports = database;
