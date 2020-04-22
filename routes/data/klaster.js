const express = require('express');
const klasterRoutes = express.Router();
const Klaster = require('../../models/klaster');
const multer  = require('multer');

//GET klaster
klasterRoutes.route('/').get((req, res) => {
    Klaster
        .findOne()
        .sort({date: -1})
        .exec((err, klaster) => {
            if (err) {
                res.json(err)
            } else {
                res.json(klaster)
            }
        });
});

//SET klaster
klasterRoutes.route('/add').post((req, res) => {
    const newKlaster = new Klaster(req.body);
    newKlaster.save((err, klaster) => {
        if (err) {
            res.json({ msg: 'Failed to add new klaster data' });
        } else {
            res.json({ msg: 'Klaster data added' });
        }
    });
});

//DELETE klaster
klasterRoutes.route('/delete/:id').get((req, res) => {
    Klaster
        .findByIdAndRemove({_id: req.params.id}, (err, klaster) => {
            if (err) {
                res.json(err);
            } else {
                res.json(klaster);
            }
        });
});

//UPDATE klaster
klasterRoutes.route('/update/:id').post((req, res) => {
    Klaster.findByIdAndUpdate(req.params.id, (err, klaster) => {
        if (!klaster) {
            return next(new Error(err));
        } else {
            klaster.name = req.body.name;
            klaster.description = req.body.description;
            klaster.date = req.body.date;

            klaster.save()
                .then(
                    klaster => res.json(klaster)
                )
                .catch(
                    err = res.status(400).send(err)
                )
        }
    })
});

module.exports = klasterRoutes;