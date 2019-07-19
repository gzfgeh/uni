// pages/addAddress/index.js
const app = getApp();
const common = require('../../utils/common.js');
import Notify from '../../dist/notify/notify';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressData: {
      name: '',
      phone: '',
      address: '', //地址
      subAddress: '', //详细地址
      location: '', //地址经纬度
      isCommon: false //是否设置为常用
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let id = options.id ? options.id : 0;
    if (id) {
      wx.setNavigationBarTitle({
        title: '编辑地址'
      });
      this.setData({
        editId: id
      });
      this.getEditData(id); //获取所编辑地址的初始信息
    } else {
      wx.setNavigationBarTitle({
        title: '新增地址'
      });
    }


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

  inputWatch(e) { //监听input输入改变
    console.log("input", e);
    let type = e.currentTarget.dataset.type;
    let value = e.detail.value;
    let that = this;
    that.data.addressData[type] = value;
    that.setData({
      addressData: that.data.addressData
    })

  },
  isCommonChange(e) { //设为常用
    console.log('isCommon', e);
    let value = e.detail.value;
    this.setData({
      'addressData.isCommon': value
    })

  },
  toChooseAddress() { //跳转选择收货地址
    wx.navigateTo({
      url: '/pages/chooseAddress/index',
    })
  },

  getEditData(id) { //获取所编辑地址的初始信息
    let that = this;
    wx.request({
      url: app.globalData.apiUrl + '/run_user_address/show_address',
      data: {
        token: wx.getStorageSync('token'),
        id: parseInt(id)
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        if (res.data.code == 0) {
          let data = res.data.data;
          let addressData = that.data.addressData;
          addressData.name = data.name;
          addressData.phone = data.phone;
          addressData.address = data.position;
          addressData.subAddress = data.position_detail;
          addressData.position_road = data.position_road;
          addressData.location = data.longitude + ',' + data.latitude;
          addressData.isCommon = data.is_often ? true : false;
          that.setData({
            addressData: addressData
          })
        } else {
          Notify(res.data.code + res.data.message);
        }
      }
    })
  },

  formSubmit(e) { //保存地址
    let formId = e.detail.formId;
    common.sendFormId(formId, app, (code, message) => {
      Notify(code + message);
    });
  },

  submit(e) { //保存地址
    let that = this;
    let type = e.currentTarget.dataset.type;
    wx.showLoading({
      title: '',
      mask: true
    });
    if (!that.checkInputComplete()) {
      return false;
    }
    that.dataSubmit(type, (resTitle) => {
      wx.showToast({
        title: resTitle,
        icon: 'success',
        duration: 2000,
        success() {
          wx.navigateBack({
            delta: 1
          })
        }
      });
    });
  },

  dataSubmit(type, resFun) {
    let that = this;
    let addressData = that.data.addressData;
    let url = '';
    let params = {};
    let method = '';
    let resTitle = ''; //请求成功回调提示交互信息
    if (type == 'addSave' || type == 'editSave') {
      url = '/run_user_address/add_address';
      params = {
        token: wx.getStorageSync('token'),
        name: addressData.name,
        phone: addressData.phone,
        position: addressData.address,
        position_detail: addressData.subAddress,
        position_road: addressData.position_road,
        longitude: (addressData.location).split(',')[0],
        latitude: (addressData.location).split(',')[1],
        is_often: (addressData.isCommon) ? 1 : 0
      };
      method = 'POST';
      resTitle = '添加成功';
      if (type == 'editSave') {
        url = '/run_user_address/edit_address';
        params.id = parseInt(that.data.editId);
        resTitle = '编辑成功';
      }
    } else if (type == 'editDelete') {
      url = '/run_user_address/del_address'
      params = {
        token: wx.getStorageSync('token'),
        id: parseInt(that.data.editId)
      };
      method = 'GET';
      resTitle = '删除成功';
    }
    wx.request({
      url: app.globalData.apiUrl + url,
      data: params,
      method: method,
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        wx.hideLoading();
        if (res.data.code == 0) {
          resFun(resTitle);
        } else {
          Notify(res.data.code + res.data.message);
        }
      }
    })
  },

  checkInputComplete() { //检验输入格式正确性
    let that = this;
    let addressData = this.data.addressData;
    let name = addressData.name;
    let phone = addressData.phone;
    let address = addressData.address;
    let subAddress = addressData.subAddress;
    if (name == '') {
      wx.hideLoading();
      common.toast('收货人不能为空');
      return false;
    } else if (phone == '') {
      wx.hideLoading();
      common.toast('手机号不能为空');
      return false;
    } else if (!(/^1\d{10}$/.test(phone))) {
      common.toast('手机号格式有误');
      return false;
    } else if (address == '') {
      wx.hideLoading();
      common.toast('收货地址不能为空');
      return false;
    }
    return true;
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