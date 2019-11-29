<template>
	<view>
		<uni-status-bar
		:showBack="true" 
		@finishPage="backAction"
		:titleStr="titleStr"></uni-status-bar>
		
		<view class="item">
			<input type="text" v-model="address" placeholder="请输入IP地址" />
			
			<button type="primary" @tap="getIpAddressInfo">查询</button>
			
			<view v-if="ip">您的IP是：{{ip}}</view>
			<view v-if="addr">您的地址：{{addr}}</view>
		</view>
		
		 
		
	</view>
</template>

<script>
	import { BASE_IMAGE_URL,getIpAddressInfo } from "@/utils/api";
	import uniStatusBar from '@/components/mini_status_bar.vue';
	
	export default {
		components: {
			uniStatusBar
		},
		data() {
			return {
				phone_one: BASE_IMAGE_URL+"phone_one.png",
				phone_two: BASE_IMAGE_URL+"phone_two.png",
				scrollHeightVal: 0,
				titleStr: 'IP查询',
				address: '',
				ip: '',
				addr: ''
			}
		},
		methods: {
			backAction: function(){
				uni.navigateBack();
			},
			async getIpAddressInfo(){
				if(!this.address){
					uni.showToast({
						title: '请输入IP地址'
					});
					return;
				}
				let res = await getIpAddressInfo(this.address);
				if(res.code == 0){
					this.ip = res.data.ip;
					this.addr = res.data.country + res.data.city + res.data.region + res.data.isp
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
	page{background: #FFF;}
	.phone{width: 100%;}
	.item{padding: 40upx; }
	input{height: 80upx; line-height: 80upx; border-radius: 20upx; padding:0upx 20upx;
		border: 2upx solid #EDEDED; margin: 20upx auto;}
	button{margin: 20upx auto;}	
</style>
