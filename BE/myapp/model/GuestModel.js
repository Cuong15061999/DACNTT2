const mongoose = require('mongoose');
const { Schema } = mongoose;

var GuestSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    avatar: { type: String, default: '' },
    tag_favorite: { type: [String], default: []},
    refreshToken: { type: String, default: ''},
    created: { type: Date, required: true, default: Date.now },
});

var Guest = mongoose.model('Guest', GuestSchema);
module.exports = Guest;