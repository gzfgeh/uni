<template>
	<view>
		<navigator  v-for="(item,index) in list" :key="index" @click="goToDetail(index)">
			<div class="item_wrap">
				<div class="row">
					<!-- <img :src="item.img0" mode="aspectFill"> -->
					<div class="title_wrap" >
						<span>订单编号：{{item.orderSN}}</span>
						<span class="time">下单时间：{{item.payTime}}</span>
					</div>
				</div>
				
				<div class="money_wrap">
					<span>金额：￥</span>
					<span class="money">{{item.price}}</span>
				</div>
				
				<view class="uni-uploader-body">
					<view class="uni-uploader__files" >
						<block v-for="(image,index) in item.img" :key="index">
							<view class="uni-uploader__file" style="position: relative;width: 180upx; height: 180upx;">
								<image class="uni-uploader__img" :src="image" @tap="previewImage" style="width: 180upx; height: 180upx;"></image>
								
							</view>
						</block>
					</view>
				</view>
				
			</div>
		</navigator>	
		<div v-if="list.length == 0&&loadingType==2" class="uni-center-item no_data_wrap">
			<span>暂无数据</span>
		</div>
		
		<view class="uni-tab-bar-loading" v-if="list.length != 0">
			<uni-load-more :loadingType="loadingType" :contentText="loadingText"  ></uni-load-more>
		</view>
					
	</view>
</template>

<script>
	import { BASE_IMAGE_URL,orderList_takeout } from '@/utils/api'
	
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
				page: 1
			}
		},
		methods: {
			goToDetail(index){
				uni.navigateTo({
					url: '/pages/wai_mai_detail/wai_mai_detail?orderID='+this.list[index].orderID
				});
			},
			async getList(){
				let params = {
					userID: uni.getStorageSync("userInfo").userID,
					page: this.page,
					limit: 20
				};
				let res = await orderList_takeout(params);
				uni.stopPullDownRefresh();
				if(res.status == 1){
					if(this.page == 1){
						this.list = res.data;
					}else{
						this.list = this.list.concat(res.data);
					}
					
					this.list.map((item) => {
						item.isClicked = false;
					})
					
					if(this.list.length < 20){
						this.loadingType = 2;
					}else{
						this.loadingType = 0;
					}
				}else{
					this.loadingType = 2;
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
			this.loadingType = 0;
			this.page = 1;
			this.getList();
		},
		onLoad(){
			this.getList();
		}
	}
</script>

<style>
page{background: #F8F8F8;}
.item_wrap{background:rgba(255,255,255,1);border:1px solid rgba(243, 243, 243, 1);box-shadow:0px 4px 12px 0px rgba(126,124,125,0.14);
	border-radius:8px; padding: 20upx; color: #999; font-size: 28upx; margin: 20upx 30upx;display: flex;flex-direction: column;}
.item_wrap img{width: 140upx; height: 140upx; margin-right: 32upx;}
.title_wrap{display: flex; flex-direction: column;color: #333333; font-size: 28upx;}
.title_wrap .time{color: #666; font-size: 24upx; margin-top: 20upx;}
.money_wrap{text-align: right;color: #323333; font-size: 28upx;}
.money_wrap .money{font-size: 36upx;}
</style>
