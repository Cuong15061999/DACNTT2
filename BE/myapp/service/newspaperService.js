var newsPaper = require('../model/NewsSitesModel')
class newsPaperSevice {
    async getAllNewsPaper(){
        return await newsPaper.find();
    }
    async getNewsPaper(id){
        return await newsPaper.findOne({_id: id})
    }
    async addNewsPaper(req){
        const newspaper = await newsPaper.findOne({domain_name: req.body.domain_name, rss_url: req.body.rss_url});
        if(!newspaper){
            return  await new newsPaper(req.body).save();
        }
    }
    async editNewsPaper(req){
        const newspaper = await newsPaper.findOne({_id: req.params.id});
        if(newspaper){
            await newsPaper.updateOne({_id: req.params.id}, {$set: req.body});
            return req.body
        }
    }
    async delNewsPaper(id){
        const newspaper = await newsPaper.findOne({_id: id});
        if(newspaper){
            await newsPaper.deleteOne({_id: id})
            return newspaper
        }
    }
}

module.exports = new newsPaperSevice();