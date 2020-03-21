const mongoose = require('mongoose');
const ImageSchema = mongoose.Schema;

// Define collection and schema for Items
const Image = new ImageSchema({
    heading: String,
    description: String,
    urlImage: String,
    date: String
},{
    collection: 'images'
});

module.exports = mongoose.model('Image', Image);