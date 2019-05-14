<template>
    <view class="content">
		
		
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
		
		<img :src="src" mode="widthFix">
	
		<span>长按保存二维码转发至客户</span>
    </view>
</template>

<script>
	
	import tkiQrcode from "@/components/tki-qrcode/tki-qrcode.vue"
	
	import { BASE_IMAGE_URL,basic,getVechileData } from "@/utils/api";

    export default {
		data(){
			return {
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
		components: {tkiQrcode},
		onLoad () {
			let quotation_id = this.$root.$mp.query.quotation_id;
			console.log(quotation_id);
			let partner_id = uni.getStorageSync("partner_id");
			let imei = uni.getStorageSync("imei");
			this.val = "http://m.kaikaibao.com.cn/lccx2/index.html#/pages/service_confirm/service_confirm?partner_id="+partner_id+"&imei="+imei+"&quotation_id="+quotation_id;
			setTimeout(() => {
				this.$refs.qrcode._makeCode();
			}, 1000);
			
		 },
        methods: {
			qrR(res) {
				this.src = res;
				// this.src = this.base64ToBlob(this.src);
			},
			base64ToBlob(code) {
				let parts = code.split(';base64,');
				let contentType = parts[0].split(':')[1];
				let raw = window.atob(parts[1]);
				let rawLength = raw.length;
		 
				let uInt8Array = new Uint8Array(rawLength);
		 
				for (let i = 0; i < rawLength; ++i) {
				  uInt8Array[i] = raw.charCodeAt(i);
				}
				return URL.createObjectURL(new Blob([uInt8Array], {type: contentType}));
			 },
			saveQrcode() {
				this.$refs.qrcode._saveCode();
						
			},
	
        }
    }
</script>

<style>
	.content{
		background-color: #F9F9F9;
		color: rgba(0,0,0,0.6);
		font-size: 36upx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;;
	}
	
	img{
		width: 444upx;
		height: 440upx;
		margin-bottom: 8upx;
	}
	
	
</style>
