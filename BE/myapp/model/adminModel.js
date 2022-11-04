import { Schema, model } from 'mongoose';
var AdminSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    avatar: { type: String, default: '' },
    created: { type: Date, required: true, default: Date.now },
});

var Admin = model('Admin', AdminSchema);
export default Admin;