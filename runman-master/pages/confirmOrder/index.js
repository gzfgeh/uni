// pages/confirmOrder/index.js
const app = getApp();
import Notify from '../../dist/notify/notify';
import md5 from '../../utils/md5.js';
const amapFile = require('../../libs/amap-wx.js');
const common = require('../../utils/common.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    choosedAddress: [], //配送起始地址信息
    markers: [{ //送地址
      iconPath: "/images/zxw/logo_start.png",
      id: 1,
      latitude: '',
      longitude: '',
      callout: {},
      width: 30,
      height: 33
    }, { //达地址
      iconPath: "/images/zxw/logo_end.png",
      id: 2,
      latitude: '',
      longitude: '',
      width: 30,
      height: 33
    }, { //本地地址
      iconPath: "",
      id: 0,
      latitude: '',
      longitude: '',
      width: '',
      height: ''
    }],
    distance: '',
    polyline: [],

    choosedaddress: {}, //地址列表页选择带回的地址信息对象
    addressOftenUse_show: false, //常用地址选择弹框显示
    placeIndex: 0,

    orderData: {
      goodsTypeValue: '', //物品种类价值
      sendTime: '', //发货时间
      sex: '', //顾客性别(重要,0女，1男)
      remark: '', //备注
      tip: 0 //小费    
    },
    runMoney: '2.0',
    sendTime: '',
    showGoodsTypeValue: false,
    typeValueData: {
      'type': [],
      'value': []
    },
    typeValue_choosed: {
      type: {
        index: -1,
        val: ''
      },
      value: {
        index: -1,
        val: ''
      }
    }
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let choosedAddress = options.choosedAddress ? JSON.parse(options.choosedAddress) : [];
    let orderType = options.orderType ? options.orderType : '';
    this.setData({
      choosedAddress: choosedAddress,
      orderType: orderType
    });
    this.getCurrentPos();
    this.getOrderMessage();
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
  getCurrentPos() {
    let that = this;
    let markers = that.data.markers; //起送点地址渲染
    let choosedAddress = that.data.choosedAddress;
    markers[0].longitude = (choosedAddress[0].location).split(',')[0];
    markers[0].latitude = (choosedAddress[0].location).split(',')[1];
    markers[1].longitude = (choosedAddress[1].location).split(',')[0];
    markers[1].latitude = (choosedAddress[1].location).split(',')[1];
    // console.log("dd", markers);
    that.data.markers = markers;
    that.setData({
      markers: markers
    });
    let myAmapFun = new amapFile.AMapWX({
      key: app.globalData.gaodeKey
    });
    myAmapFun.getRegeo({
      iconPath: "/images/zxw/marker.png",
      iconWidth: 20,
      iconHeight: 32,
      success: function(data) {
        let markerCurrent = {
          id: data[0].id,
          latitude: data[0].latitude,
          longitude: data[0].longitude,
          iconPath: data[0].iconPath,
          width: data[0].width,
          height: data[0].height
        };
        that.setData({
          'markers[2]': markerCurrent //当前位置地址渲染
        });
      },
      fail: function(info) {
        wx.showModal({
          title: info.errMsg
        });
      }
    })

  },

  getOrderMessage() {
    let that = this;
    let myAmapFun = new amapFile.AMapWX({
      key: app.globalData.gaodeKey
    });
    myAmapFun.getRidingRoute({
      origin: that.data.choosedAddress[0].location,
      destination: that.data.choosedAddress[1].location,
      success: function(data) {
        let points = [];
        let distance = '';
        let distance_content = '';
        if (data.paths && data.paths[0] && data.paths[0].steps) {
          let steps = data.paths[0].steps;
          for (let i = 0; i < steps.length; i++) {
            let poLen = steps[i].polyline.split(';');
            for (let j = 0; j < poLen.length; j++) {
              points.push({
                longitude: parseFloat(poLen[j].split(',')[0]),
                latitude: parseFloat(poLen[j].split(',')[1])
              })
            }
          }
        };
        if (data.paths[0] && data.paths[0].distance) {
          distance = Number(data.paths[0].distance);
          if (distance < 500) {
            distance_content = '订单距离' + distance + '米';
          } else {
            distance_content = '订单距离' + (distance / 1000).toFixed(2) + '公里';
          }
        };
        that.setData({
          polyline: [{
            points: points,
            color: "#554C15",
            width: 4
          }],
          distance: distance,
          'markers[0].callout': {
            'display': 'ALWAYS',
            'content': distance_content,
            'color': '#000',
            'borderRadius': 15,
            'padding': 5,
            'bgColor': '#fff'
          }
        });
      },
      fail: function(info) {

      }
    })
  },

  toChooseAddress(e) {
    let index = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: '/pages/addressList/index?index=' + index + '&originFrom=isConfirmOrder'
    })
  },

  getAddressWrite() { //修改地址后重新渲染地址
    let that = this;
    let choosedaddress = that.data.choosedaddress;
    if (Object.keys(choosedaddress).length > 0) {
      let placeIndex = that.data.placeIndex;
      that.data.choosedAddress[placeIndex] = {
        address: choosedaddress.position,
        detailAddress: choosedaddress.position_detail,
        name: choosedaddress.name,
        phone: choosedaddress.phone,
        location: choosedaddress.location
      };
      that.setData({
        choosedAddress: that.data.choosedAddress
      });
    };
    this.getCurrentPos();
    this.getOrderMessage();
  },

  addressOftenUse_onClose(e) { //点击常用调用常用地址情况
    let index = e.currentTarget.dataset.index;
    this.setData({
      placeIndex: index,
      addressOftenUse_show: !this.data.addressOftenUse_show
    });
  },

  addressOftenUse_onClose2(e) { //选中常用地址后情况
    this.setData({
      addressOftenUse_show: !this.data.addressOftenUse_show
    });
  },

  // 常用地址点击后返回函数
  oftenUse_choosed(e) {
    console.log("e", e);
    let placeIndex = e.detail.placeIndex;
    let choosedaddress = e.detail.choosedaddress;
    this.data.placeIndex = placeIndex;
    this.data.choosedaddress = choosedaddress;
    this.setData({
      placeIndex: placeIndex,
      choosedaddress: choosedaddress,
      addressOftenUse_show: false
    });
    this.getAddressWrite();
  },

  chooseGoodsTypeValue() {
    let that = this;
    let typeValue_choosed = this.data.typeValue_choosed;
    if (!typeValue_choosed.type.val || !typeValue_choosed.value.val) {
      typeValue_choosed = {
        type: {
          index: -1,
          val: ''
        },
        value: {
          index: -1,
          val: ''
        }
      }
    };
    wx.request({
      url: app.globalData.apiUrl + '/run_order/get_service_manage',
      data: {
        token: wx.getStorageSync('token'),
        run_type: that.data.orderType == 'helpMeQu' ? 1 : 3
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        if (res.data.code == 0) {
          let data = res.data.data;
          let typeArray = [],
            valueArray = [];
          (data.service).forEach((item) => {
            typeArray.push(item.service_title);
          });
          (data.worth).forEach((item) => {
            valueArray.push(item);
          });
          that.setData({
            'typeValueData': {
              'type': typeArray,
              'value': valueArray
            }
          })
        } else {
          Notify(res.data.code + res.data.message);
        }
      }
    });
    this.setData({
      showGoodsTypeValue: !this.data.showGoodsTypeValue,
      typeValue_choosed: typeValue_choosed
    });
  },

  typeValue_click(e) { //物品种类价值估算弹框点击
    let type = e.currentTarget.dataset.type;
    let index = e.currentTarget.dataset.index;
    let val = e.currentTarget.dataset.val;
    this.data.typeValue_choosed[type].index = index;
    this.data.typeValue_choosed[type].val = val;
    this.setData({
      typeValue_choosed: this.data.typeValue_choosed
    })
  },

  typeValue_submit() {
    let that = this;
    let type = that.data.typeValue_choosed.type.val;
    let value = that.data.typeValue_choosed.value.val;
    if (type == '') {
      common.toast('请选择物品类型');
      return false;
    } else if (value == '') {
      common.toast('请选择物品价值');
      return false;
    };
    that.setData({
      'orderData.goodsTypeValue': type + '/' + value,
    }, () => {
      that.chooseGoodsTypeValue();
    });
  },

  chooseSendTime() { //请求发货时间
    let that = this;
    wx.navigateTo({
      url: '/pages/chooseTime/index?originFrom=confirmOrder'
    })
  },

  chooseSex() { //跳转选择性别
    wx.navigateTo({
      url: '/pages/chooseSex/index?originFrom=confirmOrder',
    })
  },

  watchOrderData(e) { //监听表单内容改变
    let type = e.currentTarget.dataset.type;
    let val = e.detail.value;
    this.data.orderData[type] = val;
    this.setData({
      orderData: this.data.orderData
    })
  },

  formSubmit(e) { //下单
    console.log("formSubmit", e);
    let that = this;
    let choosedAddress = that.data.choosedAddress;
    let formId = e.detail.formId;
    wx.showLoading({
      title: '',
      mask: true
    });
    if (!this.checkInputComplete()) {
      return false;
    };
    wx.request({
      url: app.globalData.apiUrl + '/run_order/do',
      data: {
        token: wx.getStorageSync('token'),
        run_type: that.data.orderType == 'helpMeQu' ? 1 : 3,
        gender: that.data.orderData.sex == '1' ? 1 : 2,
        service_title: (that.data.orderData.goodsTypeValue).split('/')[0],
        start_position: choosedAddress[0].address,
        start_position_road: choosedAddress[0].position_road,
        start_position_detail: that.data.choosedAddress[0].detailAddress,
        start_longitude: (choosedAddress[0].location).split(',')[0],
        start_latitude: (choosedAddress[0].location).split(',')[1],
        start_user_name: choosedAddress[0].name,
        start_user_phone: choosedAddress[0].phone,
        end_position: choosedAddress[1].address,
        end_position_road: choosedAddress[1].position_road,
        end_position_detail: choosedAddress[1].detailAddress,
        end_longitude: (choosedAddress[1].location).split(',')[0],
        end_latitude: (choosedAddress[1].location).split(',')[1],
        end_user_name: choosedAddress[1].name,
        end_user_phone: choosedAddress[1].phone,
        send_user_remark: that.data.orderData.remark,
        order_send_time: that.data.orderData.sendTime,
        predict_fee: (that.data.orderData.goodsTypeValue).split('/')[1],
        tip_fee: that.data.orderData.tip,
        base_run_fee: that.data.runMoney
      },
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
      }
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
    let orderData = this.data.orderData;
    let goodsTypeValue = orderData.goodsTypeValue;
    let sendTime = orderData.sendTime;
    let sex = orderData.sex;
    if (goodsTypeValue == '') {
      wx.hideLoading();
      common.toast('请选择物品信息');
      return false;
    } else if (sendTime == '') {
      wx.hideLoading();
      common.toast('请选择发货时间');
      return false;
    } else if (sex != '0' && sex != '1') {
      wx.hideLoading();
      common.toast('请选择您的性别');
      return false;
    };
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