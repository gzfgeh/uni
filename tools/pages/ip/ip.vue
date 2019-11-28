<template>
	<view>
		<uni-status-bar
		:showBack="true" 
		@finishPage="backAction"
		:titleStr="titleStr"></uni-status-bar>
		
		<scroll-view class="content" scroll-y="true"
			scroll-with-animation="true" :style="{'height' : scrollHeightVal+'px'}"  >
			
			<image :src="phone_one" mode="widthFix" class="phone"></image>
			<image :src="phone_one" mode="widthFix" class="phone"></image>
			
			
			
			
		</scroll-view>
		
		 
		
	</view>
</template>

<script>
	import { BASE_IMAGE_URL } from "@/utils/api";
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
				titleStr: 'IP查询'
			}
		},
		methods: {
			backAction: function(){
				uni.navigateBack();
			},
			
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
