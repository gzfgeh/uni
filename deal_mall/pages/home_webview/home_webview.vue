<template>
	<view>
		<web-view :webview-styles="webviewStyles" :src="src"></web-view>
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
				src: 'https://bay.2donghua.com/m.html'
			}
		},
		methods: {
			
		},
		onLoad(opt) {
			console.log(opt.vrUrl);
			this.src = opt.vrUrl;
			this.$forceUpdate();
		}
	}
</script>

<style>

</style>
