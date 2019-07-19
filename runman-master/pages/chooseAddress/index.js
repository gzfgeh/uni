// pages/chooseAddress/index.js
const app = getApp();
const amapFile = require('../../libs/amap-wx.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentCity: '杭州市',
    lonlat: '',  //所在城市的经纬度
    inputInfo: '',
    isInputEmpty: true,
    inputInfo: '请输入您的地址', //输入地址失去焦点后
    inputInfo_realTime: '', //输入地址实时监听
    searchAddressData: [], //搜索的地址信息
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
    this.getCurrentAddressMap(); //获取当前位置的高德信息
  },

  toChooseCity(){   //跳转选择当前所在城市
    wx.navigateTo({
      url: '/pages/chooseCity/index',
    })
  },

  tapInput() {
    this.setData({
      inputFocus: true,   //在真机上将焦点给input
      inputInfo: ''       //初始占位清空
    });
  },
  searchInput(e) {
    let placeHoloder = '请输入您的地址';
    if (e.detail.value) {
      placeHoloder = '';
    };
    this.getSearchKeyPlace(e.detail.value);
    this.setData({
      inputInfo_realTime: e.detail.value,
      isInputEmpty: e.detail.value ? false : true,
      inputInfo: placeHoloder
    });
  },
  /* input 失去焦点后将 input 的输入内容给到cover-view */
  blurInput(e) {
    this.setData({
      inputInfo: e.detail.value ? e.detail.value : '请输入您的地址'
    });
  },

  searchAddress_Choose(e) {  //点击选中搜索地址 
    this.goPrevPage(e); 
  },

  nearbyPois_Choose(e) {    //点击周边推荐地址
    this.goPrevPage(e);
  },

  goPrevPage(e) {
    let name = e.currentTarget.dataset.name;
    let address = e.currentTarget.dataset.address;
    let location = e.currentTarget.dataset.location;
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];
    if (prevPage.route == 'pages/addAddress/index') {
      prevPage.setData({
        'addressData.address': name,
        'addressData.position_road': address,
        'addressData.location': location
      })
      wx.navigateBack({
        delta: 1
      })
    };
    this.setData({
      choosedAddress: name
    })
  },

  getCurrentAddressMap() {
    var that = this;
    var myAmapFun = new amapFile.AMapWX({
      key: app.globalData.gaodeKey
    });
    myAmapFun.getRegeo({
      location: that.data.lonlat,
      iconPath: "/images/zxw/marker.png",
      iconWidth: 20,
      iconHeight: 32,
      success: function(res) {
        // console.log("mapdata", res);
        var marker = [{
          id: res[0].id,
          latitude: res[0].latitude,
          longitude: res[0].longitude,
          iconPath: res[0].iconPath,
          width: res[0].width,
          height: res[0].height,
        }];
        let pois = res[0].regeocodeData.pois;
        pois.forEach((item, index) => {
          item.distance = Number(item.distance).toFixed(1)
        })
        that.setData({
          markers: marker,
          latitude: res[0].latitude,
          longitude: res[0].longitude,
          lonlat: res[0].longitude + ',' + res[0].latitude,
          currentCity: res[0].regeocodeData.addressComponent.city,
          nearbyPois: pois
        });
      },
      fail: function(info) {
        wx.showModal({
          title: info.errMsg
        });
      }
    })
  },

  getSearchKeyPlace(keywords) {
    console.log("keywords", keywords);
    let that = this;
    let lonlat = that.data.lonlat;
    let city = that.data.currentCity;
    if (keywords) {
      let myAmapFun = new amapFile.AMapWX({
        key: app.globalData.gaodeKey
      });
      myAmapFun.getInputtips({
        keywords: keywords,
        location: lonlat,
        city: city,
        success: function(data) {
          if (data && data.tips) {
            (data.tips).forEach((item, index) => {
              let indexStart = (item.name).indexOf(that.data.inputInfo_realTime);
              let inputInfo_realTime_length = (that.data.inputInfo_realTime).length;
              if (indexStart > -1) {
                item.isNameInclude = true;
                let indexEnd = indexStart + inputInfo_realTime_length;
                item.name1 = (item.name).slice(0, indexStart);
                item.name2 = (item.name).slice(indexStart, indexEnd);
                item.name3 = (item.name).slice(indexEnd);
              } else {
                item.isNameInclude = false;
              }
            })
            that.setData({
              searchAddressData: (data.tips).slice(0, 10)
            });
          }
        }
      });
    } else {
      that.setData({
        searchAddressData: []
      });
    }
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