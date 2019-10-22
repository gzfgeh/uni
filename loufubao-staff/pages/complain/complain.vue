<template>
	<view>
		<div class="mui-content">
			<div class="head_wrap">
				<span>感谢您对我们提出宝贵的投诉建议</span>
			</div>
			
			<div class="row item_wrap" >
				<div class=" item" style="height: 260upx; padding-top: 20upx;">
					<div>投诉原因</div>
					<textarea placeholder="请填写投诉原因。如反馈软件使用问题，请注明您的手机型号和系统版本。" class="content_reason" v-model="content"></textarea>
				</div>
				
			</div>
			
			<!-- <div class="row item_wrap">
				<div class="row_between item">
					<span>手机号</span>
					<input type="tel" maxlength="11" placeholder="请输入手机号码" class="mobile">
				</div>
			</div>
			
			<div class="upload_wrap">
				<span>上传图片</span>
				<div class="row img_wrap">
					
				</div>
			</div> -->
			
			<button type="button" hover-class="hover_class"
			class="mui-btn mui-btn-primary button" @click="feedback">提交</button>
			
		</div>
		
	</view>
</template>

<script>
	import { BASE_IMAGE_URL,feedback } from '@/utils/api'
	
	export default {
		data() {
			return {
				content: ''
			}
		},
		methods: {
			async feedback(){
				if(!this.content){
					uni.showToast({
						icon: 'none',
						title: "请输入反馈意见",
						duration:1000
					});
					return;
				}
				let res = await feedback(this.content);
				if(res.status == 1){
					uni.showToast({
						icon: 'none',
						title: "反馈成功",
						duration:1000
					});
					uni.navigateBack({
						delta: 1
					});
				}
			}
		}
	}
</script>

<style>
.head_wrap{
				padding: 26upx 0px;
				width: 100%;
				text-align: center;
				color: #999999;
				font-size: 24upx;
				box-sizing: border-box;
			}
			
			::-webkit-input-placeholder{
				color: #999999;
				font-size: 28upx;
			}
			
			.item_wrap{
				width: 100%;
				background-color: #FFFFFF;
				padding-left: 28upx;
				box-sizing: border-box;
			}
			.item{
				height: 100upx;
				width: 100%;
				color: #333333;
				font-size: 28upx;
				padding-right: 30upx;
				box-sizing: border-box;
			}
			
			.item .content{
				flex: 1;
				text-align: right;
				font-size: 28upx;
				color: #666666;
				height: 100upx;
				line-height: 100upx;
				
			}
			
			.button{
				border-radius: 12upx;
				width: 90%;
				margin: 52upx 5% 0px;
				box-sizing: border-box;
				background-color: #107EFF;
				color: #FFFFFF;
				font-size: 32upx;
				height: 88upx;
			}
			  
			.item input{
				margin-bottom: 0px;
				border: none;
				background: transparent;
				padding-left: 16upx;
				flex: 1;
				text-align: right;
				padding-right: 0px;
			}
			
			.upload_wrap{
				padding: 36upx 30upx;
				background: #FFFFFF;
				color: #333333;
				font-size: 28upx;
			}
			  
			.img_wrap{
				flex-flow: wrap;
				margin-top: 36upx;
			}
			.upload_img_wrap{
				width: 32%;
				position: relative;
				margin-right: 1%;
				padding: 1%;
				box-sizing: border-box;
			} 
			
			.upload_img_wrap .img_btn{
				width: 100%;
				max-height: 80upx;
			}
			
			.upload_img_wrap .del_btn{
				position: absolute;
				top: -10upx;
				right: -0upx;
				width: 40upx;
				height: 40upx;
				z-index: 10;
			}
			
			textarea {
			  padding: 18upx 22upx;
			  height: 140upx;
			  background-color: #F9F9F9;
			  width: 93%;
			}
			
			textarea::-webkit-input-placeholder {
			  color: #999999;
			  font-size: 24upx;
			}
			
			page{
				background-color: #F3F3F3;
			}
</style>
