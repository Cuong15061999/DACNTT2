import { Schema, model } from 'mongoose';
var NewsSchema = new Schema({
    title: { type: String, required: true },
    domain: { type: String, required: true },
    url: { type: String, required: true },
    picture: { type: String, default: '' },
    content: { type: String, required: true },
});

var News = model('News', NewsSchema);
export default News;