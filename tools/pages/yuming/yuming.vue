<template>
	<view>
		<uni-status-bar 
		:showBack="true" 
		@finishPage="backAction"
		:titleStr="titleStr"></uni-status-bar>
		
		<view class="item">
			<input type="text" v-model="address" placeholder="请输入域名地址" />
			
			<button type="primary" @tap="getHostByName">查询</button>
			
			<view v-if="ip">您的IP是：{{ip}}</view>
		</view>
		
		
	</view>
</template>

<script>
	import { BASE_IMAGE_URL,getHostByName } from "@/utils/api";
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
				address: '',
				ip: ''
			}
		},
		methods: {
			backAction: function(){
				uni.navigateBack();
			},
			async getHostByName(){
				if(!this.address){
					uni.showToast({
						title: '请输入域名地址'
					});
					return;
				}
				let res = await getHostByName(this.address);
				if(res.code == 1000){
					this.ip = res.data;
					// this.addr = res.data.country + res.data.city + res.data.region + res.data.isp
				}
			}
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
									that.address = res.data;
								};
								uni.setClipboardData({
									data: '',
									complete() {
										uni.hideToast();
									}
								})
							}
						})
					}
					
				}
			});
		}
	}
</script>

<style>
	page{background: #F5F5F5;}
	.item{padding: 40upx; }
	input{height: 80upx; line-height: 80upx; border-radius: 20upx; padding:0upx 20upx;
		border: 2upx solid #EDEDED; margin: 20upx auto;}
	button{margin: 20upx auto;}	
	
</style>
