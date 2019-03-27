<template>
	<view style="width: 100%;">
		
		<div v-for="(tab,index) in listData" :key="index" @click="goDetail(index)">
			<view  class="row item_wrap">
				
				<img src="../../static/img/home_top.png">
				
				<div class="item_content_wrap">
					<div class="item_title">广西柑橘</div>
					<div class="sub_title">饱满果肉 甜蜜多汁</div>
					<span class="item_tag">第二个半价</span>
					<div class="bottom_wrap">
						<span class="price">￥26</span>
						<!-- <span class="old_price">￥38</span> -->
						<!-- <span class="num">1.5Kg/份</span> -->
					</div>
				</div>
				
				<div class="item_right_wrap">
					<span>深圳市平岗区</span>
					<!-- <uni-number-box @change="onNumberChange" :min="0"></uni-number-box> -->
					<span @click="goDetail(newsitem)" >编辑</span>
					<img src="../../static/img/add_card.png" @click="addCard(newsitem)">
				</div>
				
			</view>
			
		</div>
		
		<div v-if="listData.length == 0" class="uni-center-item no_data_wrap">
			<img src="../../static/img/no_data.png" class="no_data">
			<span>暂无订单信息</span>
		</div>
		
		<view class="uni-tab-bar-loading" v-if="listData.length != 0">
			<uni-load-more :loadingType="loadingType" :contentText="loadingText"  ></uni-load-more>
		</view>
		
		<div class="gou_wu_che" @click="goToShopping">
			<img src="../../static/img/shopping_card_icon.jpg" >
			<span>4</span>
		</div>
		
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
				scrollLeft: 0,
				isClickChange: false,
				tabIndex: 0,
				listData: [1,2,3,4,5,6],
				loadingType: 0
			}
		},
		onLoad: function() {
			// this.listData = this.randomfn()
		},
		onReachBottom() {
			this.loadMore();
		},
		onPullDownRefresh() {
			console.log("dddddd");
			uni.stopPullDownRefresh();
		},
		methods: {
			goToShopping: function(){
				uni.navigateTo({
					url: '../shopping_card/shopping_card'
				})
			},
			goDetail() {
				uni.navigateTo({
					url: '../list_detail/list_detail'
				})
			},
			loadMore() {
				this.loadingType = 1;
				setTimeout(() => {
					this.addData();
				}, 1200);
			},
			addData() {
				this.loadingType = 2;
				return;
				if (this.listData.length > 30) {
					this.loadingType = 2;
					return;
				}
				for (let i = 1; i <= 10; i++) {
					this.listData.push(this['data' + Math.floor(Math.random() * 5)]);
				}
				this.loadingType = 1;
			}
		}
	}
</script>

<style lang="less" scoped>
	@color: #35B583;
	@gray_color: #ADADAD;
	
	/* #ifdef MP-ALIPAY */
	.swiper-tab-list {
		display: inline-block;
	}
	/* #endif */
	
	uni-page-body{
		height: 100%;
		background-color: #F6F6F8!important;
	}
	
	.tab_bar{
		height: 100upx;
		line-height: 100upx;
		background-color: #ffffff;
		position: relative;
		font-size: 28upx;
		color: rgba(0,0,0,0.4)
	}
	
	.tab_text{
		color: @color;
	}
	
	.swiper-tab-list{
		position: relative;
		color: rgba(0,0,0,0.4)
	}
	
	.line{
		height: 6upx;
		width: 100%;
		position: absolute;
		bottom: -24upx;
		z-index: 1;
		background-color: @color;
		left: 0upx;
	}
	
	.item_wrap{
		box-sizing: border-box;
		margin: 30upx;
		padding: 20upx;
		border-radius: 12upx;
		box-shadow:0px 0px 14upx 0px rgba(222,222,222,0.5);
		background-color: #FFFFFF;
		color: #9F9F9F;
		font-size: 26upx;
		
		height: 260upx;
	}
	
	.item_content_wrap{
		flex: 1;
		margin-left: 20upx;
		position: relative;
	}
	
	.item_title{
		color: #464646;
		font-size: 34upx;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.sub_title{
		color: @gray_color;
		font-size: 24upx;
		margin: 6upx 0upx;
	}
	
	.item_tag{
		border: 1px solid @color;
		color: @color;
		padding: 0upx 4upx;
		border-radius: 10upx;
		font-size: 24upx;
	}
	
	.bottom_wrap{
		color: @gray_color;
		font-size: 24upx;
		position: absolute;
		left: 0upx;
		bottom: 0upx;
		.price{
			color: red;
			font-size: 28upx;
			margin-right: 20upx;
		}
		.old_price{
			margin: 0upx 20upx;
			text-decoration:line-through;
		}
	}
	
	.bottom_action{
		padding: 8upx 24upx;
		background-color: #E9F3FB;
		border-radius: 26upx;
	}
	
	.item_wrap img{
		width: 200upx;
		height: 200upx;
	}
	
	.item_right_wrap{
		color: @color;
		font-size: 24upx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-end;
		img{
			width: 30upx;
			height: 30upx;
			border-radius: 50%;
		}
	}
	
	.gou_wu_che{
		position: fixed;
		bottom: 100upx;
		right: 100upx;
		height: 90upx;
		width: 90upx;
		img{
			width: 90upx;
			height: 90upx;
		}
		span{
			border-radius: 50%;
			font-size: 24upx;
			color: #FFFFFF;
			background-color: @color;
			position: absolute;
			top: 0upx;
			right: 0upx;
			display: inline-block;
			height: 30upx;
			width: 30upx;
			text-align: center;
			line-height: 30upx;
		}
		
	}
	
	
</style>
