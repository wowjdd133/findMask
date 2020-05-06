const Router = require('koa-router');
const cheerio = require('cheerio');

const coronaWorld = new Router();

const lib = require('../../lib/getLib.js');

const url = "https://www.worldometers.info/coronavirus/";

coronaWorld.get('/', async (ctx,next) => {
  // const getHTML = async (url) => {
  //   return await axios.get(url);
  // }
  
  // const $ = getHTML(url);
  // console.log($);
  // ctx.body = '1';
  let htmlPromise = await new Promise((resolve, reject) =>{
    lib.getHTML(url)
      .then(html => {
        const $ = cheerio.load(html.data);

        let confirmList= [];
  
        $('div.maincounter-number').children('span').each(function (i,elem) {
          confirmList.push($(this).text().trim());
        });
  
        resolve(confirmList);
    })
  
  let result;
  try {
    result = await htmlPromise,all(Promise);
  } catch(e) {
    ctx.throw(400);
  }

  ctx.body = result;
  })

    // .then((html) => {
      // const $ = cheerio.load(html.data);

      // let confirmList= [];

      // $('div.maincounter-number').children('span').each(function (i,elem) {
      //   confirmList.push($(this).text());
      // });

      // ctx.body = confirmList;
    // });
})

module.exports = coronaWorld;