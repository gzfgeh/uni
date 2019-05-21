<template>
	<view class="contain">
		<img src="../../static/img/loginBg.png" class="login_bg">
		
		<div class="row_between head_wrap">
			<img style="margin-top:15upx;" src="../../static/img/login_close.png" onclick="closeLogin();">
		</div>
		
		<div class="logo_wrap">
			<img src="../../static/img/logo.png" >
		</div>
		
		<div class="login_wrap">
			<div class="row">
				<img src="../../static/img/login_phone.png">
				<input type="tel" placeholder="请输入手机号码" maxlength="11" class="mobile">
			</div>
			
			<div class="row">
				<img src="../../static/img/login_pwd.png" style="width:28upx">
				<input type="password" placeholder="请输入密码" class="password">
			</div>
			
		</div>
		
		<div class="forget_wrap">
			<span onclick="goToForget();">忘记密码</span>
		</div>
		
		<button type="button" class="mui-btn mui-btn-primary button" onclick="loginAction();">登录</button>
		
		<div class="regist_wrap">
			<span>还没账号，<span class="regist_txt" onclick="goToRegister();">立即注册</span></span>
		</div>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		onLoad() {
			// plus.navigator.setFullscreen(true);
		}
	}
</script>

<style lang="scss">
	
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
				padding: 32upx 32upx 0upx;
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
			
			.login_wrap div{
				border-bottom: 1upx solid #E3E3E3;
				padding: 0upx 8upx;
				margin-bottom: 60upx;
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
				text-align: right;
				padding-right: 100upx;
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
