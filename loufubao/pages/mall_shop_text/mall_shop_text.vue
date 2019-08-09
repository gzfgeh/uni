<template>
	<view>
		<!-- <rich-text :nodes="detail"></rich-text> -->
		<!-- <web-view  src="https://mall.baobaoloufu.com/Home/Join/joinUs"></web-view> -->
		
		<!-- <uParse :content="detail" style="padding: 20upx; box-sizing: border-box;" v-if="detail"/> -->
		<rich-text :nodes="detail" v-if="detail" style="padding:0upx; box-sizing: border-box; margin-bottom: 160upx;"></rich-text>
		<div class="button row_between"  @tap="postOrder">
			<button>提交需求</button>
		</div>
		
	</view>
</template>

<script>
	
	import uParse from '@/components/uParse/src/wxParse.vue'
	
	import { BASE_IMAGE_URL,store_detail } from '@/utils/api'
	export default {
		components: {
			uParse
		},
		data() {
			return {
				detail: '',
				storeID:''
			}
		},
		methods: {
			async store_detail(id){
				let res = await store_detail({storeID: id});
				if(res.status == 1){
					// this.detail = res.data.store_detail;
					
					var body = res.data.store_detail.replace(/\<img/gi, '<img style="display:-webkit-box;width:100% !important;margin:0px auto !important;" ');
					this.detail = body;

				}
			},
			postOrder(){
				uni.navigateTo({
					url: '../mall_shop_text_detail/mall_shop_text_detail?storeID='+this.storeID
				})
			}
		},
		onLoad(opt) {
			this.storeID = opt.storeID;
			this.store_detail(this.storeID);
		}
	}
</script>

<style>
@import url("../../components/uParse/src/wxParse.css");

.button{width: 100%;height: 150upx;line-height: 150upx;background-color: #ffffff;padding:0upx 20upx;text-align: center;font-size: 28upx;position: fixed;
	bottom: 0upx;z-index: 1;box-shadow:0px 6upx 54upx 0px rgba(221,221,221,0.41);box-sizing: border-box;}
.button .text{margin: 0upx 10upx;}
.button .price{margin-right: 10upx; color: #FF5269; font-size: 32upx;}
.button button{margin: 40upx 10upx;flex:1;height: 94upx;line-height: 94upx;border-radius: 10upx;color: #ffffff;background-color: #427DFF;}


</style>
