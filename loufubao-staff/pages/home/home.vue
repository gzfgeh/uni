<template>
	<view class="contain col">
		<image src="../../static/img/hexiao.png" mode="aspectFill"></image>
		<image src="../../static/img/jilu.png" mode="aspectFill" @tap="goToRecords"></image>
	</view>
	
</template>

<script>
	export default {
	data() {
		return {
		};
	},
	onLoad() {
	},
	methods: {
		goToRecords(){
			uni.navigateTo({
				url:'/pages/records/records'
			})
		}
	}
};
</script>

<style>
	page{height: 100%; background: #F5F5F5; }
	.contain{padding: 60upx 40upx;}
	.contain image{height: 240upx; width: 100%;  margin-bottom: 40upx; border-radius: 10upx;}
</style>
