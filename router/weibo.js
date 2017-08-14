/**
 * Created by Ranshaw on 2017/8/14.
 */
'use strict';
const mongoose = require('mongoose'),
      db       = mongoose.connect('mongodb://127.0.0.1:27017/data');

let init,
	createTable,
	comment,
	addData,
	findData,
	updateData,
	delData;

mongoose.Promise = global.Promise;
mongoose.set('debug',true);

db.connection.on('error',() => {
  console.log('连接数据库失败！')
});
db.connection.on('open',() => {

  console.log('连接数据库成功！');
  comment = mongoose.model('comment', {
	content: String,
	time: String,
	acc: Number,
	ref: Number
  });
});

addData    = (obj) => {
  let _obj = {
	content: null,
	time: null,
	acc: null,
	ref: null
  };

  Object.assign(_obj,obj);
  let addNew = new comment({
	content: _obj.content,
	time: _obj.time,
	acc: _obj.acc,
	ref: _obj.ref
  });

  return new Promise((resolve,reject) => {

	addNew.save((err) => {

	  if(err) {
		reject({
		  code:1,
		  info:"写入数据失败！"
		})
	  } else {
		resolve({
		  code:0,
		  info:"写入数据成功！"
		})
	  }
	})
  });
};

findData   = (obj) => {

  let page = obj.page;
  let rows = obj.rows;

  let query = comment.find({});
  query.skip((page - 1) * rows);
  query.limit(rows);
  query.sort({'time': -1});

  return new Promise((resolve,reject) => {
	//计算分页数据
	query.exec(function (err, rs) {
	  if (err) {

		reject({
		  code: 1,
		  info: '读取数据失败!'
		});
	  } else {
		//计算数据总数
		comment.find(function (err, result) {
		  if (err) {
			reject({
			  code: 1,
			  info: '读取数据失败!'
			});
		  } else {

			let jsonArray = {rows: rs.reverse(), total: result.length};
			resolve({
			  code: 0,
			  info: jsonArray
			});
		  }

		});

	  }
	});
  })

};

updateData = (obj) => {
  let _obj = {
    old:null,
	new:null
  };
  Object.assign(_obj,obj);

  return new Promise((resolve,reject) => {
	comment.update(
		obj.old,
		obj.new,
		function (err) {

		  if (err) {
			reject({
			  code: 1,
			  info: '修改数据失败!'
			});
			console.log('修改数据失败' + err)
		  } else {

			resolve({
			  code: 0,
			  info: '修改数据成功!'
			});
			console.log('修改数据成功')
		  }
		}
	);
  })
};

delData    = (obj) => {
   let _obj = {

   };

   Object.assign(_obj,obj);
   return new Promise((resolve,reject) => {
	 comment.remove(
		 obj,
		 function (err) {

		   if (err) {

			 resolve({
			   code: 1,
			   info: '删除数据失败!'
			 });
			 console.log('删除数据失败' + err)
		   } else {

			 reject({
			   code: 0,
			   info: '删除数据成功!'
			 });
			 console.log('删除数据成功')
		   }
		 }
	 );
   })

};

/*添加数据*/
async function add () {
  let res = arguments[0].response,
	  req = arguments[0].request,
	  body;

  let data = {
	content: '',
	time: '',
	acc: 0,
	ref: 0
  };
  data.content = req.query.content;
  data.time = new Date().getTime();

   await addData(data).then((v) => {
	 body = v
  },(err) => {
     body = err
  }).catch((err) => {
     body = {
	   code:1,
	   info:err
	 };
   });

   res.body = body;

}

/*获取数据*/
async function get() {
  let res = arguments[0].response,
      req = arguments[0].request,
	  body;
  let data = {
	page: '',
	rows: 5
  };

  data.page = Math.floor(req.query.page);
  if (req.query.rows) {
	data.rows = Math.floor(req.query.rows);
  }

  await findData(data).then((v) => {
  	v.info.rows.reverse();
	body = v;
  },(err) => {
    body = err
  }).catch((err) => {
    body = {
	  code:1,
	  info:err
	};
  });
  res.body = body;
}

/*点赞*/
async function acc() {
  let res = arguments[0].response,
	  req = arguments[0].request,
	  body;

  let data = {
	old: {
	  _id: ''
	},
	new: {}
  };

  data.old._id = req.query._id;
  data.new = req.query;

  await updateData(data).then((v) => {
    body = v;
  },(err) => {
    body = err;
  }).catch((err) => {
    body = {
      code:1,
	  info:err
	};
  });
  res.body = body;
}

/*踩一踩*/
async function ref() {
  let res = arguments[0].response,
	  req = arguments[0].request,
	  body;
  let data = {
	old: {
	  _id: ''
	},
	new: {}
  };

  data.old._id = req.query._id;
  data.new = req.query;

  await updateData(data).then((v) => {
	body = v;
  },(err) => {
	body = err;
  }).catch((err) => {
	body = {
	  code:1,
	  info:err
	};
  });
  res.body = body;
}

/*删除数据*/
async function del() {
  let res = arguments[0].response,
	  req = arguments[0].request,
	  body;

  if (req.query.key != '521') {

	res.body ={
	  code: 1,
	  info: '删除数据失败！'
	};
	return;
  }
  let id = {
	_id: req.query._id
  };

  await delData(id).then((v) => {
	body = v;
  },(err) => {
	body = err;
  }).catch((err) => {
	body = {
	  code:1,
	  info:err
	};
  });

  res.body = body;
}

module.exports = {
  add,
  get,
  acc,
  ref,
  del
};