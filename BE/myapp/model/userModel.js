var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    avatar: { type: String, default: '' },
    tag_favorite: { type: [String], default: []},
    created: { type: Date, required: true, default: Date.now },
});

var User = mongoose.model('User', UserSchema);
module.exports = User;