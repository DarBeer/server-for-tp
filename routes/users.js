const express = require('express');
const userRoutes = express.Router();
const User = require('../models/users');
const multer  = require('multer');

//GET user by USERNAME and PASSWORD
userRoutes.route('/:username&:password').get((req, res) => {
    User.findOne({username: req.params.username, password: req.params.password}, (err, article) => {
        if (err) {
            res.json(err);
        } else {
            res.json(article);
        }}
    );
});

module.exports = userRoutes;