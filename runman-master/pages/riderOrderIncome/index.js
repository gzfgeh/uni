// pages/riderOrderIncome/index.js
import Notify from '../../dist/notify/notify';
const app = getApp();
const common = require('../../utils/common.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    income: {}

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getIncomeData();
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

  getIncomeData() {
    let that = this;
    wx.request({
      url: app.globalData.apiUrl + '/run_rider/order_income',
      data: {
        token: wx.getStorageSync('token')
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        if (res.data.code == 0) {
          let data = res.data.data;
          that.setData({
            income: data
          });
        } else {
          Notify(res.data.code + res.data.message);
        }
      }
    })
  },

  jumpToSmallcat() {    //跳转小黑猫小程序去提现猫粮
    wx.navigateToMiniProgram({
      appId: 'wxa867107cd2c1c857',
      path: '/pages/my_catFood/index',
      extraData: {},
      envVersion: 'develop',
      success(res) {
        console.log('跳转小黑猫成功');
      },
      fail() {
        Notify('跳转小黑猫失败，正在解决中,详情请联系客服');
      }
    })
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