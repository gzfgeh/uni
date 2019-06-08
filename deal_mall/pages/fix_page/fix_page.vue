<template>
	<view class="contain">
		<div class="mui-content">

			<div class="row item_wrap">
			  <div class="row_between item">
				<span class="item_span">姓名</span>
				<input type="text" v-model="b_name">
			  </div>
			</div>

			<div class="row item_wrap">
			  <div class="row_between item">
				<span class="item_span">手机号码</span>
				<input type="text" v-model="b_phone">
			  </div>
			</div>

			<div class="row item_wrap">
			  <div class="bao_xiu">
				<span class="item_span">报修内容</span>
				<textarea v-model="b_content" placeholder="请输入报修内容" />
			  </div>
			</div>
			
			
		</div>
		
		<div class="bottom_wrap" @click="fixContent">提交</div>

	</view>
</template>

<script>
	import { BASE_IMAGE_URL,baoxiu } from '@/utils/api'
	import mpvueCityPicker from '../../components/mpvueCityPicker.vue'
	
	export default {
		components: {
			mpvueCityPicker
		},
		data() {
			return {
				b_name: '',
				b_phone: '',
				b_content: ''
			}
		},
		onLoad() {
		},
		methods: {
			async fixContent(){
				if(!this.b_name){
					uni.showToast({
						icon: 'none',
						duration: 1000,
						title: "请输入姓名"
					});
					return;
				};
				
				if(!this.b_phone){
					uni.showToast({
						icon: 'none',
						duration: 1000,
						title: "请输入手机号"
					});
					return;
				};
				
				if(!this.b_content){
					uni.showToast({
						icon: 'none',
						duration: 1000,
						title: "请输入报修内容"
					});
					return;
				};
				
				let params = {
					b_name: this.b_name,
					b_content: this.b_content,
					b_phone: this.b_phone
				};
				let res = await baoxiu(params);
				
				if(res.code == 1000){
					uni.showToast({
						icon: 'none',
						duration: 1000,
						title: "操作成功"
					})
					uni.navigateBack({
						delta: 1
					});
				}
			}
		}
	}
</script>

<style>
	page{height: 100%; background: #EFEFF4;}
	.bottom_wrap{position: fixed;bottom: 0upx;left:0upx; width: 100%; height: 100upx;line-height: 100upx;text-align: center;color: #FFF; background: #FF4544; font-size: 34upx;}
.head_wrap {
      padding: 28upx;
      width: 100%;
      text-align: left;
      color: #666666;
      font-size: 24upx;
	  box-sizing: border-box;
    }

    ::-webkit-input-placeholder {
      color: #CCCCCC;
      font-size: 28upx;
    }

    .item_wrap {
      width: 100%;
      background-color: #FFFFFF;
      padding-left: 28upx;
	  box-sizing: border-box;
    }

    .item {
      height: 100upx;
      width: 100%;
      border-bottom: 2upx solid #E3E3E3;
      color: #333333;
      font-size: 28upx;
      padding-right: 30upx;
	  box-sizing: border-box;
    }

    .item .content {
      flex: 1;
      text-align: right;
      font-size: 32upx;
      color: #666666;
      height: 100upx;
      line-height: 100upx;

    }

    .button {
      border-radius: 6upx;
      width: 90%;
      margin: 20upx 5% 0px;
      box-sizing: border-box;
      background-color: #107EFF;
      color: #FFFFFF;
      font-size: 32upx;
      height: 88upx;
    }

    .arraw {
      width: 20upx;
      height: 20upx;
      border-top: 4upx solid #999999;
      border-right: 4upx solid #999999;
      transform: rotate(45deg);
      margin-left: 4upx;
    }
	.bao_xiu{
		display: flex;
		flex-direction: column;
		width: 100%;
		padding-top: 20upx;
	}

    .item input {
      margin: 0px;
      border: none;
      background: transparent;
      flex: 1;
      text-align: left;
      padding: 0px 0px 0px 16upx;
			font-size: 34upx;
    }

    .item_span {
      width: 200upx;
      color: #333333;
      font-size: 34upx;
    }

    .upload_wrap {
      padding: 36upx 30upx;
      background: #FFFFFF;
      color: #333333;
      font-size: 28upx;
    }

    .img_wrap {
      flex-flow: wrap;
      margin-top: 36upx;
    }

    textarea {
      padding: 18upx 22upx;
      height: 220upx;
      background-color: #F9F9F9;
      margin-top: 40upx;
      width: 100%;
      margin-bottom: 10upx;
      font-size: 24upx;
	  box-sizing: border-box;
	  margin-right: 5%;
    }

    textarea::-webkit-input-placeholder {
      color: #999999;
      font-size: 24upx;
    }

    .mui-bar-nav {
      box-shadow: none;
    }
	
	.contain {
      background-color: #F3F3F3;
    }
</style>
