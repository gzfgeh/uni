<template>
	<view class="contain">
		<image :src="schedule_bg" mode="aspectFill" class="team_bg"></image>
		<view class="title_wrap">
			<view class="status-bar" :style="{'height': statusBarHeight+'px'}"></view>
			<view class="head_wrap row_between" :style="{'height': titleHeight+'px'}">
				<image :src="white_back_icon" mode="aspectFill" class="back_icon" @tap="backAction"></image>
			</view>
		</view>
		
		<view :style="{'height': tempHeight+'px'}"></view>
		
		<image :src="schedule_title" mode="aspectFill"  :style="{'top': tempHeight+'px'}"
			class="team_title" :animation="upDown"></image>
		
		<scroll-view class="content" scroll-y="true" @scroll="scroll" 
			scroll-with-animation="true"  :style="{'height' : scrollHeightVal+'px'}" >
			<view class="temp_view" v-if="tempViewShow"></view>
			<view class="content_wrap" :style="{'height' : scrollHeightVal+'px'}">
				<view v-for="(item,index) in list" :key="index" class="col item" >
					<view  @click="clickItem(index)" >
						<image :src="item.c_title_img" mode="aspectFill" class="title_bg"></image>
						<!-- <span style="position: relative;z-index: 2;">{{item.c_title}}</span> -->
					</view>
					<!-- <image :src="schedule_item" mode="widthFix" v-if="item.isShow" ></image> -->
					<rich-text :nodes="item.c_detail" v-if="item.isShow" ></rich-text>
				</view>
			</view>
		</scroll-view>
		
		
	</view>
</template>

<script>
	import { BASE_IMAGE_URL,richangAnpai } from "@/utils/api";
	
	export default {
		data() {
			return {
				head_logo: BASE_IMAGE_URL+"head_logo.png",
				schedule_bg: BASE_IMAGE_URL+"schedule_bg.png",
				schedule_item: BASE_IMAGE_URL+"schedule_item.png",
				white_back_icon: BASE_IMAGE_URL+"white_back_icon.png",
				schedule_title: BASE_IMAGE_URL+"schedule_title.png",
				animation: {},
				upDown: {},
				list: [],
				oldScroll: 0,
				topScroll: 330,
				bottomScroll: 265,
				scrollHeight: 49,
				scrollX: -16,
				tempViewShow: true,
				statusBarHeight: 0,
				titleHeight: 0,
				tempHeight: 0,
				scrollHeightVal: 0,
				scrollTop: 0,
				old: {  
					scrollTop: 0 
				},
			}
		},
		methods: {
			async richangAnpai(){
				// c_xiaozu_id
				let res = await richangAnpai(uni.getStorageSync("userInfo").m_z_id);
				if(res.code == 1000){
					this.list = res.data;
					this.list.map((item) => {
						var richtext=  item.c_detail;
						const regex = new RegExp('<img', 'gi');
						item.c_detail= richtext.replace(regex, `<img style="max-width: 100%;"`);
						item.isShow = false;				 
					})
				}
			},
			goToTop: function(){
				this.scrollTop = this.old.scrollTop;
				let that = this;
				this.$nextTick(function() {
					that.scrollTop = 0
				});
			},
			clickItem: function(index){
				if(this.list[index].isShow){
					this.list[index].isShow = !this.list[index].isShow;
					this.$forceUpdate();
					return;
				}else{
					this.list.map((item) => {
						item.isShow = false;
					});
					this.list[index].isShow = true;
					this.tempViewShow = false;
				};
				this.goToTop();
				this.animation
				.translate(this.scrollX, -this.scrollHeight)
				.scale(0.6, 0.6)
				.step();
				this.upDown = this.animation.export();
				this.$forceUpdate();

			},
			backAction: function(){
				uni.navigateBack();
			},
			scroll: function(e){
				console.log(e.detail.scrollTop);
				this.old.scrollTop = e.detail.scrollTop
				// 0 ~ 350  && this.tempViewShow
				if(e.detail.scrollTop == 0){
					this.oldScroll = this.old.scrollTop;
					return;
				}
				
				let animation = this.animation;
				let distance = this.topScroll - this.bottomScroll;
				let curDistance = e.detail.scrollTop - this.bottomScroll;
				let scaleValue = parseFloat(parseFloat(curDistance * 0.4).toFixed(2) / distance).toFixed(2) ;
				// console.log(1-scaleValue);
				
				if(e.detail.scrollTop > this.oldScroll){
					if(!this.tempViewShow){
						this.oldScroll = this.old.scrollTop;
						return;
					}
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
						this.goToTop();
					}
				}else{
					if(!e){
						return;
					}
					this.tempViewShow = true;
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
			}
		},
		onLoad() {
			this.richangAnpai();
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
	page{background: #FFFFFF;}
	.contain{overflow: hidden; height: 100vh; width: 100vw;}
	.title_wrap{position: fixed; top: 0px; left: 0px; width: 100vw; z-index: 2;}
	.status-bar{}
	.team_bg{width: 100vw; position: fixed; top: 0upx; left: 0upx; z-index: 0; height: 946upx;}
	.content{background: transparent; width: 100vw;position: relative;z-index: 2; 
	display: flex;flex-direction: column; }
	
	.head_wrap{padding:0upx 34upx; }
	.back_icon{width: 17upx; height: 30upx; margin-right: 17upx;}
	
	.team_title{ left: 34upx; position: absolute;z-index: 2; height: 108upx; width: 390upx;}
	.content_title{font-size: 40upx; color: #000000; padding: 34upx;}
	
	.temp_view{width: 100vw; height: 670upx; background: transparent;}
	.content_wrap{width: 100vw; background: #FFFFFF; position: relative; box-sizing: border-box; padding: 85upx 0upx 108upx;}
	.content_wrap .item{ background: #FFFFFF; padding: 0upx 40upx 20upx; position: relative; z-index: 2;}
	.content_wrap .item image{width: 100%;}
	.content_wrap .item view{color: #000000; font-size: 32upx;  height: 60upx; line-height: 60upx; text-align: center; width: 100%; }
	
	.title_bg{position: absolute; width: 90%!important; height: 60upx!important; top: 0upx; left: 5%; border-radius: 30upx;}
</style>
