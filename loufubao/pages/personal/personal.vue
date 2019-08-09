<template>
	<view>
		<div class=" content_wrap">
			<div class="col_justify_center head_wrap" @click="changeHeadImg">
				<div class="row_between" >
					<span>头像</span>
					<div class="row">
						<img :src="headImg" class="top-img">
						<span class="arraw" style="margin-left: 19px"></span>
					</div>
				</div>
				
			</div>
			
			<div class="col_justify_center item_wrap">
				<div class="row_between item">
					<span>昵称</span>
					<div class="row">
						<input type="text" style="border:0;margin-bottom:0;" class="item_name name" v-model="userName"/>
						<!-- <span class="arraw"></span> -->
					</div>
				</div>
			</div>
			
			<div class="col_justify_center item_wrap" >

				<div class="row_between item">
					<span>联系方式</span>
					<div class="row_center">
						<input class="item_name mobile" v-if="is_vip == 1" v-model="phone"/>
						<input class="item_name mobile" v-else disabled="disabled" v-model="phone"/>
						<!-- <span class="arraw"></span> -->
					</div>
				</div>
				
			</div>

			<div class="col_justify_center item_wrap" id="bind" style="border-bottom: 1upx solid #E3E3E3;">
				<div class="row_between item" @click="bindCompany('middle')">
					<span>企业号</span>
					<div class="row">
						<span class="item_name un_active wx_openid">{{companyCode?companyCode:"未绑定"}}</span>
						<span class="arraw"></span>
					</div>
				</div>
				
			<uni-popup :show="type === 'middle'" position="middle" mode="fixed"  @hidePopup="bindCompany('')">
				
				<div class="company-modal">
				
				<div class="modal-title">绑定企业</div>
				<div class="company-code">
					<input type="text" v-model="companyCode" @input="companyChange" placeholder="输入企业号"  />
				</div>
				
				<button type="primary" @tap="bindCompanyCode()">提交</button>
				
				</div>
				
				
			</uni-popup>
				

			</div>
			
			
			<div style="background-color: #FFFFFF; padding-top: 60upx;">
				<button class=" button" hover-class="hover_class"
				style="color: #FFFFFF!important;background-color: #107EFF; margin-top: 2upx;" @click="updateInfo">更新</button>
				
				<button  class=" button" hover-class="hover_class" @click="loginOut">退出</button>
			</div>
			
			
			
		</div>
		
	</view>
</template>

<script>
	import { BASE_IMAGE_URL,logout,addQycompany,Qycompany,deleteQyCompany,updateUserInfo} from '@/utils/api'
	import uniPopup from '@/components/uni-popup.vue'
	export default {
		components: {
			uniPopup
		},
		data() {
			return {
				type:'',
				companyCode:'',
				loginStatus:0,
				headImg: '../../static/img/mtyou_icon.png',
				userName: '',
				phone: '',
				is_vip: 0
			}
		},
		onLoad(){
			let userInfo = uni.getStorageSync("userInfo");
			this.userName = userInfo.userName;
			this.phone = userInfo.phone;
			this.is_vip = parseInt(userInfo.is_vip);
			
		},
		onShow(){
			var companyCode=uni.getStorageSync("userInfo").companyCode;
			if(companyCode)
			{
				this.companyCode=companyCode;
			}
			
			let userImage = uni.getStorageSync("userInfo").userImage;
			this.headImg = userImage;
			if(!this.headImg){
				this.headImg = "../../static/img/mtyou_icon.png"
			}
		},
		methods: {
			async updateUserInfo(base64){
				let params = {
					userID: uni.getStorageSync("userInfo").userID,
					userName: this.userName,
					userImage: base64
					
				};
				let res = await updateUserInfo(params);
				if(res.status == 1){
					
				}
			},
			async deleteQyCompany()
			{
				let userInfo = uni.getStorageSync("userInfo");
				
				let res = await deleteQyCompany({userID:userInfo.userID,companyCode:this.companyCode});
				uni.showToast({
				  icon: 'none',
				  title: res.message,
				  duration: 1000
				});
				
				if(res.status == 1){
					
					this.companyCode="";
					uni.setStorageSync("userInfo",res.data.userInfo);
					
				}
				
			},
			async bindCompanyCode()
			{
				if(!this.companyCode){
					uni.showToast({
					  icon: 'none',
					  title: '请输入企业号',
					  duration: 1000
					});
					return;
				}
				
				console.log(this.companyCode);
				let userInfo = uni.getStorageSync("userInfo");
				
				let res = await addQycompany({userID:userInfo.userID,companyCode:this.companyCode});
				
				console.log(res);
				
				if(res.status == 1){
					
					this.type="";
					uni.setStorageSync("userInfo",res.data.userInfo);
					uni.showToast({
					  icon: 'none',
					  title: res.message,
					  duration: 1000
					});
					
					
				}
				else{
					uni.showToast({
					  icon: 'none',
					  title: res.message,
					  duration: 1000
					});
				}
				
				
			},
			companyChange(e)
			{
				
			},
			bindCompany(type)
			{
				if(this.companyCode=="")
				{
					this.type = type;
				}
				else
				{
					var $that=this;
					uni.showModal({
					title: "提示",
					content: "是否解除企业绑定？",
					confirmText: "确定",
					cancelText: "取消",
					success: function (res) {
						if (res.confirm) {
							console.log('用户点击确定');
							$that.deleteQyCompany();
						} 
					 }
				    })
				}
				
				
			},
			
			async loginOut(){
				let userID = uni.getStorageSync("userInfo").userID;
				console.log(userID);
				let res = await logout(userID);
				if(res.status == 1){
					uni.removeStorageSync("userInfo");
					uni.navigateBack({
						delta: 1
					});
				}
				
			},
			async updateInfo(){
				// if(!this.phone){
				// 	uni.showToast({
				// 	  icon: 'none',
				// 	  title: '请输入正确的联系方式',
				// 	  duration: 1000
				// 	});
				// 	return;
				// }
				
				if(!this.userName){
					uni.showToast({
					  icon: 'none',
					  title: '请输入正确的用户名',
					  duration: 1000
					});
					return;
				}
				let params = {
					userID: uni.getStorageSync("userInfo").userID,
					userName: this.userName,
					phone: this.phone
				};
				
				let res = await updateUserInfo(params);
				if(res.status == 1){
					uni.setStorageSync("userInfo", res.data.userInfo);
					uni.showToast({
					  icon: 'none',
					  title: '更新成功',
					  duration: 1000
					});
					
					setTimeout( ()=>{
						uni.navigateBack({
							delta: 1
						});
					}, 1000);
					
				}
			},
			changeHeadImg: function(){
				let _this = this;
				uni.chooseImage({
					sourceType: ['camera', 'album'],
					sizeType: ['compressed'],
					count: 1,
					success: (res) => {
						uni.navigateTo({
							url: '/pages/crop/crop?image='+res.tempFilePaths[0]
						});
					}
				})
			},
			
		}
	}
</script>

<style>
	body{
			background-color: #FFFFFF;
		}
	.company-modal{width:500upx;text-align:center;}
.company-code{padding:30upx 0 30upx 0;}
.company-code input{border:1px solid #eee;text-align:left;padding:20upx;}
	
	.content_wrap{
				font-size: 28upx;
				color: #333333;
				background-color: #E3E3E3;
				width: 100%;
			}
			
	.head_wrap{
				height: 160upx;
				margin-top: 16upx;
				background-color: #FFFFFF;
				padding: 0px 32upx;
			}
			
			.head_wrap span:nth-child(1){
				color: #333333;
				font-size: 28upx;
			}
			
			.head_wrap img{
				width: 88upx;
				height: 88upx;
				border-radius: 50%;
			}
			
			.arraw{
				width: 20upx;
				height: 20upx;
				border-top: 2upx solid #999999;
				border-right: 2upx solid #999999;
				transform: rotate(45deg);
				margin-left: 2upx;
			  }
			  
			  .item_wrap{
				  height: 100upx;
				  background-color: #FFFFFF;
				  padding: 0px 32upx;
			  }
			  
			  .item{
				  height: 100upx;
				  border-top: 2upx solid #E3E3E3;
			  }
			  
			  
			  .item_name{
				  color: #666666;
			  }
			  
			  .item img{
				  width: 36upx;
				  height: 30upx;
				  margin-right: 16upx;
			  }
			  
			  .un_active{
				color: #cccccc;
			  }
			  input{
			  	margin-bottom: 0px;
			  	border: none;
			  	background: transparent;
				text-align: right;
				height: 100%;
				box-sizing: border-box;
			  }
			  
			  .button{
			  	border-radius: 6upx;
			  	width: 100%;
			  	margin: 60upx 5% 0px;
			  	box-sizing: border-box;
			  	font-size: 32upx;
			  	width: 90%;
			  	height: 80upx;
				line-height: 80upx;
				padding: 0px;
				color: #107EFF!important;
				background-color: #E3E3E3;
			  }
</style>
