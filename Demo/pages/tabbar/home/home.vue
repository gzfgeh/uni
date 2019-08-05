<template>
	<view style="padding-top: 200upx;">
		
		<button @click="callAndroid">验证手机号</button>
		<button @click="callLogin" style="margin-top: 100upx;">一键登录</button>
		
	</view>
	
</template>

<script>
	
	// #ifdef APP-PLUS
		// const dcRichAlert = uni.requireNativePlugin('GZF-YunPay');
		const ShanYanSDKModule = uni.requireNativePlugin('DCloud-RichAlert');
	// #endif
	
	
	export default {
	data() {
		return {
		};
	},
	onLoad() {
	},
	methods: {
		callAndroid: function(){
			dcRichAlert.show({
				title: "456"
			}, result => {
				let type = result.type;
				if(parseInt(type) == 1){
					uni.showToast({
					  icon: 'none',
					  title: "成功",
					  duration: 1000
					});
				}else{
					uni.showToast({
					  icon: 'none',
					  title: "失败",
					  duration: 1000
					});
				}
				
			});
		},
		callLogin: function(){
			dcRichAlert.eLogin({
				title: "123"
			}, result => {
				let type = result.type;
				if(parseInt(type) == 1){
					uni.showToast({
					  icon: 'none',
					  title: "成功",
					  duration: 1000
					});
				}else{
					uni.showToast({
					  icon: 'none',
					  title: "失败",
					  duration: 1000
					});
				}
			});
		}
		
	}
};
</script>

<style>
	
</style>
