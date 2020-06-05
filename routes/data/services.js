const express = require('express');
const serviceRoutes = express.Router();
const Service = require('../../models/service');
const multer  = require('multer');

// GET service
serviceRoutes.route('/').get((req, res) => {
    Service.find({}).exec(function(err, services) { 
        if (err) { 
            res.json(err) 
        } else {
            res.json(services)
        }
     });
});

// GET service by id
serviceRoutes.route('/get-one/:id').get((req, res) => {
    Service.findById({_id: req.params.id}, (err, service) => {
        if (err) {
            res.json(err);
        } else {
            res.json(service);
        }}
    );
});

// ADD service data
serviceRoutes.route('/add').post((req, res) => {
    const newService = new Service(req.body);
    newService.save((err, service) => {
        if (err) {
            res.json({msg: 'Failed to add Service data to gallery'});
        } else {
            res.json({msg: 'Service data added to gallery'});
            //res.json(image);
        }}
    );
});

// UPLOAD image
const storage = multer.diskStorage({ // Multer settings
    destination: function (req, file, cb) { // folder for image
        cb(null, './uploads/service');
    },
    filename: function (req, file, cb) { // save original name of Service
        cb(null, file.originalname);
    }
});

const upload = multer({
    storage: storage
}).single('serviceImage'); // input name attr

serviceRoutes.route('/upload').post((req, res) => {
    upload(req,res,(err) => {
        console.log(req.file);
        if(err){
            res.json({msg: 'Failed to add Service file to gallery'});
            return;
        }
        res.json({msg: 'Service file added to gallery'});
    });
});

// EDIT Service
serviceRoutes.route('/edit/:id').get((req, res) => {
    if(!req.body) return res.sendStatus(400);
    let id = req.params.id;
    let imgUrl = req.body.imgUrl;
    let heading = req.body.heading;
    let shortDescription = req.body.shortDescription;
    let description = req.body.description;
    let newService = { 
        heading: heading,
        shortDescription: shortDescription,
        description: description,
        imgUrl: imgUrl
    }

    Service.findByIdAndUpdate({ _id: id}, newService, {new: true}, (err, service) => {
        if(err) return console.log(err);
        
        res.status(200).json(service);
    })

});

// UPDATE Service
serviceRoutes.route('/update/:id').post((req, res) => {
    Service.findById(req.params.id, (err, service) => {
        if (!service)
            return next(new Error(err));
        else {
            service.heading = req.body.heading;
            service.description = req.body.description;
            service.shortDescription = req.body.shortDescription;
            service.imageUrl = req.body.imageUrl;

            service.save()
                .then(
                    service => res.status(200).json(service)
                )
                .catch(
                    err => res.status(400).send(err)
                )
        }
    })
});

// DELETE Service
serviceRoutes.route('/delete/:id').get((req, res) => {
    Service.findByIdAndRemove({_id: req.params.id}, (err, service) => {
        if (err) {
            res.json(err);
        } else {
            res.json(service);
        }}
    );
});

module.exports = serviceRoutes;