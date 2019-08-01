<template>
	<view></view>
</template>

<script>
	export default {
		data() {
			return {
				itemList: [],
				t_url: '',
				buildingName:"请选择楼宇",
				curIndex: 0,
				list: [],
				teMaiList: [],
				timeList: [],
				couponList: [],
				curTimeIndex: 0,
				curTypeIndex: 0,
				isAPP:true,
				loadingText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
				loadingType: 0,
				page: 1,
				imageList: []
			}
		},
		methods: {
		}
	}
</script>

<style>
.time_item{position: relative; height: 100upx; flex: 1; line-height: 40upx;border-right: 2upx solid #E3E3E3;}	
.time_item img{width: 100%; height: 110upx; position: absolute;top: 0upx; left: 0upx; z-index: -1;}
.time_item .time{color: #26262D; font-size: 20upx;}
.time_item .text{color: #CCCCCC; font-size: 24upx;}
.time_item .active{color: #FFFFFF!important;}
	
	
.fuli-top{position: fixed;text-align: center;height:120upx;top:0px;box-shadow:0px 6upx 54upx 0px rgba(221,221,221,0.41);width:100%;z-index:1000;
background: #fff;width:100%;left:0; }
.fuli-top .left-col{position: absolute;left:30upx;font-size:22upx;}
.fuli-top .left-col div{width:80upx;line-height: 36upx;padding-top:30upx;color:#666;}
.fuli-top .left-col img{width:32upx;position: absolute;right:-40upx;top:52upx;}
.fuli-top .right-col div{font-size:22upx;color:#7A7A7A;position: relative;top:-8px;}

.fuli-top .right-col img{width:36upx;margin-top:20px;}
.fuli-top .right-col{position: absolute;right:0;padding:0upx 20upx;}

.fuli-top .middle-col{color:#333;font-size:32upx;color:#999999;line-height: 104upx;}
.fuli-top .middle-col span{display: inline-block;position: relative;padding:0 12upx;}
.fuli-top .middle-col span.active{color:#333;display: inline-block;}
.fuli-top .middle-col span.active:after{content: " ";width:50upx;margin-left:-25upx;height:8upx;background: #107EFF;bottom:4upx;border-radius:6upx;position:absolute;left:50%;display: block;}

.content {height: 400upx;position: relative; margin-top: 140upx;}
.head_img{width: 100%;height: 400upx!important;}
.dots{display: flex;flex-direction: row;justify-content: center;align-items: center;position: absolute;bottom: 20upx;height: 20upx;width: 100%;z-index: 100;}
.dot_normal{width: 10upx;height: 10upx;border-radius: 50%;background-color: #E0E5ED;margin: 0upx 6upx;position: relative;z-index: 100;}
.content .active{width: 30upx;height: 10upx;border-radius: 30%;background-color: #107EFF;z-index: 100;}


.head_wrap .active{width: 60upx;height: 10upx;border-radius: 10upx;background-color: #107EFF;z-index: 100;position: absolute;bottom: 10upx; left: 50%; margin-left: -30upx;}
.head_wrap{height: 120upx;}
.head_wrap div{height: 120upx; margin-right: 10upx; position: relative;display: flex;flex-direction: row;}

.fuli-list{padding-bottom:40upx;}
.fuli_wrap{height:230upx;width:94%;border:1px solid rgba(243, 243, 243, 1);
			box-shadow:0px 2px 6px 0px rgba(126,125,125,0.14);position: relative;margin:20upx 3%;box-sizing: border-box;}
.fuli_wrap .item_bg{position: absolute;top: 0upx; left: 0upx; height: 100%; width: 100%;z-index: -1; }
.fuli_wrap .content_wrap{height: 100%; padding: 25upx; box-sizing: border-box;}
.fuli_wrap .address{display: flex;flex-direction: row; align-items: center;}
.fuli_wrap .coupon_image{width:180upx;height:180upx; margin-right: 20upx;}
.fuli_wrap .content_item{display: flex; flex-direction: column; color: #666; font-size: 24upx; height: 100%;}
.fuli_wrap .content_item .name{color: #333333; font-size: 32upx;}
.fuli_wrap .weizhi{width:22upx;font-size:12px;font-weight:400;color:#666;line-height:14px;}
.fuli_wrap .biaoti{font-size:16px;padding-top:44upx;padding-bottom:12upx;font-weight:bold; max-width: 320upx;
			color:rgba(51,51,51,1);line-height:40upx;}
.fuli_wrap .weizhi img{width:24upx;position: relative;top:6upx;}
.fuli_wrap .riqi{color:#999;font-size:11px;position: absolute;bottom:20upx;}
.fuli_wrap .time{font-size: 22upx; color: #999;align-self: flex-end; display: flex; flex-direction: row;}
.fuli_wrap .lingqu{position: absolute;right:0;top:0;font-size:30upx;color:#fff;text-align: center;width:132upx;height:230upx;box-sizing: border-box;padding-top:64upx;}

.temai_wrap{box-shadow:0px 2px 6px 0px rgba(126,125,125,0.14);display: flex;flex-direction: column;width:94%;margin:20upx 3%;}
.temai_wrap img{width: 100%; height: 300upx;}
.temai_wrap .content_wrap{padding: 15upx 26upx;}
.temai_wrap .content_wrap .price_wrap{display: flex; flex-direction: column; color: #333; font-size: 28upx;}
.temai_wrap .content_wrap .price_wrap .price{color: #FF5269; font-size: 36upx;}
.temai_wrap .content_wrap .btn{color: #ffffff; font-size: 28upx; padding: 10upx 36upx;background: #107EFF;border-radius: 10upx;}

.name_wrap{}
.name_wrap img{border-radius: 50%; margin-right: 10upx; width: 50upx; height: 50upx;}

.temai_top{margin-top: 180upx;}
.lou_text{text-overflow: ellipsis;
display: -webkit-box;
-webkit-line-clamp: 2;
-webkit-box-orient: vertical;
overflow: hidden; max-width: 60px; font-size: 24upx;
}
</style>
