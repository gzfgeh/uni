function formatNumber(n) {
    const str = n.toString()
    return str[1] ? str : `0${str}`
}

export function formatTime(date) {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()

    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    const t1 = [year, month, day].map(formatNumber).join('/')
    const t2 = [hour, minute, second].map(formatNumber).join(':')

    return `${t1} ${t2}`
}

function doHandleMonth(month) {　　
    var m = month　　
    if (month.toString().length == 1) {　　　　 m = "0" + month　　 }　　
    return m
}

function stringToDate(dateStr) {
    var separator = "-";
    var dateArr = dateStr.split(separator);
    var year = parseInt(dateArr[0]);
    var month;
    //处理月份为04这样的情况                         
    if (dateArr[1].indexOf("0") == 0) {
        month = parseInt(dateArr[1].substring(1));
    } else {
        month = parseInt(dateArr[1]);
    }
    var day = parseInt(dateArr[2]);
    var date = new Date(year, month - 1, day);
    return date;
}

/**
 * 
 * 得到几天前的日期
 */
export function getDay(day, dateString) {　
    var today;
    if (dateString) {
        today = stringToDate(dateString);
    }　
    else {
        today = new Date();　　
    }　
    var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;　　
    today.setTime(targetday_milliseconds); //注意，这行是关键代码
    　　
    var tYear = today.getFullYear();　　
    var tMonth = today.getMonth();　　
    var tDate = today.getDate();　　
    tMonth = doHandleMonth(tMonth + 1);　　
    tDate = doHandleMonth(tDate);　　
    return tYear + "-" + tMonth + "-" + tDate;
}

/**
 * 判断是否为汉字
 */
export function isChinese(temp) {
    if (escape(temp).indexOf("%u") < 0) {
        //没有
        return false;
    } else {
        return true;
    }
}


export function getDistance(lat1, lng1, lat2, lng2) {
    var lat = [lat1, lat2]
    var lng = [lng1, lng2]
    var R = 6378137;
    var dLat = (lat[1] - lat[0]) * Math.PI / 180;
    var dLng = (lng[1] - lng[0]) * Math.PI / 180;
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat[0] * Math.PI / 180) * Math.cos(lat[1] * Math.PI / 180) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return Math.round(d);
}

export function isWeiXin(){
  //window.navigator.userAgent属性包含了浏览器类型、版本、操作系统类型、浏览器引擎类型等信息，这个属性可以用来判断浏览器类型
  var ua = window.navigator.userAgent.toLowerCase();
  //通过正则表达式匹配ua中是否含有MicroMessenger字符串
  if(ua.match(/MicroMessenger/i) == 'micromessenger'){
	return true;
  }else{
	return false;
  }
}


export default {
    formatNumber,
    formatTime,
    getDay,
	isWeiXin
}