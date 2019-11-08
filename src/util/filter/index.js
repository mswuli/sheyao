/**
 * Vue 过滤器
 */
import Vue from 'vue'
import util from '../date.js'

// 获取时分秒
Vue.filter('getHMS', function (val) {
  if (val != "" && val != null) {
    var result = val.substr(11, 19);
    return (result == '00:00:00' ? '' : result.substr(0, 8));
  } else {
    return "";
  }
});

// 获取年月日
Vue.filter('getYMD', function (val, joinString) {
  //console.log(val.toString())
   //console.log(util.prevDay(val,'-'));
   
   if(val.length == 19 && (val.indexOf('-')!=-1 || val.indexof('/')!=-1)){
     val = val.substring(0,10);
      return val;
   }
  if (val != "" && val != null) {
    return util.prevDay(val, '-').toString();
  } else {
    return "";
  }
});
// 获取年份
Vue.filter('getYear', function (val) {
  if (val != "" && val != null) {
    return util.thisYear(val)
  } else {
    return "";
  }
});
// 获取月日
Vue.filter('getMD', function (val, joinString) {
  if (val != "" && val != null) {
    return util.thisMD(val, '-')
  } else {
    return "";
  }
});

// 仓库业务状态
const BizStates = {
  Y: '有效',
  S: '停用',
  E: '作废'
}
Vue.filter('BizState', function (val) {
  return BizStates[val] || '暂无';
});

// 仓库类型
const WareHouseTypes = {
  '01': '平库',
  '02': '楼库',
  '03': '立体库',
};
Vue.filter('WareHouseType', function (val, codetype) {
  return WareHouseTypes[val] || '暂无';
});

// 存储标准
const StorageTypes = {
  '01': '普通仓',
  '02': '冷藏仓',
  '03': '阴凉仓'
};
Vue.filter('StorageType', function (val, codetype) {
  return StorageTypes[val] || '暂无';
});

// 月台
const Platforms = {
  '01': '无月台',
  '02': '单面月台',
  '03': '双面月台'
};
Vue.filter('Platform', function (val, codetype) {
  return Platforms[val] || '暂无';
});

// 消防
const FireFightings = {
  '1': '无',
  '2': '甲类',
  '3': '乙类',
  '4': '丙类',
  '5': '丁类',
  '6': '戊类',
  '7': '正在办理'
};
Vue.filter('FireFighting', function (val, codetype) {
  return FireFightings[val] || '暂无';
});

// 结构
const BuildingStructures = {
  '1': '砖瓦混合',
  '2': '轻钢结构',
  '3': '重钢结构',
  '4': '钢混结构'
};
Vue.filter('BuildingStructure', function (val, codetype) {
  return BuildingStructures[val] || '暂无';
});

// 服务范围
const ServiceRanges = {
  warehouse: '仓储',
  transport: '运输',
  picking: '库内作业',
  process: '加工'
};
Vue.filter('ServiceRange', (val) => {
  if (!val || val.length == 0) {
    return '暂无';
  }

  let array = Array.isArray(val) ? val : JSON.parse(val);

  return array.map(e => ServiceRanges[e]).join('，');
});

// 库存类别
const GoodsCategorys = {
  fastProduct: '快消产品',
  device: '家用电器',
  office: '办公/文仪',
  medical: '医疗器械',
  furniture: '家具',
  hardware: '五金/配件',
  clothes: '服饰/鞋帽',
  sport: '体育/户外',
  home: '家居日用',
  oil: '农副/粮油',
  skin: '护肤/化妆',
  food: '食品/保健',
  drink: '酒水/饮料',
  tire: '汽配/轮胎',
  other: '其它原材料'
};
Vue.filter('GoodsCategory', val => {
  if (!val || val.length == 0) {
    return '暂无';
  }

  if (!isNaN(parseInt(val))) {
    return GoodsCategorys[Object.keys(GoodsCategorys)[val]];
  }

  try {
    let array = Array.isArray(val) ? val : JSON.parse(val);

    return array.map(e => GoodsCategorys[e]).join('，');
  } catch (err) {
    return GoodsCategorys[val] || val;
  }
});

// 安保系统
const SecuritySystems = {
  monitor: '中央监控',
  security: '安保人员',
  patrol: '24小时巡逻'
};
Vue.filter('SecuritySystem', (val) => {
  if (!val || val.length == 0) {
    return '暂无';
  }

  let array = Array.isArray(val) ? val : JSON.parse(val);

  return array.map(e => SecuritySystems[e]).join('，');
});

// 消防系统
const FireFightingSystems = {
  spray: '喷淋',
  smoke: '烟感',
  fireHydrant: '消防栓',
  fireExtinguisher: '灭火器',
  fireAlarm: '消防警钟'
};
Vue.filter('FireFightingSystem', val => {
  if (!val || val.length == 0) {
    return '暂无';
  }

  let array = Array.isArray(val) ? val : JSON.parse(val);

  return array.map(e => FireFightingSystems[e]).join('，');
});

// 层高
const FloorHeights = {
  '1': '6米以下',
  '2': '6-9米',
  '3': '9-12米',
  '4': '12米以上'
};
Vue.filter('FloorHeight', val => {
  return FloorHeights[val] || '不限';
});

// 库内水电网
const HydropowerNetworks = {
  water: '通水',
  electricity: '通电'
};
Vue.filter('HydropowerNetwork', val => {
  if (!val || val.length == 0) {
    return '暂无';
  }

  let array = Array.isArray(val) ? val : JSON.parse(val);

  return array.map(e => HydropowerNetworks[e]).join('，');
});

// 产权证
Vue.filter('PropertyRightsFlag', val => {
  return val == 'Y' ? '要有产权证' : '不做要求';
});

// 土地证
Vue.filter('LandCertificateFlag', val => {
  return val == 'Y' ? '要有土地证' : '不做要求';
});

// 调用样例：{{mydate | formatDate("yyyy-MM-dd hh:mm:ss")}}
Vue.filter('formatDate', function (val, fmt) {
  if (val == '' || val == null) {
    return '';
  }
  //return val;
  //return new Date(val);
  //return Object.prototype.toString.call(val) === "[object String]";
  if (Object.prototype.toString.call(val) === "[object String]") {
    let date = new Date(val.replace(/-/g, '/'));
    //return date;
    return util.formatDate(date, fmt);
  } else {

    return util.formatDate(val, fmt);
  }
});

// 千分位
Vue.filter('amount', val => {
  let ivalue = parseInt(val);

  if (Number.isNaN(ivalue)) {
    return 0;
  } else {
    let strValue = ivalue.toString();
    let temp = '';
    let counts = strValue.length % 3 == 0 ? strValue.length / 3 : parseInt(strValue.length / 3) + 1;

    for (let index = 0; index < counts; index++) {
      temp += ',' + strValue.substring(strValue.length - (counts - index - 1) * 3, strValue.length - (counts - index) * 3);
    }

    return temp.substr(1, temp.length);
  }
});

Vue.filter('url', val => {
  return (val || '').replace(/\\/g, '/');
});

Vue.filter('imgurl', (val, type) => {
  let baseUrl = '';
  switch (type) {
    case '1':
      baseUrl = '';
      break;
    case '2':
      baseUrl = 'https://www.csyaoly.com/uploadfiles';
      break;
    case '3':
      baseUrl = 'https://www.cs4pl.com/uploadfiles';
      break;
    case '4':
      baseUrl = 'https://qiyao.cs4pl.com/uploadfiles';
      break;
    case '5':
      baseUrl = 'https://yao4pl.com/uploadfiles';
      break;
    default:
      baseUrl = '';
      return;
  }

  return val ? baseUrl + val.replace(/\\/g, '/') : '';
})