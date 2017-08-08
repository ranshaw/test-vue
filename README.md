##Build Setup

    # install dependencies
    npm install
               
    # start server（后台启动）
    node app.js
         
    # 前端详见client文件夹中的readme文件
               
    # weibo文件为打包好的前端代码           
    


**服务端：Node + Express + MongoDB** 
 **前   端：Vue2.0 + Vuex + axios**
 **预览地址：<http://m.dayread.top>**
**Github地址：<https://github.com/ranshaw/VueJs>**

 > 这是一个基于Vue, Vuex, Axios, NodeJs, Express, MongoDB, Mongoose的仿发布微博页面的小例子，实现了评论，点赞，踩一踩，删除，分页等功能， 虽然只是一个简单的页面，设计的内容却挺多的，Vue组件的封装，Vuex和Axios的具体使用，服务端接口的编写，数据库的增删查改等。
##服务端推荐阅读
1. [廖雪峰老师的JavaScript教程（含NodeJS和Koa）](https://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000)
2. [Express文档](http://www.expressjs.com.cn/)
3. [MongoDB在window上安装教程](https://jingyan.baidu.com/article/d5c4b52bef7268da560dc5f8.html)
4. [在Node中基于Mongoose对MongoDB进行增删查改](https://segmentfault.com/a/1190000006123880)

##服务端代码实现

  在你阅读完上面的文章之后，我相信服务端代码的编写，对你来说已经没什么问题了，下面代码中用到了少量的ES6中语法，如果只为看懂本文，百度一下即可，为了将来的发展的话，还是要系统学习下，推荐阮一峰大神的ES6教程，现在ES6已经成为前端的必备技能了。

 OK,了解了这些之后，我们开始编写服务端的代码。

**连接数据库，开启服务**
 ```javascript
 const mongoose = require('mongoose'),
    express = require('express'),
    app = express(),
    pathName = __dirname,
    db = mongoose.connect('mongodb://127.0.0.1:27017/data');

mongoose.Promise = global.Promise;

const port = process.env.PORT || 8886;
app.use(express.static(pathName));
app.listen(port);
console.log(`server is start on port:${port}`);

db.connection.on('error', function () {

  console.log('数据库连接失败！')
});

db.connection.on('open', function () {

  console.log('数据库连接成功！')
});
```
**定义模式**
```javascript
comment = mongoose.model('comment', {
    content: String,
    time: String,
    acc: Number,
    ref: Number
  });
```
**添加数据接口**
```javascript
app.get('/add', function (req, res) {

  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET, POST');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  let data = {
    content: '',
    time: '',
    acc: 0,
    ref: 0
  };

  console.log(req.query)
  data.content = req.query.content;
  data.time = new Date().getTime();

  addData(data, function (v) {
    if (v.code === 0) {
      res.send(v)
    } else {

      res.send(v)
    }

  });
});
```
res.header里面的内容是设置允许跨域访问，addData是我封装的保存数据到数据库的一个函数，里面的具体实现就不贴出来了，如果你有认真看上面的那边文章，这里面很简答的，其实用mongoose操作MongoDB，操作是相当的简洁，新增数据，新增一个实例，然后调用其save方法，更新update,删除remove,查询find，说到find，得提一下分页逻辑的实现，
```javascript
let query = comment.find({});
  query.skip((page - 1) * rows);
  query.limit(rows);
  query.sort({'time': -1});
```
其中limit()方法读取指定量的数据，skip()跳过指定量的数据，sort()通过参数指定排序的字段，并使用1和-1来指定排序的方式，其中1为升序，-1为降序排列，rows为一页的总数据，假如现在前端要取第2页的数据，每页有5条数据，逻辑就是跳过5条数据，再取5条数据，然后按时间降序排列下，这种是只求能实现功能就行，没考虑性能，哪位大神有更好的方法，欢迎赐教。

服务端的逻辑就说这么多了，比较简单，[源码点这里](https://github.com/ranshaw/VueJs)，具体实现自行研究哟，觉得有帮助的话，给Star一下哟。

##前端推荐阅读
1. [VueJs官方文档](https://cn.vuejs.org/)
2. [Vuex官方文档](https://vuex.vuejs.org/zh-cn/)
3. [Vue-cli官方文档](https://github.com/vuejs/vue-cli)
4. [Webpack2中文文档](https://doc.webpack-china.org/)
5. [Axios](https://www.npmjs.com/package/axios)
##前端代码实现

![image.png](http://upload-images.jianshu.io/upload_images/6565019-3b7a295a784d5852.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

布局很简单，如有雷同，纯属巧合，废话不多说，开撸。
首先用[Vue-cli](http://www.360doc.com/content/16/0107/14/14416931_526156044.shtml)初始化一个项目，如果没有用过，点击前面的链接，自行研究下。

![image.png](http://upload-images.jianshu.io/upload_images/6565019-8bc60327ab7b9f59.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
其中TakeComment.vue是评论框组件，CommentList.vue是评论列表组件，Paging.vue是分页组件，分页组件是模仿我之前用过的Jquery 的Datatables插件的分页逻辑，

开始长这样

![image.png](http://upload-images.jianshu.io/upload_images/6565019-65f62ea4fca2c6c7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

中间长这样

![image.png](http://upload-images.jianshu.io/upload_images/6565019-ae958fc6f16a4e70.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

最后长这样

![image.png](http://upload-images.jianshu.io/upload_images/6565019-474901e14df051d6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

实现逻辑在store.js里getters中的pages()中。

static中存放的事图片和样式代码，ajax.js中是封装的接口，其实叫api.js更好点，store.js就是用Vuex对整个项目所有状态的一个管理，项目里需要管理的状态并不多，相比Vuex官方的例子要稍微复杂点，
```javascript
const state = {
    current:1,
    commentList:[],
    pageNo:1,
    backClipped: true,
    preClipped: false,
};
```
##总结
 [项目源码](https://github.com/ranshaw/VueJs) 欢迎Start!
孩子，我看你骨骼精奇，是块撸代码的好材料，待你撸完上面的代码即可打通任督二脉，开启通往高手之路。