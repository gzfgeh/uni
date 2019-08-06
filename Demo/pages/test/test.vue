<template>
	<view style="margin-top: 100upx;">
		<block v-for="(item, index) in list" :key="index">
			<img src="http://case.youzewang.com/static/img/sidao_logo.png" mode="widthFix">
		</block>
		
		<img src="../../static/img/tabbar/guanzhu.png" mode="widthFix" @click="goToTest">
		
	</view>
</template> 

<script>
export default {
	data() {
		return {
			list: [1,2,3,4,5,6,7,8]
		};
	},
	methods: {
		goToTest: function(){
			uni.navigateTo({
				url: '../test/test'
			})
		}
	}
};
</script>

<style lang="scss" scoped>
img{width: 150upx; margin-right: 50upx;}

</style>
