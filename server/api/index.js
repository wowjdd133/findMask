const Router = require('koa-router');

const api = new Router();
const coronaWorld = require('./coronaWorld');

api.use('/coronaWorld', coronaWorld.routes());

module.exports = api;