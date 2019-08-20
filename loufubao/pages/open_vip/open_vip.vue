<template>
	<view>
		<view class="head_bg"></view>
		<view class="head_wrap">
			<image src="../../static/img/open_vip_bg.png" mode="widthFix" class="bg"></image>
			<image src="../../static/img/mtyou_icon.png" mode="aspectFill" class="head_icon"></image>
			<view class="content">
				<view class="row head_item">
					<span class="name">王大池</span>
					<image src="../../static/img/vip_logo_icon.png" mode="aspectFill"></image>
					<span>(138****1234登录)</span>
				</view>
				
				<span>2020-06-11到期，</span>
				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>

.head_bg{height: 240upx; background: #107EFF;}
.head_wrap{height: 202upx; width: 100%; padding: 0upx 30upx;margin-top: -145upx; display: flex;flex-direction: row;
	position: relative;box-sizing: border-box; color: #FFFFFF; font-size: 22upx; z-index: 1;}
.head_wrap .bg{position: absolute;top: 0upx; left: 30upx; height: 100%;width: 91.5%; z-index: 0;}
.head_wrap .content{position: relative;z-index: 2; display: flex;flex-direction: column;}
.head_wrap .head_icon{ width: 88upx; height: 88upx; margin-right: 20upx;}
.head_wrap .head_item .name{font-size: 30upx;}
.head_wrap .head_item {color: #FFFFFF;}
.head_wrap .head_item image{width: 32upx; height: 27upx;}
</style>
