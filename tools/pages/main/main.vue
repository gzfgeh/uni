<template>
	<view class="contain">
		<image :src="home_bg" mode="widthFix" class="home_bg"></image>
		
		<scroll-view class="content" scroll-y="true" @scroll="scroll">
			<view class="temp_view"></view>
			<view class="content_wrap">
				<view class="row_between head_wrap">
					<image :src="arrow_up" mode="aspectFill" class="arrowup" style="visibility: hidden;" ></image>
					<image :src="head_logo" mode="aspectFill" class="head_img" @tap="goToNext" ></image>
					<image :src="arrow_up" mode="aspectFill" class="arrowup" :animation="upDown" ></image>
				</view>
				<view>{{nickname}}</view>
				<view class="push_text" :animation="pushTextAni" v-if="!isShowMenu" @tap="goToMsg">
					<rich-text :nodes="message"></rich-text>
				</view>
				
				<view class="menu_wrap" :animation="menuAni" >
					<view class="col_center " style="min-width: 21%; margin: 30upx auto;" v-for="(item, index) in contentList" :key="index" @tap="goToContent(index)">
						<image :src="item.b_icon" mode="aspectFill" ></image>
						<span>{{item.b_name}}</span>
					</view>
				</view>
				
			</view>
		</scroll-view>
		
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
	import { BASE_IMAGE_URL,getModuletList,userInfoSave,getUserInfo,joinTeam,getContentList } from "@/utils/api";
	
	export default {
		data() {
			return {
				home_bg: BASE_IMAGE_URL+"home_bg.png",
				head_logo: BASE_IMAGE_URL+"head_logo.png",
				arrow_up: BASE_IMAGE_URL+"arrow-up.png",
				upDown: {},
				animation: {},
				animationPush: {},
				pushTextAni: {},
				menuAniObj:{},
				menuAni:{},
				contentList: [],
				isShowMenu: false,
				scrollTopVal: 180,
				showModal: false,
				canIUse: wx.canIUse('button.open-type.getUserInfo'),
				avatar: '',
				nickname:'',
				gender: 0,
				message: ''
			}
		},
		methods: {
			goToNext(){
				uni.navigateTo({
					url:'/pages/erweima/erweima?avatar='+this.head_logo+
							"&name="+this.nickname+"&m_z_id="+uni.getStorageSync("userInfo").m_z_id
				})
			},
			goToMsg(){
				uni.navigateTo({
					url: '/pages/message/message'
				})
			},
			async joinTeam(m_z_id){
				let params = {
					m_z_id: m_z_id,
					m_id: uni.getStorageSync("userInfo").m_id
				};
				let res = await joinTeam(params);
				if(res.code == 1000){
					uni.showToast({
						duration:1000,
						icon: 'none',
						title:"加入成功"
					});
					
				}else{
					uni.showToast({
						duration:1000,
						icon: 'none',
						title:res.msg
					});
				}
			},
			goToContent: function(index){
				if(index == 0){
					let that = this;
					uni.scanCode({
					    success: function (result) {
					        console.log('条码类型：' + result.scanType);
					        console.log('条码内容：' + result.result);
							
							uni.showModal({
								title:'提示',
								content:"是否加入此团队？",
								success: function (res) {
								        if (res.confirm) {
								            console.log('用户点击确定');
											that.joinTeam(result.result);
								        } else if (res.cancel) {
								            console.log('用户点击取消');
								        }
								}
							})
							
					    }
					});
				}else {
					uni.navigateTo({
						url:this.contentList[index].b_link
					})
				};
				
			},
			async getModuletList(){
				let res = await getModuletList();
				if(res.code == 1000){
					this.contentList = res.data;
				}
			},
			async getContentList(){
				let res = await getContentList(1);
				if(res.code == 1000){
					this.list = res.data;
					this.list.map((item) => {
						var richtext=  item.c_detail;
						const regex = new RegExp('<img', 'gi');
						item.c_detail= richtext.replace(regex, `<img style="max-width: 100%;"`);			 
					});
					this.message = this.list[0].c_detail;
					this.$forceUpdate();
				}
			},
			pushTextAction: function(scrollTop){
				if(scrollTop > this.scrollTopVal){
					this.animationPush.opacity(0).step();
					this.pushTextAni = this.animationPush.export();
				}else{
					this.animationPush.opacity(1).step();
					this.pushTextAni = this.animationPush.export();
				}
			},
			arrowAction: function(scrollTop){
				if(scrollTop > this.scrollTopVal){
					this.animation.opacity(0).step();
					this.upDown = this.animation.export();
				}else{
					this.animation.opacity(1).step();
					this.upDown = this.animation.export();
				}
			},
			menuAction: function(scrollTop){
				if(scrollTop > this.scrollTopVal){
					this.menuAniObj.opacity(1).step();
					this.menuAni = this.menuAniObj.export();
				}else{
					this.menuAniObj.opacity(0).step();
					this.menuAni = this.menuAniObj.export();
				}
			},
			scroll: function(e){
				console.log(e.detail.scrollTop);
				// 0 ~ 300
				if(e.detail.scrollTop > this.scrollTopVal){
					this.isShowMenu = true;
				}else{
					this.isShowMenu = false;
				}
				this.pushTextAction(e.detail.scrollTop);
				this.arrowAction(e.detail.scrollTop);
				this.menuAction(e.detail.scrollTop);
			},
			enterShow(){
				setTimeout(() => {
					this.animationPush = uni.createAnimation({
						  duration: 200,
						  timingFunction: "ease",
						  delay: 0
					});
					this.menuAniObj = uni.createAnimation({
						  duration: 200,
						  timingFunction: "ease",
						  delay: 0
					});
					var animation = uni.createAnimation({
						  duration: 200,
						  timingFunction: "ease",
						  delay: 0
					});
					this.animation = animation;
					setInterval(()=>{
						animation.translateY(-2).step();
						this.upDown = animation.export();
						
						setTimeout(()=>{
							animation.translateY(2).step();
							this.upDown = animation.export();
						}, 200);
					}, 400);
				}, 0);
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
					
				if(!this.nickname || !this.avatar){
				  this.showModal = true;
				  return;
				}
					
				let params = {
				  m_avatar: this.avatar,
				  m_name: this.nickname,
				  m_openid: uni.getStorageSync("openid"),
				  m_sex: this.gender
				};
				this.userInfoSave(params);
			  }
			},
			
			async userInfoSave(params){
			  console.log(JSON.stringify(params));
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
					this.head_logo = res.data.m_avatar;
					this.nickname = res.data.m_name
				}else{
					uni.showToast({
						icon: 'none',
						title: res.msg,
						duration: 1000
					});
				}
			}
			
		},
		onLoad() {
			this.enterShow();
			this.getModuletList();
			let getUser = uni.getStorageSync("userInfo");
			
			this.getContentList();
			
			if(!getUser){
				this.showModal = true;
			}else{
				this.head_logo = getUser.m_avatar;
				this.nickname = getUser.m_name;
			}
		}
	}
</script>

<style>
	page{background: #FFFFFF;}
.home_bg{width: 100vw; position: fixed;top: 0upx; left: 0upx;z-index: 1;}
.contain{display: flex;flex-direction: column; min-height: 100vh; background: #FFFFFF;}
.content{background: transparent; width: 100vw;position: relative;z-index: 2; height: 100vh; display: flex;flex-direction: column;}

.temp_view{width: 100vw; height: 900upx; background: transparent;}
.content_wrap{width: 100vw; height: calc(100vh - 100px); background: #FFFFFF; position: relative; text-align: center;}
.head_wrap{width: 100vw; padding: 0upx 40upx; box-sizing: border-box;}
.head_img{width: 146upx; height: 146upx; margin-top: -73upx; border-radius: 50%;}
.arrowup{width: 40upx; height: 40upx;}

.push_text{margin-top: 40upx; padding: 0upx 30upx; overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 3; -webkit-box-orient: vertical; color: #000000;}

.menu_wrap{opacity: 0; width: 94%; margin-left: 3%; height:340upx;box-sizing:border-box;background: #fff;box-shadow:  0px 0px 10px #fff;margin-top: 30upx;border-radius: 8upx; flex-flow: wrap; display: flex;flex-direction: row; justify-content: space-between;}
.menu_wrap .flex_one{min-width: 160upx;font-size: 24upx; color: #666; height: 170upx;}
.menu_wrap image{width: 62upx; height: 62upx;margin-bottom: 30upx;}


.modal-mask {
	  width: 100%;
	  height: 100%;
	  position: fixed;
	  top: 0;
	  left: 0;
	  background: #000;
	  opacity: 0.5;
	  overflow: hidden;
	  z-index: 9000;
	  color: #fff;
	}
	
	.modal-dialog {
	  width: 540rpx;
	  overflow: hidden;
	  position: fixed;
	  top: 45%;
	  left: 0;
	  z-index: 9999;
	  background: #f9f9f9;
	  margin: -180rpx 105rpx;
	  border-radius: 36rpx;
	}
	
	.modal-title {
	  padding-top: 50rpx;
	  font-size: 36rpx;
	  color: #030303;
	  text-align: center;
	}
	
	.modal-content {
	  padding: 50rpx 32rpx;
	}
	
	.modal-input {
	  display: flex;
	  background: #fff;
	  border: 2rpx solid #ddd;
	  border-radius: 4rpx;
	  font-size: 28rpx;
	  flex-direction: column;
	}
	
	
	.input {
	  width: 100%;
	  height: 82rpx;
	  font-size: 28rpx;
	  line-height: 28rpx;
	  padding: 0 20rpx;
	  box-sizing: border-box;
	  color: #333;
	  
	}
	
	.input_bottom{
		border-bottom: solid 1rpx #ddd;
	}
	
	input-holder {
	  color: #666;
	  font-size: 28rpx;
	}
	
	.modal-footer {
	  display: flex;
	  flex-direction: row;
	  height: 86rpx;
	  border-top: 1px solid #dedede;
	  font-size: 34rpx;
	  line-height: 86rpx;
	}
	
	.btn-cancel {
	  width: 50%;
	  color: #666;
	  text-align: center;
	  border-right: 1px solid #dedede;
	}
	
	.btn-confirm {
	  width: 100%;
	  color: #ec5300;
	  text-align: center;
	  line-height: 86rpx;
	}
	
</style>
