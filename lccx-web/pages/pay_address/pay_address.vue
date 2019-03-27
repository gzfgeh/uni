<template>
<div class="container_wrap container-fill">
  
  <div class="wrap">
    <div class="info_title">付款信息</div>
    <div class="item_wrap">
      <div>
        <span class="item_text">设备押金：</span>
        <span class="item_info">（可退还）</span>
      </div>
      <span class="item_right">200元</span>
    </div>

    <div class="item_wrap" style="height: 148rpx;">
      <div class="item_title">
        <span class="item_text">账户预存：</span>
        <div class="item_service">
          <img src="../../static/img/about.png" mode="widthFix">
          <span>服务费：40元/月+0.07元/公里</span>
        </div>
      </div>
      <span class="item_right">200元</span>
    </div>

    <!-- <div class="item_wrap">
      <span class="item_text">交强险：</span>
      <span class="item_right">200元</span>
    </div>

    <div class="item_wrap">
      <span class="item_text">车船税：</span>
      <span class="item_right">200元</span>
    </div> -->
    
  </div>

  <div class="info">收件信息</div>

  <div class="wrap" >
    <div class="item_wrap">
      <span class="item_text">姓名：</span>
      <span class="item_right">张三</span>
    </div>
    <div class="item_wrap">
      <span class="item_text">手机号码：</span>
      <span class="item_right">13671780212</span>
    </div>

    <div class="input_wrap">
      <div class="input_info">
        <span class="item_text">设备安装/保单寄送地址：</span>
        <span class="item_right">请输入详细地址</span>
      </div>
      <input type="text" v-model="address">
    </div>

  </div>
	
	<div class="info">支付方式</div>
  <radio-group @change="radioChange">
        <label class="item_wrap" v-for="(item, index) in items" :key="index" style="padding-left: 40upx; padding-right: 40upx;">
            <view class="radio_wrap uni-inline-item">
              <img :src="item.icon_url" >
              <span class="price">{{item.name}}</span>
            </view>
            <view>
                <radio  :checked="index === current" color="#427DFF"/>
            </view>
            
        </label>
    </radio-group>
		
  
  <div class="bottom_wrap">
    <div class="bottom_left">
      <span>实付</span>
      <span class="bottom_money">¥1370</span>
    </div>
    <span class="bottom_right" @tap="pay">立即支付</span>
  </div>
  

</div>
</template>
<script>

import { BASE_IMAGE_URL,pay} from "@/utils/api";
import weixin_sdk from '@/utils/weixin-jsapi.js';

export default {
  data () {
    return {
      address: "",
      global: {},
      items: [
        {name: '微信支付', icon_url: BASE_IMAGE_URL+'weixin_pay.png'},
        {name: '支付宝', icon_url: BASE_IMAGE_URL+'zhifubao.png'},
      ],
      current: 0,
    }
  },

  methods: {
    next () {
      wx.navigateTo({
        url: "../device_success/main?device_id="+this.device_id
      })
    },
		
		radioChange: function(e){
      console.log(e.mp.detail.value);
    },
		
		async pay(){
			let that = this;
      if(!this.address){
        wx.showToast({
          icon: 'none',
          title: '请输入地址',
          duration: 1000
        });
        return;
      }

      let params = {
        name: this.global.name,
        mobile: this.global.mobile,
        address: this.address,
        paytype: 2,
        openid: 'o2GL94yINZGhrswgyR0zPA7rUvnc'
      };

      let res = await pay(24, params);
      if(res.success){
        //this.next();
        let result = res.result;
        console.log(result);
        console.log(result.timestamp);
				// #ifdef H5
				
				weixin_sdk.ready(function(){
					
				})
				
				weixin_sdk.config({
						debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
						appId: '', // 必填，企业号的唯一标识，此处填写企业号corpid
						timestamp: result.timestamp, // 必填，生成签名的时间戳
						nonceStr: result.nonceStr, // 必填，生成签名的随机串
						signature: result.paySign,// 必填，签名，见附录1
						jsApiList: [] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
				});

				
				// #endif

        wx.chooseWXPay({
            'timestamp': result.timestamp,
            'nonceStr': result.nonceStr,
            'package': result.package,
            'signType': result.signType,
            'paySign': result.paySign,
            'success':function(res){
                console.log(res);
                wx.showToast({
                    title: '支付成功',
                    icon: 'none',
                    duration: 1000
                });
								that.next();
              },
              'fail':function(res){
                  console.log(res);
                  wx.showToast({
                      title: '支付失败',
                      icon: 'none',
                      duration: 1000
                  });
              },
              'complete': function(res){
                console.log(res);
              }
          })
      }
    },
		
  },

  onLoad () {
    this.global = wx.getStorageSync("global");
    // this.getOpenid();
		console.log(weixin_sdk);
  },

}
</script>

<style >
.container_wrap {
  background-color: #F9F9F9;
  width: 100%;
  box-sizing: border-box;
}

radio-group{
  height: 192rpx;
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
}

.radio_wrap img{
  width: 32rpx;
  height: 32rpx;
  margin-right: 10rpx;
}

.uni-center-item{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 16rpx 0rpx;
  }

.input_wrap{
  display: flex;
  flex-direction: column;
  
}
.input_wrap .input_info{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-top: 28upx;
  }
  
.input_wrap .input_info  .item_text{
	font-size: 28upx;
	color: #070707;
}

.input_wrap  input{
	margin: 20upx 0upx;
}
.info{
  font-size: 28upx;
  color: #b8b8b8;
  padding: 30upx 40upx 10upx;
}
.wrap{
  background-color: #FFFFFF;
  padding: 34upx 40upx 0upx;
}
.item_wrap{
  
	display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 30rpx 0rpx;
  height: 94rpx;
  box-sizing: border-box;
  border-bottom: 1px solid #f2f2f2;
  background-color: #FFFFFF;
}

.item_wrap .item_text{
    font-size: 28upx;
    color: #000;
		margin-bottom: 20upx;
  }
.item_wrap  .item_info{
    font-size: 28upx;
    color: #6E6E6E;
  }
  
.item_wrap  .item_title{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

.item_wrap  .item_service{
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 24upx;
    color: #6E6E6E;
  }

.item_wrap  .item_service img{
	width: 26upx;
	height: 26upx;
}


.item_right{
    font-size: 28upx;
    color: #6E6E6E;
  }

.info_title{
  color: #000;
  font-size: 52upx;
  background-color: #FFFFFF;
  padding-bottom: 40upx;
  border-bottom: 1px solid #f2f2f2;
}

.content_wrap{
  width: 90%;
  margin: -180upx 5% 0upx;
  height: 332upx;
  background-color: #FFFFFF;
  border-radius: 20upx;
  box-shadow: 0upx 0upx 20upx 0upx #EAEAEA;
  padding: 0upx 16upx;
  box-sizing: border-box;
  position: relative;
  z-index: 1;
}

.content_item{
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #000000;
  font-size: 34upx;
  height: 166upx;
  padding: 0upx 24upx;
  
  .text{
    color: #427DFF;
    font-size: 24upx;
  }
}

.row_item{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.arraw{
    width: 18upx;
    height: 18upx;
    border-top: 6upx solid #D9D9D9;
    border-right: 6upx solid #D9D9D9;
    transform: rotate(45deg);
    margin-left: 10upx;
  }

  .place-holder{
  font-size: 28upx;
  color: #b2b2b2;
}

.button{
  margin: 40upx 5%;
  width: 90%;
  height: 94upx;
    line-height: 94upx;
    color: #ffffff;
    background-color: #427DFF;
    border-radius: 10upx;
    text-align: center;
    position: absolute;
    bottom: 0upx;
}

.bottom_wrap{
  width: 100%;
  position: fixed;
  bottom: 0upx;
  left: 0upx;
  border-top: 1px solid #CCCCCC;
  height: 120upx;
  line-height: 120upx;
  color: #000000;
  font-size: 32upx;
  background-color: #FFFFFF;
  display: flex;
  flex-direction: row;
  
}

.bottom_wrap .bottom_left{
    padding-left: 44upx;
    flex: 2;
  }
 .bottom_wrap .bottom_right{
    flex: 1;
    background-color: #427DFF;
    color: #FFFFFF;
    font-size: 30upx;
    text-align: center;
  }
 .bottom_wrap .bottom_money{
    color: #f00;
	margin-left: 10upx;
  }
  
</style>