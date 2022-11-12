let Parser = require('rss-parser');
let parser = new Parser({
    customFields: {
        item: ['image','description']
    }
});

class CrawlService {
    async CrawlInfo(req) {
        console.log('test rss')
        let feed = await parser.parseURL('https://thanhnien.vn/rss/gioi-tre-69.rss');
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