const mongoose  = require('mongoose');
var NewsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    domain: { type: String, required: true },
    url: { type: String, required: true },
    picture: { type: String, default: '' },
    content: { type: String, required: true },
});

var News = mongoose.model('News', NewsSchema);
module.exports = News;