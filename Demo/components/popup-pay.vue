<template>
	<view>
		<view v-show="show" :style="{ top: offsetTop + 'px' }" class="uni-mask" @click="hide" @touchmove.stop.prevent="moveHandle" />
		<view v-show="show" :class="'uni-popup-' + position + ' ' + 'uni-popup-' + mode" class="uni-popup">
			
			<view class="title-col" >请选择支付方式</view>
			<text class="close-col" @click="hide">×</text>
			<div class="money-col">
				<div class="left">应付金额:<span class="money">￥{{money}}</span></div>
				<div class="right">请在30分钟内完成支付</div>
			</div>
			
			<view class="pay-list uni-list">
			<radio-group @change="radioChange">
				<label class="radio-label uni-list-cell"  v-for="(item, index) in items" :key="item.value">
					<view class="pay-row">
						<div class="left-col">
						<img class="img" v-bind:src="item.img" mode="widthFix" />
						{{item.name}}
						</div>
						<radio class="radio-col" :value="item.value" :checked="index === current" />
					</view>
				</label>
			</radio-group>
		</view>
		
		<div class="pay-btn" @tap="pay()">
			支付
		</div>
			
			
			<slot />
			<view v-if="position === 'middle' && mode === 'insert'" :class="{
          'uni-close-bottom': buttonMode === 'bottom',
          'uni-close-right': buttonMode === 'right'
        }" class=" uni-icon uni-icon-close" @click="closeMask" />
		</view>
	</view>
</template>

<script>
	import { BASE_IMAGE_URL,expressPrepareForAlipay,expressUnifiedOrder,takeout_order_alipay,takeout_order_wxpay,
				water_order_wxpay,water_order_alipay, mall_order_wxpay, mall_alipay_app,member_alipay_app,member_order_wxpay} from '@/utils/api'
	// #ifdef H5
	import weixin_sdk from '../utils/weixin-jsapi.js';
	// #endif
	
	export default {
		name: 'UniPopup',
		props: {
			/**
			 * 页面显示
			 */
			show: {
				type: Boolean,
				default: false
			},
			/**
			 * 对齐方式
			 */
			position: {
				type: String,
				// top - 顶部， middle - 居中, bottom - 底部
				default: 'middle'
			},
			/**
			 * 显示模式
			 */
			mode: {
				type: String,
				default: 'insert'
			},
			/**
			 * 额外信息
			 */
			money: {
				type: String,
				default: ''
			},
			
			/**
			 * 额外信息
			 */
			orderID: {
				type: String,
				default: ''
			},
			
			payWay: {
				type: String,
				default: ''
			},
			orderSN: {
				type: String,
				default: ''
			},
			/**
			 * h5遮罩是否到顶
			 */
			h5Top: {
				type: Boolean,
				default: false
			},
			buttonMode: {
				type: String,
				default: 'bottom'
			}
		},
		data() {
			return {
				current:0,
				payType:"wxpay",
				offsetTop: 0,
				items: [],
				trade_type: 'JSAPI'
			}
		},
		watch: {
			h5Top(newVal) {
				if (newVal) {
					this.offsetTop = 44
				} else {
					this.offsetTop = 0
				}
			}
		},
		created() {
			
			console.log("支付");
			this.items = [
					{
						value: 'wxpay',
						img:'/static/img/payWay_03.jpg',
						name: '微信'
					}
			];
			
			
		    // #ifdef APP-PLUS
			this.trade_type = "APP";
			this.items = [
					{
						value: 'wxpay',
						img:'/static/img/payWay_03.jpg',
						name: '微信'
					},
					{
						value: 'alipay',
						img:'/static/img/payWay_06.jpg',
						name: '支付宝'
					}
					// ,
					// {
					// 	value: 'yinlian',
					// 	img:'../../static/img/payWay_07.jpg',
					// 	name: '云闪付'
					// }
				];
			// #endif	
			
			// #ifdef APP-PLUS
            uni.getProvider({
                service: "payment",
                success: (e) => {
                    console.log("payment success:" + JSON.stringify(e));
                    let providerList = [];
                    e.provider.map((value) => {
                        switch (value) {
                            case 'alipay':
                                providerList.push({
                                    name: '支付宝',
                                    id: value,
                                    loading: false
                                });
                                break;
                            case 'wxpay':
                                providerList.push({
                                    name: '微信',
                                    id: value,
                                    loading: false
                                });
                                break;
                            default:
                                break;
                        }
                    })
                    this.providerList = providerList;
                },
                fail: (e) => {
                    console.log("获取支付通道失败：", e);
                }
            });
            // #endif
			
			let offsetTop = 0
			// #ifdef H5
			if (!this.h5Top) {
				offsetTop = 44
			} else {
				offsetTop = 0
			}
			// #endif
			this.offsetTop = offsetTop
		},
		methods: {
			async pay(){
				
				let userInfo = uni.getStorageSync("userInfo");
				
				console.log(this.payType);
				
				if(this.payType=="wxpay")
				{
					var param = {};
					let res = {};
					
					if(this.payWay=="0"||this.payWay=="-1"){
						param={
							out_trade_no:new Date().getTime(),
							body:"快递下单",
							total_fee:this.money,
							trade_type:this.trade_type,
							product_id:"express",
							price:this.money,
							paymentMoney:this.money,
							orderID:this.orderID,
							userID:userInfo.userID,
							isBuChaJia:0,
							openid: uni.getStorageSync("openid")
						};
						res = await expressUnifiedOrder(param);
					}else if(this.payWay=="1"){
						param={
							out_trade_no:new Date().getTime(),
							body:"外卖下单",
							total_fee:this.money,
							trade_type:this.trade_type,
							price:this.money,
							orderID:this.orderID,
							userID:userInfo.userID,
							openid: uni.getStorageSync("openid")
						};
						res = await takeout_order_wxpay(param);
					}else if(this.payWay == '2'){
						param={
							out_trade_no:new Date().getTime(),
							body:"饮水服务下单",
							total_fee:this.money,
							trade_type:this.trade_type,
							price:this.money,
							orderID:this.orderID,
							userID:userInfo.userID,
							openid: uni.getStorageSync("openid")
						};
						res = await water_order_wxpay(param);
					}else if(this.payWay == '3'){
						param={
							out_trade_no:new Date().getTime(),
							body:"商城服务下单",
							total_fee:this.money,
							trade_type:this.trade_type,
							price:this.money,
							orderID:this.orderID,
							userID:userInfo.userID,
							openid: uni.getStorageSync("openid")
						};
						console.log(param);
						res = await mall_order_wxpay(param);
					}else if(this.payWay == '4'){
						param={
							out_trade_no:new Date().getTime(),
							body:"商城小商品下单",
							total_fee:this.money,
							trade_type:this.trade_type,
							price:this.money,
							orderID:this.orderID,
							userID:userInfo.userID,
							openid: uni.getStorageSync("openid")
						};
						console.log(param);
						res = await mall_order_wxpay(param);
					}else if(this.payWay == '5'){
						param={
							out_trade_no:new Date().getTime(),
							body:"购买楼服宝VIP下单",
							total_fee:this.money,
							trade_type:this.trade_type,
							price:this.money,
							orderID:this.orderID,
							userID:userInfo.userID,
							openid: uni.getStorageSync("openid")
						};
						console.log(param);
						res = await member_order_wxpay(param);
					}
					
					console.log(res);
					
					if(res.status == 1){
						
						this.payNow(res.data,this.payType);
					}
					else
					{
						uni.showToast({
						  icon: 'none',
						  title: res.message,
						  duration: 6000
						});	
					}
					
				}
				else if(this.payType=="alipay")
				{
					var param = {};
					let res = {};
					
					if(this.payWay=="0"||this.payWay=="-1"){
						//快递
						param={
							price:this.money,
							paymentMoney:this.money,
							orderID:this.orderID,
							orderSN:this.orderSN,
							userID:userInfo.userID,
							isBuChaJia:0
						};
						res = await expressPrepareForAlipay(param);
					}else if(this.payWay=="1"){
						//外卖
						param={
							orderID:this.orderID
						};
						res = await takeout_order_alipay(param);
					}else if(this.payWay == "2"){
						//个人饮水服务
						param={
							orderID:this.orderID
						};
						res = await water_order_alipay(param);
					}else if(this.payWay == '3'){
						//商城支付
						param={
							orderID: this.orderID
						};
						res = await mall_alipay_app(param);
					}else if(this.payWay == '4'){
						//商城小商品支付
						param={
							orderID: this.orderID
						};
						res = await mall_alipay_app(param);
					}else if(this.payWay == '5'){
						//vip支付
						param={
							orderID: this.orderID
						};
						res = await member_alipay_app(param);
					}
					
					console.log(res);
					
					if(res.status == 1){
						
						this.payNow(res.data,this.payType);
						
					}
					else
					{
						uni.showToast({
						  icon: 'none',
						  title: res.message,
						  duration: 6000
						});	
					}
				}
				
			},
			
			payNow(payData,payType)
			{
				 console.log("支付类型："+payType);
				 
				 console.log(this.payWay);
				 
				 // #ifdef APP-PLUS
				 var payWayValue=this.payWay;
				 var orderID = this.orderID;
				 
				 console.log("支付数据："+JSON.stringify(payData));
				 
				 uni.requestPayment({
					provider: payType,
					orderInfo: payData,
					success: function (res)
					{
						console.log('success:' + JSON.stringify(res));
						
						if(payWayValue=="0")
						{
							uni.redirectTo({
								url: '/pages/express_list/express_list'
							});
						}else if(payWayValue == 1){
							//外卖
							uni.redirectTo({
								url: '/pages/wai_mai_detail/wai_mai_detail?orderID='+orderID
							});
						}else if(payWayValue == 2){
							//饮水
							uni.redirectTo({
								url: '/pages/service_order_list/service_order_list'
							});
						}else if(payWayValue == 3){
							//商城
							uni.redirectTo({
								url: '/pages/mall_order/mall_order'
							});
						}else if(payWayValue == 4){
							//商城 小商品
							uni.redirectTo({
								url: '/pages/mall_goods_list/mall_goods_list'
							});
						}else if(payWayValue == 5){
							//vip  订单
							uni.redirectTo({
								url: '/pages/tabbar/my/my'
							});
						}
						
					},
					fail: function (err)
					{
						console.log('fail:' + JSON.stringify(err));
					}
				});
				// #endif
				
				let result = payData;
				console.log(weixin_sdk);
				
				// #ifdef H5
				weixin_sdk.config({
						debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
						appId: 'wx1ba1d76a9ed0cdc8', // 必填，企业号的唯一标识，此处填写企业号corpid
						timestamp: result.timeStamp, // 必填，生成签名的时间戳
						nonceStr: result.nonceStr, // 必填，生成签名的随机串
						signature: result.sign,// 必填，签名，见附录1
						jsApiList: ['getBrandWCPayRequest'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
				});
				
				weixin_sdk.ready(function(){
					weixin_sdk.checkJsApi({
						jsApiList: ['getBrandWCPayRequest'],
						success: res => {
							
							weixin_sdk.invoke(
							 'getBrandWCPayRequest', {
									 "appId" : 'wx1ba1d76a9ed0cdc8',       //公众号名称，由商户传入
									 "timeStamp":result.timeStamp, //时间戳，自1970年以来的秒数     
									 "nonceStr" : result.nonceStr, //随机串     
									 "package" : result.package,     
									 "signType" :'MD5',  //微信签名方式：     
									 "paySign" : result.sign     //微信签名 

							 },
							 function(res){ 
									 if(res.err_msg == "get_brand_wcpay_request:ok" ) {
											 wx.showToast({
													title: '支付成功',
													icon: 'none',
													duration: 1000
											 });
											 if(payWayValue=="0")
												{
													uni.redirectTo({
														url: '/pages/express_list/express_list'
													});
												}else if(payWayValue == 1){
													//外卖
													uni.redirectTo({
														url: '/pages/wai_mai_detail/wai_mai_detail?orderID='+orderID
													});
												}else if(payWayValue == 2){
													//饮水
													uni.redirectTo({
														url: '/pages/service_order_list/service_order_list'
													});
												}else if(payWayValue == 3){
													//商城
													uni.redirectTo({
														url: '/pages/mall_order/mall_order'
													});
												}else if(payWayValue == 4){
													//商城 小商品
													uni.redirectTo({
														url: '/pages/mall_goods_list/mall_goods_list'
													});
												}else if(payWayValue == 5){
													//vip  订单
													uni.redirectTo({
														url: '/pages/tabbar/my/my'
													});
												}
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

				// #endif
			},
			radioChange(e)
			{
				console.log(e);
				this.payType=e.detail.value;
			},
			hide() {
				if (this.mode === 'insert' && this.position === 'middle') return
				this.$emit('hidePopup');
				var payWayValue=this.payWay;
				if(payWayValue=="0")
				{
					uni.redirectTo({
						url: '/pages/express_list/express_list'
					});
				}else if(payWayValue == 1){
					//外卖
					uni.redirectTo({
						url: '/pages/wai_mai_detail/wai_mai_detail?orderID='+orderID
					});
				}else if(payWayValue == 2){
					//饮水
					uni.redirectTo({
						url: '/pages/service_order_list/service_order_list'
					});
				}else if(payWayValue == 3){
					//商城
					uni.redirectTo({
						url: '/pages/mall_order/mall_order'
					});
				}else if(payWayValue == 4){
					//商城 小商品
					uni.redirectTo({
						url: '/pages/mall_goods_list/mall_goods_list'
					});
				}else if(payWayValue == 5){
					//vip  订单
					uni.redirectTo({
						url: '/pages/tabbar/my/my'
					});
				}
				
			},
			closeMask() {
				if (this.mode === 'insert') {
					this.$emit('hidePopup')
				}
			},
			moveHandle() {}
		}
	}
</script>
<style>
	.uni-popup .radio-label{display: block;}
	.uni-popup .pay-btn{line-height:80upx;margin-top:20upx;display: block;width:100%!important;
	background:#007aff;color:#fff;border-radius:8upx;}
	
	.uni-popup .pay-list .pay-row{width:100%;height:88upx;line-height:88upx;border-bottom:1px solid #eee;position: relative;text-align:left;}
	.uni-popup .pay-list .pay-row .left-col{position: absolute;left:0;top:0upx;width:200upx;height:88upx;line-height:88upx;}
	
	.uni-popup .pay-list{font-size:32upx;}
	
	.uni-popup .pay-list .pay-row .radio-col{position: absolute;right:0;top:0upx;}
	
	.uni-popup .pay-list .img{width:45upx;height:42upx;position:relative;top:8upx;margin-right:12upx;}
	
	.uni-popup{padding:20upx 30upx;box-sizing:border-box;}
	
	.uni-popup .title-col{text-align:left;font-size:28upx;height:60upx;line-height: 60upx;}
	
	.uni-popup .close-col{font-size:50upx;position:absolute;right:30upx;top:-10upx;color:#666;}
	.uni-popup .money-col{font-size:30upx;height:60upx;padding-bottom:30upx;border-bottom:1px solid #eee;position:relative;}
	.uni-popup .money-col .money{color:#FF5269;font-size:32upx;}
	
	.uni-popup .money-col .left{position: absolute;left:0upx;top:4upx;line-height:normal;padding:0;}
	
	.uni-popup .money-col .right{position:absolute;right:20upx;color:#999;font-size:24upx;top:8upx;line-height: normal;}
	
	.uni-mask {
		position: fixed;
		z-index: 998;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: rgba(0, 0, 0, 0.3);
	}

	.uni-popup {
		position: fixed;
		z-index: 999;
		background-color: #ffffff;
	}

	.uni-popup-middle {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.uni-popup-middle.uni-popup-insert {
		min-width: 380upx;
		min-height: 380upx;
		max-width: 100%;
		max-height: 80%;
		transform: translate(-50%, -65%);
		background: none;
		box-shadow: none;
	}

	.uni-popup-middle.uni-popup-fixed {
		border-radius: 10upx;
		padding: 30upx;
	}

	.uni-close-bottom,
	.uni-close-right {
		position: absolute;
		bottom: -180upx;
		text-align: center;
		border-radius: 50%;
		color: #f5f5f5;
		font-size: 60upx;
		font-weight: bold;
		opacity: 0.8;
		z-index: -1;
	}

	.uni-close-bottom {
		margin: auto;
		left: 0;
		right: 0;
	}

	.uni-close-right {
		right: -60upx;
		top: -80upx;
	}

	.uni-close-bottom:after {
		content: '';
		position: absolute;
		width: 0px;
		border: 1px #f5f5f5 solid;
		top: -200upx;
		bottom: 56upx;
		left: 50%;
		transform: translate(-50%, -0%);
		opacity: 0.8;
	}

	.uni-popup-top {
		top: 0;
		left: 0;
		width: 100%;
		height: 100upx;
		line-height: 100upx;
		text-align: center;
	}

	.uni-popup-bottom {
		left: 0;
		bottom: 0;
		width: 100%;
		min-height: 100upx;
		line-height: 100upx;
		text-align: center;
	}
</style>