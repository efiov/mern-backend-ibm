require('dotenv').config();
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

mongoose.connect(`mongodb+srv://t5:omegat5@omega.iw7e8lr.mongodb.net/?retryWrites=true&w=majority`, {
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
