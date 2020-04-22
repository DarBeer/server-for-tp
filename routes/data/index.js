const express = require('express');
const router = express.Router();

router.use('/articles', require('./articles'));
router.use('/images', require('./images'));
router.use('/services', require('./services'));
router.use('/investors', require('./investors'));
router.use('/klaster', require('./klaster'));

module.exports = router;