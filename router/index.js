/**
 * Created by Ranshaw on 2017/8/14.
 */
'use strict';

const router = require("koa-router")();
const common = require("./common/index");

router.get('*',common);

/*微博接口*/
const weibo = require('./weibo');
router.get('/add',weibo.add);
router.get('/get',weibo.get);
router.get('/acc',weibo.acc);
router.get('/ref',weibo.ref);
router.get('/del',weibo.del);

module.exports.register = (app) => {
  app.use(router.middleware())
};