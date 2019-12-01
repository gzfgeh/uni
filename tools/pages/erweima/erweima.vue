<template>
	<view>
		<uni-status-bar
		:showBack="true" 
		@finishPage="backAction"
		:titleStr="titleStr"></uni-status-bar>
		
		<view class="head">
			<view class="row item">
				<span>二维码内容：</span>
				<input type="text" v-model="content" placeholder="请输入二维码内容"/>
			</view>
			
			<view class="row item">
				<span>背景色：</span>
				<input type="text" v-model="background" placeholder="请输入背景色"/>
			</view>
			
			<view class="row item">
				<span>前景色：</span>
				<input type="text" v-model="foreground" placeholder="请输入前景色"/>
			</view>
			
			<view class="row item">
				<span>插入logo：</span>
				<image :src="upload" mode="aspectFill" class="upload" v-if="!icon" @tap="selectImg"></image>
				<image :src="icon" mode="aspectFill" class="upload" v-if="icon"  @tap="selectImg"></image>
			</view>
			<button type="primary" @tap="productImg">生成二维码</button>
			
			<image :src="src" mode="aspectFill" class="erweima" v-if="val"></image>
			<button type="primary" @tap="saveImg"  v-if="val">保存到相册</button>
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
	import uniStatusBar from '@/components/mini_status_bar.vue';
	import DownloadSaveFile  from "@/utils/downloadSaveFile";
	
	export default {
		components: {tkiQrcode,uniStatusBar},
		data() {
			return {
				upload: BASE_IMAGE_URL+"upload.png",
				upload_img: '',
				head_logo: '',
				name: '',
				val: '', // 要生成的二维码值
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
				src: '' ,// 二维码生成后的图片地址或base64
				scrollHeightVal: 0,
				titleStr: '生成二维码',
				content: ''
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
			productImg(){
				this.val = this.content;
				setTimeout(() => {
					this.$refs.qrcode._makeCode();
				}, 1000);
			},
			saveImg(){
				let that = this;
				uni.uploadFile({
					url: 'https://gzf.liangyicloud.xyz/Api/CommonApi/uploadFile',
					filePath: this.src,
					name: 'file',
					header: {"Content-Type":"multipart/form-data"},
					formData: {},
					success: function(data){
						if(JSON.parse(data.data).data){
							console.log(JSON.parse(data.data).data.url);
							let image = JSON.parse(data.data).data.url;
							DownloadSaveFile.downloadFile('image', image); //video或image
						}
					  
					}
				})
				
				
			},
			selectImg(){
				let that = this;
				uni.chooseImage({
				    count: 1, //默认9
				    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				    sourceType: ['album', 'camera'], //从相册选择
				    success: function (res) {
				        console.log(JSON.stringify(res.tempFilePaths[0]));
						that.icon = res.tempFilePaths[0];
				    }
				});
			},
			backAction: function(){
				uni.navigateBack();
			},
		},
		onLoad() {
			this.scrollHeightVal = this.initStatus();
		},
		
		onShow() {
			let that = this;
			uni.getClipboardData({
				success: function(res) {
					if(res.data){
						uni.showModal({
							title: '是否复制粘贴板内容',
							content: res.data,
							success(result) {
								if(result.confirm){
									that.content = res.data;
									
									uni.setClipboardData({
										data: ''
									})
								}else{
									uni.setClipboardData({
										data: ''
									})
								}
							}
						})
					}
					
				}
			});
		}
		
	}
</script>

<style>
.contain{width: 100vw; height: 100vh; overflow: hidden; background: #FFFFFF;}
.head{width: 100vw;  position: relative; display: flex; box-sizing: border-box;
	flex-direction: column; justify-content: space-between;  padding: 40upx;}
.head .bg{width: 70%; position: absolute; top:10%; left: 15%; height: 80%; z-index: 1;}

.head_logo{width: 135upx; height: 135upx; border-radius: 50%; position: relative; z-index: 2;}
.name{font-size: 32upx; color: #FFFFFF; margin-top: 33upx; position: relative; z-index: 2;}
.erweima{width: 240upx; height: 240upx; margin-left: calc(50vw - 85px); margin-bottom: 20upx;
	position: relative; z-index: 2; border: 10upx solid #FFFFFF; border-radius: 20upx; margin-top: 100upx;}

.upload{width: 80upx; height: 80upx;}

input{border-radius: 10upx; border: 2upx solid #E3E3E3; height: 80upx; padding: 0upx 20upx;}
.item{margin: 10upx;}
.item span{width: 180upx;}

</style>
