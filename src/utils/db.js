const mongoose = require('mongoose');

exports.connectToDB = () => {
  const { MONGODB_URL } = process.env;
  // mongoose.set('debug', true);
  const connectionString = `mongodb://${MONGODB_URL}`;

  console.log(`Connecting to ${connectionString}`);
  mongoose.set('useFindAndModify', false);
  return mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useCreateIndex: true
  });
};
