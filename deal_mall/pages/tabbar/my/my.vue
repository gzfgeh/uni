<template>
	<view class="content">
		
		<div class="head_wrap">
			<img src="https://bay.2donghua.com/web/statics/images/user-center/img-user-bg.png" mode="aspectFill" class="head_bg">
			<div class="info_wrap row_between">
				<div class="user_wrap row">
					<img :src="avatarUrl" alt="">
					<span>{{nickName}}</span>
				</div>
				
				<div class="address_wrap row" @click="goToAddress">
					<img src="https://bay.2donghua.com/web/statics/wxapp/images/icon-address.png" alt="">
					<span>收货地址</span>
				</div>
			</div>
		</div>
		
		<div class="my_order_text">我的订单</div>
		
		<div class="row_between func_wrap">
			<div class="col_center func_item" @click="goToInOrderList(0)">
				<img src="https://bay.2donghua.com/web/statics/images/user-center/icon-order-0.png" mode="widthFix">
				<span>待发货</span>
				<!-- <span class="num">2</span> -->
			</div>
			
			<div class="col_center func_item" @click="goToInOrderList(1)">
				<img src="https://bay.2donghua.com/web/statics/images/user-center/icon-order-2.png" mode="widthFix">
				<span>待收货</span>
				<!-- <span class="num">1</span> -->
			</div>
			
			<div class="col_center func_item" @click="goToInOrderList(2)">
				<img src="https://bay.2donghua.com/web/statics/images/user-center/icon-order-3.png" mode="widthFix">
				<span>已完成</span>
				<!-- <span class="num">12</span> -->
			</div>
			
			<!-- <div class="col_center func_item" @click="goToOrderList(3)">
				<img src="https://bay.2donghua.com/web/statics/images/user-center/icon-order-4.png" mode="widthFix">
				<span>售后</span>
				<span class="num">2</span>
			</div> -->
		</div>
		
		<div class=" bottom_item_wrap"  @click="goToRecordList">
			<div class="row_between bottom_item">
				<img src="https://bay.2donghua.com/web/statics/images/user-center/icon-about-us.png" class="icon" mode="widthFix">
				<span>推荐记录</span>
				<span style="flex: 1;"></span>
				<span class="arraw"></span>
				
			</div>
		</div>
		
		<div class=" bottom_item_wrap" @click="goToOrderList(0)">
			<div class="row_between bottom_item">
				<img src="https://bay.2donghua.com/web/statics/images/user-center/icon-user-mch.png" class="icon" mode="widthFix">
				<span>出货订单</span>
				<span style="flex: 1;"></span>
				<span class="arraw"></span>
			</div>
		</div>
		
		<div class=" bottom_item_wrap" @click="callPhone">
			<div class="row_between bottom_item uni-navigate-right">
				<img src="https://bay.2donghua.com/web/statics/images/user-center/icon-user-kf.png" class="icon" mode="widthFix">
				<span>联系客服</span>
				<span style="flex: 1;"></span>
				<span class="arraw"></span>
			</div>
		</div>
		
		<!-- <div class=" bottom_item_wrap" @click="goToAddress">
			<div class="row_between bottom_item uni-navigate-right">
				<img src="https://bay.2donghua.com/web/statics/images/user-center/icon-user-dz.png" class="icon" mode="widthFix">
				<span>收货地址</span>
				<span style="flex: 1;"></span>
				<span class="arraw"></span>
			</div>
		</div> -->
		
		<div class=" bottom_item_wrap" @click="goToAboutUs">
			<div class="row_between bottom_item uni-navigate-right">
				<img src="https://bay.2donghua.com/web/statics/images/user-center/icon-user-bangding.png" class="icon" mode="widthFix">
				<span>关于我们</span>
				<span style="flex: 1;"></span>
				<span class="arraw"></span>
			</div>
		</div>
		
		<div class=" bottom_item_wrap" @click="goToFix" style="border-bottom: 20upx solid #E3E3E3;">
			<div class="row_between bottom_item uni-navigate-right">
				<img src="https://bay.2donghua.com/web/statics/images/user-center/icon-user-bangding.png" class="icon" mode="widthFix">
				<span>报修</span>
				<span style="flex: 1;"></span>
				<span class="arraw"></span>
			</div>
		</div>
		
		<!-- <div class=" bottom_item_wrap" @click="goToComplain" style="border-bottom: 20upx solid #E3E3E3;">
			<div class="row_between bottom_item uni-navigate-right">
				<img src="https://bay.2donghua.com/web/statics/images/user-center/icon-order-4.png" class="icon" mode="widthFix">
				<span>售后</span>
				<span style="flex: 1;"></span>
				<span class="arraw"></span>
			</div>
		</div> -->
		
		
	</view>
</template>

<script>
	import { BASE_IMAGE_URL,getConfig } from '@/utils/api'
	
	export default {
		data() {
			return {
				avatarUrl: "",
				nickName: "",
				phone: "17373349812"
			}
		},
		onLoad() {
			this.getConfig();
		},
		onShow() {
			let userInfo = uni.getStorageSync("userInfo");
			if(userInfo){
				this.avatarUrl = userInfo.m_avatar;
				this.nickName = userInfo.m_name;
			}
			
		},
		methods: {
			async getConfig(){
				let res = await getConfig();
				if(res.code == 1000){
					res.data.map((item) => {
						if(item.i_name == "客服电话"){
							this.phone = item.i_info;
						}
					})
				}
			},
			callPhone: function(){
				console.log(this.phone);
				uni.makePhoneCall({
					phoneNumber:this.phone,
					success: () => {
						console.log("成功拨打电话")
					}
				})
			},
			goToAboutUs: function(){
				uni.navigateTo({
					url: '/pages/about_us/about_us'
				});
			},
			goToFix: function(){
				uni.navigateTo({
					url: '/pages/fix_page/fix_page'
				});
			},
			goToRecordList: function(){
				let userInfo = uni.getStorageSync("userInfo");
				if(!userInfo){
					uni.navigateTo({
						url: '/pages/login/login'
					});
					return;
				}
				uni.navigateTo({
					url: '/pages/record_list/record_list'
				});
			},
			
			goToAddress: function(){
				let userInfo = uni.getStorageSync("userInfo");
				if(!userInfo){
					uni.navigateTo({
						url: '/pages/login/login'
					});
					return;
				}
				uni.navigateTo({
					url: '/pages/address_list/address_list?my=1'
				});
			},
			goToInOrderList: function(index){
				let userInfo = uni.getStorageSync("userInfo");
				if(!userInfo){
					uni.navigateTo({
						url: '/pages/login/login'
					});
					return;
				}
				
				if(userInfo.m_role == 0){
					//游客
					uni.showModal({
						title: "提示",
						content: "无权浏览，如需使用请联系客服开通权限",
						showCancel: false,
						success(res) {}
					})
				}else{
					uni.navigateTo({
						url: '/pages/in_order_list/in_order_list?index='+index
					});
				}
			},
			goToOrderList: function(index){
				let userInfo = uni.getStorageSync("userInfo");
				if(!userInfo){
					uni.navigateTo({
						url: '/pages/login/login'
					});
					return;
				}
				
				if(userInfo.m_role == 0){
					//游客
					uni.showModal({
						title: "提示",
						content: "无权浏览，如需使用请联系客服开通权限",
						showCancel: false,
						success(res) {}
					})
				}else{
					uni.navigateTo({
						url: '/pages/order_list/order_list?index='+index
					});
				}
			}
		}
	}
</script>

<style>
	.head_wrap{height: 348upx; width: 100%; position: relative;color: #fff;}
	.head_wrap .head_bg{position: absolute;top:0upx; left: 0upx; width: 100%; height: 100%;z-index: -1;}
	.info_wrap{height: 348upx; width: 100%; color: #FFFFFF; font-size: 30upx;}
	.user_wrap{margin-left: 10upx;}
	.user_wrap img{width: 130upx; height: 130upx; margin-right: 20upx; border-radius: 50%;border:5upx solid #FFF;}
	
	.address_wrap{background: #FF4544; color: #FFF; padding-right: 30upx; border-radius: 999upx 0upx 0upx 999upx;font-size: 34upx;}
	.address_wrap img{width: 44upx; height: 44upx; margin:16upx; }
	
	.my_order_text{padding: 24upx; border-bottom: 1upx solid #E3E3E3;}
	
	.func_wrap{width: 100%; border-bottom: 20upx solid #E3E3E3;}
	.func_wrap img{width: 60upx;margin-bottom: 10upx;}
	.func_item{color: #333333; font-size: 28upx; height: 168upx; flex:1; position: relative;}
	.func_item .num{position: absolute;top: 20upx; right: 40upx; display: inline-block; width: 36upx; height: 36upx; border-radius: 50%; line-height: 36upx; text-align: center;color: #fff; background: #FF334B;font-size: 24upx;}
	
	.bottom_item_wrap{padding-left: 40upx;width: 100%; box-sizing: border-box;}
	.bottom_item{color: #333333; font-size: 32upx; height: 116upx; border-bottom: 2upx solid #E3E3E3; padding-right: 30upx;}
	.bottom_item .icon{width: 50upx; margin-right: 24upx;}
	
	
</style>
