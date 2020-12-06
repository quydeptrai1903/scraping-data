const fs = require('fs');
const getDetailLaptop = require('./getDetailLaptop');

const getImagesInPage = require('./getImagesInPage');

const x = getImagesInPage(
  'https://thinkpro.vn/dell',
  '.image-container a img',
  'data-src',
  (imgSrcs) => {
    // console.log(imgSrcs);
  },
);
console.log(x);
