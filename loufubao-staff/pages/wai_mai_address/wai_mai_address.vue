<template>
	<view style="padding: 20upx;">
		<rich-text :nodes="detail" style=" box-sizing: border-box; font-size: 20px;" v-if="detail"></rich-text>
		<!-- <web-view  src="https://mall.baobaoloufu.com/Home/Join/joinUs"></web-view> -->
		
		<!-- <uParse :content="detail" style="padding: 20upx; box-sizing: border-box; font-size: 30px;" v-if="detail"/> -->
		
	</view>
</template>

<script>
	
	import uParse from '@/components/uParse/src/wxParse.vue'
	
	import { BASE_IMAGE_URL,takeawayForBuilding } from '@/utils/api'
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
			async takeawayForBuilding(){
				let res = await takeawayForBuilding(uni.getStorageSync("userInfo").buildingID);
				if(res.status == 1){
					if(res.data){
						this.detail = res.data.announcement;
					}
					
				}
			}
		},
		onLoad() {
			this.takeawayForBuilding();
		}
	}
</script>

<style>
@import url("../../components/uParse/src/wxParse.css");
</style>
