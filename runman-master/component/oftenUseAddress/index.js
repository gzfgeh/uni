// pages/component/oftenUseAddress/index.js
const app = getApp();
import Notify from '../../dist/notify/notify';
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    addressOftenUse_show: { //控制弹窗显示
      type: Boolean,
      value: false
    },
    originFrom: {
      type: String,
      value: ''
    },
    // 首页选择地址
    placeIndex1: {
      type: Number,
      value: 0
    },
    placeIndex2: {
      type: Number,
      value: 0
    },
    // 确认订单页选择地址
    placeIndex: {
      type: Number,
      value: 0
    },
    // 帮我买确认订单页常用地址类型
    originType: {
      type: String,
      value: ''
    },
    

  },

  /**
   * 组件的初始数据
   */
  data: {
    addressListData: [] //请求获取常用地址数据
  },

  observers: { //监听弹框显示变化,出现时加载常用地址数据
    'addressOftenUse_show': function(addressOftenUse_show) {
      if (addressOftenUse_show) {
        this.getAddressList();
      };
      // console.log('addressOftenUse_show', addressOftenUse_show);
    }
  },

  /* 组件的方法列表 */
  methods: {
    getAddressList() {
      let that = this;
      wx.request({
        url: app.globalData.apiUrl + '/run_user_address/list',
        data: {
          token: wx.getStorageSync('token'),
          is_often: 1
        },
        method: 'GET',
        dataType: 'json',
        responseType: 'text',
        success: function(res) {
          if (res.data.code == 0) {
            let data = res.data.data;
            data.forEach((item) => {
              item.location = item.longitude + ',' + item.latitude,
              item.checked = false
            });
            that.setData({
              addressListData: data
            })
          } else {
            Notify(res.data.code + res.data.message);
          }
        }
      })
    },
    addressOftenUse_onClose() {    //组件消失
      this.triggerEvent("addressOftenUse_show_close2");
    },
    oftenUse_choose(e) {    //点击选择地址传回数据
      let index = e.currentTarget.dataset.index;
      let originFrom = this.data.originFrom;
      let choosedaddress = this.data.addressListData[index];
      let placeIndex1 = 0, placeIndex2 = 0, placeIndex = 0, originType='', data = {};

      this.data.addressListData[index].checked = true;  //点击常用地址按钮图片属性变为勾选
      this.setData({
        addressListData: this.data.addressListData
      });
      if (originFrom == 'isIndexGetPlace'){
        placeIndex1 = this.data.placeIndex1;
        placeIndex2 = this.data.placeIndex2;
        data = {
          placeIndex1: placeIndex1,
          placeIndex2: placeIndex2,
          choosedaddress: choosedaddress
        };
      } else if (originFrom == 'isConfirmOrder') {
        placeIndex = this.data.placeIndex;
        data = {
          placeIndex: placeIndex,
          choosedaddress: choosedaddress
        };
      } else if (originFrom == 'isHelpMeBuy'){
        originType = this.data.originType;
        data = {
          originType: originType,
          choosedaddress: choosedaddress
        }
      };
      setTimeout(()=>{
        this.triggerEvent("oftenUse_choosed", data);
      },300);
    }

  }
})