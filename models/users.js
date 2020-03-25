const mongoose = require('mongoose');
const UserSchema = mongoose.Schema;

// Define collection and schema for Items
const User = new UserSchema({
    username: String,
    password: String,
    root: Boolean
},{
    collection: 'users'
});

module.exports = mongoose.model('User', User);