<template>
	<view>
		<view class="title_wrap">
			<view class="status-bar" :style="{'height': statusBarHeight+'px'}"></view>
			<view class="head_wrap row_between" :style="{'height': titleHeight+'px'}">
				<image :src="white_back_icon" mode="aspectFill" class="back_icon" @tap="backAction"></image>
			</view>
		</view>
		
		<view :style="{'height': tempHeight+'px'}"></view>
		
	</view>
</template>

<script>
	import { BASE_IMAGE_URL } from "@/utils/api";
	
	export default {
		name: "UniStatusBar",
		data() {
			return {
				white_back_icon: BASE_IMAGE_URL+"white_back_icon.png",
				statusBarHeight: 0,
				titleHeight: 0,
				tempHeight: 0
			};
		},
		methods: {
			backAction(){
				this.$emit('finishPage');
			}
		},
		created() {
			let screenWidth =  uni.getSystemInfoSync().screenWidth;
			let screenHeight =  uni.getSystemInfoSync().screenHeight;
			this.statusBarHeight = wx.getSystemInfoSync().statusBarHeight;
			if(uni.getSystemInfoSync().platform == "android"){
				this.titleHeight = 48;
			}else{
				this.titleHeight = 44;
			}
			this.tempHeight = parseInt(this.statusBarHeight)+parseInt(this.titleHeight);
		}
	}
</script>

<style>
	.title_wrap{position: fixed; top: 0px; left: 0px; width: 100vw; z-index: 2;}
	.status-bar{}
	
</style>
