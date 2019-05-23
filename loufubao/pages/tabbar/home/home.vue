<template>
	<view>
		<view class="content" >
			<swiper :indicator-dots="false" :autoplay="true" @change="slideChange"
						:interval="5000" :duration="1000" class="head_img">            
					<swiper-item v-for="(item, index) in itemList" :key="index" class="head_img" @tap="goToH5(index)">  
						<image src="../../../static/img/home_banner.jpg" mode="widthFix" class="head_img"  />           
					</swiper-item>        
			</swiper> 
			
			<view class="dots">
				<block v-for="(item, index) in itemList" :key="index">
					<view class="dot_normal" :class="{'active': (index==curIndex)}"></view>
				</block>
			</view>
			
			<div class="row_between home_head_wrap">
				<div class="row_center home_head_left">
					<span>请选择楼宇</span>
					<img src="../../../static/img/lou_select.png" mode="widthFix">
				</div>
				<div class="row search_wrap">
					<img src="../../../static/img/home_search.png" mode="widthFix">
					<div>搜索关键字</div>
				</div>
				
				<div class="msg_wrap" @tap="goToMsg">
					<img src="../../../static/img/home_msg.png" mode="widthFix">
					<div class="red_hot"></div>
				</div>
			</div>
		</view>
		
		<div class="content_wrap">
			<div class="module_content">
				<swiper :indicator-dots="false" :autoplay="false" @change="slideContentChange">            
						<swiper-item v-for="(item, index) in itemList" :key="index" @tap="goToH5(index)">  
							<div class="col">
								<img src="../../../static/img/home_kuaidi.jpg" alt="">
								<span>快递服务</span>
							</div>         
						</swiper-item>        
				</swiper> 
				
				<view class="dots">
					<block v-for="(item, index) in itemList" :key="index">
						<view class="dot_normal" :class="{'active': (index==contentCurIndex)}"></view>
					</block>
				</view>
			</div>
			
			<div class="row_between more_wrap">
				<div class="row_center">
					<img src="../../../static/img/home_use.jpg">
					<span>最近使用</span>
				</div>
				
				<div class="row_center more_item">
					<span>更多</span>
					<img src="../../../static/img/home_more.jpg">
					
				</div>
			</div>
			
			<scroll-view scroll-x class="scroll-Y scrollbar">
				<div class="item_wrap">
					<div class="col_center swipe_scroll_x_item" v-for="(item, index) in itemList" :key="index">
						<div class="col_center">
							<image src="../../../static/img/home_use_icon.jpg"   /> 
							<span>个人快递</span>
						</div>
					</div> 
				</div>
				
			</scroll-view>
			
			<div class="bottom_wrap">
				<img src="../../../static/img/home_bottom.jpg" mode="widthFix">
			</div>
			
		</div>
		
		
		
	</view>
	
</template>

<script>
	
	import { BASE_IMAGE_URL,getImgList } from '@/utils/api'
	// var statusBarHeight = uni.getSystemInfoSync().statusBarHeight + 'px'
	
	export default {
	data() {
		return {
			itemList: [1,2,1,3,4,5],
			t_url: '',
			curIndex: 0,
			contentCurIndex: 0,
			statusBarHeight: 0
		};
	},
	onLoad() {
		this.statusBarHeight = uni.getSystemInfoSync().statusBarHeight + 'px';
		console.log(this.statusBarHeight);
		//this.getImgList();
	},
	methods: {
		goToMsg: function(){
			uni.navigateTo({
				url: '/pages/message/message'
			});
		},
		goToH5: function(index){
			uni.navigateTo({
				url: '/pages/forget/forget'
			});
		},
		slideChange: function(e){
			this.curIndex = e.mp.detail.current;
		},
		slideContentChange: function(e){
			this.contentCurIndex = e.mp.detail.current;
		},
		async getImgList(){
			let res = await getImgList();
			if(res.code == 1000){
				console.log(res.data);
				this.itemList = res.data;
				
				this.itemList.map((item) => {
					if(item.t_url.indexOf("http:") != -1){
						item.t_url = "https" + item.t_url.substring(4, item.t_url.length);
					}
				})
			}
		}
		
	}
};
</script>

<style>
.content {
	height: 400upx;
	position: relative;
}

.module_content{position: relative; height: 236upx; border-bottom: 2upx solid #E3E3E3; margin: 0upx 30upx;}
.module_content swiper{padding: 30upx;}
.module_content swiper img{width: 64upx; height: 64upx; margin-bottom: 14upx;}

.head_img{width: 100%;height: 400upx!important;}

.dots{display: flex;flex-direction: row;justify-content: center;align-items: center;position: absolute;bottom: 20upx;height: 20upx;width: 100%;z-index: 100;}
.dot_normal{width: 10upx;height: 10upx;border-radius: 50%;background-color: #E0E5ED;margin: 0upx 6upx;position: relative;z-index: 100;}
.active{width: 24upx;height: 10upx;border-radius: 40%;background-color: #107EFF;z-index: 100;}

.home_head_wrap{position: absolute;top: 60upx; width: 100%; color: #FFFFFF; font-size: 24upx; padding: 0upx 20upx; box-sizing: border-box;}
.home_head_left span{font-size: 24upx; overflow: hidden;width: 130upx;white-space: nowrap;text-overflow:ellipsis;}
.home_head_left img{width: 24upx; height: 24upx; margin-left: 5upx;}
.msg_wrap{position: relative;}
.msg_wrap img{width: 50upx; height: 40upx;}
.red_hot{width: 20upx; height: 20upx; position: absolute;right: 0upx; top: 0upx;background-color: red; z-index: 2;border-radius: 50%;}

.search_wrap{position: relative;border-radius: 36upx; background-color: rgba(244, 244, 244, 0.75); flex: 1;height: 72upx; margin: 0upx 20upx; padding-left: 20upx; color: #9B9B9B; font-size: 28upx;}
.search_wrap img{width: 28upx; height: 28upx; margin-right: 20upx;}
.more_wrap{margin-top: 60upx; padding: 0upx 30upx; color: #333333; font-size: 44upx;}
.more_wrap img{width: 36upx; height: 42upx; margin-right: 16upx;}

.more_item{font-size: 24upx; color: #999999;}

.scroll-Y{ white-space: nowrap; width: 100%; box-sizing: border-box;padding: 30upx;}
.scroll-Y .item_wrap{white-space: nowrap;}
.swipe_scroll_x_item{box-shadow:  0px 0px 2px #ccc; color: #333333; font-size: 28upx; width: 180upx!important; height: 220upx; padding-top: 50upx; box-sizing: border-box; display: inline-block; margin-left: 30upx;}
.swipe_scroll_x_item image{width: 80upx; height: 80upx; }

::-webkit-scrollbar{width: 0;height: 0;background-color: transparent; }

.bottom_wrap{padding: 5%; box-sizing: border-box; }
.bottom_wrap img{width: 100%; margin-bottom: 60upx;}

</style>
