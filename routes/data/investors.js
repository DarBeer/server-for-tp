const express = require('express');
const investorRoutes = express.Router();
const Investor = require('../../models/investors');
const multer  = require('multer');

// GET investors
investorRoutes.route('/').get((req, res) => {
    Investor.find({}).sort({date: -1}).exec(function(err, investors) { 
        if (err) { 
            res.json(err) 
        } else {
            res.json(investors)
        }
     });
});

// ADD investor data
investorRoutes.route('/add').post((req, res) => {
    const newInvestor = new Investor(req.body);
    newInvestor.save((err, investor) => {
        if (err) {
            res.json({msg: 'Failed to add investor data to gallery'});
        } else {
            res.json({msg: 'Investor data added to gallery'});
            //res.json(image);
        }}
    );
});

// UPLOAD image
const storage = multer.diskStorage({ // Multer settings
    destination: function (req, file, cb) { // folder for image
        cb(null, './uploads/investors');
    },
    filename: function (req, file, cb) { // save original name of investor
        cb(null, file.originalname);
    }
});

const upload = multer({
    storage: storage
}).single('investorImage'); // input name attr

investorRoutes.route('/upload').post((req, res) => {
    upload(req,res,(err) => {
        console.log(req.file);
        if(err){
            res.json({msg: 'Failed to add investor file to gallery'});
            return;
        }
        res.json({msg: 'Investor file added to gallery'});
    });
});

// EDIT investor
investorRoutes.route('/edit/:id').get((req, res) => {
    let id = req.params.id;
    Investor.findById(id, (err, investor) => {
        res.json(investor)
    })
});

// UPDATE investor
investorRoutes.route('/update/:id').post((req, res) => {
    Investor.findById(req.params.id, (err, investor) => {
        if (!investor)
            return next(new Error(err));
        else {
            investor.name = req.body.name;
            investor.urlImage = req.body.String;
            investor.urlToInv = req.body.String;

            investor.save()
                .then(
                    investor => res.json(investor)
                )
                .catch(
                    err => res.status(400).send(err)
                )
        }
    })
});

// DELETE investor
investorRoutes.route('/delete/:id').get((req, res) => {
    Investor.findByIdAndRemove({_id: req.params.id}, (err, investor) => {
        if (err) {
            res.json(err);
        } else {
            res.json(investor);
        }}
    );
});

module.exports = investorRoutes;