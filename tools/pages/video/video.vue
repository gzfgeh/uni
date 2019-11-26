<template>
	<view>
		<uni-status-bar 
		:showBack="true" 
		@finishPage="backAction"
		:titleStr="titleStr"></uni-status-bar>
		<scroll-view class="content" scroll-y="true"
			scroll-with-animation="true" :style="{'height' : scrollHeightVal+'px'}"  >
			
			<image :src="pingtai" mode="aspectFill" class="pingtai"></image>
			
			<view class="content_wrap">
				<view class="row btn_wrap">
					<view class="input_wrap row">
						<input type="text" v-model="videoUrl" placeholder="请粘贴视频地址" />
						<image :src="clear" mode="aspectFill" v-if="videoUrl" @tap="clearUrl"></image>
					</view>
					
					<button type="primary" @tap="getVideoUrl">提取</button>
				</view>
				
				<button type="primary" open-type="share" class="share">分享给好友</button>
				
				
				<video :src="trueVideoUrl" 
					controls  v-if="trueVideoUrl" class="video_style"></video>
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
				bannerInfoList: [],
				titleStr: '视频去水印',
				pingtai: BASE_IMAGE_URL+'pingtai.png',
				clear: BASE_IMAGE_URL+'clear.png',
				videoUrl: '',
				trueVideoUrl: ''
			}
		},
		methods: {
			backAction: function(){
				uni.navigateBack();
			},
			clearUrl(){
				this.videoUrl = "";
			},
			getVideoUrl(){
				let params = {
					type: 2,
					params: {
						"url": "http://v.douyin.com/k8xeV4/",
						"uid": "",
						"isFormat":true,
						"max_cursor": 0
					}
				};
				uni.showLoading();
				uni.request({
					url: 'http://api.lyfzn.top/douyinApi/LimitApi/?s=PT1RYXhrV1pxQWtNeEFqS0ExVFBCOTBiSlJrU3FGRU1qSmpWcHBFYmpSMFR6a2thYXBuVkVwa0tBSlRNd29DUTkwVFVXdG1Xd2tGZUtGalZYaEdXV05uVldaVllXWmtWdlprYU5wbVdxVkZlSkZEWmhabFJXZGtXVlpsYTFzV1ZYWmtWT2RrUlVWMU1zUmxWVjVFU2toa1ZIZDFhYUJUVzJBSE1XZEZhWVZWV2FaMVZUcEVSV1JsVVhaVlZraFZWWEZETWhkRVpXZEZOR1YwVlhSR2JWTm5UR1YxU2t4bVY2cGtSU2RsVkdOMmRSWlVZREpGYlVwVU5yWlZhQ3BtVTBwVk1TUkRac1JWV29OalVoUjNhUmRsV3NGMVJvWmtWV3BWVld4bVNzUmxST0pEVmhoWGJWZGxRSU4xVks1MlV6UkdiVWRsVnNSMVZ3eG1VWGxUVk9abFdXWjFRU0ZEVg==',
					method: 'POST',
					data: JSON.stringify(params),
					success(res) {
						uni.hideLoading();
						console.log(res);
					}
				})
			}
			
		},
		onLoad() {
			this.scrollHeightVal = this.initStatus();
		},
		onShareAppMessage(res) {
			return {
				title: '与你分享，一起使用',
				path: '/pages/main/main'
			}
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
									that.videoUrl = res.data;
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
	page{background: #EDEDED;}
	
	.content{background: transparent; width: 100vw;position: relative;z-index: 2; display: flex;flex-direction: column; }
	.content_wrap{padding:40upx 20upx; box-sizing: border-box; background: #FFFFFF; display: flex; flex-direction: column;}
	
	.pingtai{width: 100%; height: 400upx; margin: 20upx 0upx;}
	.btn_wrap{background: #FFFFFF;  box-sizing: border-box; }
	.input_wrap{flex: 1; border-radius: 20upx; border: #1BB851 solid 2upx; height: 90%; padding: 10upx 20upx; box-sizing: border-box; margin-left: 20upx; position: relative;}
	.input_wrap image{width: 40upx; height: 40upx; position: absolute; right: 20upx; top: 50%; margin-top: -20upx;}
	.input_wrap input{height: 70upx;}
	.btn_wrap button{margin: auto  20upx;}
	
	.share{margin-top: 30upx; width: 100%; }
	.video_style{width: 100%; margin-top: 40upx;}
	
</style>
