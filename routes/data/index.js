const express = require('express');
const router = express.Router();

router.use('/articles', require('./articles'));
router.use('/images', require('./images'));

module.exports = router;