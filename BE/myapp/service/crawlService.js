const axios = require('axios');
const cheerio = require('cheerio')
let Parser = require('rss-parser');
let parser = new Parser({
    customFields: {
        item: ['image','description']
    }
});
const seenUrls = [];
const getUrl = (link) => {
    if (link.includes("https")){
        return link
    }
}

class CrawlService {
    async CrawlInfo(req) {
        let feed = await parser.parseURL('https://tuoitre.vn/rss/tin-moi-nhat.rss');
        console.log(feed.title);

        feed.items.forEach(item => {
            console.log('--------------')
            console.log('Title: '+item.title)
            console.log('Description: '+item.description)
            console.log('Link: '+item.link)
            console.log('public date: '+item.pubDate)
            console.log('Categories: '+item.categories)
        });
        return 'test'
    }
}
module.exports = new CrawlService();