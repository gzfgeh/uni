// pages/paotui/index.js
import Notify from '../../dist/notify/notify';
const app = getApp();
const amapFile = require('../../libs/amap-wx.js');
const common = require('../../utils/common.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navType1: [{
        title: '我要帮忙'
      },
      {
        title: '我是骑士'
      }
    ],
    is_rider: 0,
    navType1_index: 0, //首页一级标题的激活下标
    navType2: [{
        title: '帮我取'
      },
      {
        title: '帮我送'
      },
      {
        title: '帮我买'
      }
    ],
    navType2_index: 0, //首页二级标题的激活下标
    navType2_status: [
      [0, 0],
      [0, 0]
    ],
    navType2_address: [
      [{
          address: '',
          detailAddress: '',
          name: '',
          phone: '',
          location: ''
        },
        {
          address: '',
          name: '',
          detailAddress: '',
          phone: '',
          location: ''
        },
      ],
      [{
          address: '',
          name: '',
          detailAddress: '',
          phone: '',
          location: ''
        },
        {
          address: '',
          name: '',
          detailAddress: '',
          phone: '',
          location: ''
        }
      ]
    ],
    placeIndex1: 0,
    placeIndex2: 0,
    choosedaddress: {}, //地址列表页选择带回的地址信息对象
    addressOftenUse_show: false, //常用地址选择弹框显示

    buyNavList: [], //帮我买商品分类列表

    // 我是骑士数据
    riderStatus: false,
    riderOrderList: [],
    isReachBottom_riderOrder: false,
    page_riderOrder: 1,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
    this.navType1_consumer_map();
    this.getAddressWrite(); //填充勾选的地址到相应位置
    if (this.data.riderStatus) {
      this.riderRefresh(); //已经开工情况下，刷新骑士抢单数据
    }
  },
  toMy() {
    wx.navigateTo({
      url: '/pages/my/index',
    })
  },
  navType1_click(e) {
    let that = this;
    let index = e.currentTarget.dataset.index;
    this.setData({
      navType1_index: index
    })
  },
  navType1_consumer_map(isChange_workState = false, work_state) {
    let that = this;
    let myAmapFun = new amapFile.AMapWX({
      key: app.globalData.gaodeKey
    });
    myAmapFun.getRegeo({
      iconPath: "/images/zxw/marker.png",
      iconWidth: 20,
      iconHeight: 32,
      success: function(data) {
        let marker = [{
          id: data[0].id,
          latitude: data[0].latitude,
          longitude: data[0].longitude,
          iconPath: data[0].iconPath,
          width: data[0].width,
          height: data[0].height
        }]
        that.setData({
          markers: marker,
          latitude: data[0].latitude,
          longitude: data[0].longitude
        }, () => {
          if (isChange_workState) {
            that.changeRiderStatus(work_state);
          }
        });
      },
      fail: function(info) {
        wx.showModal({
          title: info.errMsg
        });
      }
    })
  },
  navType2_click(e) {
    let that = this;
    let index = e.currentTarget.dataset.index;
    if (index == 2) {
      wx.request({
        url: app.globalData.apiUrl + '/run_order/get_service_manage',
        data: {
          token: wx.getStorageSync('token'),
          run_type: 5
        },
        method: 'GET',
        dataType: 'json',
        responseType: 'text',
        success: function(res) {
          if (res.data.code == 0) {
            let data = res.data.data;
            let buyNavList = [];
            (data.service).forEach((item) => {
              buyNavList.push(item.service_title);
            });
            that.setData({
              buyNavList: buyNavList
            });
          } else {
            Notify(res.data.code + res.data.message);
          }
        }
      })
    };
    this.setData({
      navType2_index: index
    });
  },
  toChooseAddress(e) {
    let index1 = e.currentTarget.dataset.index1;
    let index2 = e.currentTarget.dataset.index2;
    wx.navigateTo({
      url: '/pages/addressList/index?index1=' + index1 + '&index2=' + index2 + '&originFrom=isIndexGetPlace'
    })
  },

  getAddressWrite() {
    let that = this;
    let choosedaddress = that.data.choosedaddress;
    let navType2_status = that.data.navType2_status;
    if (Object.keys(choosedaddress).length > 0) {
      let placeIndex1 = that.data.placeIndex1;
      let placeIndex2 = that.data.placeIndex2;
      that.data.navType2_status[placeIndex1][placeIndex2] = 1;
      that.data.navType2_address[placeIndex1][placeIndex2] = {
        address: choosedaddress.position,
        detailAddress: choosedaddress.position_detail,
        position_road: choosedaddress.position_road,
        name: choosedaddress.name,
        phone: choosedaddress.phone,
        location: choosedaddress.location
      }
      that.setData({
        navType2_status: that.data.navType2_status,
        navType2_address: that.data.navType2_address
      })
    }
    let isAddressComplete = false; //地址两个都选填完跳转确认订单页
    let isAddressComplete_index1 = 0;
    let orderType = '';
    navType2_status.forEach((item, index) => {
      if (item[0] && item[1]) {
        isAddressComplete = true;
        isAddressComplete_index1 = index;
        if (isAddressComplete_index1 == 0) {
          orderType = 'helpMeQu';
        } else if (isAddressComplete_index1 == 1) {
          orderType = 'helpMeSong';
        }
      }
    });
    if (isAddressComplete) {
      that.setData({
        isAddressComplete: true,
        isAddressComplete_index1: isAddressComplete_index1
      });
      wx.navigateTo({
        url: '/pages/confirmOrder/index?choosedAddress=' + JSON.stringify(that.data.navType2_address[isAddressComplete_index1]) + '&orderType=' + orderType
      })
    };

  },

  buyNavListType_click(e) { //点击选择帮我买类型
    let index = e.currentTarget.dataset.index;
    let buyNavList = JSON.stringify(this.data.buyNavList);
    wx.navigateTo({
      url: '/pages/helpMeBuy/index?chooseIndex=' + index + '&buyNavList=' + buyNavList,
    })
  },

  riderStatus_change() { //我是骑士开工收工状态切换
    let that = this;
    let riderStatus = this.data.riderStatus;
    let content = '';
    if (!riderStatus) {
      content = '请确认已做好接单准备';
    } else {
      content = '收工后将不会受到任何订单相关的提醒';
    };
    wx.showModal({
      title: '',
      content: content,
      success(res) {
        if (res.confirm) {
          if (!that.data.riderStatus) { //切换状态后开工状态下加载客户提交待接单列表
            let is_rider = 0;
            common.getUserInfo(app, (code, message) => {
              Notify(code + message);
            }, () => {     //取接口更新的userInfo回调函数
              that.setData({   //开工时判断该用户是否骑手
                is_rider: wx.getStorageSync('userInfo').is_rider,   //是否骑手
                work_state: wx.getStorageSync('userInfo').work_state   //工作状态,0不开工，1开工，2封号/惩罚中
              }, () => {
                if (that.data.work_state == 2) {
                  Notify('您的账号异常(惩罚中),请联系小黑猫跑腿客服)');
                } else {
                  that.setData({
                    riderStatus: !riderStatus
                  });
                  that.getRiderOrderList();
                  that.navType1_consumer_map(true, 1);
                }
              });
            });
          } else {
            let intervalName3 = that.data.intervalName2 ? that.data.intervalName2 : []; //取本地存储的未清除的计时器组
            that.setData({
              'riderStatus': !riderStatus,
              'riderOrderList': [],
              'isReachBottom_riderOrder': false,
              'page_riderOrder': 1
            });
            if (intervalName3.length) { //收工后本地计时器清除
              intervalName3.forEach((item) => {
                clearInterval(item);
              })
            };
            that.navType1_consumer_map(true, 0);
          }
        }
      }
    })
  },

  changeRiderStatus(work_state) {   //切换开工状态告知后台
    let that = this;
    wx.request({
      url: app.globalData.apiUrl + '/run_user/improve',
      data: {
        token: wx.getStorageSync('token'),
        work_state: work_state,
        longitude: that.data.longitude,
        latitude: that.data.latitude
      },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        if (res.data.code == 0) {} else {
          Notify(res.data.code + res.data.message);
        }
      }
    })
  },

  getRiderOrderList(page = 1) { //获取骑士抢单列表
    let that = this;
    wx.request({
      url: app.globalData.apiUrl + '/run_rider_order/list',
      data: {
        token: wx.getStorageSync('token'),
        longitude: that.data.longitude,
        latitude: that.data.latitude,
        page: page
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        if (res.data.code == 0) {
          let _data = res.data.data;
          let riderOrderList = that.data.riderOrderList;
          let countDownTime = [];
          riderOrderList.push(..._data.data);
          riderOrderList.forEach((item) => {
            countDownTime.push(item.countdown);
          });
          common.setCountDown_time(that, countDownTime);
          that.setData({
            'riderOrderList': riderOrderList,
            'isReachBottom_riderOrder': _data.current_page == _data.last_page ? true : false
          });
        } else {
          Notify(res.data.code + res.data.message);
        }
      }
    })
  },

  checkOrder(e) { //骑手查看订单
    let that = this;
    let order_no = e.currentTarget.dataset.order_no;
    let is_rider = that.data.is_rider;
    if (is_rider == 0) {
      wx.showModal({
        title: '',
        content: '您当前不是骑士身份,不具备查看订单以及接单权限,是否前往骑士认证页面?',
        success(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/riderCertification/index'
            })
          } else if (res.cancel) {}
        }
      })
    } else {
      wx.navigateTo({
        url: '/pages/riderCheckOrder/index?order_no=' + order_no
      })
    }
  },
  riderRefresh() { //骑手刷新页面接口
    // console.log('rider page refresh');
    this.setData({
      riderOrderList: [],
      isReachBottom_riderOrder: false,
      page_riderOrder: 1
    }, () => {
      this.getRiderOrderList()
    });
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    let that = this;
    let isAddressComplete = that.data.isAddressComplete;
    let isAddressComplete_index1 = that.data.isAddressComplete_index1;
    let navType2_status = that.data.navType2_status;
    let navType2_address = that.data.navType2_address;
    if (isAddressComplete) {
      navType2_status[isAddressComplete_index1][0] = 0;
      navType2_status[isAddressComplete_index1][1] = 0;
      navType2_address[isAddressComplete_index1][0] = {};
      navType2_address[isAddressComplete_index1][1] = {};
      that.setData({
        navType2_status: navType2_status,
        navType2_address: navType2_address,
        isAddressComplete: false,
        choosedaddress: {}
      })
    }
  },

  addressOftenUse_onClose(e) { //点击常用调用常用地址情况
    let index1 = e.currentTarget.dataset.index1;
    let index2 = e.currentTarget.dataset.index2;
    this.setData({
      placeIndex1: index1,
      placeIndex2: index2,
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
    let placeIndex1 = e.detail.placeIndex1;
    let placeIndex2 = e.detail.placeIndex2;
    let choosedaddress = e.detail.choosedaddress;
    this.data.placeIndex1 = placeIndex1;
    this.data.placeIndex2 = placeIndex2;
    this.data.choosedaddress = choosedaddress;
    this.setData({
      placeIndex1: placeIndex1,
      placeIndex2: placeIndex2,
      choosedaddress: choosedaddress,
      addressOftenUse_show: false
    });
    this.getAddressWrite();
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
    // 骑士抢单列表上拉加载
    let that = this;
    if (that.data.navType1_index == 1 && that.data.riderStatus && !that.data.isReachBottom_riderOrder) {
      console.log("骑士列表上拉加载");
      that.data.page_riderOrder++;
      this.getRiderOrderList(that.data.page_riderOrder);
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})