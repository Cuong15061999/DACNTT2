var mongoose = require('mongoose');
var User = require('../model/userModel');
var Admin = require('../model/adminModel')
require('dotenv').config();
let env_ToDeploy = process.env.ENV;
let MongoUrl = process.env.MongoCN;

//Function Connect to Mongodb
const mongoconnect = {
    connectDB: function () {
        //check what env dev want to devploy 
        switch (env_ToDeploy) {
            case 'DEVELOPMENT':
                mongoose.connect(MongoUrl, { keepAlive: true, keepAliveInitialDelay: 300000 }).then(() => {
                    console.log('Database connected - Dev');
                });
                break;
            case 'PRODUCTION':
                mongoose.connect(MongoUrl, { keepAlive: true, keepAliveInitialDelay: 300000 }).then(() => {
                    console.log('Database connected - Product');
                });;
                break;
            default:
                throw new Error('Unknow execution environment: ' + app.get('env'));
        }

        //intial create first User in User Collection
        Admin.find(function (err, admins) {
            if (admins.length) return;
            new Admin({
                username: 'admin',
                password: 'admin',
                email: 'admin@gmail.com',
            }).save(function (err) {
                if (err) throw err;
                console.log('First admin successfully saved.');
            });
        })

    }
}
module.exports = mongoconnect