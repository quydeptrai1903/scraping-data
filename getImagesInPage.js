const request = require('request');
const cheerio = require('cheerio');
function getImagesInPage(url, src, attr, imageSrcs) {
  var imgSrcs = [];
  request(url, (err, res, html) => {
    if (!err && res.statusCode === 200) {
      const $ = cheerio.load(html);
      $(src).each((i, element) => {
        const imgSrc = $(element).attr(attr);

        imgSrcs = [...imgSrcs, imgSrc];
      });
    }
    imageSrcs(imgSrcs);
  });
}

module.exports = getImagesInPage;
