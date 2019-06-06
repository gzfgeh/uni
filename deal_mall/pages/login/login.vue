<template>
	<view class="contain">
		<div class="head_wrap">
			<img src="https://bay.2donghua.com/web/statics/wxapp/images/icon-wechatapp.png" mode="aspectFill">
		</div>
		
		<div class="apply_info">申请获取以下权限</div>
		<div class="apply">获得你的公开信息（昵称、头像等）</div>
		
		<button @getuserinfo="getUserInfo" class="login-btn" openType="getUserInfo" v-if="!isShowPhone">授权登录</button>
		
		<button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" class="login-btn" v-if="isShowPhone">获取手机号授权</button>
		
	</view>
</template>

<script>
	import { BASE_IMAGE_URL,getOpenid,addSaveUserInfo,bindPhone } from '@/utils/api'
	
	export default {
		data() {
			return {
				isShowPhone: false,
				session_key: '',
				openid: '',
				userInfo: {}
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
			getPhoneNumber(e){
				console.log(e.detail.iv);
				console.log(e.detail.encryptedData);
				this.bindPhone(e.detail.encryptedData, e.detail.iv);
			},
			async bindPhone(encryptedData, iv){
				let params = {
					openid: this.openid,
					encryptedData: encryptedData,
					iv: iv,
					sessionKey: this.session_key
				};
				let res = await bindPhone(params);
				if(res.code == 1000){
					uni.setStorageSync("userInfo", this.userInfo);
					uni.navigateBack({  
						delta: 1 
					});
				}
			},
			async addSaveUserInfo(m_avatar, m_sex, m_name){
				let params = {
					m_avatar: m_avatar,
					m_sex: m_sex,
					m_name: m_name,
					m_openid: this.openid
				};
				
				let res = await addSaveUserInfo(params);
				if(res.code == 1000){
					this.isShowPhone = true;
				}
			},
			getUserInfo(e){
				if (e.mp.detail.userInfo){
					console.log(e.mp.detail.userInfo);
					//uni.setStorageSync("userInfo", e.mp.detail.userInfo);
					let userInfo = e.mp.detail.userInfo;
					this.userInfo = userInfo;
					this.addSaveUserInfo(userInfo.avatarUrl, userInfo.gender, userInfo.nickName);
				}
			},
			 async getOpenid(code){
				 let res = await getOpenid(code);
				 if(res.code == 1000){
					this.session_key = res.data.wxData.session_key;
					this.openid = res.data.wxData.openid;
				 }
				
			 }
		},
		onLoad() {
			let that = this;
			wx.login({    
				success:function(res){
					console.log(res.code);
					that.getOpenid(res.code);
				} 
            });
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
