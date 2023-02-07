var mongoose = require('mongoose');

var TagSchema = new mongoose.Schema({
    tag_name: { type: String, required: true },
    created_at: { type: Date, required: true, default: new Date().toJSON().slice(0, 10) },
    domain: { type: String, required: true },
});

var Tag = mongoose.model('Tag', TagSchema);
module.exports = Tag;