<template>
	<view>
		<uni-status-bar 
		:showBack="true" 
		@finishPage="backAction"
		:titleStr="titleStr"></uni-status-bar>
		<scroll-view class="content" scroll-y="true"
			scroll-with-animation="true" :style="{'height' : scrollHeightVal+'px'}"  >
			
			<image :src="name" mode="widthFix" class="pingtai"></image>
			<view style="padding: 20upx;">
				生活小助手是一款很实用的工具集合，如果遇到任何问题，欢迎反馈：邮箱：305475422@qq.com
			</view>
			<button type="primary" open-type="share" class="share">分享给好友</button>
			
			
		</scroll-view>
		
		
	</view>
</template>

<script>
	import { BASE_IMAGE_URL,getImgList } from "@/utils/api";
	import DownloadSaveFile  from "@/utils/downloadSaveFile";
	import uniStatusBar from '@/components/mini_status_bar.vue';
	

	export default {
		components: {
			uniStatusBar
		},
		data() {
			return {
				scrollHeightVal: 0,
				bannerInfoList: [],
				titleStr: '关于我们',
				name: BASE_IMAGE_URL+'name.png',
				clear: BASE_IMAGE_URL+'clear.png',
				videoUrl: '',
				trueVideoUrl: ''
			}
		},
		methods: {
			backAction: function(){
				uni.navigateBack();
			},
			
		},
		onLoad() {
			this.scrollHeightVal = this.initStatus();
		},
		onShareAppMessage(res) {
			return {
				title: '与你分享，一起使用',
				path: '/pages/main/main'
			}
		}
	}
</script>

<style>
	page{background: #F5F5F5;}
	.pingtai{width: 300upx; margin: 20upx calc(50vw - 75px);}
	
	.share{margin: 30upx 10%; width: 80%; }
	
</style>
