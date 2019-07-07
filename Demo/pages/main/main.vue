<template>
	<view class="content">
		<div style="width: 100%;">
			<button type="primary" @tap="saveToAlbum">保存</button>
			<button type="primary" @tap="getShareData">微信好友分享</button>
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
	import { pathToBase64, base64ToPath } from '@/components/image-tools/index.js';
	import weixin_sdk from '@/utils/weixin-jsapi.js';
	import { getShareData } from '@/utils/api.js';
	
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
			async getShareData(){
				let res = await getShareData();
				if(res.code == 1000){
					this.shareFriend(res.data);
				}
			},
			async shareFriend(result){
				
				weixin_sdk.config({
						debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
						appId: 'wx619e8821f163f2cc', // 必填，企业号的唯一标识，此处填写企业号corpid
						timestamp: result.timestamp, // 必填，生成签名的时间戳
						nonceStr: result.noncestr, // 必填，生成签名的随机串
						signature: result.signature,// 必填，签名，见附录1
						jsApiList: ['onMenuShareTimeline'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
				});
				
				weixin_sdk.ready(function(){
					weixin_sdk.onMenuShareTimeline({
						title: 'test1', // 分享标题
						link: 'https://www.gzfgeh.xyz', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
						imgUrl: 'https://www.baidu.com/img/bd_logo1.png?where=super', // 分享图标
						success: function () {
						// 用户点击了分享后执行的回调函数
						},
						cancel: function () {
						// 用户点击了取消分享后执行的回调函数
						}
					 });

				})
						
				weixin_sdk.error(function(err){
					wx.showToast({
							title: '支付失败',
							icon: 'none',
							duration: 1000
					});
				})
				
			},
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