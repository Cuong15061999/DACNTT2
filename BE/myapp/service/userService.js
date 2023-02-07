var userModel = require("../model/userModel")
class userService {
    async getAlluser(){
        return await userModel.find();
    }
    async getuser(id){
        return await userModel.findOne({_id: id})
    }
    async adduser(req){
        const user = await userModel.findOne({username: req.body.username, email: req.body.email});
        if(!user){
            return  await new userModel(req.body).save();
        }
    }
    async edituser(req){
        const finduser = await userModel.findOne({_id: req.params.id})
        if(finduser){
            await userModel.updateOne({_id: req.params.id}, {$set: req.body});
            return req.body
        }
        return 
    }
    async deluser(id){
        const user = await userModel.findOne({_id: id});
        if(user){
            await userModel.deleteOne({_id: id})
            return user
        }
        return
    }
}
module.exports = new userService();