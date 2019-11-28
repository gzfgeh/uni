<template>
	<view>
		
		<uni-status-bar :titleStr="titleStr"></uni-status-bar>
		
		
		<view class="head_logo_wrap">
			<image :src="head" mode="aspectFill"></image>
			<span>游客</span>
		</view>
		
		<view class="item row_between" @tap="Yijian">
			<span>意见反馈</span>
			<span class="arraw"></span>
		</view>
		
		<view class="item row_between" @tap="about">
			<span>关于我们</span>
			<span class="arraw"></span>
		</view>
		
		<view class="item row_between" @tap="giveMoney">
			<span>打赏作者</span>
			<span class="arraw"></span>
		</view>
		
		
	</view>
</template>

<script>
	import { BASE_IMAGE_URL,getContentList } from "@/utils/api";
	import uniStatusBar from '@/components/mini_status_bar.vue';
	
	export default {
		components: {
			uniStatusBar
		},
		data() {
			return {
				head: BASE_IMAGE_URL+"head.png",
				scrollHeightVal: 0,
				titleStr: '我的'
			}
		},
		methods: {
			Yijian(){
				uni.showModal({
					title: '提示',
					content: '请发送邮件给我们反馈：\r\n 305475422@qq.com',
					showCancel: false,
					success(res) {
						if(res.confirm){
							uni.setClipboardData({
								data: '305475422@qq.com'
							});
							uni.showToast({
								title: '已经复制邮箱'
							});
						}
					}
				})
			},
			about(){
				uni.navigateTo({
					url: '/pages/about/about'
				})
			},
			giveMoney(){
				uni.previewImage({
					urls:[BASE_IMAGE_URL+"money.jpg"],
					current: 0
				})
			}
		},
		onLoad() {
			this.scrollHeightVal = this.initStatus();
		}
	}
</script>

<style>
	page{background: #EDEDED; }
	
	.head_logo_wrap{width: 100%; height: 300upx; display: flex; flex-direction: column; justify-content: center; 
		align-items: center; background: #FFFFFF; color: #000; font-size: 36upx; }
	.head_logo_wrap image{width: 140upx; height: 140upx; border-radius: 50%; margin-bottom: 20upx;}
	.item{height: 100upx; width: 100%; box-sizing: border-box; margin-top: 20upx;
		padding: 40upx; background: #FFF;}
		
	
</style>
