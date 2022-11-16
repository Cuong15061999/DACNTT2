var newsModel = require("../model/newsModel")
class newsService {
    async getAllNews(){
        return await newsModel.find();
    }
    async getNews(id){
        return await newsModel.findOne({_id: id})
    }
    async editNews(req){
        const findNews = await newsModel.findOne({_id: req.params.id})
        if(findNews){
            await newsModel.updateOne({_id: req.params.id}, {$set: req.body});
            return req.body
        }
        return 
    }
    async delNews(id){
        const newspaper = await newsModel.findOne({_id: id});
        if(newspaper){
            await newsModel.deleteOne({_id: id})
            return newspaper
        }
        return
    }
}
module.exports = new newsService();