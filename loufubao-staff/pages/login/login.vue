<template>
	<view class="contain" :style="{'padding-top': statusBarHeight}">
		<img src="../../static/img/loginBg.png" class="login_bg">
		
		<div class="row_between head_wrap" @click="closeLogin" v-if="false">
			<img src="../../static/img/login_close.png" >
		</div>
		
		<div class="logo_wrap">
			<img src="../../static/img/logo.png" >
		</div>
		
		<div class="login_wrap">
			<div class="row_wrap">
				<div class="row">
					<img src="../../static/img/login_phone.png">
					<input type="text" placeholder="请输入员工号" placeholder-class="place-holder"
						maxlength="11" class="mobile" v-model="account">
				</div>
			</div>
			
			<div class="row_wrap">
				<div class="row">
					<img src="../../static/img/login_pwd.png" style="width:28upx">
					<input type="password" placeholder="请输入密码" class="password" maxlength="11"
						placeholder-class="place-holder" v-model="password">
				</div>
			</div>
			
		</div>
		
		<div class="forget_wrap row_between" v-if="false">
			<span @click="goToVipLogin">VIP登陆</span>
			<span @click="goToForget">忘记密码</span>
		</div>
		
		<button type="button" class="button" @click="loginAction">登录</button>
		
		<div class="regist_wrap" v-if="false">
			<span>还没账号，<span class="regist_txt" @click="goToRegister">立即注册</span></span>
		</div>
		
	</view>
</template>

<script>
	import { BASE_IMAGE_URL,login } from '@/utils/api'
	import {igexinTool} from '../../utils/geTuiTool.js'
	
	export default {
		data() {
			return {
				statusBarHeight: 0,
				account: '',
				password: ''
			};
		},
		methods:{
			closeLogin: function(){
				uni.navigateBack({
					delta: 1
				});
			},
			goToVipLogin: function(){
				uni.navigateTo({
					url: '/pages/vip_login/vip_login'
				});
			},
			goToRegister(){
				uni.navigateTo({
					url: '/pages/register/register'
				});
			},
			async loginAction(){
				if((!this.account)){
					uni.showToast({
					  icon: 'none',
					  title: '员工号输入错误',
					  duration: 1000
					});
					return;
				};
				
				if((!this.password) ){
					uni.showToast({
					  icon: 'none',
					  title: '密码输入错误',
					  duration: 1000
					});
					return;
				};
				let params = {
					courierNumber: this.account,
					pwd: this.password
				};
				
				let res = await login(params);
				if(res.status == 1){
					uni.showToast({
					  icon: 'none',
					  title: '登陆成功',
					  duration: 1000
					});
					uni.setStorageSync("userInfo", res.data);
					uni.redirectTo({
						url: '/pages/home/home'
					});
				}else{
					uni.showToast({
					  icon: 'none',
					  title: res.message,
					  duration: 1000
					});
				}
			},
			goToForget(){
				uni.navigateTo({
					url: '/pages/forget/forget'
				});
			},
		},
		onLoad() {
			this.statusBarHeight = uni.getSystemInfoSync().statusBarHeight + 'px';
			if(uni.getStorageSync("userInfo")){
				uni.redirectTo({
					url: '/pages/home/home'
				});
			}
		}
	}
</script>

<style lang="scss">
	input{width: 100%;}
	.login_bg{
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0upx;
		left: 0upx;
		z-index: -1;
	}
	.contain{
		width: 100%;
		height: 100%;
	}
	
			.head_wrap{
				padding: 20upx 32upx 20upx;
			}
			
			.head_wrap img{
				width:28upx;
				height: 28upx;
			}
			.logo_wrap{
				margin: 80upx auto 100upx;
				text-align: center;
			}
			
			.logo_wrap img{
				width: 210upx;
				height: 240upx;
			}
			
			.login_wrap{
				padding: 0upx 108upx;
			}
			
			.row_wrap{
				border-bottom: 2upx solid #E3E3E3;
			}
			
			.login_wrap div{
				
				padding: 0upx 8upx;
				margin-bottom: 30upx;
			}
			
			.login_wrap img{
				width: 24upx;
				height: 40upx;
				margin-right: 40upx;
			}
			
			.login_wrap input{
				margin-bottom: 0upx;
				border: none;
				background: transparent;
			}
			
			::-webkit-input-placeholder{
				color: #999999;
				font-size: 28upx;
			}
			
			.forget_wrap{
				padding:0upx 100upx;
				color: #107EFF;
				font-size: 28upx;
			}
			
			.button{
				border-radius: 40upx;
				margin: 60upx 15% 0upx;
				box-sizing: border-box;
				background-color: #107EFF;
				color: #FFFFFF;
				font-size: 32upx;
				width: 70%;
				height: 80upx;
			}
			
			.regist_wrap{
				text-align: center;
				font-size: 28upx;
				color: #666666;
				margin-top: 50upx;
			}
			
			.regist_txt{
				font-size: 28upx;
				color: #107EFF;
			}
			
</style>
