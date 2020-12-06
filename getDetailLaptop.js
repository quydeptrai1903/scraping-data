const request = require('request');
const cheerio = require('cheerio');
const db = require('./db');
const Product = require('./productModel');
db;
function filterDescription(str) {
  let index = str.indexOf(':');
  return str.substring(index + 1, str.length).trim();
}

function removeWhiteSpace(str) {
  str = str.split(',');
  str = str[0] + str[1] + str[2];
  str = str.substring(1, str.length);
  return str;
}

function getDetailLaptop(url) {
  request(url, (err, res, html) => {
    if (!err && res.statusCode === 200) {
      const $ = cheerio.load(html);
      const productName = $('.title_pc .title-product').text();
      if (productName === null || productName === undefined) return;
      //const brandImgSrc = $('.thuong-hieu a img').attr('src');
      const sku = $('.title_pc meta').attr('content');

      const description = $(
        '.description li,.changer_color div',
      ).map((i, element) => filterDescription($(element).text()));

      const warranty = $('.service li').text();

      const price = removeWhiteSpace(
        $('.sticky_detail__right .price strong').text().trim(),
      );
      const reviews = $('.content-danhgia .rte').text();
      const imgSrc = $('.slide_img img').attr('src');
      const product = new Product({
        productID: sku,
        brand: 'HP',
        name: productName,
        detail: {
          processor: description[0],
          os: description[9],
          graphics: description[4],
          display: description[1] + description[2],
          memory: description[3],
          hardDrive: description[5],
          color: description[10],
          weight: description[8],
          battery: description[6],
          ports: description[7],
        },
        price: price,
        warranty: warranty,
        images: imgSrc,
        status: 'in_stock',
        discount: 0,
        description: reviews,
      });
      product.save().then((data) => {
        console.log(data);
      });
    }
  });
}

function getUrlLaptop(url) {
  request(url, (err, res, html) => {
    if (!err && res.statusCode === 200) {
      const $ = cheerio.load(html);
      const urlLaptop = $('.image-container a').map((i, el) => {
        return $(el).attr('href');
      });

      for (let i = 0; i < urlLaptop.length; i++) {
        getDetailLaptop('https://thinkpro.vn' + urlLaptop[i]);
      }
    }
  });
}

getUrlLaptop(
  'https://thinkpro.vn/asus?categories%5B0%5D=1&sub_brands%5B0%5D=103&sub_brands%5B1%5D=106',
);
