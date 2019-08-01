<template>
	<view >
		
		<div @click="callAndroid">验证手机号</div>
		<div @click="callAndroid">一键登录</div>
		
	</view>
	
</template>

<script>
	
	import { BASE_IMAGE_URL,getShareData } from '@/utils/api'
	// var statusBarHeight = uni.getSystemInfoSync().statusBarHeight + 'px'
	// #ifdef APP-PLUS
		const dcRichAlert = uni.requireNativePlugin('dzt');
	// #endif
	
	import weixin_sdk from '../../../utils/weixin-jsapi.js';
	
	export default {
	data() {
		return {
			buildingName:"请选择楼宇",
			itemList: [],
			contentList:[],
			msg : [],
			t_url: '',
			curIndex: 0,
			contentCurIndex: 0,
			statusBarHeight: 0,
			msgCount: 0,
			showBg: 0,
			isAPP: false,
			paddingValue: '',
			shopList: []
		};
	},
	onLoad() {
		
		// this.getShareData();
	},
	methods: {
		callAndroid: function(){
			dcRichAlert.show({
				title: rn
			}, result => {
				const msg = JSON.stringify(result);
				let type = msg.type;
				if(type == "-1"){
					uni.showToast({
					  icon: 'none',
					  title: '请安装云闪付APP',
					  duration: 1000
					});
				}else{
					uni.showToast({
					  icon: 'none',
					  title: type,
					  duration: 1000
					});
				}
			});
		},
		async getShareData(){
			let res = await getShareData(window.location.href.split('#')[0]);
			if(res.code == 1000){
				this.initWeiXin(res.data);
			}
		},
		initWeiXin(result){
			weixin_sdk.config({
					debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
					appId: 'wx619e8821f163f2cc', // 必填，企业号的唯一标识，此处填写企业号corpid
					timestamp: result.timestamp, // 必填，生成签名的时间戳
					nonceStr: result.noncestr, // 必填，生成签名的随机串
					signature: result.signature,// 必填，签名，见附录1
					jsApiList: ['onMenuShareAppMessage','onMenuShareTimeline'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
			});
			
			weixin_sdk.ready(function(){
					//分享给朋友
				  weixin_sdk.onMenuShareAppMessage({
					title: 'title', // 分享标题
					desc: 'desc', // 分享描述
					link: window.location.href.split('#')[0], // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
					imgUrl: 'https://www.baidu.com/img/bd_logo1.png', // 分享图标
					success: function () {
					  // 用户确认分享后执行的回调函数
					},
					cancel: function () {
					  // 用户取消分享后执行的回调函数
					}
				  })

				  //分享到朋友圈
				  weixin_sdk.onMenuShareTimeline({
					title: 'title', // 分享标题
					link: window.location.href.split('#')[0], // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
					imgUrl: 'https://www.baidu.com/img/bd_logo1.png', // 分享图标
					success: function () {
					  // 用户确认分享后执行的回调函数
					},
					cancel: function () {
					  // 用户取消分享后执行的回调函数
					}
				  })
			});
		},
		
		
	}
};
</script>

<style>
	page{height: 100%; background: #F5F5F5; }
.content {position: relative; color: #666666; font-size: 24upx; height: 100upx;}
.head_bg{ width: 100%; height: 360upx;position: absolute;top: -124upx; left: 0upx;z-index: 1;}
.head_bg img{height: 360upx; width: 100%;}

.top_style{padding-top: 120upx!important;}

.swiper_wrap{position: relative;width: 96%; height: 360upx;margin: 20upx auto 0 auto;z-index: 2;box-sizing: border-box;border-radius: 20upx;}
.head_img{width: 100%;height: 360upx!important;border-radius: 10upx;box-shadow: 0 0 10px #999;}
.head_img swiper-item{border-radius: 20upx;}

.dots{display: flex;flex-direction: row;justify-content: center;align-items: center;position: absolute;bottom: 40upx;height: 20upx;width: 100%;z-index: 100;}
.dot_normal{width: 10upx;height: 10upx;border-radius: 50%;background-color: #E0E5ED;margin: 0upx 6upx;position: relative;z-index: 100;}
.active{width: 30upx;height: 10upx;border-radius: 30%;background-color: #107EFF;z-index: 100;}

.home_head_wrap{width: 100%; color: #FFFFFF;font-size: 24upx; padding: 0upx 20upx 0upx 20upx; box-sizing: border-box; top: 80upx; position: fixed;z-index: 2000; }
.home_head_left span{font-size: 36upx; overflow: hidden;max-width: 260upx;white-space: nowrap;text-overflow:ellipsis;}
.home_head_left img{width: 30upx; height: 36upx; margin-right: 10upx;}
.msg_wrap{position: relative; height: 100%;}
.msg_wrap img{width: 30upx; height: 34upx;}
.red_hot{width: 10upx; height: 10upx; position: absolute;right: 0upx; top: 0upx;background-color: red; z-index: 2;border-radius: 50%;}

.gonggao_wrap{height: 90upx; background: #fff;box-shadow:  0px 0px 10px #fff;width: 94%; margin:0upx 3%; padding: 0upx 22upx;box-sizing: border-box;border-radius: 8upx; font-size: 28upx; color: #333;}
.gonggao_wrap img{width: 128upx; margin-right: 20upx;}

.scan_img{width: 28upx;height: 100%;}
.search_icon{width: 30upx;margin: 0upx 50upx; height: 100%;}

.content_wrap{width: 94%; margin-left: 3%; height:340upx;box-sizing:border-box;background: #fff;box-shadow:  0px 0px 10px #fff;margin-top: 30upx;border-radius: 8upx; flex-flow: wrap;}
.content_wrap .flex_one{min-width: 160upx;font-size: 24upx; color: #666; height: 170upx;}
.content_wrap img{width: 80upx; margin-bottom: 10upx;}

.build_wrap{width: 94%; margin-left: 3%;box-sizing:border-box;background: #fff;box-shadow:  0px 0px 10px #fff;margin-top: 30upx;border-radius: 8upx;height: 120upx; font-size: 24upx;color: #666;}
.build_wrap img{width: 56upx; margin-right: 14upx;}
.build_wrap .line{width: 2upx; height: 56upx;background: #E7E7E7;}
.build_wrap .flex_one{height: 100%;}

.center_wrap{width: 100%; margin-left: 0%;box-sizing:border-box;margin-top: 30upx;}

.bottom_wrap{padding: 5%; box-sizing: border-box; }
.bottom_wrap img{width: 100%; margin-bottom: 60upx;}

.recommand_one{background: #fff;box-shadow:  0px 0px 10px #fff;width: 94%; margin-left: 3%;margin-top: 30upx; display: flex; flex-direction: column;}
.recommand_one .item{padding:30upx; color: #999999; font-size: 24upx; border-bottom: 2upx solid #F0F0F0;}
.recommand_one .item img{width: 10upx; height: 18upx; margin-left: 10upx;}
.recommand_one .item .title{color: #FF5E43; font-size: 44upx;}
.recommand_one .recommand_item{display: flex; flex-direction: row;}
.recommand_one .recommand_item img{width: 320upx; height: 360upx;}
.recommand_one .recommand_item .right_wrap{flex: 1; display: flex;flex-direction: column;}
.recommand_one .recommand_item .right{flex: 1; border-bottom: 2upx solid #F0F0F0; padding-right: 20upx; box-sizing: border-box;}
.recommand_one .recommand_item .right img{width: 124upx; height: 124upx;}
.recommand_one .recommand_item .right .right_item{padding: 20upx; display: flex;flex-direction: column;color: #666666; font-size: 24upx;}
.recommand_one .recommand_item .right .right_item .name{color: #333333; font-size: 28upx;}
.recommand_one .recommand_item .right .desc{text-overflow: ellipsis; overflow: hidden;display: -webkit-box;
            -webkit-line-clamp:2;
            -webkit-box-orient: vertical;}

.nav{display: flex; flex-direction: row;width: 100%;border-bottom: rgb(249,249,249) solid 15upx; box-sizing: border-box;}
.nav-item{display: flex; flex-direction: column; padding-top: 30upx; flex: 1; display: inline-block; border-right: 2upx solid #F0F0F0;}
.nav img{width: 160upx; height: 160upx; text-align: center;}
.nav .scroll_content_wrap{display: flex; flex-direction: column; height: 150upx; justify-content: space-between; padding: 10upx 10upx 10upx 20upx; box-sizing: border-box;}
.nav .scroll_content_wrap span{text-overflow: ellipsis; overflow: hidden;width: 210upx;white-space: normal; display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;}
.nav .scroll_content_wrap .desc{color: #666666; font-size: 24upx;}

.recommand_two{background: #fff;box-shadow:  0px 0px 10px #fff;width: 94%; margin-left: 3%;margin-top: 30upx; display: flex; flex-direction: column;}
.recommand_two .item{padding:30upx; color: #999999; font-size: 24upx; border-bottom: 2upx solid #F0F0F0;}
.recommand_two .item img{width: 10upx; height: 18upx; margin-left: 10upx;}
.recommand_two .item .title{color: #32BF3D; font-size: 44upx;}

.list_item .item_wrap{width: 100%;box-sizing: border-box;padding-left: 30upx; background: #FFFFFF; }
.list_item .item{display: flex;flex-direction: row;border-bottom: #E3E3E3 solid 2upx; padding: 35upx 0upx; font-size: 28upx; color: #666666;}
.list_item .item img{width: 185upx; height: 185upx;border-radius: 8upx; margin-right: 32upx;}
.list_item .item .content_item{display: flex; flex-direction: column; justify-content: space-between;flex: 1; padding-right: 30upx;}
.list_item .item .content_item .title{color: #333333; font-size: 28upx;}
.list_item .item .content_item .content{color: #666666; font-size: 24upx;}
.list_item .item .content_item .tag_wrap span{color: #F88415; font-size: 24upx; background: #FFF2E9; border-radius:5upx; margin-right: 10upx; padding: 5upx;}

</style>
