import down2blob from './other/down';
import cloneDeep from 'lodash/cloneDeep'

/**
 * 用于选出数组中指定的值
 * @param  {array} arr   原数据
 * @param  {string||null} key   指定的key值，null则不指定
 * @param  {string} value 指定的value值
 * @return {any}       返回值
 */
const queryArray = (arr, key, value) => {
  if(Array.isArray(arr)) {
    return arr.find(_ => {
      return key&&_[key]?_[key]==value:_==value
    })
  }
  return 
}

/**
 * 查询地址并将地址及其参数返回
 * @param  {[type]} url [description]
 * @return {[type]}     [description]
 */
const queryPath = (url) => {
  url = url == null ? window.location.href : url
  let search = url[0] === '?' ? url.substr(1) : url.substring(url.lastIndexOf('?') + 1)
  if (search === '') return {}
  search = search.split('&');
  let query = {};
  for (let i = 0; i < search.length; i++) {
      let pair = search[i].split('=');
      query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
  }
  return {
    path: url.replace(/[?&]([^=&#]+)=([^&#]*)/ig,''),
    query
  };
}

/**
 * 价格转大写
 * @param  {number} n 价格，需为数字
 * @return {[type]}   [description]
 */
const price2cny = (n) => {
  if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(n)) return "数据非法";
  var unit = "京亿万仟佰拾兆万仟佰拾亿仟佰拾万仟佰拾元角分", str = "";
  n += "00";
  var p = n.indexOf('.');
  if (p >= 0) {
    n = n.substring(0, p) + n.substr(p + 1, 2);
  }
  unit = unit.substr(unit.length - n.length);
  for (var i = 0; i < n.length; i++) str += '零壹贰叁肆伍陆柒捌玖'.charAt(n.charAt(i)) + unit.charAt(i);
  return str.replace(/零(仟|佰|拾|角)/g, "零").replace(/(零)+/g, "零").replace(/零(兆|万|亿|元)/g, "$1").replace(/(兆|亿)万/g, "$1").replace(/(京|兆)亿/g, "$1").replace(/(京)兆/g, "$1").replace(/(京|兆|亿|仟|佰|拾)(万?)(.)仟/g, "$1$2零$3仟").replace(/^元零?|零分/g, "").replace(/(元|角)$/g, "$1整");
}

/**
 * 获取当前浏览器信息
 * @return {[type]} [description]
 */
const getBrowser = () => {
  var userAgent = navigator.userAgent.toLocaleUpperCase();
  var msie = /MSIE [\d\.]+/;
  var firefox = /FIREFOX\/[\d\.]+/;
  var chrome = /CHROME\/[\d\.]+/;
  var safari = /SAFARI\/[\d\.]+/;
  var opero = /OPR\/[\d\.]+/;
  var se = /SE \d/;
  var mi = /XIAOMI\/MIUIBROWSER/;
  var uc = /UCBROWSER/;
  var android = /ANDROID [\d\.]+/;
  if (msie.test(userAgent) && se.test(userAgent)) return '搜狗浏览器兼容模式';
  if (msie.test(userAgent)) return msie.exec(userAgent);
  if (se.test(userAgent)) return '搜狗浏览器高速模式';
  if (uc.test(userAgent)) return 'UC浏览器';
  if (mi.test(userAgent)) return '小米手机内置浏览器';
  if (android.test(userAgent)) return '安卓手机浏览器';
  if (opero.test(userAgent)) return 'opera浏览器';
  if (chrome.test(userAgent)) return chrome.exec(userAgent);
  if (safari.test(userAgent)) return safari.exec(userAgent);
  return '其他';
}

/**
 * 将回车符号转换成<br/>标签
 * @param  {[type]} str [description]
 * @return {[type]}     [description]
 */
const change2br = (str) => {
  return str?str.replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>').replace(/\s/g, ' '):str;
}

/**
 * 将数据保存到localStorage
 * @param  {[type]} name [description]
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
const saveStore = (name,data) => {
  const time = Date.parse(new Date())
  const obj = {
    data,
    time,
  }
  window.localStorage.setItem(name,JSON.stringify(obj))
}

/**
 * 获取指定localStorage
 * @param  {[type]} name  [description]
 * @param  {[type]} times [description]
 * @return {[type]}       [description]
 */
const getStore = (name,times) => {
  if(!name){
      console.error('请输入有效的storage名称');
      return false
  }
  const data = window.localStorage.getItem(name)
  if(data){
    const param = JSON.parse(data)
    if(times!==false) {
      const { time } = param
      const now = Date.parse(new Date())
      const period = (1000*60*60)*(times?times:12) //设置有效期为12小时
      return now-time>=period?false:param.data
    }else{
      return param.data
    }
  }else{
      console.warn(`找不到${name}的本地数据，请保证${name}是否存在`)
      return false
  }
}

module.exports = {
  down2blob,
  cloneDeep,
  queryArray,
  queryPath,
  price2cny,
  getBrowser,
  change2br,
  saveStore,
  getStore,
}