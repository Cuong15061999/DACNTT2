import { Schema, model } from 'mongoose';
var TagSchema = new Schema({
    tag_name: { type: String, required: true },
    created_at: { type: Date, required: true, default: Date.now },
    domain: { type: String, required: true },
});

var Tag = model('Tag', TagSchema);
export default Tag;