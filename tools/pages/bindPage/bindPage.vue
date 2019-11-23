<template>
	<view>
		<image :src="bind_bg" mode="widthFix" class="home_bg"></image>
		<view class="contain">
			<view class="empty"></view>
			<view class="content">
				<view class="item" style="margin-top: -52upx;">
					<image :src="name_bg" mode="aspectFill"></image>
					<input type="text"  placeholder="NAME" v-model="m_truename"/>
				</view>
				
				<view class="item" >
					<image :src="mobile_bg" mode="aspectFill"></image>
					<input type="number"  placeholder="MOBILE" v-model="m_phone"/>
				</view>
				
				
				<view class="item" >
					<image :src="verify_bg" mode="aspectFill"></image>
					<input type="number"  placeholder="SMS CODE" v-model="phone_code"/>
					<button @tap="getCodeAction" >{{codeBtn.text}}</button>
				</view>
				
				<view class="item" >
					<image :src="email_bg" mode="aspectFill"></image>
					<input type="text"  placeholder="EMAIL" v-model="m_email"/>
				</view>
				
				<view class="item" >
					<image :src="card_bg" mode="aspectFill"></image>
					<input type="text"  placeholder="ID/PASSPORT NO" v-model="m_id_number"/>
				</view>
				
				<view class="bottom">
					<image :src="info_bg" mode="widthFix"></image>
					<image :src="register_bg" mode="widthFix"></image>
				</view>
				
				
			</view>
		</view>
	</view>
</template>

<script>
	import { BASE_IMAGE_URL,bindUser,getUserInfo } from "@/utils/api";
	
	export default {
		data() {
			return {
				bind_bg: BASE_IMAGE_URL+"bind_bg.png",
				name_bg: BASE_IMAGE_URL+"name_bg.png",
				mobile_bg: BASE_IMAGE_URL+"mobile_bg.png",
				verify_bg: BASE_IMAGE_URL+"verify_bg.png",
				email_bg: BASE_IMAGE_URL+"email_bg.png",
				card_bg: BASE_IMAGE_URL+"card_bg.png",
				info_bg: BASE_IMAGE_URL+"info_bg.png",
				register_bg: BASE_IMAGE_URL+"register_bg.png",
				m_truename: '',
				m_email: '',
				m_id_number: '',
				m_phone: '',
				phone_code: '',
				codeBtn: {
					text: 'SMS CODE',
					waitingCode: false,
					count: this.seconds
				},
				seconds: 60,
			}
		},
		methods: {
			async getCodeAction(){
				if((!this.m_phone) || (this.m_phone.length != 11)){
					uni.showToast({
					  icon: 'none',
					  title: '手机号输入错误',
					  duration: 1000,
					  position:'bottom'
					});
					return;
				};
				
				// let res = await sendCode(this.phone);
				let res = {status: 0};
				if (res.code == 1000) {
					uni.showToast({
						icon: 'none',
						title: '获取验证码成功',
						duration: 1000,
						position:'bottom'
					});
					this.countDown();
				} else {
					uni.showToast({
						icon: 'none',
						title: res.message,
						duration: 1000,
						position:'bottom'
					});
				}
				
			},
			countDown: function() {
				this.codeBtn.count = this.seconds;
				this.codeBtn.text = this.codeBtn.count + 's';
			
				let countdown = setInterval(() => {
					this.codeBtn.count--;
					this.codeBtn.text = this.codeBtn.count + 's';
					if (this.codeBtn.count < 0) {
						clearInterval(countdown);
						this.codeBtn.text = '重新发送';
					}
				}, 1000);
			},
			async bindUser(){
				if((!this.m_phone) || (this.m_phone.length != 11)){
					uni.showToast({
					  icon: 'none',
					  title: '手机号输入错误',
					  duration: 1000,
					  position:'bottom'
					});
					return;
				};
				if(!this.m_truename){
					uni.showToast({
						icon: 'none',
						title: '请输入姓名',
						duration: 1000,
						position:'bottom'
					});
					return;
				}
				
				if(!this.m_email){
					uni.showToast({
						icon: 'none',
						title: '请输入邮箱',
						duration: 1000,
						position:'bottom'
					});
					return;
				}
				
				if(!this.m_id_number){
					uni.showToast({
						icon: 'none',
						title: '请输入身份证号',
						duration: 1000,
						position:'bottom'
					});
					return;
				}
				
				if(!this.phone_code){
					uni.showToast({
						icon: 'none',
						title: '请输入验证码',
						duration: 1000,
						position:'bottom'
					});
					return;
				}
				
				
				let params = {
					m_openid: uni.getStorageSync("openid"),
					m_truename: this.m_truename,
					m_email: this.m_email,
					m_id_number: this.m_id_number,
					m_phone: this.m_phone,
					m_code: this.m_code,
					type: 1,
					phone_code: this.phone_code
				};
				let res = await bindUser(params);
				if(res.code == 1000){
					uni.showToast({
						icon: 'none',
						title: '注册成功',
						duration: 1000,
						position:'bottom'
					});
					
					setTimeout(() => {
						this.getUserInfo();
					}, 1000);
				}
			},
			
			async getUserInfo(){
				let res = await getUserInfo(uni.getStorageSync('openid'));
				console.log(res);
				if(res.code == 1000){
					wx.setStorageSync('userInfo',res.data);
					uni.redirectTo({
						url:'/pages/main/main'
					})
				}else{
					uni.showToast({
						icon: 'none',
						title: res.msg,
						duration: 1000
					});
				}
			}
			
		}
	}
</script>

<style>
.home_bg{width: 100vw; position: fixed;top: 0upx; left: 0upx;z-index: 1;}
.contain{width: 100vw; height: 100vh; overflow: hidden;box-sizing: border-box;display: flex; flex-direction: column; position: relative;z-index: 2;}
.empty{width: 100vw; height: 411upx; background: transparent;}
.content{width: 100vw; flex: 1; display: flex; flex-direction: column; background: rgb(245, 245, 245);}
.content .item{height: 104upx; margin-left: 4%; width: 92%;position: relative; margin-bottom: 40upx;}
.content .item image{position: absolute; left: 0upx; top: 0upx; width: 100%; height: 100%;}
.content .item input{width: 100%; height: 100%; padding-left: 40%;}
.content .item button{width: 170upx; height: 73upx; top: 15%; right: 5%; position: absolute; color: #fff;
		 padding: 5upx;font-size: 26upx; background: rgb(56,166,60); border-radius: 20upx; text-align: center;}
		 
.bottom{position: absolute; bottom: 40upx; width: 100vw; padding: 0upx 100upx; box-sizing: border-box;}
.bottom image{width: 100%;}
</style>
