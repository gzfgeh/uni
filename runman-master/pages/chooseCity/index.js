// pages/chooseCity/index.js
const app = getApp();
const common = require('../../utils/common.js');
const amapFile = require('../../libs/amap-wx.js');
import Notify from '../../dist/notify/notify';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cityDataList: {},
    lettersArray: [],
    scroll_ToLetter: 'A',  //当前的城市菜单块
    scrollToLetter: 'A'    //当前的字母选中块
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getCurrentAddressMap();  //获取当前当前城市
    this.getCityList();   //获取国内城市列表
   

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

  getCurrentAddressMap() {
    var that = this;
    var myAmapFun = new amapFile.AMapWX({
      key: app.globalData.gaodeKey
    });
    myAmapFun.getRegeo({
      success: function (res) {
        let pois = res[0].regeocodeData.pois;
        that.setData({
          longitude: res[0].longitude,
          latitude: res[0].latitude,
          currentCity: res[0].regeocodeData.addressComponent.city
        });
      },
      fail: function (info) {
        wx.showModal({
          title: info.errMsg
        });
      }
    })
  },

  getCityList() {
    let that = this;
    wx.request({ // 登录获取token
      url: app.globalData.apiUrl + '/run_user_address/address_dict',
      data: {
        token: wx.getStorageSync('token')
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        if (res.data.code == 0) {
          let _data = common.objKeySort(res.data.data);;
          that.setData({
            cityDataList: _data,
            lettersArray: Object.keys(_data).sort()
          })
        } else {
          Notify(res.data.code + res.data.message);
        }
      }
    })
  },

  chooseCity(e) { //选择城市
    let lonlat = e.currentTarget.dataset.longitude + ',' + e.currentTarget.dataset.latitude;
    let city = e.currentTarget.dataset.city;  //城市其实无需传,因为地址搜索页会用lonlat去请求接口刷新其所在的城市
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];
    prevPage.setData({
      'lonlat': lonlat
    })
    wx.navigateBack({
      delta: 1
    })
  },

  touchS(e){    //监听城市列表滚动所属字母块
    let letter = e.currentTarget.dataset.letter;
    this.setData({
      scrollToLetter: letter
    })
  },

  lettersClick(e){  //点击字母列表菜单滑动到列表中相应城市位置
    let letter = e.currentTarget.dataset.letter;
    this.setData({
      scroll_ToLetter: letter,
      scrollToLetter: letter
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