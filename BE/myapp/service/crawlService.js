const newsModel = require('../model/NewsModel');
const newsPaperModel = require("../model/NewsSitesModel");
let Parser = require('rss-parser');
const { Classifier } = require('ml-classify-text');
var logger = require('logger').createLogger();;
var fs = require('fs');
var moment = require('moment');

let parser = new Parser({
    defaultRSS: 2.0,
    customFields: {
        item: ['image', 'description']
    }
});
const takeImage = (stringImage) => {
    if (stringImage.includes("img")) {
        const imageLink = stringImage.match(/src="(.*?)"/i)[1];
        return imageLink ? imageLink : ''
    }
}
class CrawlService {
    async CrawlSpecificSite(rss, link) {
        try {
            let feed = await parser.parseURL(rss);
            const findnewsPaper = await newsPaperModel.findOne({ domain_name: link, rss_url: rss })
            if (findnewsPaper) {
                if (!findnewsPaper.logo && feed.image) {
                    await newsPaperModel.updateOne({ _id: findnewsPaper._id }, { $set: { logo: feed.image.url } });
                }
            } else {
                return 'wrong domain'
            }

            feed.items.forEach(async item => {
                const findNews = await newsModel.findOne({ url: item.link });
                if (!findNews) {
                    await new newsModel({
                        title: item.title,
                        domain: link,
                        url: item.link,
                        picture: takeImage(item.description), //can` tach va` lay du lieu tu the img
                        date: item.pubDate
                    }).save();
                }
            });
            await newsPaperModel.updateOne({ domain_name: link, rss_url: rss }, { $set: { crawl_process: 'success' } });
            return 'success'
        } catch (error) {
            console.log(error.message);
            await newsPaperModel.updateOne({ domain_name: link, rss_url: rss }, { $set: { crawl_process: 'failed' } });
            return 'failed'
        }

    }
    async CrawlAllSite() {
        try {
            const allSiteUrl = await newsPaperModel.find();
            allSiteUrl.forEach(async siteUrl => {
                const crawlSite = await this.CrawlSpecificSite(siteUrl.rss_url, siteUrl.domain_name);
                //if crawl not success after 15p crawl again, model need have one status show that site crawl success or not
                console.log('crawl site ' + siteUrl.domain_name + 'rss url ' + siteUrl.rss_url + ' process: ' + crawlSite)
            })
            return 'this service will crawl all link in the db'
        } catch (error) {
            throw error
        }
    }

    async getTrainTitle() {
        try {
            const allTitle = await newsModel.find({}, { title: 1, _id: 0 });
            let dataTrain = []
            allTitle.forEach(async trainTitle => {
                dataTrain.push(trainTitle.title);
            });
            const data = JSON.stringify(dataTrain);
            fs.writeFile("./dataT/game.json", data, function (err) {
                if (err) {
                    console.log(err);
                }
            });
            return 'training success', data
        } catch (error) {
            throw error
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

    async readModalAndStore() {
        try {
            const classifier = new Classifier({
            });
            let gameRaw = fs.readFileSync('./dataT/game.json');
            let game = JSON.parse(gameRaw);
            let thethaoRaw = fs.readFileSync('./dataT/thethao.json');
            let thethao = JSON.parse(thethaoRaw);
            let congngheRaw = fs.readFileSync('./dataT/congnghe.json');
            let congnghe = JSON.parse(congngheRaw);
            let dulichRaw = fs.readFileSync('./dataT/dulich.json');
            let dulich = JSON.parse(dulichRaw);
            let giaitriRaw = fs.readFileSync('./dataT/giaitri.json');
            let giaitri = JSON.parse(giaitriRaw);
            let giaoducRaw = fs.readFileSync('./dataT/giaoduc.json');
            let giaoduc = JSON.parse(giaoducRaw);
            let kinhteRaw = fs.readFileSync('./dataT/kinhte.json');
            let kinhte = JSON.parse(kinhteRaw);
            let suckhoeRaw = fs.readFileSync('./dataT/suckhoe.json');
            let suckhoe = JSON.parse(suckhoeRaw);
            let thoisuRaw = fs.readFileSync('./dataT/thoisu.json');
            let thoisu = JSON.parse(thoisuRaw);
            let vanhoaRaw = fs.readFileSync('./dataT/vanhoa.json');
            let vanhoa = JSON.parse(vanhoaRaw);
            await classifier.train(game, 'game');
            await classifier.train(thethao, 'thể thao');
            await classifier.train(congnghe, 'công nghệ');
            await classifier.train(dulich, 'du lịch');
            await classifier.train(giaitri, 'giải trí');
            await classifier.train(giaoduc, 'giáo dục');
            await classifier.train(kinhte, 'kinh tế');
            await classifier.train(suckhoe, 'sức khỏe');
            await classifier.train(thoisu, 'thời sự');
            await classifier.train(vanhoa, 'văn hóa');
            let model = await classifier.model.serialize();
            const data = JSON.stringify(model);
            fs.writeFile("model.json", data, function (err) {
                if (err) {
                    console.log(err);
                }
            });
            // let predictions2 = await classifier.predict("endless đã")
            // if (predictions2.length) {
            //   predictions2.forEach(prediction2 => {
            //     console.log(`after read model ${prediction2.label} (${prediction2.confidence})`)
            //   })
            //   return predictions2.label;
            // } else {
            //   console.log('No predictions returned')
            //   return ''
            // }   
            // return data
        } catch (error) {
            throw error
        }
    }
}
module.exports = new CrawlService();