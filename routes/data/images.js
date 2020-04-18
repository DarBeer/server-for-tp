const express = require('express');
const imageRoutes = express.Router();
const Image = require('../../models/images');
const multer  = require('multer');

// GET images
imageRoutes.route('/').get((req, res) => {
    Image.find((err, images) => {
        if (err) {
            res.json(err);
        } else {
            res.json(images);
        }}
    );
});

// ADD image data
imageRoutes.route('/add').post((req, res) => {
    const newImage = new Image(req.body);
    newImage.save((err, image) => {
        if (err) {
            res.json({msg: 'Failed to add image data to gallery'});
        } else {
            res.json({msg: 'Image data added to gallery'});
            //res.json(image);
        }}
    );
});

// UPLOAD image
const storage = multer.diskStorage({ // Multer settings
    destination: function (req, file, cb) { // folder for image
        cb(null, './upload/atricle');
    },
    filename: function (req, file, cb) { // save original name of image
        cb(null, file.originalname);
    }
});

const upload = multer({
    storage: storage
    }).single('galleryImage'); // input name attr

imageRoutes.route('/upload').post((req, res) => {
    upload(req,res,(err) => {
        console.log(req.file);
        if(err){
            res.json({msg: 'Failed to add image file to gallery'});
            return;
        }
        res.json({msg: 'Image file added to gallery'});
    });
});

// EDIT image
imageRoutes.route('/edit/:id').get((req, res) => {
    let id = req.params.id;
    Image.findById(id, (err, image) => {
        res.json(image)
    })
});

// UPDATE image
imageRoutes.route('/update/:id').post((req, res) => {
   Image.findById(req.params.id, (err, image) => {
       if (!image)
           return next(new Error(err));
       else {
           image.heading = req.body.heading;
           image.description = req.body.description;
           image.imageUrl = req.body.imageUrl;

           image.save()
               .then(
                   image => res.json(image)
               )
               .catch(
                   err => res.status(400).send(err)
               )
       }
   })
});

// DELETE image
imageRoutes.route('/delete/:id').get((req, res) => {
    Image.findByIdAndRemove({_id: req.params.id}, (err, image) => {
        if (err) {
            res.json(err);
        } else {
            res.json(image);
        }}
    );
});

module.exports = imageRoutes;