const Util = {

};

// 获取今天的时间戳
Util.getTodayTime = function () {
  const date = new Date();
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date.getTime();
};
// 获取前一天的日期
Util.prevDay = function (timestamp = (new Date()).getTime(), joinString) {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = date.getMonth() + 1 < 10
    ? '0' + (date.getMonth() + 1)
    : date.getMonth() + 1;
  const day = date.getDate() < 10
    ? '0' + date.getDate()
    : date.getDate();
    
  return year + joinString + month + joinString + day;
};

Util.thisYear = function (timestamp = (new Date()).getTime()) {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  return year;
};

Util.thisMD = function (timestamp = (new Date()).getTime(), joinString) {
  const date = new Date(timestamp);
  const month = date.getMonth() + 1 < 10
    ? '0' + (date.getMonth() + 1)
    : date.getMonth() + 1;
  const day = date.getDate() < 10
    ? '0' + date.getDate()
    : date.getDate();
  return  month + joinString + day;
};

export default Util;