// pages/riderCertification/index.js
import Notify from '../../dist/notify/notify';
const app = getApp();
const common = require('../../utils/common.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    steps: [{
        text: '',
        desc: '资料提交'
      },
      {
        text: '',
        desc: '等待审核'
      },
      {
        text: '',
        desc: '审核完成'
      }
    ],
    status: 0, //0未提交审核,1审核中,3审核通过,5审核驳回
    // 状态1
    cerficaMessage: {
      name: '',
      phone: '',
      idcard: '',
      sex: 1,
      school: '',
      id_image_front: '',
      id_image_back: ''
    },
    sexs: [{
        name: '男',
        checked: true
      },
      {
        name: '女',
        checked: false
      }
    ]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getStatus();
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
  getStatus() {
    let that = this;
    wx.request({
      url: app.globalData.apiUrl + '/run_rider/get_verify_info',
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
            status: data.status
          })
        } else {
          Notify(res.data.code + res.data.message);
        }
      }
    })
  },

  watchCerficaMessage(e) { //监听提交资料时表单资料输入
    let type = e.currentTarget.dataset.type;
    let value = e.detail.value;
    this.data.cerficaMessage[type] = value;
    this.setData({
      cerficaMessage: this.data.cerficaMessage
    });
  },
  radioChange(e) { //监听性别选择改变
    console.log("e", e);
    let activeIndex = Number(e.detail.value) + 1;
    this.setData({
      'cerficaMessage.sex': activeIndex
    });
  },

  // 上传身份证到七牛云的图片地址返回
  uploadHandle(e) {
    console.log('uploadHandle', e);
    this.setData({
      'cerficaMessage.id_image_front': e.detail.cardFace,
      'cerficaMessage.id_image_back': e.detail.cardVerso
    })
  },

  status0Submit(e) { //提交审核
    console.log("status0Submit", e);
    let that = this;
    let cerficaMessage = that.data.cerficaMessage;
    let formId = e.detail.formId;
    wx.showLoading({
      title: '',
      mask: true
    });
    if (!this.checkInputComplete(cerficaMessage)) {
      return false;
    };
    wx.request({
      url: app.globalData.apiUrl + '/run_rider/verify',
      data: {
        token: wx.getStorageSync('token'),
        real_name: cerficaMessage.name,
        phone: cerficaMessage.phone,
        id_card_no: cerficaMessage.idcard,
        gender: cerficaMessage.sex,
        school: cerficaMessage.school,
        id_card_img: cerficaMessage.id_image_front,
        school_card_img: cerficaMessage.id_image_back
      },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        if (res.data.code == 0) {
          wx.hideLoading();
          common.sendFormId(formId, app, (code, message) => {
            Notify(code + message);
          });
          that.setData({
            status:1
          })
        } else {
          wx.hideLoading();
          Notify(res.data.code + res.data.message);
        }
      }
    })
  },

  checkInputComplete(cerficaMessage) { //检验表单输入格式完整性
    let that = this;
    let name = cerficaMessage.name;
    let phone = cerficaMessage.phone;
    let idcard = cerficaMessage.idcard;
    let sex = cerficaMessage.sex;
    let school = cerficaMessage.school;
    let id_image_front = cerficaMessage.id_image_front;
    let id_image_back = cerficaMessage.id_image_back;

    if (name == '') {
      wx.hideLoading();
      common.toast('请填写姓名');
      return false;
    } else if (!(/^1\d{10}$/.test(phone))) {
      wx.hideLoading();
      common.toast('请填写正确格式的手机号');
      return false;
    } else if (!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(idcard))) {
      wx.hideLoading();
      common.toast('请填写正确格式的身份证号');
      return false;
    } else if (school == '') {
      wx.hideLoading();
      common.toast('请填写所在学校');
      return false;
    } else if (id_image_front == '') {
      wx.hideLoading();
      common.toast('请上传身份证正面头像面');
      return false;
    } else if (id_image_back == '') {
      wx.hideLoading();
      common.toast('请上传学生证附有照片面');
      return false;
    };
    return true;
  },

  reSubmit() { //审核未通过点击重新提交
    this.setData({
      status: 0
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