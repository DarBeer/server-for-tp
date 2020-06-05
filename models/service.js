const mongoose = require('mongoose');
const ServiceSchema = mongoose.Schema;

// Define collection and schema for Items
const Service = new ServiceSchema({
    imgUrl: String,
    heading: String,
    shortDescription: String,
    description: String,
},{
    collection: 'services'
});

module.exports = mongoose.model('Service', Service);