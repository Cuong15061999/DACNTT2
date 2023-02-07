const newsModel = require('../model/newsModel')
const newsPaperModel = require("../model/NewsSitesModel")
let Parser = require('rss-parser');
let parser = new Parser({
    customFields: {
        item: ['image','description']
    }
});
const takeImage = (stringImage)=>{
    if (stringImage.includes("img")) {
        const imageLink = stringImage.match(/src="(.*?)"/i)[1];
        return imageLink ? imageLink : ''
    }
}
class CrawlService {
    async CrawlSpecificSite(rss, link) {
        try {
            let feed = await parser.parseURL(rss);
            const findnewsPaper = await newsPaperModel.findOne({domain_name: link, rss_url: rss})
            if(findnewsPaper){
                //update logo if don't have yet
                if(!findnewsPaper.logo && feed.image){
                    await newsPaperModel.updateOne({_id: findnewsPaper._id}, {$set: {logo: feed.image.url}});
                }
                //update latest date crawl
                await newsPaperModel.updateOne({_id: findnewsPaper._id}, {$set: {last_date_crawl: Date.now()}});
            }else{
                return 'wrong domain'
            }

            feed.items.forEach(async item => {
                const findNews = await newsModel.findOne({url: item.link});
                if(!findNews){
                    if(findnewsPaper.type){
                        await new newsModel({
                            title: item.title,
                            domain: link,
                            url: item.link,
                            picture: takeImage(item.description), //can` tach va` lay du lieu tu the img
                            date: item.pubDate,
                            type: findnewsPaper.type
                        }).save();
                    } else {
                        await new newsModel({
                            title: item.title,
                            domain: link,
                            url: item.link,
                            picture: takeImage(item.description), //can` tach va` lay du lieu tu the img
                            date: item.pubDate,
                            type: genrePrediction(item.title)
                        }).save();
                    }
                }
            });
            await newsPaperModel.updateOne({domain_name: link, rss_url: rss}, {$set: {crawl_process: 'success'}});
            return 'success'
        } catch (error) {
            console.log(error.message);
            await newsPaperModel.updateOne({domain_name: link, rss_url: rss}, {$set: {crawl_process: 'failed'}});
            return 'failed'
        }

    }
    async CrawlAllSite(){
        try {
            const allSiteUrl = await newsPaperModel.find();
            allSiteUrl.forEach(async siteUrl =>{
                const crawlSite = await this.CrawlSpecificSite(siteUrl.rss_url, siteUrl.domain_name);
                //if crawl not success after 15p crawl again, model need have one status show that site crawl success or not
                console.log('crawl site '+ siteUrl.domain_name +'rss url '+ siteUrl.rss_url + ' process: ' + crawlSite)
            }) 
            return 'this service will crawl all link in the db'
        } catch (error) {
            return error
        }
    }

    async genrePrediction(title) {
        try {
            let read = fs.readFileSync('model.json');
            let data = await JSON.parse(read);
            // console.log(data);
            const classifier = await new Classifier({

            });
            classifier.model = await data
            //---------- predict -----------------
            let predictions2 = await classifier.predict(title)
            
            if (predictions2.length) {
              predictions2.forEach(prediction2 => {
                console.log(`after read model ${prediction2.label} (${prediction2.confidence})`)
              })
              return predictions2.label;
            } else {
              console.log('No predictions returned')
              return ''
            }          
        } catch (error) {
            throw error
        }
    }
}
module.exports = new CrawlService();