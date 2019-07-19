const qiniuUploader = require("../utils/qiniuUploader.js");

function ltrim(s) {
  if (s == null) {
    return "";
  }
  var whitespace = new String(" \t\n\r");
  var str = new String(s);
  if (whitespace.indexOf(str.charAt(0)) != -1) {
    var j = 0,
      i = str.length;
    while (j < i && whitespace.indexOf(str.charAt(j)) != -1) {
      j++;
    }
    str = str.substring(j, i);
  }
  return str;
}

/*
 * 参数说明:
 * s：要格式化的数字
 * n：保留几位小数
 * */
function moneyFormat(s, n) {
  n = n > 0 && n <= 20 ? n : 2;
  s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
  var l = s.split(".")[0].split("").reverse(),
    r = s.split(".")[1];
  let t = "";
  for (let i = 0; i < l.length; i++) {
    t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
  }
  return t.split("").reverse().join("") + "." + r;
}

function urlencode(data, delimiter = '&', splice = '=') {
  var _result = [];
  for (var key in data) {
    var value = data[key];
    if (value.constructor == Array) {
      value.forEach(function(_value) {
        _result.push(key + splice + _value);
      });
    } else {
      _result.push(key + splice + value);
    }
  }
  return _result.join(delimiter);
}

function checkToken(func, app) {   //和接口判断token是否过期
  wx.request({
    url: app.globalData.apiUrl + '/run_user/check_token',
    data: {
      token: wx.getStorageSync('token')
    },
    header: {},
    method: 'POST',
    dataType: 'json',
    responseType: 'text',
    success: function(res) {
      if (res.data.code != 0) {
        func();
      }
    },
    fail: function(res) {
      wx.showToast({
        title: '判断token是否过期失败',
        icon: 'none',
        duration: 2000
      })
    },
    complete: function(res) {}
  })
}

function toast(title,resFun) {
  wx.showToast({
    title: title,
    icon: 'none',
    duration: 1500,
    mask: true,
    success: () => {
      if(resFun){
        resFun();
      }
    }

  })
}


// 对象按照键值名排序
function objKeySort(obj) { //排序的函数
  var newkey = Object.keys(obj).sort();　　 //先用Object内置类的keys方法获取要排序对象的属性名，再利用Array原型上的sort方法对获取的属性名进行排序，newkey是一个数组
  var newObj = {}; //创建一个新的对象，用于存放排好序的键值对
  newkey.forEach((item) => {
    newObj[item] = obj[item]; //向新创建的对象中按照排好的顺序依次增加键值对
  })
  return newObj; //返回排好序的新对象
}

function sendFormId(formId, app, resFun) {
  wx.request({
    url: app.globalData.apiUrl + '/run_user/collect_form_id',
    data: {
      token: wx.getStorageSync('token'),
      form_id: formId
    },
    method: 'POST',
    dataType: 'json',
    responseType: 'text',
    success: function(res) {
      if (res.data.code == 0) {
        console.log("发送formId成功");
      } else {
        console.log("发送formId失败");
        resFun(res.data.code, res.data.message);
      }
    }
  })
}

function getUserInfo(app, resErr, resSuc) {
  wx.request({
    url: app.globalData.apiUrl + '/run_user/info',
    data: {
      token: wx.getStorageSync('token')
    },
    method: 'GET',
    dataType: 'json',
    responseType: 'text',
    success: function(res) {
      if (res.data.code == 0) {
        console.log("获取userInfo成功");
        wx.setStorageSync('userInfo', res.data.data); 
        if (resSuc){
          resSuc();       
        }
      } else {
        console.log("获取userInfo失败");
        resErr(res.data.code, res.data.message);
      }
    }
  })
}

function setCountDown_time(that, time) {   //倒计时
  let countDownTime = [],
    intervalName = [];
  time.forEach((item, index) => {
    intervalName.push("interval" + index);
  });
  let intervalName2 = []; //存储赋值使用后的动态计时器名字变化
  let intervalName3 = that.data.intervalName2 ? that.data.intervalName2 : []; //取本地存储的未清除的计时器组
  if (intervalName3.length) {
    intervalName3.forEach((item) => {
      clearInterval(item);
    })
  };
  time.forEach((item, index) => {
    let hour = 0,
      minute = 0,
      second = 0;
    intervalName[index] = setInterval(() => {
      if (item > 0) {
        item--;
      }
      if (item == 0) {
        clearInterval(intervalName[index]);
      }
      hour = Math.floor(item / 3600);
      hour = hour.toString().length == 1 ? '0' + hour : hour;
      minute = item > 3600 ? Math.floor((item - 3600 * hour) / 60) : Math.floor(item / 60);
      minute = minute.toString().length == 1 ? '0' + minute : minute;
      second = (Number(item % 60)).toString().length == 1 ? '0' + Number(item % 60) : Number(item % 60);
      countDownTime[index] = [hour, minute, second];
      that.setData({
        countDownTime: countDownTime
      });
    }, 1000);
    intervalName2.push(intervalName[index]);
    that.setData({
      intervalName2: intervalName2
    })
  });
}

function uploadImage(app ,img, resolve, resErr) {   //上传七牛云
  wx.request({
    url: app.globalData.apiUrl + '/qiniu/get_token',
    data: {
      type: 'jpg',
    },
    method: 'GET',
    dataType: 'json',
    responseType: 'text',
    success: function (res) {
      if (res.data.code == 0) {
        let data = res.data.data
        qiniuUploader.upload(
          img,
          (success) => {
            resolve(success);
            if (that.data.qiniuImage.length == that.data.images.length) {
            }
          },
          (error) => { }, {
            region: 'ECN',
            uptoken: data.token,
            domain: data.imageDomain,
            shouldUseQiniuFileName: false,
            key: data.key
          },
          (res) => { }
        );
      } else {
        resErr(res.data.code + res.data.message);
      }
    }
  })
}

module.exports = {
  ltrim,
  moneyFormat,
  urlencode,
  checkToken,
  toast,
  objKeySort,
  sendFormId,
  getUserInfo,
  setCountDown_time,
  uploadImage
}