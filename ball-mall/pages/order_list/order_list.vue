<template>
	<view class="uni-tab-bar">
		<view class="input_wrap">
			<input class="uni-input" confirm-type="search" placeholder="搜索" />
			
		</view>
		
		<div class=" tab_bar">
			<view v-for="(tab,index) in tabBars" :key="tab.id" class="tab_item"
			:class="['swiper-tab-list',tabIndex==index ? 'active' : '']" :id="tab.id"
			 :data-current="index" @click="tapTab(index)">
				<span class="tab_text" >{{tab.name}}</span> 
			 </view>
		</div>
		
		<swiper :current="tabIndex" class="swiper-box" duration="300" @change="changeTab" >
			<swiper-item v-for="(tab,index1) in listData" :key="index1">
				<scroll-view class="list" scroll-y @scrolltolower="loadMore(index1)">
					<block v-for="(newsitem,index2) in tab.data" :key="index2" >
						
						<view @click="goDetail(newsitem)" class="row item_wrap">
							
							<img src="../../static/img/home_top.png">
							
							<div class="item_content_wrap">
								<div class="item_title">广西柑橘</div>
								<div class="sub_title">饱满果肉 甜蜜多汁</div>
								<span class="item_tag">限量抢购</span>
								<div class="bottom_wrap">
									<span class="price">￥26</span>
									<span class="old_price">￥38</span>
									<span class="num">1.5Kg/份</span>
								</div>
							</div>
							
							<div class="item_right_wrap col_between">
								<span>编辑</span>
								<!-- <uni-number-box @change="onNumberChange" :min="0"></uni-number-box> -->
								<img src="../../static/img/home_top.png" alt="">
							</div>
							
						</view>
						<!-- <media-list :data="newsitem" @close="close(index1,index2)" @click="goDetail(newsitem)"></media-list> -->
					</block>
					
					<div v-if="tab.data.length == 0" class="uni-center-item no_data_wrap">
						<img src="../../static/img/no_data.png" class="no_data">
						<span>暂无订单信息</span>
					</div>
					
					<view class="uni-tab-bar-loading" v-if="tab.data.length != 0">
						<uni-load-more :loadingType="tab.loadingType" :contentText="loadingText"  ></uni-load-more>
					</view>
					
				</scroll-view>
			</swiper-item>
		</swiper>
		
		<div class="gou_wu_che" @click="goToShopping">
			<img src="../../static/img/no_data.png" >
			<span>4</span>
		</div>
		
	</view>
</template>
<script>
	import uniLoadMore from '@/components/uni-load-more.vue';
	import uniNumberBox from '@/components/uni-number-box.vue'
	
	export default {
		components: {
			uniLoadMore,
			uniNumberBox
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
				listData: [],
				tabBars: [{
					name: '时间',
					id: 'quanbu'
				}, {
					name: '地区',
					id: 'weifukuan'
				}]
			}
		},
		onLoad: function() {
			this.listData = this.randomfn()
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
			onNumberChange: function(e){
				console.log(e);
			},
			goDetail(e) {
				uni.navigateTo({
					url: '../list_detail/list_detail'
				})
			},
			
			close(index1, index2) {
				uni.showModal({
					content: '是否删除本条信息？',
					success: (res) => {
						if (res.confirm) {
							this.listData[index1].data.splice(index2, 1);
						}
					}
				})
			},
			loadMore(e) {
				this.listData[e].loadingType = 1;
				setTimeout(() => {
					this.addData(e);
				}, 1200);
			},
			addData(e) {
				if (this.listData[e].data.length > 30) {
					this.listData[e].loadingType = 2;
					return;
				}
				for (let i = 1; i <= 10; i++) {
					this.listData[e].data.push(this['data' + Math.floor(Math.random() * 5)]);
				}
				this.listData[e].loadingType = 1;
			},
			async changeTab(e) {
				let index = e.detail.current;
				if (this.isClickChange) {
					this.tabIndex = index;
					this.isClickChange = false;
					return;
				}

				this.isClickChange = false;
				this.tabIndex = index; //一旦访问data就会出问题
			},
			async tapTab(index) { //点击tab-bar
				
			},
			randomfn() {
				let ary = [];
				for (let i = 0, length = this.tabBars.length; i < length; i++) {
					let aryItem = {
						loadingType: 0,
						data: []
					};
					for (let j = 1; j <= 10; j++) {
						aryItem.data.push(this['data' + Math.floor(Math.random() * 5)]);
					}
					ary.push(aryItem);
				}
				return ary;
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
		height: 80upx;
		line-height: 80upx;
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
	
	.tab_item{
		width: 50%!important;
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
		font-size: 34upx;
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
		height: 100upx;
		width: 100upx;
		img{
			width: 90upx;
			height: 90upx;
		}
		span{
			border-radius: 50%;
			font-size: 24upx;
			color: #FFFFFF;
			background-color: firebrick;
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
	
	.input_wrap{
		border-bottom: 1upx solid #F0F0F0;
		background-color: #FFF;
		.uni-input{
			border-radius: 20upx;
			margin: 10upx 30upx;
			background-color: #F9F9F9;
			
		}
	}
	
	
</style>
