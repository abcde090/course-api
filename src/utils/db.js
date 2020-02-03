const mongoose = require('mongoose');

exports.connectToDB = () => {
  const {DB_HOST,DB_PORT,DB_DATABASE} =process.env;
  const connectionString =`mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`;
  // mongoose.set('debug', true);
  console.log(`Connecting to ${connectionString}`);
  mongoose.set('useFindAndModify', false);
  return mongoose.connect(process.env.MONGODB_URI || connectionString, {
    useNewUrlParser: true,
    useCreateIndex: true
  });
};
