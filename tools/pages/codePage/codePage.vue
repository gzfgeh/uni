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
					<image :src="code_bg" mode="aspectFill"></image>
					<input type="number"  placeholder="CODE" v-model="m_code"/>
				</view>
				
				<view class="bottom">
					<image :src="info_bg" mode="widthFix"></image>
					<image :src="register_bg" mode="widthFix" @tap="bindUser"></image>
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
				code_bg: BASE_IMAGE_URL+"code_bg.png",
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
				m_code: ''
			}
		},
		methods: {
			async bindUser(){
				if(!this.m_truename){
					uni.showToast({
						icon: 'none',
						title: '请输入姓名',
						duration: 1000,
						position:'bottom'
					});
					return;
				}
				
				if(!this.m_code){
					uni.showToast({
						icon: 'none',
						title: '请输入CODE',
						duration: 1000,
						position:'bottom'
					});
					return;
				}
				
				
				let params = {
					m_openid: uni.getStorageSync("openid"),
					m_truename: this.m_truename,
					m_code: this.m_code,
					type: 2
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
				}else{
					uni.showToast({
						icon: 'none',
						title: res.msg,
						duration: 1000
					});
				}
			},
			async getUserInfo(){
				let res = await getUserInfo(uni.getStorageSync('openid'));
				console.log(res);
				if(res.code == 1000){
					// wx.setStorageSync('userInfo',res.data);
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
.content .item input{width: 100%; height: 100%; padding-left: 40%; font-size: 30upx;}
.content .item button{width: 170upx; height: 73upx; top: 15%; right: 5%; position: absolute; color: #fff;
		 padding: 5upx;font-size: 26upx; background: rgb(56,166,60); border-radius: 20upx; text-align: center;}
		 
.bottom{position: absolute; bottom: 40upx; width: 100vw; padding: 0upx 100upx; box-sizing: border-box;}
.bottom image{width: 100%;}
</style>
