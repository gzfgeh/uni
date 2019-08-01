<template>
	<view >
		
		<div @click="callAndroid">验证手机号</div>
		<div @click="callLogin">一键登录</div>
		
	</view>
	
</template>

<script>
	
	// #ifdef APP-PLUS
		const dcRichAlert = uni.requireNativePlugin('GZF-YunPay');
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
				const msg = JSON.stringify(result);
				let type = msg.type;
				uni.showToast({
				  icon: 'none',
				  title: type,
				  duration: 1000
				});
			});
		},
		callLogin: function(){
			dcRichAlert.eLogin({
				title: "123"
			}, result => {
				const msg = JSON.stringify(result);
				let type = msg.type;
				uni.showToast({
				  icon: 'none',
				  title: type,
				  duration: 1000
				});
			});
		}
		
	}
};
</script>

<style>
	
</style>
