<template>
	<view>
		<web-view :src="url"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url:''
			}
		},
		methods: {
			
		},
		onLoad(opt){
			this.url = opt.url
		}
	}
</script>

<style>

</style>
