<template>
	<view class="contain" :style="{'padding-top': statusBarHeight}">
		<img src="../../static/img/loginBg.png" class="login_bg">
		
		<div class="row_between head_wrap" @click="closeLogin">
			<img src="../../static/img/login_close.png" >
		</div>
		
		<div class="login_wrap">
			<div class="row_wrap">
				<div class="row">
					<img src="../../static/img/login_phone.png" >
					<input type="tel" placeholder="请输入手机号码" maxlength="11" v-model="account">
				</div>
			</div>
			
			<div class="row_wrap">
				<div class="row">
					<img src="../../static/img/login_code.png" style="width: 36upx; margin-right: 30upx;">
					<input type="text" placeholder="请输入验证码" maxlength="6" v-model="code" style="width: 260upx;">
					<span style="flex: 1;"></span>
					<span class="get_code_txt" @click="getCodeAction">{{count_text}}</span>
				</div>
			</div>
			
			<div class="row_wrap">
				<div class="row">
					<img src="../../static/img/login_pwd.png" style="width:28upx;">
					<input type="password" placeholder="请输入密码" v-model="password">
				</div>
			</div>
			
			<div class="row_wrap">
				<div class="row">
					<img src="../../static/img/login_pwd.png" style="width:28upx; ">
					<input type="password" placeholder="请再次输入密码" v-model="sure_password">
				</div>
			</div>
			
			
			
		</div>
		
		<button type="button" class="button" @click="loginAction">确定</button>
		
		
	</view>
</template>

<script>
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
				sure_password: '',
				code: ''
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
			async loginAction(){
				
			},
			getCodeAction(){
				if(!this.isSending){
					this.getCode();
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
				}
				this.isSending = true;
					this.countDown();
					return;
				
				let res = await sendCode({phone: this.account});
				if(res.code == 1000){
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
					  title: '发送失败',
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
			// this.statusBarHeight = uni.getSystemInfoSync().statusBarHeight + 'px';
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
				padding: 40upx 80upx 0upx;
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
