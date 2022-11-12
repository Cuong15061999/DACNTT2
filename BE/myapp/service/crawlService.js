let Parser = require('rss-parser');
let parser = new Parser;

class CrawlService {
    async CrawlInfo(req) {
        console.log('test rss')
        let feed = await parser.parseURL('https://vnexpress.net/rss/tin-moi-nhat.rss');
        console.log(feed.title);

        feed.items.forEach(item => {
            console.log('--------------')
            console.log('Title: '+item.title)
            console.log('Link: '+item.link)
            console.log('public date: '+item.pubDate)
            console.log('Categories: '+item.categories)
        });
        return 'test'
    }
}
module.exports = new CrawlService();