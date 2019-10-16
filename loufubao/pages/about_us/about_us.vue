<template>
	<view style="padding: 20upx;">
		<rich-text :nodes="detail"></rich-text>
		<!-- <web-view  src="https://mall.baobaoloufu.com/Home/Join/joinUs"></web-view> -->
		
		<!-- <uParse :content="detail" style="padding: 20upx; box-sizing: border-box;" v-if="detail"/> -->
		
	</view>
</template>

<script>
	
	import uParse from '@/components/uParse/src/wxParse.vue'
	
	import { BASE_IMAGE_URL,about_us } from '@/utils/api'
	export default {
		components: {
			uParse
		},
		data() {
			return {
				detail: ''
			}
		},
		methods: {
			async about_us(){
				let res = await about_us();
				if(res.status == 1){
					this.detail = res.data;
					var richtext=  this.detail;
					const regex = new RegExp('<img', 'gi');
					richtext= richtext.replace(regex, `<img style="max-width: 100%;"`);
				 
					this.detail = richtext;
				}
			}
		},
		onLoad() {
			this.about_us();
		}
	}
</script>

<style>
@import url("../../components/uParse/src/wxParse.css");
</style>
