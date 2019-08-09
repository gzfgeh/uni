<template>
	<view style="padding: 20upx;">
		<rich-text :nodes="detail"></rich-text> 
		
	</view>
</template>

<script>
	
	import { BASE_IMAGE_URL,member_store_info } from '@/utils/api'
	
	export default {
		data() {
			return {
				id: 0,
				detail: ''
			}
		},
		methods: {
			async member_store_info(){
				let res = await member_store_info(this.id);
				if(res.status == 1){
					this.detail = res.data.coupons_info;
					var richtext=  this.detail;
					const regex = new RegExp('<img', 'gi');
					richtext= richtext.replace(regex, `<img style="max-width: 100%;"`);
									 
					this.detail = richtext;
				}
			}
		},
		onLoad(opt){
			this.id = opt.id;
			this.member_store_info();
		}
	}
</script>

<style>

</style>
