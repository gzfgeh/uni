<template>
	<view>
		<div class="search_wrap">
			<div class="input_wrap row">
				<img src="https://bay.2donghua.com/web/statics/wxapp/images/icon-search.png" mode="widthFix">
				<!-- <span>搜索</span> -->
				<input type="text" value="" />
			</div>
			
			<span class="cancle_btn" @click="back">取消</span>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			back: function(){
				uni.navigateBack({
					delta: 1
				});
			}
		}
	}
</script>

<style>
.search_wrap{padding: 16upx 24upx; display: flex; flex-direction: row; justify-content: center; align-items: center;}
.input_wrap{display: flex; flex-direction: row;background: #fff; border: 1upx solid #E3E3E3;
	border-radius: 10upx; flex: 1; margin-right: 24upx; color: #000; padding: 0upx 20upx; font-size: 24upx;}
.input_wrap img{margin-right: 10upx; width: 26upx;}
.input_wrap input{flex: 1; margin-left: 20upx; height: 160upx;}
.cancle_btn{height: 64upx; line-height: 64upx; color: #00c203; }
</style>
