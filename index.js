const pup = require('puppeteer');



const scrapeAuthor = async (urls) => {
    const browser = await pup.launch();
    const posts = [];
    for (let i = 0; i < urls.length; i++) {
        const url = urls[i];
        const page = await browser.newPage();
        try {
            await page.goto(url,{
                waitUntil: 'load',
                timeout: 0
            });
            const author = await page.evaluate(() => {
            return (document.querySelectorAll('a[rel="author"]')[0] && document.querySelectorAll('a[rel="author"]')[0].text)
                    || (document.querySelectorAll('a[itemprop="author"]')[0] && document.querySelectorAll('a[itemprop="author"]')[0].text)
                    || (document.querySelectorAll('span[itemprop="author"]')[0] && document.querySelectorAll('span[itemprop="author"]')[0].text)
                    || (document.querySelectorAll('div.author')[0] && document.querySelectorAll('div.author')[0].innerText)
                    || 'Could\'nt find';
            });
            posts.push({
                url: url,
                author: author
            });
        } catch (error) {
            posts.push({
                url: url,
                author: 'not found'
            });
        }
    }

    await browser.close();

    posts.forEach(post => {
        console.log(`Page: ${post.url} By ${post.author}`);
    });
}


const urls = [
    'https://www.codeinwp.com/blog/best-wordpress-hosting-india/',
    'https://searchengineland.com/16-straight-days-of-rankings-volatility-seos-dig-into-the-covid-19-effects-on-search-332536',
    'https://www.techradar.com/news/oneplus-8-design-has-been-unveiled-in-shock-pre-launch-move',
    'https://www.express.co.uk/showbiz/tv-radio/1267368/Stranger-Things-viewing-figures-Tiger-King-documentary-blow-Netflix-video',
    'https://www.bloggersideas.com/bill-slawski-veteran-seo-expert/'
];


scrapeAuthor(urls);