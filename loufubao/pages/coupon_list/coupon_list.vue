<template>
	<view>
		
		<div class="head_wrap">
			<div v-for="(item, index) in typeList" :key="index" @click="changeType(index)"
				class="head_item row_center" >
				<span :class="{'active_type': (curType == index)}">{{item}}</span>
			</div>
		</div>
		
		<ul class="express-list" style="background: #fff;margin-top: 120upx;">

			<block  v-for="(item,index) in list" :key="index" >
				<li  class="item_wrap" @click="goToMallDetail(item)">
					<img src="../../static/img/coupon_online.png" mode="widthFix" class="item_bg">
					
					<div class="row item">
						<img :src="item.img" mode="aspectFill">
						<div class="flex_one content_wrap">
							<span class="title">{{item.title}}</span>
							<span class="time">{{item.start_time}} 至 {{item.end_time}}</span>
							<span class="money">优惠价格:{{item.price}}</span>
						</div>
					</div>
				</li>
			</block>
		</ul>
			
		<div v-if="list.length == 0&loadingType==2" class="uni-center-item no_data_wrap">
			<span>暂无信息</span>
		</div>
		
		<view class="uni-tab-bar-loading" v-if="list.length != 0">
			<uni-load-more :loadingType="loadingType" :contentText="loadingText"  ></uni-load-more>
		</view>
		
	</view>
	
	
	
</template>

<script>
	import { BASE_IMAGE_URL,user_coupon } from '@/utils/api'
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
				companyCode:"",
				loadingType: 0,
				page: 1,
				popupParam:'',
				orderSN:'',
				orderID:'',
				allMoney:'0',
				selectIndex: 0,
				keywords: '',
				type: 0,
				typeList: ['未使用', '已使用', '已过期'],
				curType: 0,
			}
		},
		methods: {
			changeType(index){
				this.curType = index;
				console.log(index);
				this.type=index;
				this.page = 1;
				this.getList();
			},
			goToMallDetail: function(item){
				if(parseInt(item.type) == 1){
					uni.navigateTo({
						url: '/pages/mall_detail/mall_detail?goodsID='+item.goods_id
					});
				}
				
			},
			async getList(){
				let userInfo = uni.getStorageSync("userInfo");
				
				let params = {
					userID: userInfo.userID,
					page: this.page,
					type: this.type+1
				};
				
				let res = await user_coupon(params);
				uni.stopPullDownRefresh();
				if(res.status == 1){
					res.data.map((item) => {
						item.newDetail = "物流查询";
						item.wuliu = "";
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
	@import url("../../static/style/yun_fei.css");

.item_wrap{display: flex;flex-direction: column; position: relative; min-height: 188upx;}
.item_wrap .item_bg{position: absolute;top: 0upx; left: 0upx; width: 100%;z-index:-1; }
.item_wrap .item{padding: 30upx 0upx;}
.item_wrap .item img{width: 126upx; height: 126upx;}
.item_wrap .item .content_wrap{display: flex; flex-direction: column; margin-left: 60upx;}
.content_wrap .title{color: #333333; font-size: 28upx; font-weight: bold;}
.content_wrap .time{color: #CCCCCC; font-size: 22upx; }
.content_wrap .money{color: #FF5269; font-size: 38upx; }

.head_wrap{width: 100%; display: flex; flex-direction: row;position: fixed;margin-top:-120upx;left: 0upx;background-color: #FFF;border-bottom: 2upx solid #E3E3E3; height: 100upx;z-index: 101;}
.head_item{flex: 1; padding: 0upx 24upx;}
.head_item span{height: 100upx; line-height: 100upx;}
.active_type{color: #107EFF;border-bottom: 2upx solid #107EFF;}

.price{display: inline-block; text-align: right;box-sizing: border-box;}

.order_status_wrap{position: absolute;right: 0upx; top: 0upx;}
.order_status_wrap img{width: 120upx; height: 120upx; }
.order_status_wrap span{position: absolute;top: 16upx; right: 10upx; color: #ffffff; display: inline-block;transform:rotate(45deg);}

</style>
