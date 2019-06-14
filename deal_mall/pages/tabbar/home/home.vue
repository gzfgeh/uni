<template>
	<view>
		<view class="content" >
			<swiper :indicator-dots="true" :autoplay="true" @change="slideChange"
						:interval="5000" :duration="1000" class="head_img">            
					<swiper-item v-for="(item, index) in itemList" :key="index" class="head_img" >  
						<image :src="item.t_url" mode="widthFix" class="head_img"  />           
					</swiper-item>        
			</swiper> 
		</view>
		
		<div class="row">
			<block v-for="(item, index) in modelList" :key="index">
				<navigator class="col_center model_item" @click="goToType(index)">
					<img :src="item.img" mode="widthFix">
					<span>{{item.text}}</span>
				</navigator>
			</block>
		</div>
		
		<div class="row_center center_wrap">
			<span class="line"></span>
			<span>推荐商品</span>
			<span class="line"></span>
		</div>
		
		<div class="row content_wrap">
			<block v-for="(item, index) in list" :key="index" >
				<navigator class="col_center content_item" @click="goToDetail(index)">
					<img :src="item.g_img" mode="aspectFill">
					<div class="col_between content_bottom">
						<span>{{item.g_name}}</span>
						<span class="price">￥{{item.g_price}}</span>
					</div>
				</navigator>
			</block>
		</div>
		
	</view>
	
</template>

<script>
	
	import { BASE_IMAGE_URL,getImgList,getRecommendList,getUserInfo,getConfig } from '@/utils/api'
	
	export default {
	data() {
		return {
			itemList: [],
			modelList: [
				{img: "https://bay.2donghua.com/web/uploads/image/store_1/907ec021b2075525a827e8d139197a66ab255075.png", text: "商品列表"},
				{img: "https://bay.2donghua.com/web/uploads/image/store_1/3c53acb31445befbc40f5c5d26cceadd99281896.png", text: "我的库存"},
				{img: "https://bay.2donghua.com/web/uploads/image/store_1/4c4862b1ac26a3c776b0db0c24dec20c8226d8e8.png", text: "VR"},
				{img: "https://bay.2donghua.com/web/uploads/image/store_1/79db9b3d322f61952dd9f6c0678740b10c94f268.png", text: "入货订单"},
				{img: "https://bay.2donghua.com/web/uploads/image/store_1/7a60a8b4f65843cb7414d730fc445426274c4f71.png", text: "出货订单"}
			],
			t_url: '',
			curIndex: 0,
			contentCurIndex: 0,
			list: [],
			vrUrl: ''
		};
	},
	onLoad() {
		
	},
	onShow() {
		let userInfo = uni.getStorageSync("userInfo");
		if(!userInfo){
			uni.navigateTo({
				url: '/pages/login/login'
			});
			return;
		}
		this.getRecommendList();
		this.getImgList();
		this.getUserInfo();
		this.getConfig();
	},
	
	methods: {
		async getConfig(){
			let res = await getConfig();
			if(res.code == 1000){
				res.data.map((item) => {
					if(item.i_name == "vr链接"){
						this.vrUrl = item.i_info;
					}
				})
			}
		},
		async getUserInfo(){
			let openid = uni.getStorageSync("openid");
			if(openid){
				let res = await getUserInfo(openid);
				if(res.code == 1000){
					uni.removeStorageSync("userInfo");
					uni.setStorageSync("userInfo", res.data);
				}
			}
			
		},
		goToDetail: function(index){
			let userInfo = uni.getStorageSync("userInfo");
			if(!userInfo){
				uni.navigateTo({
					url: '/pages/login/login'
				});
				return;
			}
			uni.navigateTo({
				url: '/pages/goods_detail/goods_detail?g_id='+this.list[index].g_id
			});
		},
		goToType: function(index){
			let userInfo = uni.getStorageSync("userInfo");
			if(!userInfo){
				uni.navigateTo({
					url: '/pages/login/login'
				});
				return;
			}
			
			if(index == 0){
				uni.navigateTo({
					url: '/pages/mall_list/mall_list'
				});
			}else if(index == 1){
				if(userInfo.m_role == 0){
					//游客
					uni.showModal({
						title: "提示",
						content: "无权浏览，如需使用请联系客服开通权限",
						showCancel: false,
						success(res) {
							if(res.confirm){
								uni.switchTab({
									url: '../home/home'
								})
							}
						}
					})
				}else{
					uni.navigateTo({
						url: '/pages/ku_cun_list/ku_cun_list'
					});
				}
				
			}else if(index == 2){
				// VR 
				console.log(this.vrUrl);
				uni.navigateTo({
					url: '/pages/home_webview/home_webview?vrUrl='+this.vrUrl
				});
			}else if(index == 3){
				//入货订单
				if(userInfo.m_role == 0){
					//游客
					uni.showModal({
						title: "提示",
						content: "无权浏览，如需使用请联系客服开通权限",
						showCancel: false,
						success(res) {}
					})
				}else{
					uni.navigateTo({
						url: '/pages/in_order_list/in_order_list'
					});
				}
			}
			else{
				if(userInfo.m_role == 0){
					//游客
					uni.showModal({
						title: "提示",
						content: "无权浏览，如需使用请联系客服开通权限",
						showCancel: false,
						success(res) {}
					})
				}else{
					uni.navigateTo({
						url: '/pages/order_list/order_list?typeIndex='+index
					});
				}
				
			}
			
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
			}
		},
		async getRecommendList(){
			let res = await getRecommendList();
			if(res.code == 1000){
				console.log(res.data);
				this.list = res.data;
			}
		},
		
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
.content_item{width: 31.33%; margin: 10upx 1%;}
.content_item img{width: 100%; height: 242upx;}
.content_bottom{padding: 0upx 18upx; margin-top: 16upx; font-size: 30upx; color: #353535; flex: 1;}
.content_bottom .price{color: #ff334b; font-size: 34upx; text-align: center;}
</style>
