// pages/riderOrderDetail/index.js
const app = getApp();
const amapFile = require('../../libs/amap-wx.js');
const common = require('../../utils/common.js');
import Notify from '../../dist/notify/notify';
import md5 from '../../utils/md5.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order_no: '',
    orderDetail: {},
    title1: {
      7: '正在跑腿中',
      9: '等待用户确认收货',
      11: '订单完成',
      13: '订单已取消'
    },
    title2: {
      7: "请按照用户的要求尽快完成需求哦",
      9: '用户还没有确认完成订单，快去让他完成订单吧',
      11: '订单已完成，稍后将会有猫粮入账',
      13: '订单已取消，去看看其他订单吧'
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let order_no = options.order_no ? options.order_no : '';
    this.setData({
      order_no: order_no
    }, () => {
      this.getOrderDetail(order_no);
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  getOrderDetail(order_no) {
    let that = this;
    let cancelReason = '';
    wx.request({
      url: app.globalData.apiUrl + '/run_rider_order/detail',
      data: {
        token: wx.getStorageSync('token'),
        order_no: order_no
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        if (res.data.code == 0) {
          let data = res.data.data;
          data.base_run_fee = Number(data.base_run_fee).toFixed(2);
          data.tip_fee = Number(data.tip_fee).toFixed(2);
          data.total_fee = Number(data.total_fee).toFixed(2);
          switch (data.cancel_role) {
            case 0:
              cancelReason = '无';
              break;
            case 1:
              cancelReason = '客户取消';
              break;
            case 3:
              cancelReason = '骑手取消';
              break;
            case 5:
              cancelReason = '超时未付款(系统取消)';
              break;
            case 7:
              cancelReason = '超时未被接单(系统取消)';
              break;
            case 9:
              cancelReason = '后台强制取消';
              break;
          }
          that.setData({
            orderDetail: data,
            cancelReason: cancelReason
          })
        } else {
          Notify(res.data.code + res.data.message);
        }
      }
    })
  },

  state7submit(e) { //提交记录操作类型
    let that = this;
    let op_type = e.currentTarget.dataset.op_type;
    that.setData({
      op_type: op_type
    }, () => {
      that.formSubmit_state7(op_type);
    })
  },

  formSubmit(e) {
    let formId = e.detail.formId;
    common.sendFormId(formId, app, (code, message) => {
      Notify(code + message);
    });
  },

  formSubmit_state7(op_type = 3) {
    let that = this;
    let order_no = that.data.orderDetail.order_no;
    if (op_type == 3) {
      wx.navigateTo({
        url: '/pages/riderCancelOrder/index?order_no=' + that.data.order_no
      })
    } else if (op_type == 5) {
      wx.showModal({
        title: '',
        content: '订单确定已经送到发单人手中了吗？',
        success(res) {
          if (res.confirm) {
            that.operateOrder(order_no, op_type);
          } else if (res.cancel) {

          }
        }
      })
    }
  },

  operateOrder(order_no, op_type) {   //确认完成订单
    wx.request({
      url: app.globalData.apiUrl + '/run_rider_order/operate',
      data: {
        token: wx.getStorageSync('token'),
        order_no: order_no,
        op_type: op_type
      },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        if (res.data.code == 0) {
          common.toast('确认送货成功', () => {
            setTimeout(() => {
              let pages = getCurrentPages();
              let prevPage = pages[pages.length - 2];
              prevPage.setData({
                state: 11
              });
              wx.navigateBack({
                delta: 1
              });
            }, 1500);
          });
        } else {
          Notify(res.data.code + res.data.message);
        }
      }
    })
  },

  makeRiderPhoneCall(e) {    //拨打用户电话
    let phone = e.currentTarget.dataset.phone;
    wx.makePhoneCall({
      phoneNumber: phone   
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    let intervalName3 = this.data.intervalName2 ? this.data.intervalName2 : []; //取本地存储的未清除的计时器组
    if (intervalName3.length) { //收工后本地计时器清除
      intervalName3.forEach((item) => {
        clearInterval(item);
      })
    };
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})