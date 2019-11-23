<template>
	<view>
		<view class="title_wrap">
			<view class="status-bar" :style="{'height': statusBarHeight+'px'}"></view>
			<view class="head_wrap row_between" :style="{'height': titleHeight+'px'}">
				<image :src="white_back_icon" mode="aspectFill" class="back_icon" @tap="backAction"></image>
			</view>
		</view>
		
		<view :style="{'height': tempHeight+'px'}"></view>
		
		<image :src="contacts_title" mode="aspectFill"  :style="{'top': tempHeight+'px'}"
			class="team_title" :animation="upDown"></image>
		
		<image :src="contacts_bg" mode="aspectFill" class="team_bg"></image>	
		
		<scroll-view class="content" scroll-y="true" @scroll="scroll" 
			scroll-with-animation="true" :style="{'height' : scrollHeightVal+'px'}"  >
			<view class="temp_view"  ></view>
			<view class="content_wrap" :style="{'height' : scrollHeightVal+'px'}" >
				<view v-for="(item,index) in list" :key="index" class="item" @click="clickItem(index)">
					<view class="row_between">
						<view class="text_wrap">
							<span class="name">{{item.l_title}}</span>
							<span>{{item.l_name}}  {{item.l_mobile}}</span>
						</view>
						<image :src="phone_icon" mode="aspectFill" class="phone_icon"></image>
					</view>
					<image :src="contacts_line" mode="aspectFill" class="contact_line"></image>
				</view>
			</view>
		</scroll-view>
		
		
	</view>
</template>

<script>
	import { BASE_IMAGE_URL,getLianxiren } from "@/utils/api";
	
	export default {
		data() {
			return {
				head_logo: BASE_IMAGE_URL+"head_logo.png",
				contacts_bg: BASE_IMAGE_URL+"contacts_bg.png",
				white_back_icon: BASE_IMAGE_URL+"white_back_icon.png",
				contacts_title: BASE_IMAGE_URL+"contacts_title.png",
				phone_icon: BASE_IMAGE_URL+"phone_icon.png",
				contacts_line: BASE_IMAGE_URL+"contacts_line.png",
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
			}
		},
		methods: {
			clickItem: function(index){
				let that = this;
				uni.showModal({
					title:'提示',
					content:"是否拨打电话"+that.list[index].l_mobile+"?",
					success: function (res) {
					        if (res.confirm) {
					            uni.makePhoneCall({
					                phoneNumber: that.list[index].l_mobile,
					            	success: (res) => {
					            		console.log('调用成功!')	
					            	},
					            	// 失败回调
					            	fail: (res) => {
					            		console.log('调用失败!')
					            	}
					              });
					        } else if (res.cancel) {
					            console.log('用户点击取消');
					        }
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
			async getLianxiren(){
				let res = await getLianxiren();
				if(res.code == 1000){
					this.list = res.data;
				}
			}
		},
		onLoad() {
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
			
			this.getLianxiren();
		}
	}
</script>

<style>
	page{background: #FFFFFF;}
	.contain{overflow: hidden; height: 100vh; width: 100vw;}
	.title_wrap{position: fixed; top: 0px; left: 0px; width: 100vw; z-index: 2;}
	.status-bar{}
	
	.team_bg{width: 100vw; position: fixed; top: 0upx; left: 0upx; z-index: 0; height: 946upx;}
	.content{background: transparent; width: 100vw;position: relative;z-index: 2; height: calc(100vh - 93px); display: flex;flex-direction: column; }
	
	.head_wrap{padding:0upx 34upx;}
	.back_icon{width: 17upx; height: 30upx; margin-right: 17upx;}
	
	.temp_view{width: 100vw; height: 670upx; background: transparent;}
	.team_title{ left: 34upx; position: absolute;z-index: 2; height: 108upx; width: 240upx;}
	.content_title{font-size: 40upx; color: #000000; padding: 34upx;}
	
	.content_wrap{width: 100vw; background: #FFFFFF; position: relative; box-sizing: border-box;}
	
	.content_wrap .item{ background: #FFFFFF; padding:74upx 40upx 0upx; color: #000000; display: flex;flex-direction: column; overflow: hidden; box-sizing: border-box; position: relative;}
	.content_wrap .item .text_wrap{display:  flex; flex-direction: column; margin-bottom: 20upx; line-height: 1.0;}
	.content_wrap .item .name{font-size: 30upx; margin-bottom: 60upx;  display: inline-block;overflow-wrap:break-word; }
	.content_wrap .item .phone_icon{width: 48upx; height: 48upx;}
	.content_wrap .item .contact_line{width: 100%; height: 2upx;}

</style>
