/**
 * Created by Ranshaw on 2017/8/14.
 */
'use strict';

const Koa            = require('koa');
const router         = require('koa-router')();
const app            = new Koa();
const routerRegister = require('./router/index');
const bodyParser     = require('koa-bodyparser');
const cors           = require('koa-cors');
const koaJson        = require('koa-json');
const serve          = require('koa-static');
const logger         = require('koa-logger');
const compress       = require('koa-compress');
const path           = require('path');
const port           = process.env.PORT || 8886;

app.use(async (ctx, next) => {
  console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
  await next();
});

app.use(cors());
app.use(koaJson());
app.use(bodyParser());
app.use(serve('.'));
app.use(compress());
app.use(logger());

routerRegister.register(app);

app.listen(port);
console.log(`app started at port ${port}...`);