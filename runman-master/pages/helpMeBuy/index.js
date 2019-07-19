// pages/helpMeBuy/index.js
const app = getApp();
import Notify from '../../dist/notify/notify';
import md5 from '../../utils/md5.js';
const common = require('../../utils/common.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    buyNavList: [], //帮我买商品分类列表
    remarkCount: 0,
    helpMeBuy_data: {
      chooseIndex: 0, //选中的商品
      chooseType: '', //选中的类型
      remark: '', //备注
      buyAddress: [{
          checked: true,
          value: '指定地址',
          address: ''
        },
        {
          checked: false,
          value: '就近购买',
          tips: '请确定附近3公里内有您需要的商品'
        }
      ],
      receiveAddress: {}, //收货地址
      sendTime: '', //发货时间
      sex: '', //顾客性别(重要,0女，1男)
      goodsPrice: '', //商品价格
      tip: 0, //小费
      yunfei: 2.0, //跑腿运费
    },
    sendTime: '',
    addressOftenUse_show: false, //常用地址选择弹框显示
    choosedaddress: {}, //地址列表页选择带回的地址信息对象
    budgetPriceShow: false, //商品价格估算弹框显示
    budgeGoodsPrice: '',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let chooseIndex = options.chooseIndex ? options.chooseIndex : 0;
    let buyNavList = options.buyNavList ? JSON.parse(options.buyNavList) : [];
    this.setData({
      'helpMeBuy_data.chooseIndex': chooseIndex,
      'helpMeBuy_data.chooseType': buyNavList[chooseIndex],
      'buyNavList': buyNavList
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
    this.getAddressWrite(); //地址修改后本地渲染
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },
  buyNavListType_click(e) { //点击选择帮我买类型
    let index = e.currentTarget.dataset.index;
    let buyNavList = this.data.buyNavList;
    this.setData({
      'helpMeBuy_data.chooseIndex': index,
      'helpMeBuy_data.chooseType': buyNavList[index]
    })
  },
  // 统计输入的个数
  remarkNums: function(res) {
    this.setData({
      remarkCount: res.detail.cursor,
      'helpMeBuy_data.remark': res.detail.value
    });
  },
  buyAddress_radioChange(e) { //购买地址类型勾选变化
    // console.log("buyAddress_radioChange", e);
    let index = e.currentTarget.dataset.index;
    this.data.helpMeBuy_data.buyAddress[index].checked = true;
    this.data.helpMeBuy_data.buyAddress[1 - index].checked = false;
    this.setData({
      'helpMeBuy_data': this.data.helpMeBuy_data
    })
  },
  choose_address(e) { //点击跳转选择指定地址
    let type = e.currentTarget.dataset.type;
    wx.navigateTo({
      url: '/pages/addressList/index?type=' + type + '&originFrom=isHelpMeBuy'
    });
  },

  addressOftenUse_onClose(e) {
    let type = e.currentTarget.dataset.type;
    this.setData({
      originType: type,
      addressOftenUse_show: !this.data.addressOftenUse_show
    });
  },
  addressOftenUse_onClose2(e) { //选中常用地址后点蒙层关闭
    this.setData({
      addressOftenUse_show: !this.data.addressOftenUse_show
    });
  },

  // 常用地址点击后返回函数
  oftenUse_choosed(e) {
    // console.log("e", e);
    let originType = e.detail.originType;
    let choosedaddress = e.detail.choosedaddress;
    this.data.originType = originType;
    this.data.choosedaddress = choosedaddress;
    this.setData({
      originType: originType,
      choosedaddress: choosedaddress,
      addressOftenUse_show: false
    });
    this.getAddressWrite();
  },

  getAddressWrite() { //修改地址后重新渲染地址
    let that = this;
    let choosedaddress = that.data.choosedaddress;
    if (Object.keys(choosedaddress).length > 0) {
      let originType = that.data.originType;
      if (originType == 'address1') {
        that.setData({
          'helpMeBuy_data.buyAddress[0]': {
            checked: true,
            value: '指定地址',
            address: choosedaddress.position + choosedaddress.position_detail,
            position: choosedaddress.position,
            position_detail: choosedaddress.position_detail,
            position_road: choosedaddress.position_road,
            name: choosedaddress.name,
            phone: choosedaddress.phone,
            location: choosedaddress.location
          }
        })
      } else if (originType == 'address2') {
        that.setData({
          'helpMeBuy_data.receiveAddress': {
            address: choosedaddress.position + choosedaddress.position_detail,
            position: choosedaddress.position,
            position_detail: choosedaddress.position_detail,
            position_road: choosedaddress.position_road,
            name: choosedaddress.name,
            phone: choosedaddress.phone,
            location: choosedaddress.location
          }
        })
      }
    }
  },

  budgetPrice_onClose() {
    this.setData({
      budgetPriceShow: !this.data.budgetPriceShow
    })
  },

  watchBudgePrice(e) { //监听估算价格输入值
    let value = e.detail.value;
    this.setData({
      budgeGoodsPrice: value
    });

  },

  budgeSure() {
    let budgeGoodsPrice = Number(this.data.budgeGoodsPrice);
    if (!budgeGoodsPrice) {
      common.toast('请输入合理的估算价');
    } else if (budgeGoodsPrice > 500) {
      common.toast('该商品价值过高(超过500元),暂不提供跑腿服务');
    } else if (budgeGoodsPrice > 0 && budgeGoodsPrice <= 500) {
      this.setData({
        budgetPriceShow: false,
        'helpMeBuy_data.goodsPrice': budgeGoodsPrice
      })
    }
  },

  helpMeBuy_onChange(res) {
    // console.log("helpMeBuy_onChange",res);
    this.setData({
      'helpMeBuy_data.tip': res.detail
    })
  },
  formSubmit(e) {
    console.log('formSubmit', e);
    let that = this;
    let formId = e.detail.formId;
    let data = that.data.helpMeBuy_data;
    let params = {};
    wx.showLoading({
      title: '',
      mask: true
    });
    if (!this.checkInputComplete()) {
      return false;
    };
    params = {
      token: wx.getStorageSync('token'),
      run_type: 5,
      gender: data.sex == '1' ? 1 : 2,
      service_title: data.chooseType,
      buy_address_type: data.buyAddress[0].checked ? 1 : 3,
      end_position: data.receiveAddress.address,
      end_position_road: data.receiveAddress.position_road,
      end_position_detail: data.receiveAddress.position_detail,
      end_longitude: (data.receiveAddress.location).split(',')[0],
      end_latitude: (data.receiveAddress.location).split(',')[1],
      end_user_name: data.receiveAddress.name,
      end_user_phone: data.receiveAddress.phone,
      send_user_remark: data.remark,
      order_send_time: data.sendTime,
      predict_fee: data.goodsPrice,
      tip_fee: data.tip,
      base_run_fee: 2
    };
    if (data.buyAddress[0].checked) {
      params.start_position = data.buyAddress[0].address;
      params.start_position_road = data.buyAddress[0].position_road;
      params.start_position_detail = data.buyAddress[0].position_detail;
      params.start_longitude = (data.buyAddress[0].location).split(',')[0];
      params.start_latitude = (data.buyAddress[0].location).split(',')[1];
      params.start_user_name = data.buyAddress[0].name;
      params.start_user_phone = data.buyAddress[0].phone;
    };
    wx.request({
      url: app.globalData.apiUrl + '/run_order/do',
      data: params,
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        if (res.data.code == 0) {
          let order_no = res.data.data.order_no;
          wx.hideLoading();
          common.sendFormId(formId, app, (code, message) => {
            Notify(code + message);
          });
          that.pay(order_no);
        } else {
          wx.hideLoading();
          Notify(res.data.code + res.data.message);
        }
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  //提交订单后返回order_no进行支付
  pay(order_no) {
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
              wx.redirectTo({
                url: '/pages/confirmOrderSuccess/index',
              })
            },
            fail: function(res) {
              wx.showToast({
                title: '提交订单失败',
                icon: 'none',
                duration: 1500,
                mask: true,
                success: function() {
                  wx.redirectTo({
                    url: '/pages/consumerOrderList/index?state=3',
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

  checkInputComplete() { //检验表单输入格式完整性
    let that = this;
    let helpMeBuy_data = this.data.helpMeBuy_data;
    let buyAddress = helpMeBuy_data.buyAddress[0].checked ? (helpMeBuy_data.buyAddress[0].address ? true : false) : (helpMeBuy_data.buyAddress[1].checked);
    let receiveAddress = helpMeBuy_data.receiveAddress.address ? true : false;
    let sendTime = helpMeBuy_data.sendTime;
    let sex = helpMeBuy_data.sex;
    let goodsPrice = helpMeBuy_data.goodsPrice;
    if (!buyAddress) {
      wx.hideLoading();
      common.toast('请选择购买地址');
      return false;
    } else if (!receiveAddress) {
      wx.hideLoading();
      common.toast('请选择收货地址');
      return false;
    } else if (sendTime == '') {
      wx.hideLoading();
      common.toast('请选择发货时间');
      return false;
    } else if (sex != '0' && sex != '1') {
      wx.hideLoading();
      common.toast('请选择您的性别');
      return false;
    } else if (!goodsPrice) {
      wx.hideLoading();
      common.toast('请填写商品价格');
      return false;
    };
    return true;
  },

  chooseSendTime() { //请求发货时间
    let that = this;
    wx.navigateTo({
      url: '/pages/chooseTime/index?originFrom=helpMeBuy'
    })
  },

  chooseSex() { //跳转选择性别
    wx.navigateTo({
      url: '/pages/chooseSex/index?originFrom=helpMeBuy',
    })
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