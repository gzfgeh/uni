<template>
	<view class="content">
		
		<div class="head_wrap" @click="goToVip" :style="[{'padding-top': (statusBarHeight)}, {'margin-bottom':(bottomValue)}]">
			<img :src="userBg" mode="aspectFill" class="vip_img" :style="{'top': (vipTop)}">
			<div class="head_img_wrap">
				<img :src="userImage" mode="aspectFill">
				<span>{{userName}}</span>
			</div>
		</div>
		
		<div class="row_between func_wrap">
			<navigator class="col_center func_item" @click="goToExpressList">
				<img src="../../../static/img/wode_order.png" mode="widthFix">
				<span>订单</span>
			</navigator>
			
			<navigator class="col_center func_item" @click="goToExpressOrderList">
				<img src="../../../static/img/wode_kuaidi.png" mode="widthFix">
				<span>快递</span>
			</navigator>
			
			<navigator class="col_center func_item" @click="goToCouponList">
				<img src="../../../static/img/wode_coupon.png" mode="widthFix">
				<span>卡券</span>
			</navigator>
			
			<navigator class="col_center func_item" @click="goToFavList">
				<img src="../../../static/img/wode_gif.png" mode="widthFix">
				<span>收藏</span>
			</navigator>
		</div>
		
		<navigator class=" bottom_item_wrap" style="margin-top: 30upx;" @click="goToSetting">
			<div class="row_between bottom_item" style="border-top: 2upx solid #F3F3F3;">
				<img src="../../../static/img/my_geren_icon.png" class="icon" mode="aspectFill" style="height: 30upx;width: 45upx;">
				<span>个人资料</span>
				<span style="flex: 1;"></span>
				<span class="arraw"></span>
			</div>
		</navigator>
		
		<navigator class=" bottom_item_wrap" @click="goToAddress">
			<div class="row_between bottom_item">
				<img src="../../../static/img/wode_location_icon.png" class="icon" mode="aspectFill" style="height: 44upx; width: 36upx;">
				<span>我的地址</span>
				<span style="flex: 1;"></span>
				<span class="arraw"></span>
			</div>
		</navigator>
		
		<navigator class=" bottom_item_wrap" @click="callPhone">
			<div class="row_between bottom_item">
				<img src="../../../static/img/wode_kefu.png" class="icon" mode="aspectFill" style="height: 40upx; width: 40upx;">
				<span>帮助</span>
				<span style="flex: 1;"></span>
				<span>400-888-8808</span>
				<span class="arraw"></span>
			</div>
		</navigator>
		
		<navigator class=" bottom_item_wrap" @click="goToComplain">
			<div class="row_between bottom_item uni-navigate-right">
				<img src="../../../static/img/wode_fuli.png" class="icon" mode="aspectFill" style="height: 38upx; width: 38upx;">
				<span>反馈</span>
				<span style="flex: 1;"></span>
				<span class="arraw"></span>
			</div>
		</navigator>
		
		<navigator class=" bottom_item_wrap" @click="goToAboutUs">
			<div class="row_between bottom_item uni-navigate-right">
				<img src="../../../static/img/wode_tousu.png" class="icon" mode="aspectFill" style="height: 42upx; width: 42upx;">
				<span>关于</span>
				<span style="flex: 1;"></span>
				<span class="arraw"></span>
			</div>
		</navigator>
	</view>
</template>

<script>
	import { BASE_IMAGE_URL,getuserInfobyuserID,is_member } from '@/utils/api'
	
	export default {
		data() {
			return {
				statusBarHeight: 0,
				vipTop: 0,
				userName: '未登录',
				userImage: '../../../static/img/mtyou_icon.png',
				bottomValue: "80upx",
				userBg: '../../../static/img/my_bg.png'
			}
		},
		onLoad() {
			// #ifdef APP-PLUS
				this.statusBarHeight = '140upx';
				this.vipTop = '128upx';
				this.bottomValue = "160upx";
			// #endif
			
			// #ifdef H5
				this.statusBarHeight = '88upx';
				this.vipTop = '76upx';
				this.bottomValue = "80upx";
			// #endif
			
			
			console.log(this.statusBarHeight);
			uni.showLoading({ title: '加载中...' });
			setTimeout( () => {
				uni.hideLoading()
			}, 500);
		},
		onShow(){
			uni.setStorageSync("isShow", false);
			this.getuserInfobyuserID();
			this.is_member();
		},
		methods: {
			async getuserInfobyuserID(){
				let userInfo = uni.getStorageSync("userInfo");
				console.log(userInfo);
				if(userInfo && userInfo.userID){
					let res = await getuserInfobyuserID();
					if(res.status == 1){
						let userInfo = res.data.userInfo;
						uni.setStorageSync("userInfo", userInfo);
						if(userInfo){
							if(userInfo.userImage){
								this.userImage = userInfo.userImage;
							}else{
								this.userImage = '../../../static/img/mtyou_icon.png';
							}
							
							this.userName = userInfo.userName;
							if(userInfo.is_member == '1'){
								this.userBg = "../../../static/img/my_bg.png";
							}else{
								this.userBg = "../../../static/img/normal_bg.png";
							}
						}else{
							this.userImage = '../../../static/img/mtyou_icon.png';
							this.userName = '未登录';
							this.userBg = "../../../static/img/normal_bg.png";
						}
					}
				}else{
					this.userImage = '../../../static/img/mtyou_icon.png';
					this.userName = '未登录';
					this.userBg = "../../../static/img/normal_bg.png";
				}
				
			},
			async is_member(){
				let res = await is_member();
				if(res.code == 1000){
					
				}
			},
			goToCouponList(){
				let userInfo = uni.getStorageSync("userInfo");
				if(userInfo){
					uni.navigateTo({
						url: '/pages/coupon_list/coupon_list'
					});
				}else{
					uni.navigateTo({
						url: '/pages/login/login'
					});
				}
			},
			goToFavList(){
				let userInfo = uni.getStorageSync("userInfo");
				if(userInfo){
					uni.navigateTo({
						url: '/pages/collect_list/collect_list'
					});
				}else{
					uni.navigateTo({
						url: '/pages/login/login'
					});
				}
			},
			callPhone: function(){
				uni.makePhoneCall({
					phoneNumber:"4008888808",
					success: () => {
						console.log("成功拨打电话")
					}
				})
			},
			goToSetting: function(){
				let userInfo = uni.getStorageSync("userInfo");
				if(userInfo){
					uni.navigateTo({
						url: '/pages/personal/personal'
					});
				}else{
					uni.navigateTo({
						url: '/pages/login/login'
					});
				}
				
			},
			goToVip: function(){
				let userInfo = uni.getStorageSync("userInfo");
				if(userInfo){
					uni.navigateTo({
						url: '/pages/open_vip/open_vip'
					});
					
				}else{
					uni.navigateTo({
						url: '/pages/login/login'
					});
				}
				
			},
			goToAboutUs: function(){
				let userInfo = uni.getStorageSync("userInfo");
				if(userInfo){
					uni.navigateTo({
						url: '/pages/about_us/about_us'
					});
				}else{
					uni.navigateTo({
						url: '/pages/login/login'
					});
				}
				
			},
			
			goToExpressList: function(){
				let userInfo = uni.getStorageSync("userInfo");
				if(userInfo){
					uni.navigateTo({
						url: '/pages/order_list/order_list'
					});
				}else{
					uni.navigateTo({
						url: '/pages/login/login'
					});
				}
				
			},
			
			goToExpressOrderList: function(){
				let userInfo = uni.getStorageSync("userInfo");
				if(userInfo){
					uni.navigateTo({
						url: '/pages/express_list_order/express_list_order'
					});
				}else{
					uni.navigateTo({
						url: '/pages/login/login'
					});
				}
				
			},
			goToAddress: function(){
				let userInfo = uni.getStorageSync("userInfo");
				if(userInfo){
					uni.navigateTo({
						url: '/pages/address_list/address_list'
					});
				}else{
					uni.navigateTo({
						url: '/pages/login/login'
					});
				}
			},
			goToGlobalAddress: function(){
				let userInfo = uni.getStorageSync("userInfo");
				if(userInfo){
					uni.navigateTo({
						url: '/pages/global_address_list/global_address_list'
					});
				}else{
					uni.navigateTo({
						url: '/pages/login/login'
					});
				}
			},
			goToComplain: function(){
				uni.navigateTo({
					url: '/pages/complain/complain'
				});
			}
		}
	}
</script>

<style>
	page{background: #fff;}
	
	.head_wrap{width: 100%; box-sizing: border-box; background: #107EFF; height: 372upx;position: relative; margin-bottom: 80upx;padding-top: 88upx; }
	.head_wrap .vip_img{width: 92%; margin: 0upx 4%; border-radius: 24upx;position: absolute; z-index: 1;height: 364upx;}
	.head_wrap .head_img_wrap{display: flex; flex-direction: column;align-items: center;position: relative;z-index: 2; padding-top: 26upx;color: #fff;font-size: 32upx; top: -88upx;}
	.head_wrap .head_img_wrap img{width: 44px; height: 44px; border-radius: 50%;border: 5upx solid #FFFFFF;}
	
	
	.my_head_wrap{padding: 0upx 20upx; color: #333333; font-size: 28upx;}
	.touxiang{width: 72upx;margin-right: 20upx; border-radius: 50%;}
	.setting_img{width: 40upx;}
	.func_wrap{flex-flow: wrap; width: 100%; padding: 0upx 30upx; box-sizing: border-box; margin-top: 40upx;}
	.func_wrap img{width: 60upx;margin-bottom: 10upx;}
	.func_item{color: #333333; font-size: 28upx; height: 168upx; flex:1;border: 2upx solid #F3F3F3; margin: 10upx 10upx 0upx;border-radius: 8upx;}
	.bottom_item_wrap{padding-left: 40upx;width: 100%; box-sizing: border-box;}
	.bottom_item{color: #333333; font-size: 28upx; height: 116upx; border-bottom: 2upx solid #F3F3F3; padding-right: 30upx;}
	.bottom_item .icon{ margin-right: 24upx;}
	
	
</style>
