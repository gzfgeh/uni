<template>
	<view>
		<uni-status-bar
		:showBack="true" 
		@finishPage="backAction"
		:titleStr="titleStr"></uni-status-bar>
		
		<scroll-view class="content" scroll-y="true"
			scroll-with-animation="true" :style="{'height' : scrollHeightVal+'px'}"  >
			
			<image :src="upload" mode="aspectFill" class="phone" @tap="scanImg"></image>
			
			<button type="primary" @tap="scanImg" >扫描二维码/条形码</button>
			
			<view class="row_center">{{result}}</view>
			
			
		</scroll-view>
		
		 
		
	</view>
</template>

<script>
	import { BASE_IMAGE_URL } from "@/utils/api";
	import uniStatusBar from '@/components/mini_status_bar.vue';
	
	export default {
		components: {
			uniStatusBar
		},
		data() {
			return {
				upload: BASE_IMAGE_URL+"upload.png",
				phone_two: BASE_IMAGE_URL+"phone_two.png",
				scrollHeightVal: 0,
				titleStr: '解码',
				result: ''
			}
		},
		methods: {
			backAction: function(){
				uni.navigateBack();
			},
			scanImg(){
				let that = this;
				uni.scanCode({
				    scanType: ['qrCode', 'barCode'],
				    success: function (res) {
				        console.log('条码类型：' + res.scanType);
				        console.log('条码内容：' + res.result);
						that.result = '条码内容：' + res.result;
				    }
				});
			}
			
		},
		onLoad() {
			this.scrollHeightVal = this.initStatus();
		}
	}
</script>

<style>
	page{background: #FFF;}
	.phone{width: 300upx; height: 300upx; margin: 30upx calc(50vw - 75px);}
	button{width: 80%; margin-left: 10%; margin-bottom: 40upx;}
</style>
