<template>
	<view class="content">
		<div style="width: 100%;">
			<button type="primary" @tap="saveToAlbum">保存</button>
			<button type="primary" @tap="shareFriend">微信好友分享</button>
		</div>
		
		<view class="post">
			<tki-qrcode ref="qrcode" :val="val" :size="200" background="#fff" foreground="#000" pdground="#000" :onval="false"
			 :loadMake="false" @result="qrR" :show="false"></tki-qrcode>
			<view class="wrapper">
				<canvas style="height: 100%;width: 100%;backgroundColor: #FFFFFF" canvas-id="firstCanvas"></canvas>
			</view>
			
			
		</view>
		<div>
			<img :src="cover" style="position: absolute;top: 100upx; left: 0upx; width: 600upx;">
		</div>
	</view>
</template>
 
<script>
	import tkiQrcode from '@/components/tki-qrcode/tki-qrcode.vue';
	import { pathToBase64, base64ToPath } from '@/components/image-tools/index.js'
	export default {
		name: 'canvas-drawer',
		components: {
			tkiQrcode
		},
		data() {
			return {
				val: 'https://www.baidu.com',
				cover: '../../static/center-1.png'
			};
		},
		onLoad() {},
		methods: {
			qrR(path) {
				let that = this;
				this.qr_path = path;
				let system_info = uni.getSystemInfoSync();
				let ctx = uni.createCanvasContext('firstCanvas');
				uni.getImageInfo({
					src: that.cover,
					success(res) {
						res.path = that.cover;
						ctx.drawImage(res.path, 0, 0, 375, uni.upx2px(1020));
						let linearGrad = ctx.createLinearGradient(0, 0, 800, 0);
						linearGrad.addColorStop('0.25', '#8b00d2');
						linearGrad.addColorStop('0.5', '#003fb3');
						linearGrad.addColorStop('0.75', '#ff3ef0');
						ctx.fillStyle = '#FFFFFF';
						ctx.fillRect(uni.upx2px(500), uni.upx2px(790), uni.upx2px(200), uni.upx2px(210));
						ctx.drawImage(path, uni.upx2px(520), uni.upx2px(800), uni.upx2px(160), uni.upx2px(160));
						ctx.font = '13px Arial';
						ctx.fillStyle = '#000';
						ctx.fillText('长按保存二维码', uni.upx2px(508), uni.upx2px(990));
						console.log("111111");
						ctx.draw(false, () => {
							console.log("1234");
							setTimeout( () => {
								uni.canvasToTempFilePath({
									x: 0,
									y: 0,
									width: 375,
									height: uni.upx2px(1020),
									destWidth: 375,
									destHeight: uni.upx2px(1020),
									canvasId: 'firstCanvas',
									success: function(res) {
										
										console.log(res.tempFilePath);
										that.cover = res.tempFilePath;
										return;
										base64ToPath(res.tempFilePath)
										  .then(path => {
											console.log(path)
											that.cover = path;
										  })
										  .catch(error => {
											console.error(error)
										  })
										return;
										uni.saveImageToPhotosAlbum({
											filePath: res.tempFilePath,
											success: function() {
												console.log('save success');
											}
										});
									},
									fail(e) {
										console.log(e);
										uni.showToast({
											title: '生成海报失败',
											icon: 'none'
										});
									}
								});
							}, 2000);
							
						});
					},
					fail(error) {
						console.log(error);
					}
				});
 
 
 
			},
			saveToAlbum() {
				this.$refs.qrcode._makeCode();
			}
		}
	};
</script>
 
<style lang="scss">
	.post {
		height: 100%;
		background-color: #f4f4f4;
 
		.wrapper {
			height: 1020rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			margin-top: 50upx;
		}
	}
</style>