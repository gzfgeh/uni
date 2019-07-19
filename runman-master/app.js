//app.js
const common = require('/utils/common.js');
App({
  applyUpdate(func) {
    let that = this;
    wx.hideLoading();
    const updateManager = wx.getUpdateManager();
    updateManager.onCheckForUpdate((res) => {
      // 请求完新版本信息的回调
      if (!res.hasUpdate) {
        func(that);
      }
    })

    updateManager.onUpdateReady(() => {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        showCancel: false,
        success: (res) => {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate();
            func(that);
          }
        }
      })
    })

    updateManager.onUpdateFailed(() => {
      // 新的版本下载失败
      wx.showModal({
        title: '更新提示',
        content: '新版本下载失败',
        showCancel: false,
        success: (res)=> {
          if (res.confirm) {
            func(that);
          }
        }
      })
    })
  },

  onShow(options) {
    this.checkLogin();
    this.applyUpdate(function(that) {});
  },

  checkLogin() {   //判断是否已经登录，没登录跳转到登录页
    let that = this;
    let token = wx.getStorageSync('token');
    let userInfo = wx.getStorageSync('userInfo');
    that.globalData.userInfo.is_login = true;
    wx.checkSession({
      success(res) {
        if (!token || !userInfo) {
          that.globalData.userInfo.is_login = false;
          wx.reLaunch({
            url: '/pages/login/index',
          })
        } else{
        }
      },
      fail: function(res) {
        that.globalData.userInfo.is_login = false;
        wx.reLaunch({
          url: '/pages/login/index',
        })
      },
      complete(res) {
        common.checkToken(function () {    // 接口判断token过期
          that.globalData.userInfo.is_login = false;
          wx.reLaunch({
            url: '/pages/login/index',
          });
        }, that);
      }
    })
  },

  globalData: {
    userInfo: {},
    shareProfile: '跑腿runman',
    title: '小黑猫跑腿',
    apiVersion: '1.0',
    apiUrl: 'https://api.to-younger.com',
    // apiUrl: 'http://39.107.254.67:8181',
    imageUrl: 'http://image.to-younger.com',
    payPrivateKey: '94IB5HLMKALA1PYOQ941RDT7T82IPMR0',
    gaodeKey: 'f54e47c9fc9132a202b6589a375aadb5'
  }

})