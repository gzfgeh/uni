<template>
	<view class="contain">
		<web-view :webview-styles="webviewStyles" :src="url" @message="postMessage"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				webviewStyles: {
                    progress: {
                        color: '#FF3333'
                    }
                },
				url: ''
			}
		},
		methods: {
			postMessage(evt){
				console.log('接收到的消息：' + JSON.stringify(evt));
			}
		},
		onLoad(opt){
			this.url = opt.url;
			console.log(this.url);
			if(!this.url){
				this.url = "http://pc.baobaoloufu.com"
			}else{
				this.url += "?userID="+uni.getStorageSync("userInfo").userID+"&v=1"
			}
		}
	}
</script>

<style>
.contain{overflow: auto; background: #FFFFFF;}
</style>
