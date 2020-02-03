const express = require('express');
const courseRoute = require('./routes/course');

const router = express.Router();

router.use('/courses', courseRoute);

module.exports = router;
