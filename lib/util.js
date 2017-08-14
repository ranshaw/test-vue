/**
 * Created by Ranshaw on 2017/8/14.
 */
'use strict';
let addZero,
	formatTime;

addZero = function (v) {
  v = v.toString();
  return v[1] ? v : '0' + v
};

formatTime = function (time) {

  let year = time.getFullYear(),
	  month = time.getMonth() + 1,
	  date = time.getDate(),
	  hours = time.getHours(),
	  minutes = time.getMinutes(),
	  seconds = time.getSeconds();

  return [year, month, date].map(addZero).join('-') + ' ' + [hours, minutes, seconds].map(addZero).join(':')

};

module.exports = {
  formatTime
};