<template>
	<view class="content" :style="{'padding-top': statusBarHeight}">
		
		<div class="row_between my_head_wrap">
			<div class="row_center">
				<img class="touxiang" src="../../../static/img/mtyou_icon.png" mode="widthFix"/>
				<span>未登录</span>
			</div>
			<img src="../../../static/img/wode_setting.jpg" class="setting_img" mode="widthFix" @tap="goToSetting"/>
		</div>
		
		<div class="row_between func_wrap">
			<div class="col_center func_item">
				<img src="../../../static/img/wode_kuaidi.jpg" mode="widthFix">
				<span>快递</span>
			</div>
			
			<div class="col_center func_item">
				<img src="../../../static/img/wode_kuaidi.jpg" mode="widthFix">
				<span>快递</span>
			</div>
			
			<div class="col_center func_item">
				<img src="../../../static/img/wode_kuaidi.jpg" mode="widthFix">
				<span>快递</span>
			</div>
			
			<div class="col_center func_item">
				<img src="../../../static/img/wode_kuaidi.jpg" mode="widthFix">
				<span>快递</span>
			</div>
		</div>
		
		<div class=" bottom_item_wrap" style="margin-top: 30upx;">
			<div class="row_between bottom_item">
				<img src="../../../static/img/wode_kefu.jpg" class="icon" mode="widthFix">
				<span>联系客服</span>
				<span style="flex: 1;"></span>
				<span>400-888-8808</span>
				<img src="../../../static/img/right.png" mode="widthFix">
			</div>
		</div>
		
		<div class=" bottom_item_wrap">
			<div class="row_between bottom_item uni-navigate-right">
				<img src="../../../static/img/wode_kefu.jpg" class="icon" mode="widthFix">
				<span>会员福利</span>
				<span style="flex: 1;"></span>
				<span></span>
				<img src="../../../static/img/right.png" mode="widthFix">
			</div>
		</div>
		
		<div class=" bottom_item_wrap">
			<div class="row_between bottom_item uni-navigate-right">
				<img src="../../../static/img/wode_kefu.jpg" class="icon" mode="widthFix">
				<span>投诉建议</span>
				<span style="flex: 1;"></span>
				<span></span>
				<img src="../../../static/img/right.png" mode="widthFix">
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
		}
	}
</script>

<style>
	.my_head_wrap{padding: 0upx 20upx; color: #333333; font-size: 28upx;}
	.touxiang{width: 72upx;margin-right: 20upx;}
	.setting_img{width: 40upx;}
	.func_wrap{flex-flow: wrap; width: 100%; padding: 0upx 30upx; box-sizing: border-box; margin-top: 40upx;}
	.func_wrap img{width: 60upx;margin-bottom: 10upx;}
	.func_item{color: #333333; font-size: 28upx; height: 168upx; flex:1;box-shadow: #ccc 0 2px 4px; margin: 10upx 10upx 0upx;}
	.bottom_item_wrap{padding-left: 40upx;width: 100%; box-sizing: border-box;}
	.bottom_item{color: #333333; font-size: 28upx; height: 116upx; border-bottom: 2upx solid #E3E3E3; padding-right: 30upx;}
	.bottom_item .icon{width: 36upx; margin-right: 24upx;}
	.bottom_item img{width: 36upx;}
	
	
</style>
