// pages/riderCancelOrder/index.js
const app = getApp();
const common = require('../../utils/common.js');
import Notify from '../../dist/notify/notify';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cancelReason_type: [{
        type: 1,
        checked: true
      },
      {
        type: 2,
        checked: false
      }
    ],
    order_no: '',
    cancel_reason_type: 1 //取消原因（1:个人,2:客户）

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let order_no = options.order_no ? options.order_no : '';
    this.setData({
      order_no: order_no
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

  radioChange(e) {
    console.log('change', e);
    let type = e.detail.value;
    this.setData({
      cancel_reason_type: type
    });
  },

  sureCancel() { //取消订单 
    let that = this;
    let order_no = that.data.order_no;
    let cancel_reason_type = that.data.cancel_reason_type;
    wx.request({
      url: app.globalData.apiUrl + '/run_rider_order/operate',
      data: {
        token: wx.getStorageSync('token'),
        order_no: order_no,
        op_type: 3,
        cancel_reason_type: cancel_reason_type
      },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        if (res.data.code == 0) {
          common.toast('您已取消订单', () => {
            setTimeout(() => {
              let pages = getCurrentPages();
              let prevPage = pages[pages.length - 3];
              prevPage.setData({
                state: 13
              });
              wx.navigateBack({
                delta: 2
              });
            }, 1500);
          });
        } else {
          Notify(res.data.code + res.data.message);
        }
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