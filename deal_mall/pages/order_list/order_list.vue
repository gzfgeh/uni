<template>
	<view>
		
		<div class="head_wrap">
			<div v-for="(item, index) in typeList" :key="index" @click="changeType(index)"
				class="head_item row_center" >
				<span :class="{'active_type': (curType == index)}">{{item}}</span>
			</div>
		</div>
		
		<div class="list_wrap">
			<navigator v-for="(item, index) in list" :key="index" class="list_item">
				<div class="item_head">平台自营</div>
				<div class="row_between">
					<span>订单号:20190526213447585095</span>
					<span>2019-05-26 21:34</span>
				</div>
				<div class="item_info row">
					<img src="https://bay.2donghua.com/web/uploads/image/store_1/edfe8f5f2027ef4539a05d7284b26f2951329dae.jpg" mode="aspectFill">
					<div class="item_tag flex_one item_content" >
						<div class="item_tag flex_one">
							<span class="name">意大利比安易INOVIA COND 英诺华</span>
							<span class="tag"> 规格:默认 </span>
						</div>
						<div class="row">
							<span class="num flex_one">x1</span>
							<span class="price">￥:20.00</span>
						</div>
					</div>
				</div>
				<div>合计：￥20.00</div>
			</navigator>
		</div>
		
		<div v-if="list.length == 0" class="uni-center-item no_data_wrap">
			<span>暂无订单信息</span>
		</div>
		
		<view class="uni-tab-bar-loading" v-if="list.length != 0">
			<uni-load-more :loadingType="loadingType" :contentText="loadingText"  ></uni-load-more>
		</view>
		
	</view>
</template>

<script>
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
				list: [1,2,3,4,5,6,7,8,9,0,11,22,33,44],
				loadingType: 0,
				page: 1,
				typeList: ['待发货', '待收货', '已完成', '售后'],
				curType: 0
			}
		},
		methods: {
			changeType(index){
				this.curType = index;
			},
			async getList(){
				setTimeout(() => {
					uni.stopPullDownRefresh();
					this.list = this.list.concat([1,2,3,4,5,6,7,8,9,0,11,22,33,44]) ;
					if(this.list.length < 10){
						this.loadingType = 2;
					}else{
						this.loadingType = 0;
					}
				}, 3000);
			},
			goToDetail(){
				uni.navigateTo({
				url: '/pages/express_detail/express_detail'
			});
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
			this.list = [];
			this.getList();
		},
		onLoad(options){
			this.curType = options.index;
		}
		
	}
</script>

<style>
.head_wrap{width: 100%; display: flex; flex-direction: row;position: fixed;top: 0upx; left: 0upx;background-color: #FFF;border-bottom: 2upx solid #E3E3E3; height: 100upx;}
.head_item{flex: 1; padding: 0upx 24upx;}
.head_item span{height: 100upx; line-height: 100upx;}
.active_type{color: #f00;border-bottom: 2upx solid #f00;}

.list_wrap{padding-top: 102upx; width: 100%;background-color: #EFEFF4; box-sizing: border-box;}
.list_item{border-bottom: 1upx solid #E3E3E3;width: 100%; margin-bottom: 20upx;background-color: #FFF;padding: 32upx 24upx;box-sizing: border-box;font-size: 28upx;}
.list_item .item_head{overflow: hidden;text-overflow: ellipsis;white-space: nowrap;margin-bottom: 12upx;font-size: 24upx;}

.list_item .item_info{padding: 32upx 0upx; border-bottom: 1upx solid #E3E3E3; border-top: 1upx solid #E3E3E3;margin: 20upx 0upx;background: #fff;}
.list_item .item_info .name{margin-bottom: 20upx; overflow: hidden;text-overflow: ellipsis;word-break: break-all;line-clamp: 2;}
.list_item .item_info img{width: 156upx; height: 156upx; margin-right: 20upx;}
.list_item .item_info .tag{color: #888; font-size: 24upx;}
.list_item .item_content{height: 156upx; box-sizing:border-box;}
.list_item .item_tag{display: flex; flex-direction: column;}
.list_item .item_info .price{color: #ff4544;}
.list_item .item_info .num{color: #888; font-size: 24upx;}

.quick_icon{position: fixed;right: 50upx; bottom: 140upx; z-index: 20;width: 100upx; height: 100upx; border-radius: 50%; background-color: rgba(0,0,0,0.7); color: #FFF; font-size: 24upx;}
</style>
