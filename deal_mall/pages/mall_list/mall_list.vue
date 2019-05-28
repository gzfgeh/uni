<template>
	<view>
		
		<div class="head_wrap">
			<div v-for="(item, index) in typeList" :key="index" @click="changeType(index)"
				class="head_item row_center" :class="{'active_type': (curType == index)}">
				<span>{{item}}</span>
			</div>
		</div>
		
		<div class="list_wrap">
			<navigator v-for="(item, index) in list" :key="index" class="list_item">
				<image src="https://bay.2donghua.com/web/uploads/image/store_1/f04f242ce46046dde84b0a6f7d9ba3f25f52a585.jpg" mode="aspectFill"></image>
				<div>
					<span>萧遇女装连衣裙2019夏季新品</span>
					<div class="row_between">
						<span>￥300.00</span>
						<span>已售0件</span>
					</div>
				</div>
				
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
				typeList: ['综合', '最新', '价格', '销量'],
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
		onLoad(){
			
		}
		
	}
</script>

<style>
.head_wrap{width: 100%; display: flex; flex-direction: row;position: fixed;top: 0upx; left: 0upx;background-color: #FFF;border-top: 2upx solid #E3E3E3; height: 100upx;}
.head_item{flex: 1;}
.active_type{color: #FF4544;}

.list_wrap{padding-top: 106upx; display: flex; flex-direction: row; flex-flow: wrap;width: 100%;}
.list_item{display: flex; flex-direction: column;width: 48%; margin: 20upx 1%;}
.list_item image{width: 100%; height: 365upx;}

</style>
