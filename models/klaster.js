const mongoose = require('mongoose');
const KlasterSchema = mongoose.Schema;

// Define collection and schema for Items
const Klaster = new KlasterSchema({
    name: String,
    description: String,
    date: String
},{
    collection: 'klasters'
});

module.exports = mongoose.model('Klaster', Klaster);