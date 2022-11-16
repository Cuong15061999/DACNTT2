const newsModel = require('../model/newsModel')
const newsPaperModel = require("../model/NewsSitesModel")
let Parser = require('rss-parser');
let parser = new Parser({
    customFields: {
        item: ['image','description']
    }
});

class CrawlService {
    async CrawlSpecificSite(rss, link) {
        try {
            let feed = await parser.parseURL(rss);
            const findnewsPaper = await newsPaperModel.findOne({domain_name: link, rss_url: rss})
            if(findnewsPaper){
                if(!findnewsPaper.logo && feed.image){
                    await newsPaperModel.updateOne({_id: findnewsPaper._id}, {$set: {logo: feed.image.url}});
                }
            }else{
                return 'wrong domain'
            }

            feed.items.forEach(async item => {
                const findNews = await newsModel.findOne({url: item.link});
                if(!findNews){
                    await new newsModel({
                        title: item.title,
                        domain: link,
                        url: item.link,
                        picture: item.description //can` tach va` lay du lieu tu the img
                    }).save();
                }
            });
            return 'success'
        } catch (error) {
            return error.message
        }

    }
    async CrawlAllSite(){
        try {
            const allSiteUrl = await newsPaperModel.find();
            allSiteUrl.forEach(async siteUrl =>{
                const crawlSite = await this.CrawlSpecificSite(siteUrl.rss_url, siteUrl.domain_name);
                //if crawl not success after 15p crawl again, model need have one status show that site crawl success or not
                console.log('crawl site '+ siteUrl.domain_name + ' process: ' + crawlSite)
            }) 
            return 'this service will crawl all link in the db'
        } catch (error) {
            
        }
    }
}
module.exports = new CrawlService();