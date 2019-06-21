<template>
	<view class="content">
		<view class="top-text">下载专属二维码海报，客户购买，立得佣金</view>
		
		<view class="poster-warp" v-for="(item, index) in articles">
			<view class="left-box">
				<image src="../../static/img/poster_head.png" class="head-img"></image>
			</view>
			<view class="right-box">
				<view class="title">里程车险</view>
				<article class="article" v-html="item"></article>
				<image :src="posters[index]" class="poster" mode="widthFix" @click="showPic(posters[index])"></image>
				<view class="btn-warp">
					<view class="default" :class="'copy' + index" @tap="copyText('copy' + index)" :data-clipboard-text="item">复制文字</view>
					<view  class="primary" @tap="showPic(posters[index], true)">下载图片</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Clipboard from '../../common/clipboard.min.js'
	import {isWeiXin} from "@/utils/index.js"
	import { dlrLogin, getPosterImg} from "@/utils/api";
	import wxsdk from '@/utils/weixin-jsapi.js'
	
	export default {
		data() {
			return {
				articles: [
					"里程车险打破传统车险一刀切收费模式\n采用【开多少，付多少】全新收费方式\n公平、合理、创新\n价格减半，服务加倍\n你的车险你做主！\n快来戳下图体验吧！ ",
					"里程车险到底对什么人最划算？\n如果你是专车司机，我的建议是no\n如果你是货车司机，我的建议是no\n如果你是普通上班族：必须买！！！\n年行驶里程10000公里左右的用户\n购买里程车险最划算！ ",
					"里程车险保费减半，服务加倍\n除了传统车险提供的基本服务以外\n还具备驾驶行程回顾、车辆安防\n最关键的是还有紧急生命救援！！\n不仅服务于车，更是服务于人\n服务有价，生命无价！ ",
					"不怕不识货，就怕货比货\n里程车险月付保费，分担保费压力\n第一时间提供紧急生命救援\n比传统车险保费最低可节省40%\n连最懂车险的行内人都争相购买\n你还等什么？还不快戳下图体验！"
				],
				posters: [
					// '/static/img/info_one.png',
					// '/static/img/info_one.png',
					// '/static/img/info_one.png',
					// '/static/img/info_one.png'
				],
				needShow: false
			};
		},
		methods:{
			copyText(index) {
			  var clipboard = new Clipboard(`.${index}`);
			  clipboard.on('success', function(e) {
				wx.showToast({
					icon: 'none',
					title: '复制成功',
					duration: 1000
				})
			  });
			  
			  clipboard.on('error', function(e) {
				wx.showToast({
					icon: 'none',
					title: '长按文字复制',
					duration: 1000
				})
			  });
			},
			downloadImg() {
				wx.showToast({
					icon: 'none',
					title: '长按保存图片',
					duration: 1000
				})
			},
			showPic(pic, isDownLoad = false) {
				if(isDownLoad) {
					wx.showToast({
						icon: 'none',
						title: '长按保存图片',
						duration: 1000
					})
					setTimeout(() => {
						wxsdk.previewImage({
							current: pic,
							urls: [pic]
						});
					}, 1000)
				} else {
					wxsdk.previewImage({
						current: pic,
						urls: [pic]
					});
				}
			},
			async dlrLogin(){
				let openid = uni.getStorageSync("openid"); 
				let res = await dlrLogin(openid);
				
				if(res.code == 200){
					let token = res.token;
					if(token){
						uni.setStorageSync('token', token);
						this.getPosterImg();
					} else {
						uni.setStorageSync('registerBack', '/pages/dlr_poster/dlr_poster');
						uni.redirectTo({
							url: '/pages/dlr_register/dlr_register'
						})
					}
				}
			},
			async getPosterImg() {
				let res = await getPosterImg()
				if(res.code == 200 && res.images){
					this.posters = res.images
				}
			}
		},
		onReady() {
			let token = uni.getStorageSync("token");
			let openid = uni.getStorageSync("openid");
			
			if(!openid && isWeiXin()){
				openid = this.$root.$mp.query.open_id;
				if(!openid){
					let curUrl = window.location.href;
					openid = curUrl.split("open_id=")[1].split("#")[0];
				}
				uni.setStorageSync("openid", openid);
			}
			this.needShow = true
			this.dlrLogin()
		},
		onShow(){
			let token = uni.getStorageSync("token");
			if(token && this.needShow){
				this.getPosterImg()
			}
		}
	}
</script>

<style lang="less" scoped>
	.content{
		display: flex;
		flex: 1;
	}
	.top-text{
		height:34upx;
		font-size:24upx;
		color:rgba(59,59,67,0.6);
		line-height:34upx;
		text-align: center;
		margin-top: 50upx;
	}
	.poster-warp {
		padding-left: 50upx;
		padding-right: 50upx;
		margin-top: 30upx;
		display: flex;
		flex-direction: row;
		border-bottom: 2upx solid rgba(0,0,0,0.09);
		.left-box {
			.head-img {
				width: 80upx;
				height: 80upx;
			}
		}
		.right-box {
			margin-left: 20upx;
			.title {
				height:48upx;
				font-size:34upx;
				font-weight:500;
				color:rgba(92,104,147,1);
				line-height:48upx;
			}
			.article {
				white-space: pre-line;
				width: 550upx;
				margin-top: 10upx;
				font-size:28upx;
				line-height: 40upx;
				color:rgba(0,0,0,0.8);
				-webkit-user-select: text;
				user-select: text;
			}
			.poster {
				width: 184upx;
				margin-top: 40upx;
			}
			.btn-warp{
				margin-top: 40upx;
				margin-bottom: 38upx;
				position: relative;
				height: 60upx;
				.default {
					position: absolute;
					box-sizing: border-box;
					right: 180upx;
					width: 160upx;
					border: 2upx solid #427DFF;
					background-color: #fff;
					border-radius: 30upx;
					color: #427DFF;
					font-size: 28upx;
					height: 60upx;
					line-height: 60upx;
					text-align: center;
				}
				.primary {
					box-sizing: border-box;
					position: absolute;
					right: 0;
					width: 160upx;
					background-color: #427DFF;
					border-radius: 30upx;
					color: #ffffff;
					font-size: 28upx;
					height: 60upx;
					line-height: 60upx;
					text-align: center;
				}
			}
		}
	}
</style>
