/**
 * Created by Ranshaw on 2017/6/21.
 */
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

let init,
    createTable,
    comment,
    getNowDate,
    addZero,
    addData,
    findData,
    updateData,
    delData;


createTable = function () {

  comment = mongoose.model('comment', {
    content: String,
    time: String,
    acc: Number,
    ref: Number
  });

};

addZero = function (v) {
  v = v.toString();
  return v[1] ? v : '0' + v
};

getNowDate = function (time) {

  let year = time.getFullYear(),
      month = time.getMonth() + 1,
      date = time.getDate(),
      hours = time.getHours(),
      minutes = time.getMinutes(),
      seconds = time.getSeconds();

  return [year, month, date].map(addZero).join('-') + ' ' + [hours, minutes, seconds].map(addZero).join(':')

};

addData = function (obj, cb) {

  if (!obj) {
    cb({
      code: 1,
      info: '缺少必要的参数！'
    });
    return;
  }


  let addNew = new comment({
    content: obj.content,
    time: obj.time,
    acc: obj.acc,
    ref: obj.ref
  });


  addNew.save(function (err) {

    if (err) {

      cb({
        code: 1,
        info: '写入数据失败!'
      });
      console.log('写入数据失败' + err)
    } else {

      cb({
        code: 0,
        info: '写入数据成功 !'
      });
      console.log('写入数据成功！')
    }
  });


};

findData = function (obj, cb) {

  if (!obj) {
    cb({
      code: 1,
      info: '缺少必要的参数！'
    });
    return;
  }


  let page = obj.page;
  let rows = obj.rows;

  var query = comment.find({});
  query.skip((page - 1) * rows);
  query.limit(rows);
  query.sort({'time': -1});
//计算分页数据
  query.exec(function (err, rs) {
    if (err) {

      cb({
        code: 1,
        info: '读取数据失败!'
      });
    } else {
      //计算数据总数
      comment.find(function (err, result) {
        if (err) {
          cb({
            code: 1,
            info: '读取数据失败!'
          });
        } else {

          let jsonArray = {rows: rs.reverse(), total: result.length};
          cb({
            code: 0,
            info: jsonArray
          });
        }


      });

    }
  });


};

updateData = function (obj, cb) {

  if (!obj) {
    cb({
      code: 1,
      info: '缺少必要的参数！'
    });
    return;
  }

  comment.update(
      obj.old,
      obj.new,
      function (err) {

        if (err) {
          cb({
            code: 1,
            info: '修改数据失败!'
          });
          console.log('修改数据失败' + err)
        } else {

          cb({
            code: 0,
            info: '修改数据成功!'
          });
          console.log('修改数据成功')
        }
      }
  );

};

delData = function (obj, cb) {

  if (!obj) {
    cb({
      code: 1,
      info: '缺少必要的参数！'
    });
    return;
  }

  comment.remove(
      obj,
      function (err) {

        if (err) {

          cb({
            code: 1,
            info: '删除数据失败!'
          });
          console.log('删除数据失败' + err)
        } else {

          cb({
            code: 0,
            info: '删除数据成功!'
          });
          console.log('删除数据成功')
        }
      }
  );

};


/*添加数据*/
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

/*获取数据*/
app.get('/get', function (req, res) {

  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET, POST');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  let data = {
    page: '',
    rows: 5
  };

  data.page = Math.floor(req.query.page);
  if (req.query.rows) {
    data.rows = Math.floor(req.query.rows);
  }
  console.log(data);
  findData(data, function (data) {

    if (data.code === 0) {
      data.info.rows.reverse();
      console.log(data);
      res.send(data)

    } else {
      res.send({
        code: 1,
        info: '获取数据失败！'
      })
    }
  })

});

/*点赞*/
app.get('/acc', function (req, res) {

  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET, POST');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  let data = {
    old: {
      _id: ''
    },
    new: {}
  };

  data.old._id = req.query._id;
  data.new = req.query;

  updateData(data, function (val) {

    if (val.code === 0) {

      res.send(val)

    } else {

      res.send({
        code: 1,
        info: '更新数据失败！'
      })
    }
  })


});

/*踩一踩*/
app.get('/ref', function (req, res) {

  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET, POST');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  let data = {
    old: {
      _id: ''
    },
    new: {}
  };

  data.old._id = req.query._id;
  data.new = req.query;

  updateData(data, function (val) {

    if (val.code === 0) {

      res.send(val)

    } else {

      res.send({
        code: 1,
        info: '更新数据失败！'
      })
    }
  })


});

/*删除数据*/
app.get('/del', function (req, res) {

  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET, POST');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  console.log(req.query.key);
  if (req.query.key != '521') {

    res.send({
      code: 1,
      info: '删除数据失败！'
    });
    return;
  }
  let id = {
    _id: req.query._id
  };

  delData(id, function (val) {

    if (val.code === 0) {

      res.send(val)
    } else {
      res.send({
        code: 1,
        info: '删除数据失败！'
      })
    }
  })
});

init = (function () {

  createTable();
})();