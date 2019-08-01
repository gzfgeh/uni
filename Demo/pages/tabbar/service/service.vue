<template>
	<view></view>
</template> 

<script>
export default {
	data() {
		return {
			isAPP: false,
			buildingName:"请选择楼宇",
			itemList: [],
			t_url: '',
			curIndex: 0,
			contentCurIndex: 0,
			statusBarHeight: 0,
			typeList: [],
			typeIndex: 0,
			list: []
		};
	},
	methods: {
	}
};
</script>

<style lang="scss" scoped>
.contain{background-color: #ffffff;}

.content {height: 400upx;position: relative;}
.head_img{width: 100%;height: 400upx!important;}

.dots{display: flex;flex-direction: row;justify-content: center;align-items: center;position: absolute;bottom: 20upx;height: 20upx;width: 100%;z-index: 100;}
.dot_normal{width: 10upx;height: 10upx;border-radius: 50%;background-color: #E0E5ED;margin: 0upx 6upx;position: relative;z-index: 100;}
.active{width: 24upx;height: 10upx;border-radius: 40%;background-color: #107EFF;z-index: 100;}
.home_head_wrap{position: absolute;background: -webkit-linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0)); width: 100%; color: #FFFFFF; font-size: 24upx; padding: 0upx 20upx 20px; box-sizing: border-box;top:0upx;}
.home_head_left span{font-size: 24upx; overflow: hidden;width: 130upx;white-space: nowrap;text-overflow:ellipsis;}
.home_head_left img{width: 24upx; height: 24upx; margin-left: 5upx;}
.msg_wrap{position: relative;}
.msg_wrap img{width: 50upx; height: 40upx;}
.red_hot{width: 20upx; height: 20upx; position: absolute;right: 0upx; top: 0upx;background-color: red; z-index: 2;border-radius: 50%;}

.search_wrap{position: relative;border-radius: 36upx; background-color: rgba(244, 244, 244, 0.75); flex: 1;height: 72upx; margin: 0upx 20upx; padding-left: 20upx; color: #9B9B9B; font-size: 28upx;}
.search_wrap img{width: 28upx; height: 28upx; margin-right: 20upx;}

.nav_wrap{height: 114upx;background-color: #FFFFFF;}
.nav_item{flex: 1;color: #666666; font-size: 24upx;}
.nav_item img{width: 32upx; height: 32upx;margin-bottom: 10upx;}

.left,.right{display: inline-block;  vertical-align: top;  width: 44%;}
.left{margin: 20upx 2% 20upx 4%}
.right{margin: 20upx 4% 20upx 2%}
.card-img{width: 100%;}
.card-title{font-size: 24upx; color: #333333; display: inline-block; margin: 0upx 16upx 20upx;}
.card{box-shadow: 0px 4px 12px 0px rgba(126,125,125,0.14); width: 100%; margin: 20upx 0upx; border-radius: 20upx;}
.itemlist{ background-color: #fff;  margin: 1%;   margin-bottom: 20upx;  display: inline-block;  } 

.mall_wrap{background: #FFF;  margin:20upx 30upx; box-sizing: border-box;}
.mall_wrap img{width:40%; height: 80upx; box-shadow:0px 4px 12px 0px rgba(126,125,125,0.14);}
.mall_wrap .mall{margin-right: 20upx;}
.type_active{color: #107EFF}


</style>
