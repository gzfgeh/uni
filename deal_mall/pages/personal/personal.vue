<template>
	<view>
		<div class=" content_wrap">
			<div class="col_justify_center head_wrap">
				<div class="row_between" onclick="changeHeadImg();">
					<span>头像</span>
					<div class="row">
						<img src="../../static/img/mtyou_icon.png" class="top-img">
						<span class="arraw" style="margin-left: 19px"></span>
					</div>
				</div>
				
			</div>
			
			<div class="col_justify_center item_wrap">
				<div class="row_between item">
					<span>昵称</span>
					<div class="row">
						<input type="text" style="border:0;margin-bottom:0;" class="item_name name"/>
						<span class="arraw"></span>
					</div>
				</div>
			</div>
			
			<div class="col_justify_center item_wrap">

				<div class="row_between item">
					<span>手机号</span>
					<div class="row_center">
						<input class="item_name mobile" disabled="disabled"/>
						<span class="arraw"></span>
					</div>
				</div>
				
			</div>

			<div class="col_justify_center item_wrap" id="bind">
				<div class="row_between item">
					<span>企业号</span>
					<div class="row">
						<span class="item_name un_active wx_openid">未绑定</span>
						<span class="arraw"></span>
					</div>
				</div>

			</div>
			
			<div class="col_justify_center item_wrap" style="margin-top: 8px;" onclick="weixinAuth();">
				<div class="row_between item" style="border-top: 0px solid transparent;">
					<div class="row">
						<img src="../../static/img/weixin.png" class="wx_icon">
						<span>微信</span>
					</div>
					
					<div class="row">
						<span class="item_name un_active wx_openid">未绑定</span>
						<span class="arraw"></span>
					</div>
				</div>
				
			</div>
			
			<div class="col_justify_center item_wrap" >
				<div class="row_between item">
					<div class="row">
						<img src="../../static/img/weibo.png" class="web_icon">
						<span>微博</span>
					</div>
					
					<div class="row">
						<span class="item_name un_active web_openid">未绑定</span>
						<span class="arraw"></span>
					</div>
				</div>
			</div>
			
			<div class="col_justify_center item_wrap" >
				<div class="row_between item">
					<div class="row">
						<img src="../../static/img/qq.png" style="width: 32upx; height: 34upx; margin-right: 20upx;" class="qq_icon"> 
						<span>QQ</span>
					</div>
					
					<div class="row">
						<span class="item_name un_active wx_unionid">未绑定</span>
						<span class="arraw"></span>
					</div>
				</div>
			</div>
			
			<button class=" button" hover-class="hover_class"
			style="color: #FFFFFF!important;background-color: #107EFF;" @click="updateInfo">更新</button>
			
			<button class=" button" hover-class="hover_class" @click="loginOut">退出</button>
			
		</div>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			loginOut(){
				uni.navigateBack({
					delta: 1
				});
			},
			updateInfo(){
				
			}
		}
	}
</script>

<style>
	body{
				background-color: #E3E3E3;
			}
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
				border: 2upx solid #107EFF!important;
				color: #107EFF!important;
				background-color: #E3E3E3;
			  }
</style>
