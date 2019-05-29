<template>
	<view class="content">
		
		<div class="head_wrap">
			<img src="https://bay.2donghua.com/web/statics/images/user-center/img-user-bg.png" mode="aspectFill" class="head_bg">
			<div class="info_wrap row_between">
				<div class="user_wrap row">
					<img src="https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKmIdOEXj8ecxR1ibrZBEw7YyDp0SeYuOglCCpwyV9PR0zz7PI4YM4f3vt0FcB2cUfSN65icnvzBJDw/132" alt="">
					<span>枫</span>
				</div>
				
				<div class="address_wrap row" @click="goToAddress">
					<img src="https://bay.2donghua.com/web/statics/wxapp/images/icon-address.png" alt="">
					<span>收货地址</span>
				</div>
			</div>
		</div>
		
		<div class="my_order_text">我的订单</div>
		
		<div class="row_between func_wrap">
			<div class="col_center func_item">
				<img src="https://bay.2donghua.com/web/statics/images/user-center/icon-order-0.png" mode="widthFix">
				<span>待发货</span>
				<span class="num">2</span>
			</div>
			
			<div class="col_center func_item">
				<img src="https://bay.2donghua.com/web/statics/images/user-center/icon-order-2.png" mode="widthFix">
				<span>待收货</span>
				<span class="num">1</span>
			</div>
			
			<div class="col_center func_item">
				<img src="https://bay.2donghua.com/web/statics/images/user-center/icon-order-3.png" mode="widthFix">
				<span>已完成</span>
				<span class="num">12</span>
			</div>
			
			<div class="col_center func_item">
				<img src="https://bay.2donghua.com/web/statics/images/user-center/icon-order-4.png" mode="widthFix">
				<span>售后</span>
				<span class="num">2</span>
			</div>
		</div>
		
		<div class=" bottom_item_wrap"  @click="goToAddress">
			<div class="row_between bottom_item">
				<img src="https://bay.2donghua.com/web/statics/images/user-center/icon-about-us.png" class="icon" mode="widthFix">
				<span>我的分销商</span>
				<span style="flex: 1;"></span>
				<span class="arraw"></span>
				
			</div>
		</div>
		
		<div class=" bottom_item_wrap">
			<div class="row_between bottom_item">
				<img src="https://bay.2donghua.com/web/statics/images/user-center/icon-user-mch.png" class="icon" mode="widthFix">
				<span>下级订单</span>
				<span style="flex: 1;"></span>
				<span class="arraw"></span>
			</div>
		</div>
		
		<div class=" bottom_item_wrap">
			<div class="row_between bottom_item uni-navigate-right">
				<img src="https://bay.2donghua.com/web/statics/images/user-center/icon-user-kf.png" class="icon" mode="widthFix">
				<span>在线客服</span>
				<span style="flex: 1;"></span>
				<span class="arraw"></span>
			</div>
		</div>
		
		<div class=" bottom_item_wrap" @click="goToAddress">
			<div class="row_between bottom_item uni-navigate-right">
				<img src="https://bay.2donghua.com/web/statics/images/user-center/icon-user-dz.png" class="icon" mode="widthFix">
				<span>收货地址</span>
				<span style="flex: 1;"></span>
				<span class="arraw"></span>
			</div>
		</div>
		
		<div class=" bottom_item_wrap" @click="goToComplain">
			<div class="row_between bottom_item uni-navigate-right">
				<img src="https://bay.2donghua.com/web/statics/images/user-center/icon-user-bangding.png" class="icon" mode="widthFix">
				<span>绑定手机号</span>
				<span style="flex: 1;"></span>
				<span class="arraw"></span>
			</div>
		</div>
		
		<div class=" bottom_item_wrap" @click="goToComplain" style="border-bottom: 20upx solid #E3E3E3;">
			<div class="row_between bottom_item uni-navigate-right">
				<img src="https://bay.2donghua.com/web/statics/images/user-center/icon-order-4.png" class="icon" mode="widthFix">
				<span>售后</span>
				<span style="flex: 1;"></span>
				<span class="arraw"></span>
			</div>
		</div>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				statusBarHeight: 0
			}
		},
		onLoad() {
			this.statusBarHeight = uni.getSystemInfoSync().statusBarHeight + 'px';
		},
		methods: {
			goToSetting: function(){
				uni.navigateTo({
					url: '/pages/personal/personal'
				});
			},
			
			goToAddress: function(){
				uni.navigateTo({
					url: '/pages/address_list/address_list'
				});
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
