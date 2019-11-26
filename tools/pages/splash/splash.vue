<template>
	<view class="content row_center">
		<image :src="bg" mode="aspectFill" class="bg"></image>
		<image :src="loading" mode="widthFix" class="gif"></image>
		
		
				
	</view>
</template>

<script>
	import { BASE_IMAGE_URL } from "@/utils/api";
	
	export default {
		data() {
			return {
				bg: BASE_IMAGE_URL + "splash_bg.png",
				loading: BASE_IMAGE_URL + "splash_loading.gif"
			};
		},
		methods:{
		},
		onLoad() {
			setTimeout(() => {
				uni.redirectTo({
					url:'/pages/main/main'
				})
			}, 3000);
		}
	}
</script>

<style lang="scss">
	.content {width: 100vw;height: 100vh;}
	.bg{width: 100vw;height: 100vh; position: fixed;top: 0upx; left: 0upx; z-index: 1;}
	.gif{width: 100vw;position: relative;z-index: 2;}
	image{will-change: transform}
	
</style>
