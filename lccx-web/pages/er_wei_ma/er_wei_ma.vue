<template>
    <view class="content">
		<img src="../../static/img/baojia.png" mode="widthFix">
		<span>长按保存二维码转发至客户</span>
    </view>
</template>

<script>
	import { BASE_IMAGE_URL,basic,getVechileData } from "@/utils/api";

    export default {
		data(){
			return {
				
			}
		},
		onLoad () {
			
		  },
        methods: {
			
	
        }
    }
</script>

<style>
	.content{
		background-color: #F9F9F9;
		color: rgba(0,0,0,0.6);
		font-size: 36upx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;;
	}
	
	.content img{
		width: 444upx;
		height: 440upx;
		margin-bottom: 8upx;
	}
	
	
</style>
