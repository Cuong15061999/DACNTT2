import { Schema, model } from 'mongoose';
var UserSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    avatar: { type: String, default: '' },
    tag_favorite: { type: [String], default: []},
    created: { type: Date, required: true, default: Date.now },
});

var User = model('User', UserSchema);
export default User;