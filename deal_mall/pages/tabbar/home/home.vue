<template>
	<view>
		<view class="content" >
			<swiper :indicator-dots="true" :autoplay="true" @change="slideChange"
						:interval="5000" :duration="1000" class="head_img">            
					<swiper-item v-for="(item, index) in itemList" :key="index" class="head_img" >  
						<image src="https://bay.2donghua.com/web/uploads/image/store_1/39db83b2af38b3b427aff184ef1d7dd422bf6a10.png" mode="widthFix" class="head_img"  />           
					</swiper-item>        
			</swiper> 
		</view>
		
		<div class="row">
			<block v-for="(item, index) in modelList" :key="index">
				<navigator class="col_center model_item" url="../../mall_list/mall_list">
					<img :src="item.img" mode="widthFix">
					<span>{{item.text}}</span>
				</navigator>
			</block>
		</div>
		
		<div class="row_center center_wrap">
			<span class="line"></span>
			<span>服装</span>
			<span class="line"></span>
		</div>
		
		<div class="row content_wrap">
			<block v-for="(item, index) in list" :key="index">
				<navigator class="col_center content_item" >
					<img src="https://bay.2donghua.com/web/uploads/image/store_1/f04f242ce46046dde84b0a6f7d9ba3f25f52a585.jpg" mode="aspectFill">
					<div class="col_between content_bottom">
						<span>萧遇女装连衣裙2019夏季新品</span>
						<span class="price">￥300.00</span>
					</div>
				</navigator>
			</block>
		</div>
		
	</view>
	
</template>

<script>
	
	import { BASE_IMAGE_URL,getImgList } from '@/utils/api'
	
	export default {
	data() {
		return {
			itemList: [1,2,1,3,4,5],
			modelList: [
				{img: "https://bay.2donghua.com/web/uploads/image/store_1/907ec021b2075525a827e8d139197a66ab255075.png", text: "商品列表"},
				{img: "https://bay.2donghua.com/web/uploads/image/store_1/4c4862b1ac26a3c776b0db0c24dec20c8226d8e8.png", text: "VR"},
				{img: "https://bay.2donghua.com/web/uploads/image/store_1/79db9b3d322f61952dd9f6c0678740b10c94f268.png", text: "我的订单"},
				{img: "https://bay.2donghua.com/web/uploads/image/store_1/7a60a8b4f65843cb7414d730fc445426274c4f71.png", text: "下级订单"}
			],
			t_url: '',
			curIndex: 0,
			contentCurIndex: 0,
			statusBarHeight: 0,
			list: [1,2,3,4,5,6,7,8]
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
				url: '/pages/express_main/express_main'
			});
		},
		goToRecentUsed(){
			uni.navigateTo({
				url: '/pages/recent_used/recent_used'
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
.content {height: 360upx;position: relative;}
.head_img{width: 100%;height: 360upx!important;}
.model_item{flex: 1; height: 190upx; width: 100%; font-size: 30upx; border-top: 2upx solid #E3E3E3;}
.model_item img{width: 80upx; margin-bottom: 16upx;}

.hover-class{background-color: rgba(0,0,0,0.7);}
.center_wrap{height: 100upx;}
.center_wrap .line{width: 30upx; height: 4upx; background: #ddd; display: inline-block; position: relative;z-index: 100;}
.center_wrap span{margin: 0upx 20upx; font-size: 34upx;}

.content_wrap{flex-flow: wrap;}
.content_item{width: 31.33%; margin: 10upx 1%; height: 360upx;}
.content_item img{width: 100%; height: 242upx;}
.content_bottom{padding: 0upx 18upx; margin-top: 16upx; font-size: 30upx; color: #353535; flex: 1;}
.content_bottom .price{color: #ff334b; font-size: 34upx; text-align: center;}
</style>
