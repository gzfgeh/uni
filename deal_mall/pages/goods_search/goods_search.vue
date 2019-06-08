<template>
	<view>
		<div class="search_wrap">
			<div class="input_wrap row">
				<img src="https://bay.2donghua.com/web/statics/wxapp/images/icon-search.png" mode="widthFix">
				<!-- <span>搜索</span> -->
				<input type="text" confirm-type="search" v-model="keyword" placeholder="请输入关键字" @confirm="search"/>
			</div>
			
			<span class="cancle_btn" @click="back">取消</span>
		</div>
		
		<div class="list_wrap">
			<navigator v-for="(item, index) in list" :key="index" class="list_item" @click="goToDetail(index)">
				<image :src="item.g_img" mode="aspectFill"></image>
				<div class="item_info">
					<span class="item_info_text">{{item.g_name}}</span>
					<div class="row_between">
						<span class="price">￥{{item.g_price}}</span>
						<span class="sell_num">库存{{item.g_kucun}}件</span>
					</div>
				</div>
				
			</navigator>
		</div>
		
		<div v-if="list.length == 0" class="uni-center-item no_data_wrap">
			<span>暂无数据</span>
		</div>
		
		<view class="uni-tab-bar-loading" v-if="list.length != 0">
			<uni-load-more :loadingType="loadingType" :contentText="loadingText"  ></uni-load-more>
		</view>
		
	</view>
</template>

<script>
	import { BASE_IMAGE_URL,getGoodsList } from '@/utils/api'
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
				list: [],
				loadingType: 0,
				page: 1,
				keyword: ''
			}
		},
		methods: {
			back: function(){
				uni.navigateBack({
					delta: 1
				});
			},
			async search(){
				let res = await getGoodsList('',this.page, 1, this.keyword);
				uni.stopPullDownRefresh();
				if(res.code == 1000){
					if(this.page == 1){
						this.list = res.data;
					}else{
						this.list = this.list.concat(res.data);
					}
					
					if(res.data.length < 10){
						this.loadingType = 2;
					}else{
						this.loadingType = 0;
					}
				}
			}
		},
		onLoad() {
		},
		onReachBottom() {
			this.loadingType = 1;
			this.page++;
			this.search();
		},
		
		onPullDownRefresh() {
			console.log("dddddd");
			this.page = 1;
			this.list = [];
			this.search();
		},
	}
</script>

<style>
.search_wrap{padding: 16upx 24upx; display: flex; flex-direction: row; justify-content: center; align-items: center;}
.input_wrap{display: flex; flex-direction: row;background: #fff; border: 1upx solid #E3E3E3;
	border-radius: 10upx; flex: 1; margin-right: 24upx; color: #000; padding: 0upx 20upx; font-size: 24upx;}
.input_wrap img{margin-right: 10upx; width: 26upx;}
.input_wrap input{flex: 1; margin-left: 20upx; height: 60upx;}
.cancle_btn{height: 64upx; line-height: 64upx; color: #00c203; }


.list_wrap{display: flex; flex-direction: row; flex-flow: wrap;width: 100%;background-color: #FFFFFF;}
.list_item{display: flex; flex-direction: column;width: 49%; margin: 5upx 0.5%;background-color: #FFFFFF;}
.list_item .item_info{padding: 4upx 22upx; font-size: 28upx;}
.list_item .item_info .item_info_text{font-size: 34upx; overflow: hidden;text-overflow: ellipsis;word-break: break-all;line-clamp: 2;}
.list_item image{width: 100%; height: 365upx;}
.list_item .item_info .price{color: #ff334b;}
.list_item .item_info .sell_num{color: #999;}



</style>
