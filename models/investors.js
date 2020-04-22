const mongoose = require('mongoose');
const InvestorSchema = mongoose.Schema;

// Define collection and schema for Items
const Investor = new InvestorSchema({
    name: String,
    urlImage: String,
    urlToInv: String
},{
    collection: 'investors'
});

module.exports = mongoose.model('Investor', Investor);