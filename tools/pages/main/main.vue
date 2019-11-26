<template>
	<view>
		<uni-status-bar></uni-status-bar>
		<scroll-view class="content" scroll-y="true"
			scroll-with-animation="true" :style="{'height' : scrollHeightVal+'px'}"  >
			
			<swiper :indicator-dots="true" :autoplay="true"  :interval="3000" :duration="500" class="head_img">
				<swiper-item v-for="(item, index) in bannerInfoList" :key="index" class="head_img" @tap="goToH5(item.t_jump)">
					<image :src="item.t_url" mode="widthFix" class="head_img"></image>
				</swiper-item>
			</swiper>
			
			<view class="menu_wrap" >
				<view class="col_center " style="min-width: 21%; margin: 30upx auto;" v-for="(item, index) in contentList" :key="index" @tap="goToContent(item.url)">
					<image :src="item.b_icon" mode="aspectFill" ></image>
					<span>{{item.b_name}}</span>
				</view>
			</view>
			
		</scroll-view>
		
		
	</view>
</template>

<script>
	import { BASE_IMAGE_URL,getImgList } from "@/utils/api";
	import uniStatusBar from '@/components/mini_status_bar.vue';
	
	export default {
		components: {
			uniStatusBar
		},
		data() {
			return {
				contentList: [
					{b_icon: BASE_IMAGE_URL+'video.png', b_name: '视频去水印', url: '/pages/video/video'}
				],
				scrollHeightVal: 0,
				bannerInfoList: []
			}
		},
		methods: {
			goToH5(url){
				
			},
			goToContent(url){
				uni.navigateTo({
					url: '/pages/video/video'
				})
			},
			async getImgList(){
				let res = await getImgList();
				if(res.code == 1000){
					this.bannerInfoList = res.data;
				}
			}
		},
		onLoad() {
			this.scrollHeightVal = this.initStatus();
			this.getImgList();
		}
	}
</script>

<style>
	page{background: #FFFFFF;}
	
	.content{background: transparent; width: 100vw;position: relative;z-index: 2; display: flex;flex-direction: column; }
	.head_img {width: 100%;height: 360upx !important;border-radius: 8upx;}
	
	.menu_wrap{ width: 94%; margin-left: 3%; height:340upx;box-sizing:border-box;background: #fff;
	box-shadow:  0px 0px 10px #fff;margin-top: 30upx;border-radius: 8upx; color: #1BB851;
		flex-flow: wrap; display: flex;flex-direction: row; justify-content: space-between;}
	.menu_wrap .flex_one{min-width: 160upx;font-size: 24upx; color: #666; height: 170upx;}
	.menu_wrap image{width: 62upx; height: 62upx;margin-bottom: 10upx;}
	
</style>
