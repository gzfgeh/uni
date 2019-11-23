<template>
	<view>
		
		<uni-status-bar @finishPage="backAction"></uni-status-bar>
		
		<image :src="daily_title" mode="aspectFill"  :style="{'top': tempHeight+'px'}"
			class="team_title" :animation="upDown"></image>
			
		<image :src="daily_bg" mode="aspectFill" class="team_bg"></image>
		
		
		<scroll-view class="content" scroll-y="true" @scroll="scroll" 
			scroll-with-animation="true" :style="{'height' : scrollHeightVal+'px'}"  >
			<view class="temp_view"  ></view>
			<view class="content_wrap" :style="{'height' : scrollHeightVal+'px'}" >
				<view class="item" >
					<view class="title">标题</view>
					<view class="uni-list">
						<view class="uni-list-cell">
							<view class="uni-list-cell-db">
								<picker @change="bindPickerChange" :value="titleIndex" :range="array">
									<view class="uni-input row">
										<span style="font-size: 50px;">·</span>
										<span style="font-size: 28rpx; flex: 1;">{{array[titleIndex]}}</span>
										<span class="arraw_down_black"></span>
									</view>
								</picker>
							</view>
						</view>
					</view>
					
					<view class="feedback-body feedback-uploader">
					    <view class="uni-uploader">
					        <view class="uni-uploader-head">
					            <view class="uni-uploader-title">图片上传</view>
					            <view class="uni-uploader-info">{{imageList.length}}/9</view>
					        </view>
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
					<view class="feedback-body">
						<textarea placeholder="请输入日志" v-model="sendDate.content" class="feedback-textare" />
					</view>
					
					<image :src="postBtn" mode="aspectFill" class="post_btn"></image>
					
				</view>
			</view>
		</scroll-view>
		
		
	</view>
</template>

<script>
	import { BASE_IMAGE_URL,getContentList } from "@/utils/api";
	import uniStatusBar from '@/components/mini_status_bar.vue';
	
	export default {
		components: {
			uniStatusBar
		},
		data() {
			return {
				head_logo: BASE_IMAGE_URL+"head_logo.png",
				daily_bg: BASE_IMAGE_URL+"daily_bg.png",
				white_back_icon: BASE_IMAGE_URL+"white_back_icon.png",
				daily_title: BASE_IMAGE_URL+"daily_title.png",
				postBtn: BASE_IMAGE_URL+"daily_post_btn.png",
				animation: {},
				upDown: {},
				list: [],
				oldScroll: 0,
				topScroll: 340,
				bottomScroll: 270,
				scrollHeight: 66,
				scrollX: 0,
				statusBarHeight: 0,
				titleHeight: 0,
				tempHeight: 0,
				scrollHeightVal: 0,
				array: ['中国', '美国', '巴西', '日本'],
				titleIndex: 0,
				imageList: [],
			}
		},
		methods: {
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.titleIndex = e.target.value
			},
			previewImage(index) { //预览图片
			    uni.previewImage({
			        urls: this.imageList,
					current:this.imageList[index]
			    });
			},
			chooseImg() { //选择图片
			    uni.chooseImage({
			        sourceType: ["camera", "album"],
			        sizeType: "compressed",
			        count: 9 - this.imageList.length,
			        success: (res) => {
			            this.imageList = this.imageList.concat(res.tempFilePaths);
			        }
			    })
			},
			backAction: function(){
				uni.navigateBack();
			},
			scroll: function(e){
				console.log(e.detail.scrollTop);
				// 0 ~ 350
				let animation = this.animation;
				let distance = this.topScroll - this.bottomScroll;
				let curDistance = e.detail.scrollTop - this.bottomScroll;
				let scaleValue = parseFloat(parseFloat(curDistance * 0.4).toFixed(2) / distance).toFixed(2) ;
				console.log(1-scaleValue);
				if(e.detail.scrollTop > this.oldScroll){
					//往上滑
					if(e.detail.scrollTop < this.topScroll && e.detail.scrollTop>this.bottomScroll){
						animation
						.translate(curDistance * this.scrollX / distance, -curDistance * this.scrollHeight/distance)
						.scale(1-scaleValue, 1-scaleValue)
						.step();
						this.upDown = animation.export();
					}else if(e.detail.scrollTop >= this.topScroll){
						animation
						.translate(this.scrollX, -this.scrollHeight)
						.scale(0.6, 0.6)
						.step();
						this.upDown = animation.export();
					}
				}else{
					//往下滑
					if(e.detail.scrollTop < this.topScroll && e.detail.scrollTop > this.bottomScroll){
						animation
						.translate(curDistance*this.scrollX/distance, -curDistance*this.scrollHeight/distance)
						.scale(1-scaleValue, 1-scaleValue)
						.step();
						this.upDown = animation.export();
					}else if(e.detail.scrollTop <= this.bottomScroll){
						animation.translate(0, 0).scale(1, 1).step();
						this.upDown = animation.export();
					}
				};
				setTimeout(()=>{
					this.oldScroll = e.detail.scrollTop;
				}, 1);
				
			},
			enterShow(){
				this.animation = uni.createAnimation({
					  duration: 1,
					  timingFunction: "ease",
					  delay: 0
				});
			},
			async getContentList(){
				let res = await getContentList(1);
				if(res.code == 1000){
					this.list = res.data;
					this.list.map((item) => {
						var richtext=  item.c_detail;
						const regex = new RegExp('<img', 'gi');
						item.c_detail= richtext.replace(regex, `<img style="max-width: 100%;"`);
										 
					})
				}
			}
		},
		onLoad() {
			this.getContentList();
			this.enterShow();
			let screenWidth =  uni.getSystemInfoSync().screenWidth;
			let screenHeight =  uni.getSystemInfoSync().screenHeight;
			this.statusBarHeight = wx.getSystemInfoSync().statusBarHeight;
			if(uni.getSystemInfoSync().platform == "android"){
				this.titleHeight = 48;
				this.bottomScroll = 265;
			}else{
				this.titleHeight = 44;
				this.bottomScroll = 270;
			}
			this.tempHeight = parseInt(this.statusBarHeight)+parseInt(this.titleHeight);
			this.scrollHeightVal = screenHeight - this.tempHeight;
			
			console.log(screenWidth + "-----" + screenHeight);
			this.scrollHeight = 27+this.titleHeight/2;
			this.topScroll = this.bottomScroll + this.scrollHeight;
		}
	}
</script>

<style>
	page{background: #ddd;}
	.contain{overflow: hidden; height: 100vh; width: 100vw;}
	.title_wrap{position: fixed; top: 0px; left: 0px; width: 100vw; z-index: 2;}
	.status-bar{}
	
	.team_bg{width: 100vw; position: fixed; top: 0upx; left: 0upx; z-index: 0; height: 946upx;}
	.content{background: transparent; width: 100vw;position: relative;z-index: 2; height: calc(100vh - 93px); display: flex;flex-direction: column; }
	
	.head_wrap{padding:0upx 34upx;}
	.back_icon{width: 17upx; height: 30upx; margin-right: 17upx;}
	
	.temp_view{width: 100vw; height: 670upx; background: transparent;}
	.team_title{ left: 34upx; position: absolute;z-index: 2; height: 108upx; width: 257upx;}
	.content_title{font-size: 40upx; color: #000000; padding: 34upx;}
	
	.content_wrap{width: 100vw; background: #FFFFFF; position: relative; box-sizing: border-box;}
	
	.content_wrap .item{ background: #FFFFFF; color: #000000; }
	.content_wrap .item .title{ padding: 25upx 34upx 0upx; color: #333333; }
	.content_wrap .item .uni-list{ margin: 25upx 5%; width:90%; border: 2upx solid #EEEEEE;}
	.content_wrap .item .uni-list::before{ height: 0upx;}
	.content_wrap .item .uni-list::after{ height: 0upx;}
	
	.feedback-uploader{border-top: 2upx solid #eee; border-bottom: 2upx solid #eee; padding: 22upx 40upx;}
	
	.post_btn{width: 370upx; height: 48upx; margin-left: calc(50vw - 94px)}
</style>
