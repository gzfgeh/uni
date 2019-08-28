<template>
	<view>
		<!-- <div class="head_wrap">
			<div v-for="(item, index) in typeList" :key="index" @click="changeType(index)"
				class="head_item row_center" >
				<span :class="{'active_type': (curType == index)}">{{item}}</span>
			</div>
		</div> -->
		
		<navigator class="item_wrap" >

			<block  v-for="(item,index) in list" :key="index" >
				<div class="row_between item" @click="goToDetail(index)">
					<div class="row">
						<img :src="item.goodsInfo.goods_list_img" mode="aspectFill">
						<span>{{item.goodsInfo.name}}</span>
					</div>
					
					<span v-if="false">{{item.time}}</span>
				</div>
			</block>

		</navigator>
		
			
		<div v-if="(list.length == 0)&&(loadingType==2)" class="uni-center-item no_data_wrap">
			<span>暂无信息</span>
		</div>
		
		<view class="uni-tab-bar-loading" v-if="list.length != 0">
			<uni-load-more :loadingType="loadingType" :contentText="loadingText"  ></uni-load-more>
		</view>
		
		
	</view>
</template>

<script>
	import { BASE_IMAGE_URL,collect_list } from '@/utils/api'
	import uniLoadMore from '@/components/uni-load-more.vue';
	import uniPopup from '@/components/popup-pay.vue';
	
	export default {
		components: {
			uniLoadMore,
			uniPopup
		},
		data() {
			return {
				loadingText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
				list: [],
				loadingType: 0,
				page: 1,
				selectIndex: 0,
				keywords: '',
				popupParam:'',
				orderSN:'',
				orderID:'',
				allMoney:'0',
				orderStatus: 0,
				typeList: ['商品收藏','店铺收藏'],
				curType: 0,
			}
		},
		methods: {
			changeType(index){
				this.curType = index;
				this.page = 1;
				this.getList();
			},
			async getList(){
				let userInfo = uni.getStorageSync("userInfo");
				
				let params = {
						userID: userInfo.userID,
						page: this.page,
						limit: 10,
						type: this.curType+1
				};
				let res = await collect_list(params);
				uni.stopPullDownRefresh();
				if(res.status == 1){
					
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
			goToDetail(index){
				if(this.curType == 0){
					//商品
					uni.navigateTo({
						url: '/pages/mall_detail/mall_detail?goodsID='+this.list[index].goodsInfo.id
					});
				}else{
					uni.navigateTo({
						url: '/pages/mall_shop/mall_shop?storeID='+this.list[index].store_id
					});
				}
				
			}
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
		onLoad() {
			this.getList();
		},
		
	}
</script>

<style>

.head_wrap{width: 100%; display: flex; flex-direction: row;position: fixed;left: 0upx;background-color: #FFF;border-bottom: 2upx solid #E3E3E3; height: 100upx;z-index: 101;}
.head_item{flex: 1; padding: 0upx 24upx;}
.head_item span{height: 100upx; line-height: 100upx;}
.active_type{color: #107EFF;border-bottom: 2upx solid #107EFF;}

.item_wrap{background: #fff;}
.item{padding: 30upx; border-bottom: 2upx solid #E3E3E3;}
.item img{width: 100upx; height: 100upx; margin-right: 20upx;}

</style>
