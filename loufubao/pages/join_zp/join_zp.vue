<template>
	<view>
		<!-- <rich-text :nodes="detail"></rich-text> -->
		<!-- <web-view  src="https://mall.baobaoloufu.com/Home/Join/joinUs"></web-view> -->
		
		<uParse :content="detail" style="padding: 20upx; box-sizing: border-box;" v-if="detail"/>
		
	</view>
</template>

<script>
	
	import uParse from '@/components/uParse/src/wxParse.vue'
	
	import { BASE_IMAGE_URL,zhaopin } from '@/utils/api'
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
			async zhaopin(){
				let res = await zhaopin();
				if(res.status == 1){
					this.detail = res.data;
				}
			}
		},
		onLoad() {
			this.zhaopin();
		}
	}
</script>

<style>
@import url("../../components/uParse/src/wxParse.css");
</style>
