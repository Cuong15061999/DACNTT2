var Guest = require("../model/GuestModel")
class userSevice {
    async getAllUser() {
        return await Guest.find();
    }
    async getUserById(id) {
        return await Guest.findOne({ _id: id })
    }
    async addUser(req) {
        const user = await Guest.findOne({ domain_name: req.body.domain_name, rss_url: req.body.rss_url });
        if (!user) {
            return await new User(req.body).save();
        }
    }
    async editUser(req) {
        const user = await Guest.findOne({ _id: req.params.id });
        if (user) {
            await Guest.updateOne({ _id: req.params.id }, { $set: req.body });
            return req.body
        }
        return Guest._id
    }
    async delUser(id) {
        const user = await Guest.findOne({ _id: id });
        if (user) {
            await Guest.deleteOne({ _id: id })
            return user
        }
        return
    }
}

module.exports = new userSevice();