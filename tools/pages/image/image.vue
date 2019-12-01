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
		  <canvas canvas-id="shareCanvas" :style="[{width: imgWidth+'px'}, {height: imgHeight+'px'}]"></canvas>
		</view>
		
		<view class="bottom">
			<radio-group @change="radioChange" class="row_around">
				<label ><radio value="0" :checked="checked == 0"/>横向拼接</label>
				<label ><radio value="1" :checked="checked == 1"/>竖向拼接</label>
			</radio-group>
		</view>
		
	</view>
</template>

<script>
	import { BASE_IMAGE_URL } from "@/utils/api";
	// import { canvasImage } from "@/utils/index";
	
	export default {
		data() {
			return {
				upload: BASE_IMAGE_URL+"upload.png",
				imageList: [],
				srcList: [],
				checked: -1,
				imgWidth: 0,
				imgHeight: 0
			}
		},
		methods: {
			radioChange(e){
				console.log(e.detail.value);
				this.checked = e.detail.value;
				if(this.srcList.length < 1){
					uni.showToast({
						title: '请选择照片',
						icon: 'none'
					});
					this.checked = -1;
					return;
				}
				this.canvasImage(this.srcList, e.detail.value, null, "shareCanvas", (data) => {
					console.log(data);
					// uni.previewImage({
					//     urls: [data],
					// 	current:0
					// });
					uni.navigateTo({
						url: '/pages/image_show/image_show?url='+data+"&type="+e.detail.value
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
			
			canvasImage(imgList, type=0, titleObject, canvasIds, callback){
				// 初始化画布，小程序里面一定要有canvasid，它是以这个为标识来识别的
				    const ctx = wx.createCanvasContext(canvasIds)
				    // 合成多张图片的时候，放到一个数组里面，进行遍历
					let imgWidth = this.imgWidth;
					let imgHeight = this.imgHeight;
				    imgList.forEach((item, index) => {
				        
						if(type == 0){
							// 横向
							let width = item.width*300/item.height;
							ctx.drawImage(
							    item.path,
							    imgWidth,
							    0,
							    width,
							    300
							);
							imgHeight = 300;
							imgWidth += width;
							console.log(index);
						}else{
							//竖向
							let height = item.height*300/item.width;
							ctx.drawImage(
							    item.path,
							    0,
							    imgHeight,
							    300,
							    height
							);
							imgHeight += height;
							imgWidth = 300;
						}
						console.log(imgWidth + "-----" + imgHeight);
				    })
					console.log(imgWidth + "-----" + imgHeight);
					this.imgWidth = imgWidth;
					this.imgHeight = imgHeight;
				    // 写文字水印
					if(titleObject){
						ctx.setFontSize(titleObject.fontSize)
						ctx.fillText(titleObject.content, titleObject.x, titleObject.y)
					}
				    
				    // 画出canvas上面的图片
				    ctx.draw(false, setTimeout(function () {
				        // wx.canvasToTempFilePath这个一定要写在ctx.draw里面的回调里面，是坑勿跳
						wx.getSystemInfo({
							success: function(data){
								let pixelRatio = data.pixelRatio;
								wx.canvasToTempFilePath({
								    canvasId: canvasIds,
								    destWidth: imgWidth*pixelRatio,
								    destHeight: imgHeight*pixelRatio,
									width: imgWidth,
									height: imgHeight,
								    quality: 1,
								    success: function (res) {
								        console.log(res.tempFilePath)
								        callback(res.tempFilePath)
								    },
								    fail: function (res) {
								        console.log(res)
								    }
								})
								
							}
						});
						
				        
				    }, 200))
			}
			
		},
		onLoad() {
			
		},
		onShow() {
			this.checked = -1;
			this.imgWidth = 0;
			this.imgHeight = 0;
			this.$forceUpdate();
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
