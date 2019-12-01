<template>
	<view>
		
		<uni-status-bar :titleStr="titleStr"></uni-status-bar>
		
		
		<view class="head_logo_wrap" @tap="getInfo">
			<image :src="head" mode="aspectFill"></image>
			<span>{{nickname}}</span>
		</view>
		
		
		
		<view class="item row_between" @tap="Yijian">
			<span>意见反馈</span>
			<span class="arraw"></span>
		</view>
		
		<view class="item row_between" @tap="about">
			<span>关于我们</span>
			<span class="arraw"></span>
		</view>
		
		<view class="item row_between" @tap="giveMoney">
			<span>打赏作者</span>
			<span class="arraw"></span>
		</view>
		
		<!--弹窗-->
		<view class="modal-mask" v-if="showModal"></view>
		<view class="modal-dialog" v-if="showModal">
		<view class="modal-title">获取授权</view>
		<view class="modal-content" style="text-align: center;">
			<div>为了保障各项功能正常使用，请允许获得权限</div>
		</view>
		<view class="modal-footer">
		
			<button @getuserinfo="bindGetUserInfo" v-if="canIUse"
			open-type="getUserInfo" class="btn-confirm">确定</button>
			<button v-else class="btn-confirm">请升级微信版本</button>
		</view>
		</view>
		
	</view>
</template>

<script>
	import { BASE_IMAGE_URL,userInfoSave,getUserInfo } from "@/utils/api";
	import uniStatusBar from '@/components/mini_status_bar.vue';
	
	export default {
		components: {
			uniStatusBar
		},
		data() {
			return {
				head: BASE_IMAGE_URL+"head.png",
				scrollHeightVal: 0,
				titleStr: '我的',
				showModal: false,
				canIUse: wx.canIUse('button.open-type.getUserInfo'),
				avatar: '',
				nickname:'游客',
				gender: 0
			}
		},
		methods: {
			getInfo(){
				if(!uni.getStorageSync("userInfo")){
					this.showModal = true;
				}
				
			},
			bindGetUserInfo: function(e){
			  if (e.mp.detail.userInfo){
				this.showModal = false;
				var userInfo = e.mp.detail.userInfo;
				console.log(userInfo);
				if(!userInfo.avatarUrl || !userInfo.nickName){
				  wx.showModal({
					  title: '温馨提示',
					  content: '未获取到您的信息，请稍后重试',
					  showCancel: false,
					  success: function (res) {
						  console.log(res);
						  if(res.confirm){
							//返回上一级页面
							wx.navigateBack({
							  delta: -1
							})
						  }
					  }
				  })
				  return;
				}
				this.avatar = userInfo.avatarUrl;
				this.nickname = userInfo.nickName;
				this.gender = userInfo.gender;
				// this.city = userInfo.city;
				// this.country = userInfo.country;
				// this.language = userInfo.language;
				// this.province = userInfo.province;
				
				this.head = this.avatar;
					
				let params = {
				  m_avatar: this.avatar,
				  m_nickname: this.nickname,
				  m_openid: uni.getStorageSync("openid"),
				  m_gender: this.gender,
				  m_sheng: userInfo.province,
				  m_shi: userInfo.city,
				  m_qu: userInfo.province
				};
				this.userInfoSave(params);
			  }
			},
			async userInfoSave(params){
			  let res = await userInfoSave(params);
			  console.log(res);
			  if(res.code == 1000){
				this.getUserInfo();
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
					uni.setStorageSync('userInfo',res.data);
				}else{
					uni.showToast({
						icon: 'none',
						title: res.msg,
						duration: 1000
					});
				}
			},
			Yijian(){
				uni.showModal({
					title: '提示',
					content: '请发送邮件给我们反馈：\r\n 305475422@qq.com',
					showCancel: false,
					success(res) {
						if(res.confirm){
							uni.setClipboardData({
								data: '305475422@qq.com'
							});
							uni.showToast({
								title: '已经复制邮箱'
							});
						}
					}
				})
			},
			about(){
				uni.navigateTo({
					url: '/pages/about/about'
				})
			},
			giveMoney(){
				uni.previewImage({
					urls:[BASE_IMAGE_URL+"money.jpg"],
					current: 0
				})
			}
		},
		onLoad() {
			this.scrollHeightVal = this.initStatus();
			if(uni.getStorageSync("userInfo")){
				this.head = uni.getStorageSync("userInfo").m_avatar;
				this.nickname = uni.getStorageSync("userInfo").m_nickname;
			}
		},
		
	}
</script>

<style>
	page{background: #EDEDED; }
	
	.head_logo_wrap{width: 100%; height: 300upx; display: flex; flex-direction: column; justify-content: center; 
		align-items: center; background: #FFFFFF; color: #000; font-size: 36upx; }
	.head_logo_wrap image{width: 140upx; height: 140upx; border-radius: 50%; margin-bottom: 20upx;}
	.item{height: 100upx; width: 100%; box-sizing: border-box; margin-top: 20upx;
		padding: 40upx; background: #FFF;}
		
	
</style>
