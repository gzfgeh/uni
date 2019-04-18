<template>
<div class="container_wrap container-fill">
  
  <div class="wrap">
    <div class="info_title">
      <span class="circle active">1</span>
      <span style="margin:0rpx 12rpx 0rpx 10rpx;">服务费用</span>
      <span class="line active"></span>
      <span class="line"></span>
      <span class="circle">2</span>
      <span>交强险</span>
    </div>
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
          <span>服务费：{{global.monthly_expense}}元/月+{{global.mileage_expense}}元/公里</span>
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
      <input class="item_right" v-model="name" placeholder="请输入姓名"/>
    </div>
    <div class="item_wrap">
      <span class="item_text">手机号码：</span>
      <input class="item_right" v-model="mobile" placeholder="请输入手机号"/>
    </div>

    <div class="input_wrap">
      <div class="input_info">
        <span class="item_text">设备安装/保单寄送地址：</span>
        <span class="item_right" v-if="false">请输入详细地址</span>
      </div>
      <textarea type="text" v-model="address" class="address_input" placeholder="请输入详细地址"></textarea>
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
      <span class="bottom_money">¥400</span>
    </div>
    <span class="bottom_right" @tap="pay">立即支付</span>
  </div>
	
	
	<div class="modal-mask" v-if="showModal"></div>
      <div class="modal-dialog" v-if="showModal">
      <div class="modal-title">请确认微信支付是否已完成</div>
      <div class="modal-content" @tap="next">
        已完成支付
      </div>
      <div class="modal-bottom" @tap="hideModal">
        支付遇到问题，重新支付
      </div>
    </div>
  

</div>
</template>
<script>

import { BASE_IMAGE_URL,pay,H5login,quotationsToOrder} from "@/utils/api";
import weixin_sdk from '@/utils/weixin-jsapi.js';

export default {
  data () {
    return {
      global: {},
      name: '',
      mobile: '',
      address: '',
      items: [
        {name: '微信支付', icon_url: BASE_IMAGE_URL+'weixin_pay.png'}
      ],
      current: 0,
      openid: '',
      licheng_order_id: '',
      jiaoqiang_order_id: '',
			showModal: false
    }
  },

  methods: {
		hideModal: function(){
			this.showModal = false;
			uni.setStorageSync("showModal", false);
		},
    next () {
			uni.setStorageSync("showModal", false);
      wx.navigateTo({
        url: "../pay_one/pay_one?jiaoqiang_order_id="+this.jiaoqiang_order_id
      })
    },
		
		radioChange: function(e){
      console.log(e.mp.detail.value);
    },
		
		async quotationsToOrder(){
			// this.global.quotation_id
      let res = await quotationsToOrder(this.global.quotation_id);
      if(res.success){
        if(res.orders.length > 0){
          let licheng = res.orders[0];
          if(licheng.type == 1){
            this.licheng_order_id = licheng.id;
          };

          let jiaoqiang = res.orders[1];
          if(jiaoqiang.type == 2){
            this.jiaoqiang_order_id = jiaoqiang.id;
          }
        }
      }
    },
		
		async H5login(){
			let res = await H5login();
			if(res.code == 200){
				let token = res.data.token;
				console.log(token);
				if(token){
					uni.setStorageSync('token', token);
				}
				
			}
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
			
			let openid = uni.getStorageSync("openid");

      let params = {
        name: this.global.name,
        mobile: this.global.mobile,
        address: this.address,
				openid: openid,
        paytype: 1,
      };

      let res = await pay(this.licheng_order_id, params);
      if(res.success){
        //this.next();
        let result = res.result;
        console.log(result);
        console.log(result.timestamp);
				
				if(!openid){
					uni.showModal({
						title: '微信支付回调result.mweb_url',
						content: result.mweb_url,
						success: function (res) {
							if (res.confirm) {
								window.location.href = result.mweb_url;
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});

					// window.location.href = result.mweb_url;
					uni.setStorageSync("showModal", true);
					this.showModal = true;
					return;
				}
				
				weixin_sdk.config({
						debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
						appId: 'wx49aad3a138063b53', // 必填，企业号的唯一标识，此处填写企业号corpid
						timestamp: result.timestamp, // 必填，生成签名的时间戳
						nonceStr: result.nonceStr, // 必填，生成签名的随机串
						signature: result.paySign,// 必填，签名，见附录1
						jsApiList: ['getBrandWCPayRequest'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
				});
				
				weixin_sdk.ready(function(){
					weixin_sdk.checkJsApi({
						jsApiList: ['getBrandWCPayRequest'],
						success: res => {
							
							weixin_sdk.invoke(
							 'getBrandWCPayRequest', {
									 "appId" : 'wx49aad3a138063b53',       //公众号名称，由商户传入
									 "timeStamp":result.timestamp, //时间戳，自1970年以来的秒数     
									 "nonceStr" : result.nonceStr, //随机串     
									 "package" : result.package,     
									 "signType" :'MD5',  //微信签名方式：     
									 "paySign" : result.paySign     //微信签名 

							 },
							 function(res){ 
									 if(res.err_msg == "get_brand_wcpay_request:ok" ) {
											 wx.showToast({
													title: '支付成功',
													icon: 'none',
													duration: 1000
											 });
											 that.next();
									 }else{
										 wx.showToast({
												title: '支付失败',
												icon: 'none',
												duration: 1000
										});
									 }
							 }
						)
						},
						fail:function(res){
									console.log(res);
									wx.showToast({
											title: '支付失败',
											icon: 'none',
											duration: 1000
									});
							},
					})
				})
						
				weixin_sdk.error(function(err){
					wx.showToast({
							title: '支付失败',
							icon: 'none',
							duration: 1000
					});
				})


        
      }
    },
		
  },

  onLoad () {
    this.global = wx.getStorageSync("global");
    // this.getOpenid();
		this.name = this.global.name;
		this.mobile = this.global.mobile;
		console.log(weixin_sdk);
		this.quotationsToOrder();
  },
	
	onShow(){
		let showModal = uni.getStorageSync("showModal");
		this.showModal = showModal;
	}

}
</script>

<style >
.container_wrap {
  background-color: #F9F9F9;
  width: 100%;
  box-sizing: border-box;
}
.address_input{
  height: 100rpx;
  width: 100%;
  margin-top: 20rpx;
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
  padding: 0rpx 40rpx 20rpx;
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
}
.item_wrap{
  
	display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 30rpx 40rpx;
  height: 94rpx;
  box-sizing: border-box;
  border-bottom: 1px solid #f2f2f2;
  background-color: #FFFFFF;
}

.item_wrap .item_text{
    font-size: 28upx;
    color: #000;
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
		text-align: right;
  }

.info_title{
  color: rgba(0,0,0,0.7);
  font-size: 34rpx;
  background-color: #F9F9F9;
  height: 96rpx;
  border-bottom: 1px solid #f2f2f2;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 40rpx;
  box-sizing: border-box;
}

.info_title .circle{
    border-radius: 50%;
    width: 32rpx;
    height: 32rpx;
    text-align: center;
    line-height: 32rpx;
    background-color: rgba(0,0,0,0.1);
    color: #FFFFFF;
    font-size: 28rpx;
    margin-right: 8rpx;
    
  }
.info_title .active{
    background-color: #427DFF!important;
    margin-right: 0rpx!important;
  }	
	
	.info_title .line{
    width: 20rpx;
    height: 2rpx;
    background-color: #D6D6D6;
    margin-right: 12rpx;
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
  
	
	
.modal-mask {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: #000;
  opacity: 0.5;
  overflow: hidden;
  z-index: 9000;
  color: #fff;
}

.modal-dialog {
  width: 80%;
  overflow: hidden;
  position: fixed;
  top: 25%;
  left: 0;
  z-index: 9999;
  background: #ffffff;
  margin: 10%;
  border-radius: 12upx;
}

.modal-title {
  font-size: 34upx;
  color: rgba(0,0,0,0.8);
  text-align: center;
	height: 140upx;
	line-height: 140upx;
	border-bottom: 2upx solid #D8D9D9;
}

.modal-content {
  text-align: center;
	height: 94upx;
	line-height: 94upx;
	border-bottom: 2upx solid #D8D9D9;
  font-size: 28upx;
  color: #427DFF;
}

.modal-bottom{
	text-align: center;
	height: 92upx;
	line-height: 92upx;
  font-size: 28upx;
  color: rgba(0,0,0,0.6)
}



</style>