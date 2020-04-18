const express = require('express');
const router = express.Router();

router.use('/articles', require('./articles'));
router.use('/images', require('./images'));
router.use('/services', require('./services'));

module.exports = router;