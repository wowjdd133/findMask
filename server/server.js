const Koa = require('koa');
const Router = require('koa-router');
// const json = require('koa-json');

const app = new Koa();
const router = new Router();
const api = require('./api');

// app.use(json());

router.use('/api', api.routes());

// const cheerio = require('cheerio');
// const axios = require('axios');

// const getHTML = async (url) => {
//   return await axios.get(url);
// }

// app.get('/coronaWorld',(req,res,next) => {
//   url = "https://www.worldometers.info/coronavirus/";
  
//   getHTML(url)
//     .then((html) => {
//       const $ = cheerio.load(html.data);

//      
//     })
  

// })

app.use(router.routes()).use(router.allowedMethods());

app.listen(5000, () => {
  console.log('server is listening to port 5000');
})