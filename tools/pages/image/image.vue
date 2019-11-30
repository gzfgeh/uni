<template>
	<view>
		
		<view class="feedback-body feedback-uploader">
		    <view class="uni-uploader">
		        <view class="uni-uploader-body">
		            <view class="uni-uploader__files">
		                <block v-for="(image,index) in imageList" :key="index">
		                    <view class="uni-uploader__file" style="position: relative;">
		                        <image class="uni-uploader__img" :src="image" @tap="previewImage(index)"></image>
		                        <view class="close-view" @click="close(index)">x</view>
		                    </view>
		                </block>
		                <view class="uni-uploader__input-box" v-show="imageList.length < 8">
		                	<view class="uni-uploader__input" @tap="chooseImg"></view>
		                </view>
		            </view>
		        </view>
		    </view>
		</view>
		
		<view class="canvasBox">
		  <canvas canvas-id="shareCanvas" style="width:375px;height:300px"></canvas>
		</view>
		
		<view class="bottom">
			<radio-group @change="radioChange" class="row_around">
				<label ><radio value="0" />横向拼接</label>
				<label ><radio value="1" />竖向拼接</label>
			</radio-group>
		</view>
		
	</view>
</template>

<script>
	import { BASE_IMAGE_URL } from "@/utils/api";
	import { canvasImage } from "@/utils/index";
	
	export default {
		data() {
			return {
				upload: BASE_IMAGE_URL+"upload.png",
				imageList: [],
				srcList: []
			}
		},
		methods: {
			radioChange(e){
				console.log(e.detail.value);
				if(this.srcList.length < 1){
					uni.showToast({
						title: '请选择照片',
						icon: 'none'
					})
					return;
				}
				canvasImage(this.srcList, e.detail.value, null, "shareCanvas", (data) => {
					console.log(data);
					// uni.previewImage({
					//     urls: [data],
					// 	current:0
					// });
					uni.navigateTo({
						url: '/pages/image_show/image_show?url='+data
					})
				})
			},
			close(e){
			    this.imageList.splice(e,1);
			},
			previewImage(index) { //预览图片
			    uni.previewImage({
			        urls: this.imageList,
					current:this.imageList[index]
			    });
			},
			chooseImg() { //选择图片
				let that = this;
			    uni.chooseImage({
			        sourceType: ["camera", "album"],
			        sizeType: "compressed",
			        count: 9 - this.imageList.length,
			        success: (res) => {
			            that.imageList = that.imageList.concat(res.tempFilePaths);
						res.tempFilePaths.map((item) => {
							uni.getImageInfo({
								src: item,
								success(data) {
									console.log(data);
									that.srcList.push(data);
								}
							})
						});
						
			        }
			    })
			},
			
		},
		onLoad() {
		}
	}
</script>

<style>
	page{background: #FFFFFF;}
	
	.close-view{
	    text-align: center;line-height:14px;height: 16px;width: 16px;border-radius: 50%;background: #FF5053;color: #FFFFFF;position: absolute;top: -6px;right: -4px;font-size: 12px;
	}
	
	.bottom{position: absolute; bottom: 30upx; left: 0upx; width: 100%;}

	.canvasBox{visibility: hidden;}
</style>
