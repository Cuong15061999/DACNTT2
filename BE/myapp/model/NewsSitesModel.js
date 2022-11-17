const mongoose  = require('mongoose');
var NewsSiteSchema = new mongoose.Schema({
    domain_name: { type: String, required: true },
    logo: { type: String, default: '' },
    rss_url: { type: String, required: true },
    crawl_process: {type: String, default: ''} //success failed
});

var NewsSite = mongoose.model('NewsSite', NewsSiteSchema);
module.exports = NewsSite;