<template>
	<view class="contain">
		<div class="head_wrap">
			<img src="https://bay.2donghua.com/web/statics/wxapp/images/icon-wechatapp.png" mode="aspectFill">
		</div>
		
		<div class="apply_info">申请获取以下权限</div>
		<div class="apply">获得你的公开信息（昵称、头像等）</div>
		
		<button @getuserinfo="getUserInfo" @tap="myLogin" class="login-btn" openType="getUserInfo">授权登录</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				statusBarHeight: 0
			};
		},
		methods:{
			closeLogin: function(){
				uni.navigateBack({
					delta: 1
				});
			},
			goToRegister(){
				uni.navigateTo({
					url: '/pages/register/register'
				});
			},
			async myLogin(){
				
			},
			goToForget(){
				uni.navigateTo({
					url: '/pages/forget/forget'
				});
			},
			getUserInfo(e){
				if (e.mp.detail.userInfo){
					console.log(e.mp.detail.userInfo);
					uni.setStorageSync("userInfo", e.mp.detail.userInfo);
					uni.navigateBack({
						delta: 1
					});
				}
			}
		},
		onLoad() {
			this.statusBarHeight = uni.getSystemInfoSync().statusBarHeight + 'px';
		},
		
	}
</script>

<style lang="scss">
.contain{width: 100%;height: 100%; box-sizing: border-box; padding: 0upx 60upx;}
.head_wrap{border-bottom: 1upx solid #e3e3e3;text-align: center;margin-bottom: 72upx;}
.head_wrap img{width: 220upx; height: 220upx; margin: 40upx 0upx;}
.apply_info{font-size: 26upx; margin-bottom: 40upx; }
.apply{margin-bottom: 88upx; color: #888;}
.login-btn{border:none;height: 88upx; line-height: 88upx; background: #04be01; color: #fff;font-size: 24upx;border-radius: 999upx;}
</style>
