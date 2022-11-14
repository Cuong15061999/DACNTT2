const mongoose  = require('mongoose');

var AdminSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    avatar: { type: String, default: '' },
    created: { type: Date, required: true, default: Date.now },
});

var Admin = mongoose.model('Admin', AdminSchema);
module.exports = Admin;