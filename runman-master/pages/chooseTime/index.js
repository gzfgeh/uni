// pages/chooseTime/index.js
const app = getApp();
import Notify from '../../dist/notify/notify';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sendTimeData: {},
    day: [],
    hour: [],
    minute: [],
    dayHourMinute: [],
    dayHourMinute_index: [0, 0, 0],
    dayKeys: [],
    currentDay: '',
    currentHour: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let originFrom = options.originFrom ? options.originFrom : '';
    this.getTime();
    this.setData({
      originFrom: originFrom
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },
  getTime() {
    let that = this;
    wx.request({
      url: app.globalData.apiUrl + '/run_order/delivery_time',
      data: {
        token: wx.getStorageSync('token'),
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        if (res.data.code == 0) {
          let dayHourMinute = [];
          let data = res.data.data;
          let currentDay = '';
          let day = [],
            hour = [],
            minute = [],
            dayKeys = [];
          for (let i in data) {
            day.push(data[i].title);
            dayKeys.push(i);
          };
          dayHourMinute.push(day[0]);
          currentDay = dayKeys[0];
          (data[currentDay].child).forEach((item) => {
            hour.push(item.hour);
          });
          dayHourMinute.push(hour[0]);
          (data[currentDay].child[0].minute).forEach((item) => {
            minute.push(item);
          });
          if (minute[0]) {
            dayHourMinute.push(minute[0]);
          };
          that.setData({
            sendTimeData: data,
            dayKeys: dayKeys,
            day: day,
            hour: hour,
            minute: minute,
            dayHourMinute: dayHourMinute
          })
        } else {
          Notify(res.data.code + res.data.message);
        }
      }
    })
  },
  bindChange: function(e) {
    // console.log("bindChange",e);
    let dayHourMinute_index = e.detail.value;
    let sendTimeData = this.data.sendTimeData;
    let dayKeys = this.data.dayKeys;
    let hour = [],
      minute = [],
      dayHourMinute = [],
      currentDay_index = 0,
      currentHour_index = 0,
      currentMinute_index = 0;
    currentDay_index = dayHourMinute_index[0];
    currentHour_index = dayHourMinute_index[1];
    currentMinute_index = dayHourMinute_index[2];
    (sendTimeData[dayKeys[currentDay_index]].child).forEach((item) => {
      hour.push(item.hour);
    });
    (sendTimeData[dayKeys[currentDay_index]].child[currentHour_index].minute).forEach((item) => {
      minute.push(item);
    });
    dayHourMinute.push(this.data.day[currentDay_index]);
    dayHourMinute.push(hour[currentHour_index]);
    if (minute[currentMinute_index]) {
      dayHourMinute.push(minute[currentMinute_index]);
    };
    this.setData({
      dayHourMinute_index: dayHourMinute_index,
      hour: hour,
      minute: minute,
      dayHourMinute: dayHourMinute
    })
  },

  submit() {
    let originFrom = this.data.originFrom;
    let dayHourMinute = this.data.dayHourMinute;
    let sendTime = '';
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];
    if (dayHourMinute[2]){
      sendTime = dayHourMinute[0] + " " + dayHourMinute[1] + dayHourMinute[2];
    }else{
      sendTime = dayHourMinute[0] + " " + dayHourMinute[1];
    }
    if (originFrom == 'confirmOrder'){
      prevPage.setData({
        'orderData.sendTime': dayHourMinute.join(','),
        'sendTime': sendTime
      });
    } else if (originFrom == 'helpMeBuy'){
      prevPage.setData({
        'helpMeBuy_data.sendTime': dayHourMinute.join(','),
        'sendTime': sendTime
      });
    }
    wx.navigateBack({
      delta: 1
    }); 
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})