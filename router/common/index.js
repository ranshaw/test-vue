/**
 * Created by Ranshaw on 2017/8/14.
 */
'use strict';

//设置通用响应头
async function common() {
  let ctx  = arguments[0],
	  res  = ctx.response,
	  next = arguments[1];
  res.set('Content-type','application/json;charset=utf-8');
  res.set("Access-Control-Allow-Origin", "*");
  res.set('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.set("Access-Control-Allow-Headers", "X-Requested-With");
  res.set('Access-Control-Allow-Headers', 'Content-Type');

  if(!(/prev|article/.test(ctx.request.path))){
	ctx.response.set("Cache-Control", "max-age=1800")
  }
  await next();
}

module.exports = common;