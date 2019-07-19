// pages/chooseSex/index.js
const app = getApp();
import Notify from '../../dist/notify/notify';
const common = require('../../utils/common.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    choosedSex: {
      'boy': false,
      'girl': false
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let originFrom = options.originFrom ? options.originFrom : '';
    this.setData({
      originFrom: originFrom
    })

  },

  radioChange(e) {
    let sex = e.detail.value;
    this.data.choosedSex = {
      'boy': false,
      'girl': false
    };
    this.data.choosedSex[sex] = true;
    this.setData({
      choosedSex: this.data.choosedSex
    });
    // console.log("e", e);
  },

  sexSure(){
    let originFrom = this.data.originFrom;
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];
    let boy = this.data.choosedSex.boy;
    let girl = this.data.choosedSex.girl;
    let sex = 0;
    if (!boy && !girl) {
      common.toast('请选择您的性别');
      return false;
    }else{
      if(boy){
        sex = 1
      }else{
        sex = 0
      }
    };
    if(originFrom == 'confirmOrder'){
      prevPage.setData({
        'orderData.sex': sex
      }); 
    } else if (originFrom == 'helpMeBuy'){
      prevPage.setData({
        'helpMeBuy_data.sex': sex
      }); 
    };
    wx.navigateBack({
      delta: 1
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