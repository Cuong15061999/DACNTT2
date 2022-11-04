import { Schema, model } from 'mongoose';
var NewsSiteSchema = new Schema({
    domain_name: { type: String, required: true },
    logo: { type: String, default: '' },
    rss_url: { type: String, required: true },
});

var NewsSite = model('NewsSite', NewsSiteSchema);
export default NewsSite;