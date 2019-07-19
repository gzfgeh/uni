// pages/addressList/index.js
const app = getApp();
const common = require('../../utils/common.js');
import Notify from '../../dist/notify/notify';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressListData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let originFrom = options.originFrom ? options.originFrom : '';
    this.setData({
      originFrom: originFrom
    }, () => {
      if (originFrom == 'isIndexGetPlace') {
        this.setData({
          placeIndex1: options.index1,
          placeIndex2: options.index2
        })
      } else if (originFrom == 'isConfirmOrder'){
        this.setData({
          placeIndex: options.index
        })
      } else if (originFrom == 'isHelpMeBuy'){
        this.setData({
          originType: options.type
        })
      }
    });
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
    this.getAddressList(); //获取地址列表

  },

  getAddressList() {
    let that = this;
    wx.request({
      url: app.globalData.apiUrl + '/run_user_address/list',
      data: {
        token: wx.getStorageSync('token')
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        if (res.data.code == 0) {
          let data = res.data.data;
          data.forEach((item) => {
            item.location = item.longitude + ',' + item.latitude
          });
          that.setData({
            addressListData: data
          })
        } else {
          Notify(res.data.code + res.data.message);
        }
      }
    })

  },

  toaddAddress(e) { //新增，编辑跳转
    let id = e.currentTarget.dataset.id;
    let url = '';
    if (id) {
      url = '/pages/addAddress/index?id=' + id
    } else {
      url = '/pages/addAddress/index'
    }
    wx.navigateTo({
      url: url
    })
  },

  chooseAddress(e) {   //点击获取选中地址跳转回原页面
    let that = this;
    let chooseaddress = e.currentTarget.dataset.chooseaddress;
    let originFrom = that.data.originFrom;
    let placeIndex1 = 0, placeIndex2 = 0, placeIndex = 0;
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];

    if (originFrom == 'isIndexGetPlace') {
      placeIndex1 = that.data.placeIndex1;
      placeIndex2 = that.data.placeIndex2;
      prevPage.setData({
        placeIndex1: placeIndex1,
        placeIndex2: placeIndex2,
        choosedaddress: chooseaddress
      })
    } else if (originFrom == 'isConfirmOrder'){
      placeIndex = that.data.placeIndex;
      prevPage.setData({
        placeIndex: placeIndex,
        choosedaddress: chooseaddress
      })
    } else if (originFrom == 'isHelpMeBuy'){
      let originType = that.data.originType;
      prevPage.setData({
        originType: originType,
        choosedaddress: chooseaddress
      });
    }
    wx.navigateBack({
      delta: 1
    });    
    // console.log('chooseaddress', e);
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