// pages/riderOrderList/index.js
import Notify from '../../dist/notify/notify';
const app = getApp();
const common = require('../../utils/common.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    state: 0,   //订单状态 0全部(接口传空) 3-待支付 5-待接单 7-进行中 9-骑手确认送达 11-已完成 13-已取消 15-已退款
    nav: [
      {
        state: 0,
        name: '全部'
      },
      {
        state: 7,
        name: '进行中'
      },
      {
        state: 9,
        name: '待用户确认'
      },
      {
        state: 11,
        name: '已完成'
      },
      {
        state: 13,
        name: '已取消'
      }
    ],
    orderList: [],
    currentPage: 1,
    isReachBottom: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let state = options.state ? options.state : 0;
    this.setData({
      state: state
    });
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
    let state = this.data.state;
    this.setData({   //订单详情返回时
      orderList: [],
      currentPage: 1,
      isReachBottom: false
    }, () => {
      this.getOrderStateList(state, 1);  //获取相应订单状态的数据
    })
  },

  navChange(e) {
    let that = this;
    let state = e.currentTarget.dataset.state;
    that.setData({
      state: state,
      orderList: [],
      isReachBottom: false,
      currentPage: 1
    }, () => {
      that.getOrderStateList(state, 1);
    });
  },

  getOrderStateList(state = 0, currentPage = 1) {
    let that = this;
    let pramas = {
      token: wx.getStorageSync('token'),
      page: currentPage
    };
    if (state != 0) {
      pramas.state = state;
    };
    wx.request({
      url: app.globalData.apiUrl + '/run_rider_order/my_list',
      data: pramas,  
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) { 
        if (res.data.code == 0) {
          let data = res.data.data;
          let orderList = that.data.orderList;
          orderList.push(...data.data);
          that.setData({
            orderList: orderList,
            isReachBottom: data.current_page == data.last_page ? true : false
          })
        } else {
          Notify(res.data.code + res.data.message);
        }
      }
    })
  },

  toDetailPage(e) {
    let order_no = e.currentTarget.dataset.order_no;
    wx.navigateTo({
      url: '/pages/riderOrderDetail/index?order_no=' + order_no,
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
    console.log("dd");
    // 列表上拉加载
    let that = this;
    if (!that.data.isReachBottom) {
      console.log("列表上拉加载");
      that.data.currentPage++;
      that.getOrderStateList(that.data.state, that.data.currentPage);
    }

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})