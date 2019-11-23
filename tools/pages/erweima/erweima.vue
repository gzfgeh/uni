<template>
	<view class="contain">
		<view class="head">
			<image :src="erweima_bg" mode="aspectFill" class="bg"></image>
			<view class="logo_wrap col">
				<image :src="head_logo" mode="aspectFill" class="head_logo"></image>
				<span class="name">{{name}}</span>
			</view>
			
			<image :src="src" mode="aspectFill" class="erweima"></image>
		</view>
		
		<view @longpress="saveQrcode" style="visibility: hidden; margin-top: -440upx;">
			<tki-qrcode
			ref="qrcode"
			:val="val"
			:size="size"
			:unit="unit"
			:background="background"
			:foreground="foreground"
			:pdground="pdground"
			:icon="icon"
			:iconSize="iconsize"
			:lv="lv" 
			:onval="onval"
			:loadMake="loadMake"
			@result="qrR" />
		</view>
		
	</view>
</template>

<script>
	import { BASE_IMAGE_URL } from "@/utils/api";
	import tkiQrcode from "@/components/tki-qrcode/tki-qrcode.vue"
	
	export default {
		components: {tkiQrcode},
		data() {
			return {
				erweima_bg: BASE_IMAGE_URL+"erweima_bg.png",
				erweima_img: '',
				head_logo: '',
				name: '',
				
				val: '二维码', // 要生成的二维码值
				size: 440, // 二维码大小
				unit: 'upx', // 单位
				background: '#FFFFFF', // 背景色
				foreground: '#000000', // 前景色
				pdground: '#000000', // 角标色
				icon: '', // 二维码图标
				iconsize: 40, // 二维码图标大小
				lv: 3, // 二维码容错级别 ， 一般不用设置，默认就行
				onval: true, // val值变化时自动重新生成二维码
				loadMake: true, // 组件加载完成后自动生成二维码
				src: '' // 二维码生成后的图片地址或base64
			}
		},
		methods: {
			qrR(res) {
				this.src = res;
				// this.src = this.base64ToBlob(this.src);
			},
			saveQrcode() {
				this.$refs.qrcode._saveCode();
						
			},
		},
		onLoad(opt) {
			this.val = opt.m_z_id;
			setTimeout(() => {
				this.$refs.qrcode._makeCode();
			}, 1000);
			
			this.head_logo = opt.avatar;
			this.name = opt.name;
		}
	}
</script>

<style>
.contain{width: 100vw; height: 100vh; overflow: hidden; background: #FFFFFF;}
.head{width: 100vw; background: #CDCDCD; height: 835upx; position: relative; display: flex; box-sizing: border-box;
	flex-direction: column; justify-content: space-between; align-items: center; padding: 140upx 0upx;}
.head .bg{width: 70%; position: absolute; top:10%; left: 15%; height: 80%; z-index: 1;}

.head_logo{width: 135upx; height: 135upx; border-radius: 50%; position: relative; z-index: 2;}
.name{font-size: 32upx; color: #FFFFFF; margin-top: 33upx; position: relative; z-index: 2;}
.erweima{width: 235upx; height: 235upx; position: relative; z-index: 2; border: 10upx solid #FFFFFF; border-radius: 20upx;}
</style>
