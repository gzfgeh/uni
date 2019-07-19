// pages/consumerOrderDetail/index.js

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
      3: '等待您付款',
      5: '等待骑士接单',
      7: '骑手正在跑腿中',
      11: '订单已完成',
      13: '订单取消'
    },
    title2: {
      7: "骑士正在竭尽全力处理您的订单,请耐心等候;配送过程中您可随时与骑士电话沟通。",
      11: '您的订单已处理完成,黑猫骑士期待下次为您服务。',
      13: '您的订单已取消，3个工作日内将退回您已支付的费用'
    },
    countDownTime: [],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
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
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  getOrderDetail(order_no) {
    let that = this;
    let cancelReason = '';
    wx.request({
      url: app.globalData.apiUrl + '/run_order/detail',
      data: {
        token: wx.getStorageSync('token'),
        order_no: order_no
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        if (res.data.code == 0) {
          let data = res.data.data;
          let countDownTime = [];
          data.base_run_fee = Number(data.base_run_fee).toFixed(2);
          data.tip_fee = Number(data.tip_fee).toFixed(2);
          data.total_fee = Number(data.total_fee).toFixed(2);
          if (data.order_state == 3) {
            countDownTime.push(data.pay_countdown);
          } else if (data.order_state == 5) {
            countDownTime.push(data.receipt_countdown);
          };
          common.setCountDown_time(that, countDownTime);
          switch (data.cancel_role){
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
    let that = this;
    let order_state = that.data.orderDetail.order_state;
    let order_no = that.data.orderDetail.order_no;
    let formId = e.detail.formId;
    common.sendFormId(formId, app, (code, message) => {
      Notify(code + message);
    });
    if (order_state == 3) { //待支付
      wx.showLoading({
        title: '',
        mask: true
      });
      that.pay(order_no);
    } else if (order_state == 5) { //取消订单
      wx.showModal({
        title: '',
        content: '是否确定取消订单?',
        success(res) {
          if (res.confirm) {
            that.operateOrder(order_no);
          } else if (res.cancel) {

          }
        }
      })
    }
  },

  formSubmit_state7(op_type = 5) {
    let that = this;
    let order_no = that.data.orderDetail.order_no;
    let content = '';
    if (op_type == 5) {
      content = '是否确定取消订单?'
    } else if (op_type == 7) {
      content = '确定骑手已经完成了您的需求吗？'
    }
    wx.showModal({
      title: '',
      content: content,
      success(res) {
        if (res.confirm) {
          that.operateOrder(order_no, op_type);
        } else if (res.cancel) {

        }
      }
    })
  },

  pay(order_no) {    //发起支付
    let that = this;
    wx.request({
      url: app.globalData.apiUrl + '/run_pay/unified',
      data: {
        token: wx.getStorageSync('token'),
        order_no: order_no
      },
      header: {},
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        if (res.data.code == 0) { //微信支付
          let data = res.data.data;
          let timestamp = Date.parse(new Date()).toString();
          let paySign = md5('appId=' + data.appid + '&nonceStr=' + data.nonce_str + '&package=prepay_id=' + data.prepay_id + '&signType=MD5&timeStamp=' + timestamp.substr(0, 10) + '&key=' + app.globalData.payPrivateKey).toUpperCase();
          wx.requestPayment({
            timeStamp: timestamp.substr(0, 10),
            nonceStr: data.nonce_str,
            package: 'prepay_id=' + data.prepay_id,
            signType: 'MD5',
            paySign: paySign,
            success: function(res) {
              wx.hideLoading();
              let pages = getCurrentPages();
              let prevPage = pages[pages.length - 2];
              prevPage.setData({
                state: 5
              })
              wx.navigateBack({
                delta: 1
              })
            },
            fail: function(res) {
              wx.hideLoading();
              wx.showToast({
                title: '支付失败',
                icon: 'none',
                duration: 1500,
                mask: true,
                success: function() {
                  let pages = getCurrentPages();
                  let prevPage = pages[pages.length - 2];
                  prevPage.setData({
                    state: 3
                  })
                  wx.navigateBack({
                    delta: 1
                  })
                }
              })
            },
            complete: function(res) {}
          })
        } else {
          Notify(res.data.code + res.data.message);
        }
      },
      fail: function(res) {
        Notify(res.data.code + res.data.message);
      },
      complete: function(res) {},
    })
  },

  operateOrder(order_no, op_type = 5) { //取消，确认完成订单
    let state = 13;
    let toastTips = '';
    if (op_type == 5) {
      state = 13 //取消订单
      toastTips = '取消订单成功';
    } else if (op_type == 7) {
      state = 11 //已完成
      toastTips = '确认订单成功';
    }
    wx.request({
      url: app.globalData.apiUrl + '/run_order/operate',
      data: {
        token: wx.getStorageSync('token'),
        order_no: order_no,
        op_type: op_type
      },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        if (res.data.code == 0) {
          common.toast(toastTips, () => {
            setTimeout(() => {
              let pages = getCurrentPages();
              let prevPage = pages[pages.length - 2];
              prevPage.setData({
                state: state
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

  makeRiderPhoneCall(){    //进行中给骑手拨打电话
    let ridePhone = this.data.orderDetail.rider_info ? this.data.orderDetail.rider_info.phone : '';
    wx.makePhoneCall({
      phoneNumber: ridePhone   
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