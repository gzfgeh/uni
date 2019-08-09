<template>
	<view>
		<div class="mui-content">
			
			<view class="feedback-body feedback-uploader">
				<view class="uni-uploader">
					<view class="uni-uploader-head">
						<view class="uni-uploader-title">上传图片</view>
						<view class="uni-uploader-info">{{imageList.length}}/9</view>
					</view>
					<view class="uni-uploader-body">
						<view class="uni-uploader__files">
							<block v-for="(image,index) in imageList" :key="index">
								<view class="uni-uploader__file" style="position: relative;">
									<image class="uni-uploader__img" :src="image" @tap="previewImage"></image>
									<view class="close-view" @click="close(index)">x</view>
								</view>
							</block>
							<view class="uni-uploader__input-box" v-if="imageList.length < 9">
								<view class="uni-uploader__input" @tap="chooseImg"></view>  
								<!-- <img src="../../static/img/upload_icon.jpg" mode="aspectFill" @tap="chooseImg" class="upload_icon"> -->
							</view>
						</view>
					</view>
				</view>
			</view>
			
			<button type="button" hover-class="hover_class"
			class="mui-btn mui-btn-primary button" @click="create_takeout_order">支付 <span v-if="allMoney">￥({{allMoney}})</span></button>
			
			<uni-popup :show="popupParam === 'bottom'" position="bottom" mode="fixed" :payWay="'1'" :orderID="orderID" :money="allMoney+''" @hidePopup="payPopup('')" />

		</div>
		
	</view>
</template>

<script>
	import { BASE_IMAGE_URL,create_takeout_order,getWaterPrice } from '@/utils/api'
	import uniPopup from '@/components/popup-pay.vue'
	
	export default {
		components: {
			uniPopup
		},
		data() {
			return {
				content: '',
				imageList: [],
				popupParam: '',
				orderID:"",
				allMoney: "",
				price: "0.01"
			}
		},
		methods: {
			close(e){
                this.imageList.splice(e,1);
				this.allMoney = parseFloat(parseFloat(this.price)*(this.imageList.length));
            },
			payPopup(popupParam) {
				this.popupParam=popupParam;
			},
			chooseImg() { //选择图片
				let that = this;
                uni.chooseImage({
                    sourceType: ["camera", "album"],
                    sizeType: ["compressed"],
                    count: 9 - this.imageList.length,
                    success: (res) => {
                        //this.imageList = this.imageList.concat(res.tempFilePaths);
						res.tempFilePaths.map((item) => {
							that.uploadFile(item)
						})
						
                    }
                })
            },
			previewImage() { //预览图片
                uni.previewImage({
                    urls: this.imageList
                });
            },
			uploadFile(filePath){
				let that = this;
				uni.showLoading({ title: '加载中...' })
				uni.uploadFile({
					url: BASE_IMAGE_URL+ 'user/user/uploadImage', //仅为示例，非真实的接口地址
					filePath:filePath,
					name: 'image',
					header: { "userToken": uni.getStorageSync('userInfo').token},
					formData: {},
					success: (uploadFileRes) => {
						uni.hideLoading();
						console.log(uploadFileRes);
						if(uploadFileRes.data){
							let fileRes = JSON.parse(uploadFileRes.data);
							if(fileRes.status == 1){
								that.imageList = that.imageList.concat(fileRes.data);
								let length = that.imageList.length;
								that.allMoney = parseFloat(parseFloat(that.price)*length);
							}else if(fileRes.status == 999){
								uni.navigateTo({
									url: '/pages/login/login'
								});
							}else if(fileRes.status == 0){
								uni.showToast({
									icon: 'none',
									title: fileRes.message,
									duration:1000
								});
							}
						}else{
							uni.navigateTo({
									url: '/pages/login/login'
								});
						}
						
					}
				});
			},
			async getWaterPrice(){
				let res = await getWaterPrice();
				if(res.status == 1){
					this.price = res.data.price;
				}
			},
			async create_takeout_order(){
				
				if(this.imageList.length == 0){
					uni.showToast({
						icon: 'none',
						title: "请上传图片",
						duration:1000
					});
					return;
				};
				
				let params = {
					userID: uni.getStorageSync("userInfo").userID,
					takeoutOrderUrl: this.imageList
				};
				
				let res = await create_takeout_order(params);
				if(res.status == 1){
					uni.showToast({
						icon: 'none',
						title: "提交成功",
						duration:1000
					});
					this.payPopup('bottom');
					this.orderID = res.data.orderID;
				}else{
					uni.showToast({
						icon: 'none',
						title: res.message,
						duration:1000
					});
				}
			}
		},
		onLoad() {
			this.getWaterPrice();
		}
	}
</script>

<style>
.close-view{
        text-align: center;line-height:28upx;height: 32upx;width: 32upx;border-radius: 50%;background: #FF5053;color: #FFFFFF;position: absolute;top: -12upx;right: -8upx;font-size: 24upx;
    }
.upload_icon{width: 240upx; height: 210upx; margin: 10upx;}			
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
			  
			
			page{
				background-color: #F3F3F3;
			}
</style>
