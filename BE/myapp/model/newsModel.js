const mongoose  = require('mongoose');
var NewsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    domain: { type: String, required: true },
    url: { type: String, required: true },
    picture: { type: String, default: '' },
    content: { type: String },
    date: { type: Date, default: Date.now()},
    type: { type: String, default: ''}
});

var News = mongoose.model('News', NewsSchema);
module.exports = News;