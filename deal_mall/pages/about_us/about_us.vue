<template>
	<view style="padding: 20upx;">
		<rich-text :nodes="detail"></rich-text> 
	</view>
</template>

<script>
	import { BASE_IMAGE_URL,aboutUs } from '@/utils/api'
	
	export default {
		data() {
			return {
				detail: ''
			}
		},
		methods: {
			async aboutUs(){
				let res = await aboutUs();
				if(res.code == 1000){
					this.detail = res.data.i_detail;
				}
			}
		},
		onLoad() {
			this.aboutUs();
		}
	}
</script>

<style>

</style>
