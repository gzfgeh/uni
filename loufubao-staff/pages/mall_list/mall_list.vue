<template>
	<view>
		<div class="head_wrap" v-if="showType == 0">
			<div v-for="(item, index) in typeList" :key="index" @click="changeType(index)"
				class="head_item row_center" >
				<span :class="{'active_type': (curType == index)}">{{item}}</span>
			</div>
		</div>
		
		<div class="express_list" style="background: #fff;" :style="{'padding-top': ((showType == 0?'100upx':'0upx'))}">
			<block  v-for="(item,index) in list" :key="index" >
				<navigator class="item_wrap" @click="goToDetail(index)">
					<div class="item">
						<img  :src="curType==1?item.goods_list_img:item.logo" mode="aspectFill">
						<div class="content_item">
							<span>{{curType==1?item.intro:item.desc}}</span>
							<div class="row" v-if="curType == 1">
								<!-- :style="{'text-decoration':(item.member_price?'line-through':'')}" -->
								<span class="price" v-if="item.price" >￥{{item.price}} </span>
								<span  style="font-size: 20upx; color: #333333;" v-if="item.member_price">会员价:￥{{item.member_price}}</span>
							</div>
						</div>
					</div>
					
				</navigator>
			</block>
		</div>
		
		
		<div v-if="list.length == 0 && curType==0" class="uni-center-item no_data_wrap">
			<image src="../../static/img/goods_list_empty.png" mode="aspectFill"></image>
			<span>没有找到对应店铺，请换个词试试~</span>
		</div>
		
		<div v-if="list.length == 0 && curType==1" class="uni-center-item no_data_wrap">
			<image src="../../static/img/goods_list_empty.png" mode="aspectFill"></image>
			<span>没有更多商品，换个词试试～</span>
		</div>
		
		<view class="uni-tab-bar-loading" v-if="list.length != 0">
			<uni-load-more :loadingType="loadingType" :contentText="loadingText"  ></uni-load-more>
		</view>
		
	</view>
</template>

<script>
	import { BASE_IMAGE_URL,search} from '@/utils/api'
	import uniLoadMore from '@/components/uni-load-more.vue';
	
	export default {
		components: {
			uniLoadMore
		},
		data() {
			return {
				loadingText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
				list: [1,2,3,4,5],
				keyword: "",
				loadingType: 0,
				page: 1,
				typeList: ['店铺','商品'],
				curType: 0,
				showType: 0
			}
		},
		methods: {
			goToDetail(index){
				if(this.curType == 0){
					// 店铺
					uni.navigateTo({
						url: '../mall_shop/mall_shop?storeID='+this.list[index].id
					})
				}else{
					//商品
					uni.navigateTo({
						url: '../mall_detail/mall_detail?goodsID='+this.list[index].id
					})
				}
				
			},
			changeType(index){
				this.curType = index;
				this.page = 1;
				this.getList();
			},
			async getList(){
				let params = {
					keyword: this.keyword,
					page: this.page,
					limit: 20,
					searchType: this.curType==0?2:1
				};
				let res = await search(params);
				uni.stopPullDownRefresh();
				if(res.status == 1){
					if(this.page==1)
					{
						this.list=res.data;
					}
					else{
						this.list=this.list.concat(res.data);
					}
					
					if(res.data.length < 10){
						this.loadingType = 2;
					}else{
						this.loadingType = 0;
					}
				};
			
			},
		},
		onReachBottom() {
			this.loadingType = 1;
			this.page++;
			this.getList();
		},
		
		onPullDownRefresh() {
			console.log("dddddd");
			this.page = 1;
			this.getList();
		},
		onLoad(opt) {
			console.log(opt);
			
			// 0 默认都有  1店铺 2商品
			this.showType = opt.type?opt.type:0;
			if(this.showType == 1){
				// 店铺列表
				this.curType = 0;
			}else if(this.showType == 2){
				// 商品列表
				this.curType = 1;
			}else{
				// 默认店铺列表
				this.curType = 0;
			}
			
			console.log(opt.keyword);
			this.keyword = opt.keyword?opt.keyword:'';
			
			if(this.keyword == '搜索' || !this.keyword){
				this.keyword = "";
			}
			// #ifdef APP-PLUS
			console.log(this.keyword);
			var webview = this.$mp.page.$getAppWebview();  
			webview.setTitleNViewSearchInputText(this.keyword);
			// #endif
			
			// #ifdef H5
			setTimeout( () => {
				console.log(document.querySelector(".uni-page-head-search-placeholder"))
				if(this.keyword){
					document.querySelector(".uni-page-head-search-placeholder").style.visibility = "hidden";
				}else{
					document.querySelector(".uni-page-head-search-placeholder").style.visibility = "visible";
				}
				document.querySelector("input").placeholder = this.keyword?this.keyword:'';
				this.$forceUpdate();
			}, 500)
			
			// #endif
			if(opt.tab_type){
				this.curType = 1;
			}
			this.getList();
			
			
			
			// this.curType = opt.type?opt.type:0;
			// if(this.curType == 1){
			// 	// #ifdef APP-PLUS
			// 	var webview = this.$mp.page.$getAppWebview();  
			// 	webview.setTitleNViewSearchInputText(opt.name);
			// 	this.keyword = opt.name;
			// 	this.getList();
			// 	// #endif
			// 	
			// 	// #ifdef H5
			// 	setTimeout( () => {
			// 		document.querySelector(".uni-page-head-search-placeholder").style.visibility = "hidden";
			// 		document.querySelector("input").placeholder = opt.name;
			// 		this.keyword = opt.name;
			// 		this.$forceUpdate();
			// 		console.log(document.querySelector("input").placeholder)
			// 	}, 500)
			// 	this.getList();
			// 	// #endif
			// }else{
			// 	this.keyword = opt.keyword?opt.keyword:'';
			// 	// #ifdef APP-PLUS
			// 	var webview = this.$mp.page.$getAppWebview();  
			// 	webview.setTitleNViewSearchInputText(opt.keyword);
			// 	// #endif
			// 	
			// 	// #ifdef H5
			// 	setTimeout( () => {
			// 		console.log(document.querySelector(".uni-page-head-search-placeholder"))
			// 		if(this.keyword){
			// 			document.querySelector(".uni-page-head-search-placeholder").style.visibility = "hidden";
			// 		}else{
			// 			document.querySelector(".uni-page-head-search-placeholder").style.visibility = "visible";
			// 		}
			// 		document.querySelector("input").placeholder = this.keyword?this.keyword:'';
			// 		this.$forceUpdate();
			// 	}, 500)
			// 	
			// 	// #endif
			// 
			// 	this.getList();
			// }
			
			
		},
		onNavigationBarSearchInputClicked (e) {
			uni.navigateTo({
				url: '../mall_search/mall_search?keyword='+this.keyword
			})
        }
	}
</script>

<style>
.item_wrap{width: 100%;box-sizing: border-box;padding-left: 30upx; background: #FFFFFF; }
.item{display: flex;flex-direction: row;border-bottom: #E3E3E3 solid 2upx; padding: 35upx 0upx; font-size: 28upx; color: #666666;}
.item img{width: 140upx; height: 140upx;border-radius: 8upx; margin-right: 32upx;}
.item .content_item{display: flex; flex-direction: column; justify-content: space-between;flex: 1; padding-right: 30upx;}
.item .content_item .price{color: #FF6262; font-size: 30upx; margin-right: 20upx;}

.head_wrap{width: 100%; display: flex; flex-direction: row;position: fixed;left: 0upx;background-color: #FFF;border-bottom: 2upx solid #E3E3E3; height: 100upx;z-index: 101;}
.head_item{flex: 1; padding: 0upx 24upx;}
.head_item span{height: 100upx; line-height: 100upx;}
.active_type{color: #107EFF;border-bottom: 2upx solid #107EFF;}

</style>
