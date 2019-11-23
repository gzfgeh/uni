<template>
	<view>
		<view class="title_wrap">
			<view class="status-bar" :style="{'height': statusBarHeight+'px'}"></view>
			<view class="head_wrap row_between" :style="{'height': titleHeight+'px'}">
				<image :src="white_back_icon" mode="aspectFill" class="back_icon" @tap="backAction"></image>
			</view>
		</view>
		
		<view :style="{'height': tempHeight+'px'}"></view>
		
		<image :src="team_title" mode="aspectFill"  :style="{'top': tempHeight+'px'}"
			class="team_title" :animation="upDown"></image>
			
		<image :src="team_bg" mode="aspectFill" class="team_bg"></image>
		
		<scroll-view class="content" scroll-y="true" @scroll="scroll" :style="{'height' : scrollHeightVal+'px'}">
			<view class="temp_view"></view>
			<view class="content_wrap" :style="{'height' : scrollHeightVal+'px'}" >
				<view class="content_title">STORES BRAND</view>
				<view v-for="(item,index) in list" :key="index" class="row item" @tap="goToItem(index)">
					<image :src="team_first_icon" mode="aspectFill" v-if="index==0" class="head_index"></image>
					<image :src="item.m_avatar" mode="aspectFill" ></image>
					<span>{{item.m_truename}}</span>
				</view>
			</view>
		</scroll-view>
		
		
		
	</view>
</template>

<script>
	import { BASE_IMAGE_URL,getMyTeam } from "@/utils/api";
	
	export default {
		data() {
			return {
				head_logo: BASE_IMAGE_URL+"head_logo.png",
				team_bg: BASE_IMAGE_URL+"team_bg.png",
				white_back_icon: BASE_IMAGE_URL+"white_back_icon.png",
				team_title: BASE_IMAGE_URL+"team_title.png",
				team_first_icon: BASE_IMAGE_URL+"team_first_icon.png",
				animation: {},
				upDown: {},
				list: [1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8,9],
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
				setTimeout(() => {
					this.animation = uni.createAnimation({
						  duration: 1,
						  timingFunction: "ease",
						  delay: 0
					});
					 
				}, 0);
			},
			async getMyTeam(){
				let res = await getMyTeam();
				if(res.code == 1000){
					this.list = res.data;
				}
			},
			goToItem(index){
				if(index==0){
					uni.navigateTo({
						url:'/pages/erweima/erweima?avatar='+this.list[0].m_avatar+
								"&name="+this.list[0].m_name+"&m_z_id="+this.list[0].m_z_id
					})
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
			this.getMyTeam();
			
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
	
	.temp_view{width: 100vw; height: 670upx; background: transparent;}
	.team_title{ left: 34upx; position: absolute;z-index: 2; height: 108upx; width: 210upx;}
	.content_title{font-size: 40upx; color: #000000; padding: 34upx;}
	
	.content_wrap{width: 100vw; background: #FFFFFF; position: relative; box-sizing: border-box;}
	.content_wrap .item{padding: 20upx 34upx; background: #FFFFFF; position: relative;}
	.content_wrap .item .head_index{width: 105upx; height: 105upx; position: absolute; top:16upx; left: 30upx;}
	.content_wrap .item image{width: 96upx; height: 96upx; margin-right: 45upx; border-radius: 50%;}
	.content_wrap .item span{color: #000000; font-size: 32upx;}
	
	
	
	
</style>
