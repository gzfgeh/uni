<template>
	<view class="content row_center">
		<image :src="bg" mode="aspectFill" class="bg"></image>
		<image :src="loading" mode="widthFix" class="gif"></image>
		
		
				
	</view>
</template>

<script>
	import { BASE_IMAGE_URL,getOpenid,userInfoSave,bindUser,getConfig,getUserInfo } from "@/utils/api";
	
	export default {
		data() {
			return {
				bg: BASE_IMAGE_URL + "splash_bg.png",
				loading: BASE_IMAGE_URL + "splash_loading.gif",
				code: 0,
				    showModal: false,
				    canIUse: wx.canIUse('button.open-type.getUserInfo'),
				    avatar: '',
				    nickname: '',
				    gender: 0,
				    city:"Shangqiu",
				    country:"China",
				    language:"zh_CN",
				    province:"Henan",
				    openid: ''
			};
		},
		methods:{
			login: function(){
			      let that = this;
			      wx.login({
			        success: function (res) {
			          if (res.code) {
			            console.log(res.code);
			            that.code = res.code;
			            wx.setStorageSync("code", that.code);
			            that.getOpenid(res.code);
			          } else {
			            console.log('获取用户登录态失败！' + res.errMsg)
			          }
			        },
			        fail: function(err){
			          console.log(err);
			        }
			      });
			    },
			async getOpenid(code){
			    let that = this;
			    let result = await getOpenid(code);
			    console.log(result);
				this.openid = result.openid;
			    wx.setStorageSync('openid', result.openid);
				if(result.exist == 0){
					// 不存在
					this.getConfig();
				}else{
					this.getUserInfo(this.openid);
				}
				
			},
				
			async bindUser(){
				let params = {
					m_openid: this.openid
				};
				let res = await bindUser(params);
				if(res.code == 1000){
					uni.redirectTo({
						url:'/pages/main/main'
					})
				}
			},
			async getConfig(){
				let res = await getConfig();
				if(res.code == 1000){
					if(res.data.reg_type == 2){
						// code 验证
						uni.reLaunch({
							url: '../codePage/codePage'
						})
					}else{
						// 验证码验证
						uni.reLaunch({
							url: '../bindPage/bindPage'
						})
					}
				}
			},
			async getUserInfo(openid){
				let res = await getUserInfo(openid);
				console.log(res);
				if(res.code == 1000){
					if(res.data && res.data.m_avatar && res.data.m_name){
						uni.setStorageSync('userInfo',res.data);
					}
					uni.redirectTo({
						url:'/pages/main/main'
					})
				}else{
					this.getConfig();
				}
			}
		},
		onLoad() {
			setTimeout(() => {
				let openid =  uni.getStorageSync('openid');
				if(openid){
					this.getUserInfo(openid);
				}else{
					this.login();
				}
			}, 3000);
		}
	}
</script>

<style lang="scss">
	.content {width: 100vw;height: 100vh;}
	.bg{width: 100vw;height: 100vh; position: fixed;top: 0upx; left: 0upx; z-index: 1;}
	.gif{width: 100vw;position: relative;z-index: 2;}
	image{will-change: transform}
	
</style>
