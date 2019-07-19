<template>
	<view class="contain" :style="{'padding-top': statusBarHeight}">
		<img src="../../static/img/loginBg.png" class="login_bg">
		
		<div class="row_between head_wrap" @click="closeLogin">
			<img src="../../static/img/login_close.png" >
		</div>
		
		<div class="logo_wrap">
			<img src="../../static/img/logo.png" >
		</div>
		
		<div class="login_wrap">
			<div class="row_wrap">
				<div class="row">
					<img src="../../static/img/login_phone.png">
					<input type="number" placeholder="请输入手机号码" placeholder-class="place-holder"
							maxlength="11" class="mobile" v-model="account">
				</div>
			</div>
			
			<div class="row_wrap">
				<div class="row">
					<img src="../../static/img/login_code.png" style="width: 36upx; margin-right: 30upx;">
					<input type="number" placeholder="请输入验证码" maxlength="6" placeholder-class="place-holder"
						class="code" style="width: 260upx;" v-model="code">
					<span style="flex: 1;"></span>
					<span class="get_code_txt" @click="getCodeAction">{{count_text}}</span>
				</div>
			</div>
			
			
			<div class="row_wrap">
				<div class="row">
					<img src="../../static/img/login_pwd.png" style="width:28upx">
					<input type="password" placeholder="请输入密码" maxlength="11"
						class="password" placeholder-class="place-holder" v-model="password">
				</div>
			</div>
			
		</div>
		
		<div class="forget_wrap">
			<span>点击“注册”表示你已经阅读并同意隐私条款和用户协议</span>
		</div>
		
		<button type="button" class=" button" @click="registerAction">注册</button>
		
		<div class="regist_wrap">
			<span>已有账号，<span class="regist_txt" @click="goToLogin">立即登录</span></span>
		</div>
		
	</view>
</template>

<script>
	import { BASE_IMAGE_URL,sendCode,register} from '@/utils/api'
	
	export default {
		data() {
			return {
				statusBarHeight: 0,
				isSending: false,
				intervalObj: {}, 
				time: 60,
				count_text: '发送验证码',
				account: '',
                password: '',
				code: ''
			};
		},
		methods:{
			closeLogin: function(){
				uni.navigateBack({
					delta: 1
				});
			},
			goToLogin(){
				uni.navigateTo({
					url: '/pages/login/login'
				});
			},
			getCodeAction(){
				if(!this.isSending){
					this.getCode();
				}
			},
			async registerAction(){
				if((!this.account) || (this.account.length != 11)){
					uni.showToast({
					  icon: 'none',
					  title: '手机号输入错误',
					  duration: 1000
					});
					return;
				};
				
				if((!this.code) || (this.code.length != 6)){
					uni.showToast({
					  icon: 'none',
					  title: '验证码输入错误',
					  duration: 1000
					});
					return;
				};
				
				if((!this.password) || (this.password.length < 6)){
					uni.showToast({
					  icon: 'none',
					  title: '请输入多于6位的密码',
					  duration: 1000
					});
					return;
				};
				let clientID = 0;
				/*
				// #ifdef APP-PLUS
					let info = plus.push.getClientInfo();
					clientID = info.clientid;
				// #endif
				*/
				let res = await register(this.account, this.code, this.password, clientID);
				if(res.status == 1){
					uni.showToast({
					  icon: 'none',
					  title: '注册成功',
					  duration: 1000
					});
					uni.navigateBack({
						delta: 10
					});
				}else{
					uni.showToast({
					  icon: 'none',
					  title: res.message,
					  duration: 1000
					});
				}
			},
			async getCode(){
				console.log(this.account);
				if((!this.account) || (this.account.length != 11)){
					uni.showToast({
					  icon: 'none',
					  title: '手机号输入错误',
					  duration: 1000
					});
					return;
				};
				let res = await sendCode(this.account, 2);
				if(res.status == 1){
					uni.showToast({
					  icon: 'none',
					  title: '发送成功',
					  duration: 1000
					});
					this.isSending = true;
					this.countDown();
				}else{
					uni.showToast({
					  icon: 'none',
					  title: res.message,
					  duration: 1000
					});
				}
			},
			countDown() {
				let that = this;
			    this.intervalObj = setInterval(function() {
			        that.time--;
			        if (that.time <= 0) {
			            that.time = 60;
			            clearInterval(that.intervalObj);
						that.count_text = "重新获取";
			        } else {
						that.count_text = "重新获取("+that.time+"s)";
			        }
			
			    }, 1000);
			},
		},
		onLoad() {
			this.statusBarHeight = uni.getSystemInfoSync().statusBarHeight + 'px';
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
	
	.get_code_txt{
		font-size: 28upx;
		color: #107EFF;
	}
	.code{width: 300upx;}
	
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
		text-align: center;
		color: #999999;
		font-size: 24upx;
		margin-top: 40upx;
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
