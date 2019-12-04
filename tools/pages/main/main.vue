<template>
	<view>
		<uni-status-bar></uni-status-bar>
		<swiper :indicator-dots="true" :autoplay="true"  :interval="3000" :duration="500" class="head_img">
			<swiper-item v-for="(item, index) in bannerInfoList" :key="index" class="head_img" @tap="goToH5(item.t_jump)">
				<image :src="item.t_url" mode="widthFix" class="head_img"></image>
			</swiper-item>
		</swiper>
		
		<view class="menu_wrap" >
			<view class="col_center " style="width: 21%; margin: 30upx 0upx;" v-for="(item, index) in contentList" :key="index" @tap="goToContent(item.url)">
				<image :src="item.b_icon" mode="aspectFill" ></image>
				<span>{{item.b_name}}</span>
			</view>
		</view>
		
		
	</view>
</template>

<script>
	import { BASE_IMAGE_URL,getImgList,getConfig } from "@/utils/api";
	import uniStatusBar from '@/components/mini_status_bar.vue';
	
	export default {
		components: {
			uniStatusBar
		},
		data() {
			return {
				contentList: [
					{b_icon: BASE_IMAGE_URL+'video.png', b_name: '视频去水印', url: '/pages/video/video'},
					{b_icon: BASE_IMAGE_URL+'phone_icon.png', b_name: '常用电话', url: '/pages/phone/phone'},
					{b_icon: BASE_IMAGE_URL+'er_wei_ma.png', b_name: '生成二维码', url: '/pages/erweima/erweima'},
					{b_icon: BASE_IMAGE_URL+'jie_ma.png', b_name: '解码', url: '/pages/jiema/jiema'},
					{b_icon: BASE_IMAGE_URL+'ip.png', b_name: 'IP查地址', url: '/pages/ip/ip'},
					{b_icon: BASE_IMAGE_URL+'yuming.png', b_name: '域名查IP', url: '/pages/yuming/yuming'},
					{b_icon: BASE_IMAGE_URL+'image.png', b_name: '图片合成', url: '/pages/image/image'},
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
					url: url
				})
			},
			async getImgList(){
				let res = await getImgList();
				if(res.code == 1000){
					this.bannerInfoList = res.data;
				}
			},
			async getConfig(){
				let res = await getConfig();
				if(res.code == 1000){
					res.data.map((item) => {
						if(item.c_key == '视频广告'){
							uni.setStorageSync("guanggao", parseInt(item.c_detail) == 1);
						}
					})
				}
			}
		},
		onLoad() {
			this.scrollHeightVal = this.initStatus();
			this.getImgList();
			this.getConfig();
		}
	}
</script>

<style>
	page{background: #FFFFFF;}
	
	.content{background: transparent; width: 100vw;position: relative;z-index: 2; display: flex;flex-direction: column; }
	.head_img {width: 100%;height: 360upx !important;border-radius: 8upx;}
	
	.menu_wrap{ width: 94%; margin-left: 3%;box-sizing:border-box;background: #fff;
	box-shadow:  0px 0px 10px #fff;margin-top: 30upx;border-radius: 8upx; color: #1BB851;
		flex-flow: wrap; display: flex;flex-direction: row; }
	.menu_wrap .flex_one{min-width: 160upx;font-size: 24upx; color: #666; height: 170upx;}
	.menu_wrap image{width: 62upx; height: 62upx;margin-bottom: 10upx;}
	
</style>
