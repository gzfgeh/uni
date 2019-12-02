<template>
	<view class="content row_center">
		<image :src="splash" mode="aspectFill" class="bg"></image>
		
		
				
	</view>
</template>

<script>
	import { BASE_IMAGE_URL,getOpenid,userInfoSave,bindUser,getConfig,getUserInfo } from "@/utils/api";
	
	export default {
		data() {
			return {
				splash: BASE_IMAGE_URL + "splash.gif",
				code: 0,
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
					// uni.switchTab({
					// 	url:'/pages/main/main'
					// })
					this.userInfoSave({m_openid: result.openid});
				}else{
					this.getUserInfo(this.openid);
				}
				
			},
			async userInfoSave(params){
			  let res = await userInfoSave(params);
			  console.log(res);
			  if(res.code == 1000){
				this.getUserInfo(params.m_openid);
			  }else{
				  uni.showToast({
				  	icon: 'none',
				  	title: res.msg,
				  	duration: 1000
				  });
			  }
			},	
			async bindUser(){
				let params = {
					m_openid: this.openid
				};
				let res = await bindUser(params);
				if(res.code == 1000){
					uni.switchTab({
						url:'/pages/main/main'
					})
				}
			},
			async getUserInfo(openid){
				let res = await getUserInfo(openid);
				console.log(res);
				if(res.code == 1000){
					if(res.data && res.data.m_avatar && res.data.m_nickname){
						uni.setStorageSync('userInfo',res.data);
					};
					uni.switchTab({
						url:'/pages/main/main'
					})
				}
			}
		},
		onLoad() {
			setTimeout(() => {
				let openid = uni.getStorageSync('openid');
				if(openid){
					let userInfo =  uni.getStorageSync('userInfo');
					if(userInfo){
						uni.switchTab({
							url:'/pages/main/main'
						})
					}else{
						this.getUserInfo(openid);
					}
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
	
	image{will-change: transform}
	
</style>
