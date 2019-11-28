<template>
	<view>
		<uni-status-bar
		:showBack="true" 
		@finishPage="backAction"
		:titleStr="titleStr"></uni-status-bar>
		
		<input type="text" v-model="address" placeholder="请输入IP地址" />
		<button type="primary" @tap="query">查询</button>
		
		<view>您的IP是：{{ip}}</view>
		<view>您的地址：{{addr}}</view>
		 
		
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
		}
	}
</script>

<style>
	page{background: #FFF;}
	.phone{width: 100%;}
</style>
