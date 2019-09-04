<template>
	
	<view class="contain">
		
		<view class="content" >
			<swiper :indicator-dots="false" :autoplay="true" @change="slideChange"
						:interval="5000" :duration="1000" class="head_img">            
					<swiper-item v-for="(item, index) in itemList" :key="index" class="head_img" @tap="goToH5(index)">  
						<image :src="item.bannerImageUrl" mode="widthFix" class="head_img"  />           
					</swiper-item>        
			</swiper> 
			
			<view class="dots">
				<block v-for="(item, index) in itemList" :key="index">
					<view class="dot_normal" :class="{'active': (index==curIndex)}"></view>
				</block>
			</view>
			
			<div class="row_between home_head_wrap" :style="{'padding-top': (isAPP?'70upx':'20upx')}">
				<div class="row_center home_head_left" @tap="selectBuild()">
					<span>{{buildingName}}</span>
					<img src="../../../static/img/lou_select.png" mode="widthFix">
				</div>
				<div class="row search_wrap" @click="goToSearch">
					<img src="../../../static/img/home_search.png" mode="widthFix">
					<div>搜索关键字</div>
				</div>
			</div>
		</view>
		
		<div class="row mall_wrap" v-if="false">
			<img src="../../../static/img/mall_enter.png" mode="aspectFill" class="mall flex_one" @click="goToMallType">
			<img src="../../../static/img/card_enter.png" mode="aspectFill" class="flex_one" @click="goToCard">
		</div>
		
		<!-- <navigator class="row mall_wrap" url="../../mall_type/mall_type">
			<div class="row flex_one">
				<img src="../../../static/img/icon_tj_active.png" mode="widthFix">
				<span>商城</span>
			</div>
			
			<span class="arraw"></span>
		</navigator> -->
		
		<div class="row_around nav_wrap" v-if="false">
			<div class="col_center nav_item" v-for="(item, index) in typeList" :key="index"
				@click="changeType(index)">
				<img :src="typeIndex == index? item.active_icon : item.icon" mode="aspectFill">
				<span :class="{'type_active': (typeIndex == index)}">{{item.name}}</span>
			</div>
		</div>
		
		<view class="index">  
			<view class="left">  
				<block v-for="(item, index) in list" :key="index" class="itemlist">  
					<navigator class="card" @click="goToShop(item)" v-if="index%2==0">  
						<image class="card-img" :src="item.goods_list_img" mode="widthFix"></image>  
						<text class="card-title">{{item.name}}</text>  
						<view class="price_wrap">
							<span>¥{{item.price}}</span>
							<span v-if="item.member_price" class="member_price">会员价:{{item.member_price}}</span>
						</view>
					</navigator>  
				</block>  
			</view>  

			<view class="right">  
				<block v-for="(item, index) in list" :key="index" class="itemlist">  
					<navigator class="card" @click="goToShop(item)" v-if="index%2==1">  
						<image class="card-img" :src="item.goods_list_img" mode="widthFix"></image>  
						<text class="card-title">{{item.name}}</text> 
						 <view class="price_wrap">
						 	<span>¥{{item.price}}</span>
						 	<span v-if="item.member_price" class="member_price">会员价:{{item.member_price}}</span>
						 </view>
					</navigator>  
				</block>  
			</view>  
		</view>
	
		<div v-if="list.length == 0" class="uni-center-item no_data_wrap">
			<span>暂无数据</span>
		</div>
		
		<view class="uni-tab-bar-loading" v-if="list.length != 0">
			<uni-load-more :loadingType="loadingType" :contentText="loadingText"  ></uni-load-more>
		</view>
		
	</view>
</template> 

<script>
	import { BASE_IMAGE_URL,search,getBanners,getStoreTag,goods_list} from '@/utils/api'
	import uniLoadMore from '@/components/uni-load-more.vue';
export default {
	components: {
		uniLoadMore,
	},
	data() {
		return {
			loadingText: {
				contentdown: "上拉显示更多",
				contentrefresh: "正在加载...",
				contentnomore: "没有更多数据了"
			},
			isAPP: false,
			buildingName:"请选择楼宇",
			itemList: [],
			t_url: '',
			curIndex: 0,
			contentCurIndex: 0,
			statusBarHeight: 0,
			typeList: [],
			typeIndex: 0,
			list: [],
			loadingType: 0,
			page: 1
		};
	},
	onLoad() {
		// #ifdef APP-PLUS
				this.isAPP = true;
			// #endif
		
		// this.getStoreTag();
		this.getList();
	},
	onReachBottom() {
		this.loadingType = 1;
		this.page++;
		this.getList();
	},
	onShow() {
		this.getBanners();
		if(uni.getStorageSync("userInfo").buildingName)
		{
			this.buildingName=uni.getStorageSync("userInfo").buildingName;
		}
		
	},
	methods: {
		goToShop(item){
			if(!this.isLogin()){
				return;
			};
			// if(item.store_show_type == 2){
			// 	// 图文店铺
			// 	uni.navigateTo({
			// 		url: '/pages/mall_shop_text/mall_shop_text?storeID='+item.id
			// 	});
			// }else{
			// 	uni.navigateTo({
			// 		url: '/pages/mall_shop/mall_shop?storeID='+item.id
			// 	});
			// }
			
			uni.navigateTo({
				url: '/pages/mall_detail/mall_detail?goodsID='+item.id
			});
			
		},
		goToSearch(){
			//店铺搜索
			uni.navigateTo({
				url: '/pages/mall_search/mall_search?searchType=2'
			});
		},
		goToMallType(){
			if(!this.isLogin()){
				return;
			}
			uni.navigateTo({
				url: '/pages/mall_type/mall_type'
			});
		},
		goToCard(){
			if(!this.isLogin()){
				return;
			}
			uni.navigateTo({
				url: '/pages/mall_card/mall_card'
			});
		},
		selectBuild: function(){
			if(!this.isLogin()){
				return;
			}
			uni.navigateTo({
				url: '/pages/build/build'
			});
		},
		changeType(index){
			this.typeIndex = index;
			this.search(this.typeList[index].id);
		},
		slideChange: function(e){
			this.curIndex = e.mp.detail.current;
		},
		async search(tag){
			let res = await search({storeTag: tag, searchType:2,page:1,limit:10});
			if(res.status == 1){
				this.list = res.data;
			}
		},
		async getList(){
			let res = await goods_list(this.page);
			if(res.status == 1){
				res.data.map((item)=>{
					if(item.intro.length > 16){
						item.intro = item.intro.substring(0, 16)+"..."
					}
				})
				if(this.page==1)
				{
					this.list=res.data;
				}
				else{
					this.list=this.list.concat(res.data);
				}
				
				if(this.list.length < 10){
					this.loadingType = 2;
				}else{
					this.loadingType = 0;
				}
			}
		},
		async getBanners(){
			let res = await getBanners(24, uni.getStorageSync("userInfo").buildingID);
			if(res.status == 1){
				this.itemList = res.data;
			}
		},
		async getStoreTag(){
			let res = await getStoreTag();
			if(res.status == 1){
				this.typeList = res.data;
				this.search(this.typeList[0].id);
			}
		},
	}
};
</script>

<style lang="scss" scoped>
.contain{background-color: #ffffff;}

.content {height: 400upx;position: relative;}
.head_img{width: 100%;height: 400upx!important;}

.dots{display: flex;flex-direction: row;justify-content: center;align-items: center;position: absolute;bottom: 20upx;height: 20upx;width: 100%;z-index: 100;}
.dot_normal{width: 10upx;height: 10upx;border-radius: 50%;background-color: #E0E5ED;margin: 0upx 6upx;position: relative;z-index: 100;}
.active{width: 24upx;height: 10upx;border-radius: 40%;background-color: #107EFF;z-index: 100;}
.home_head_wrap{position: fixed;background: -webkit-linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0)); width: 100%; color: #FFFFFF; font-size: 24upx; padding: 0upx 20upx 20px; box-sizing: border-box;top:0upx;}
.home_head_left span{font-size: 24upx; overflow: hidden;width: 130upx;white-space: nowrap;text-overflow:ellipsis;}
.home_head_left img{width: 24upx; height: 24upx; margin-left: 5upx;}
.msg_wrap{position: relative;}
.msg_wrap img{width: 50upx; height: 40upx;}
.red_hot{width: 20upx; height: 20upx; position: absolute;right: 0upx; top: 0upx;background-color: red; z-index: 2;border-radius: 50%;}

.search_wrap{position: relative;border-radius: 36upx; background-color: rgba(244, 244, 244, 0.75); flex: 1;height: 72upx; margin: 0upx 20upx; padding-left: 20upx; color: #9B9B9B; font-size: 28upx;}
.search_wrap img{width: 28upx; height: 28upx; margin-right: 20upx;}

.nav_wrap{height: 114upx;background-color: #FFFFFF;}
.nav_item{flex: 1;color: #666666; font-size: 24upx;}
.nav_item img{width: 32upx; height: 32upx;margin-bottom: 10upx;}

.left,.right{display: inline-block;  vertical-align: top;  width: 44%;}
.left{margin: 20upx 2% 20upx 4%}
.right{margin: 20upx 4% 20upx 2%}
.card-img{width: 100%;}
.card-title{font-size: 24upx; color: #333333; display: inline-block; margin: 0upx 16upx 20upx;}
.card{box-shadow: 0px 4px 12px 0px rgba(126,125,125,0.14); width: 100%; margin: 20upx 0upx; border-radius: 20upx;}
.itemlist{ background-color: #fff;  margin: 1%;   margin-bottom: 20upx;  display: inline-block;  } 

.mall_wrap{background: #FFF;  margin:20upx 30upx; box-sizing: border-box;}
.mall_wrap img{width:40%; height: 80upx; box-shadow:0px 4px 12px 0px rgba(126,125,125,0.14);}
.mall_wrap .mall{margin-right: 20upx;}
.type_active{color: #107EFF}

.price_wrap{color: #FF5269; font-size: 24upx; font-weight: bold; padding-left: 16upx;}
.member_price{color: #333333; font-size: 20upx; font-weight: normal; margin-left: 20upx;}


</style>
