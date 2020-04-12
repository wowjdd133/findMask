const Koa = require('koa');
const app = new Koa();

app.listen(5000, () => {
  console.log('server is listening to port 5000');
})