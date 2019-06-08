<template>
	<view>
		
		<div class="head_wrap">
			<div v-for="(item, index) in typeList" :key="index" @click="changeType(index)"
				class="head_item row_center" :class="{'active_type': (curType == index)}">
				<span>{{item}}</span>
			</div>
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
		
		<!-- <div class="quick_icon col_center">
			<span>快捷</span>
			<span>导航</span>
		</div> -->
		
	</view>
</template>

<script>
	import { BASE_IMAGE_URL,getGoodsList,jiaruCart } from '@/utils/api'
	
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
				typeList: ['综合', '最新', '价格', '库存'],
				curType: 0,
				g_type: 0
			}
		},
		methods: {
			changeType(index){
				this.curType = index;
				this.getList();
			},
			async getList(){
				let res = await getGoodsList(this.g_type,this.page, this.curType);
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
			},
			goToDetail(index){
				uni.navigateTo({
					url: '/pages/goods_detail/goods_detail?g_id='+this.list[index].g_id
				});
			},
			async jiaruCart(item){
				let params = {
					ct_openid: uni.getStorageSync("openid"),
					ct_g_id: item.g_id,
				};
				let res = await jiaruCart(params);
				if(res.code == 1000){
					uni.showToast({
					  icon: 'none',
					  title: '添加成功',
					  duration: 1000
					});
				}else{
					uni.showToast({
					  icon: 'none',
					  title: '加入购物车失败',
					  duration: 1000
					});
				}
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
			this.list = [];
			this.getList();
		},
		onLoad(options){
			this.g_type = options.g_type;
			this.getList();
		}
		
	}
</script>

<style>
.head_wrap{width: 100%; display: flex; flex-direction: row;position: fixed;top: 0upx; left: 0upx;background-color: #FFF;border-top: 2upx solid #E3E3E3; height: 100upx;}
.head_item{flex: 1;}
.active_type{color: #FF4544;}

.list_wrap{padding-top: 106upx; display: flex; flex-direction: row; flex-flow: wrap;width: 100%;background-color: #EFEFF4;}
.list_item{display: flex; flex-direction: column;width: 49%; margin: 5upx 0.5%;background-color: #FFFFFF;}
.list_item .item_info{padding: 4upx 22upx; font-size: 28upx;}
.list_item .item_info .item_info_text{font-size: 34upx; overflow: hidden;text-overflow: ellipsis;word-break: break-all;line-clamp: 2;}
.list_item image{width: 100%; height: 365upx;}
.list_item .item_info .price{color: #ff334b;}
.list_item .item_info .sell_num{color: #999;}

.quick_icon{position: fixed;right: 50upx; bottom: 140upx; z-index: 20;width: 100upx; height: 100upx; border-radius: 50%; background-color: rgba(0,0,0,0.7); color: #FFF; font-size: 24upx;}
</style>
