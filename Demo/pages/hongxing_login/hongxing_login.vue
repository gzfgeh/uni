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
					<span>姓名：</span>
					<input type="text" placeholder="请输入姓名" placeholder-class="place-holder"
						maxlength="11" class="mobile" v-model="account">
				</div>
			</div>
			
			<div class="row_wrap" @click="selectDepartment">
				<div class="row">
					<span>部门：</span>
					<span class="mobile" :class="{'place-holder': (department == '请选择部门')}">{{department}}</span>
				</div>
			</div>
			
		</div>
		
		<button type="button" class="button" @click="loginAction">进入</button>
		
		
	</view>
</template>

<script>
	import { BASE_IMAGE_URL,department } from '@/utils/api'
	import {igexinTool} from '../../utils/geTuiTool.js'
	
	export default {
		data() {
			return {
				statusBarHeight: 0,
				account: '',
				itemList: [],
				department: '请选择部门'
			};
		},
		methods:{
			closeLogin: function(){
				uni.navigateBack({
					delta: 1
				});
			},
			async getDepartment(){
				let res = await department();
				if(res.status == 1){
					res.data.map((item) => {
						this.itemList.push(item.name);
					})
				}
			},
			async selectDepartment(){
				let that = this;
				uni.showActionSheet({
					itemList: that.itemList,
					success: function (res) {
							that.department = that.itemList[res.tapIndex];
							
					},
					fail: function (res) {}
				});
			},
			async loginAction(){
				if((!this.account)){
					uni.showToast({
					  icon: 'none',
					  title: '请输入姓名',
					  duration: 1000
					});
					return;
				};
				
				if(this.department == '请选择部门'){
					uni.showToast({
					  icon: 'none',
					  title: '请选择部门',
					  duration: 1000
					});
					return;
				};
				
				uni.setStorageSync("hongxingName", this.account);
				uni.setStorageSync("hongxingDepartment", this.department);
				
				uni.navigateTo({
					url: '/pages/express_hongxing/express_hongxing'
				});
				
			}
		},
		onLoad() {
			this.getDepartment();
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
