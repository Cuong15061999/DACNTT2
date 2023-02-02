const mongoose  = require('mongoose');
var NewsSiteSchema = new mongoose.Schema({
    domain_name: { type: String, required: true },
    logo: { type: String, default: '' },
    rss_url: { type: String, required: true },
    crawl_process: {type: String, default: ''}, //success failed
    type: { type: String, default: ''},
    last_date_crawl: {type: Date, default: Date.now()}
});

var NewsSite = mongoose.model('NewsSite', NewsSiteSchema);
module.exports = NewsSite;