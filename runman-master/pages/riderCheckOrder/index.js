// pages/riderCheckOrder/index.js
import Notify from '../../dist/notify/notify';
const app = getApp();
const amapFile = require('../../libs/amap-wx.js');
const common = require('../../utils/common.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderData: [], //订单详情数据
    run_type: 1, //跑腿类型:1帮我取,3帮我送,5帮我买
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

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let order_no = options.order_no ? options.order_no : '';
    this.setData({
      order_no: order_no
    }, () => {
      this.getOrderDetail();
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

  getOrderDetail() { //请求订单详情
    let that = this;
    wx.request({
      url: app.globalData.apiUrl + '/run_rider_order/detail',
      data: {
        token: wx.getStorageSync('token'),
        order_no: that.data.order_no
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        if (res.data.code == 0) {
          let data = res.data.data;
          let choosedAddress = [{
            address: data.start_position,
            detailAddress: data.end_position_detail,
            name: data.start_user_name,
            phone: data.start_user_phone,
            longitude: data.start_longitude,
            latitude: data.start_latitude
          }, {
            address: data.end_position,
            detailAddress: data.end_position_detail,
            name: data.end_user_name,
            phone: data.end_user_phone,
            longitude: data.end_longitude,
            latitude: data.end_latitude
          }];
          that.setData({
            orderData: data,
            choosedAddress: choosedAddress,
            run_type: data.run_type,
          }, () => {
            that.getCurrentPos();
          });
        } else {
          Notify(res.data.code + res.data.message);
        }
      }
    })
  },

  getCurrentPos() {
    let that = this;
    let markers = that.data.markers; //起送点地址渲染
    let choosedAddress = that.data.choosedAddress;
    markers[0].longitude = choosedAddress[0].longitude;
    markers[0].latitude = choosedAddress[0].latitude;
    markers[1].longitude = choosedAddress[1].longitude;
    markers[1].latitude = choosedAddress[1].latitude;
    that.data.markers = markers;
    that.setData({
      markers: markers
    });
    let myAmapFun = new amapFile.AMapWX({
      key: app.globalData.gaodeKey
    });
    myAmapFun.getRegeo({  //获取当前位置信息
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
    });
    if (that.data.choosedAddress[0].address){     //非帮我买就近购买情况下请求
      myAmapFun.getRidingRoute({  //获取起始点间位置信息
        origin: that.data.choosedAddress[0].longitude + ',' + that.data.choosedAddress[0].latitude,
        destination: that.data.choosedAddress[1].longitude + ',' + that.data.choosedAddress[1].latitude,
        success: function (data) {
          let points = [], distance = '', distance_content = '';
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
        fail: function (info) { }
      })
    }
  },

  formSubmit(e) {    //抢单
    console.log("formSubmit", e);
    let that = this;
    let formId = e.detail.formId;
    let order_no = that.data.order_no;
    wx.showLoading({
      title: '',
      mask: true
    });
    wx.request({
      url: app.globalData.apiUrl + '/run_rider_order/operate',
      data: {
        token: wx.getStorageSync('token'),
        order_no: order_no,
        op_type: 1
      },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        if (res.data.code == 0) {
          wx.hideLoading();
          common.sendFormId(formId, app, (code, message) => {
            Notify(code + message);
          });
          wx.redirectTo({
            url: '/pages/getOrderSuccess/index',
          })
        } else {
          wx.hideLoading();
          Notify(res.data.code + res.data.message);
        }
      }
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