//  pages/login/index.js
const app = getApp();
const common = require('../../utils/common.js');
import Notify from '../../dist/notify/notify';
Page({
  /**
   *  页面的初始数据
   */
  data: {
    code: '',
  },

  /**
   *  生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // console.log("login页options", options); 
    // this.setData({

    // })
    this.getCodeTimer();
  },

  /**
   *  生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   *  生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   *  用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  getCodeTimer: function() {
    let that = this;
    wx.login({
      success(res) {
        that.data.code = res.code;
        setTimeout(() => {
          that.getCodeTimer()
        }, 4 * 60 * 1000)
      }
    })
  },

  login: function(res) {
    // wx.showNavigationBarLoading();
    // 获取用户信息   
    let that = this;
    let code = this.data.code;
    let iv = res.detail.iv;
    let encryptedData = res.detail.encryptedData;
    let rawData = res.detail.rawData;
    
    wx.request({   // 登录获取token
      url: app.globalData.apiUrl + '/run_user/login',
      data: {
        code: code,
        iv: iv,
        encryptedData: encryptedData,
        rawData: rawData,
      },
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function (res2) {
        if (res2.data.code == 0) {
          app.globalData.userInfo.is_login = true;
          app.globalData.userInfo = res.detail.userInfo;
          // wx.setStorageSync('userInfo', res.detail.userInfo);
          wx.setStorageSync('token', res2.data.data.token);
          common.getUserInfo(app, (code, message) => {
            Notify(code + message);
          });
          wx.reLaunch({
            url: '/pages/index/index',
            success: function (res2) { },
            fail: function (res2) { },
            complete: function (res2) { },
          })
        } else if (res2.data.code == 10005) {
          wx.setStorageSync('token', '');
          Notify('解密失败-' + res2.data.code);
          that.getCodeTimer();
        } else {
          wx.setStorageSync('token', '');
          Notify('授权失败-' + res2.data.code);
        }
      }
    })

  },

  /**
   *  生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   *  生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   *  页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   *  页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  }

})