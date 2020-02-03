require('dotenv').config();
require('express-async-errors');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const logger = require('./utils/logger');
const swaggerSpec = YAML.load('./swagger/swagger.yaml');
const routes = require('./routes');

const { connectToDB } = require('./utils/db');
const errorHandler = require('./middleware/errorHandler');


process.on('uncaughtException', e => {
  logger.error(e.message);
  setTimeout(() => process.exit(1), 1000);
});


process.on('unhandledRejection', e => {
  logger.error(e.message);
  setTimeout(() => process.exit(1), 1000);
});


const app = express();
const PORT = process.env.PORT || 3111;
const morganLog =
  process.env.NODE_ENV === 'production' ? morgan('common') : morgan('dev');


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(helmet());
app.use(morganLog);
app.use(cors());
app.use(express.json());

app.use('/api', routes);
app.use(errorHandler);

connectToDB()
  .then(() => {
    console.log('DB connected');
    app.listen(PORT, () => {
      logger.info(`Server is listening on PORT: ${PORT}`);
    });
  })
  .catch(e => {
    logger.error('DB connection failed');
    throw new Error(e);
  });


module.exports = app;