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
					    var richtext=  this.detail;
						const regex = new RegExp('<img', 'gi');
						richtext= richtext.replace(regex, `<img style="max-width: 100%;"`);
					 
						this.detail = richtext;
				}
			}
		},
		onLoad() {
			this.aboutUs();
		}
	}
</script>

<style>
image{max-width:100%!important;}
img{max-width:100%!important;}
</style>
