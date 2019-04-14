<template>
	<view class="uni-tab-bar">
		<view class="input_wrap" style="height: 100upx;" v-if="false">
			<input class="uni-input" confirm-type="search" placeholder="搜索" />
			
		</view>
		
				<scroll-view scroll-y class="list"  @scrolltolower="loadMore" 
														:style="{'height': (screenHeight-0)+'px'}">
					<block  v-for="(item,index2) in list" :key="index2" >
						
						<view class="row item_wrap">
							<div class="item_content_wrap">
								<div class="item_title row_between" >
									<span style="font-weight: bold; color: #000000;">订单号：{{item.o_out_trade_no}}</span>
									
								</div>
								
								<div class="sub_title">收货地址：{{item.o_address}}</div>
								<div class="sub_title">订单日期：{{item.o_create_time}}</div>
								<div class="sub_title">订单总价: ￥{{item.o_money}}</div>
								<!-- <span class="num">1.5Kg/份</span> -->
								<div class="bottom_wrap row_between" style="font-weight: bold; color: #000000;">
									<div class="num">
										<span>品名</span>
									</div>
									
									<div class="num">
										<span>单价</span>
									</div>
									
									<div class="num">
										<span>数量</span>
									</div>
									
									<div class="num">
										<span>小计</span>
									</div>
								</div>
								
								<div class="bottom_wrap row_between" v-for="(ite,index) in item.good_list" :key="index">
									<div class="num">
										<span>{{ite.g_name}}</span>
									</div>
									
									<div class="num">
										<span>￥{{ite.go_g_price}}</span>
									</div>
									
									<div class="num">
										<span>{{ite.go_count}}</span>
									</div>
									
									<div class="num">
										<span>￥{{ite.all_money}}</span>
									</div>
								</div>
								
							</div>
							
							
						</view>
						<!-- <media-list :data="newsitem" @close="close(index1,index2)" @click="goDetail(newsitem)"></media-list> -->
					</block>
					
					<div v-if="list.length == 0" class="uni-center-item no_data_wrap">
						<img src="../../static/img/no_data.png" class="no_data">
						<span>暂无订单信息</span>
					</div>
					
					<view class="uni-tab-bar-loading" v-if="list.length != 0">
						<uni-load-more :loadingType="loadingType" :contentText="loadingText"  ></uni-load-more>
					</view>
					
				</scroll-view>
		
	</view>
</template>
<script>
	import uniLoadMore from '@/components/uni-load-more.vue';
	import { BASE_IMAGE_URL,goodsList, jiaruCart, getCart} from "@/utils/api";
	
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
				list: [],
				screenHeight: 0,
				loadingType: 0,
				page: 1
			}
		},
		onLoad: function() {
			// this.listData = this.randomfn()
			uni.getSystemInfo({
				success: (res) => {
					this.screenHeight = res.screenHeight;
					console.log(this.screenHeight);
				}
			})
			
			this.orderList();
		},
		
		onReachBottom() {
			this.loadMore();
		},
		
		onPullDownRefresh() {
			console.log("dddddd");
			this.page = 1;
			this.list = [];
			this.orderList();
		},
		methods: {
			goToShopping: function(){
				uni.navigateTo({
					url: '../shopping_card/shopping_card'
				})
			},
			goDetail(e) {
				uni.navigateTo({
					url: '../list_detail/list_detail'
				})
			},
			
			async orderList(){
				let that = this;
				uni.request({
					url: 'https://mall.xiuqiupaopaopao.com/index.php?g=Api&m=Weixin&a=getOrder&o_openid='
						+uni.getStorageSync("openid")+'&page='+this.page,
					method: 'GET',
					dataType: 'json',
					data: this.params,
					success: (res) => {
						console.log(res.data.data);
						if(res.data.code == 1000){
							if(that.page == 1){
								uni.stopPullDownRefresh();
								let tempList = res.data.data;
								that.list = [];
								tempList.map(function(item){
									item.good_list.map(function(ite){
										ite.all_money = parseFloat(parseFloat(ite.go_g_price) * parseFloat(ite.go_count)).toFixed(2);
										
									}) 
									that.list.push(item);
								});
								// that.list = res.data.data;
							}else{
								let tempList = res.data.data;
								tempList.map(function(item){
									item.good_list.map(function(ite){
										ite.all_money = parseFloat(parseFloat(ite.go_g_price) * parseFloat(ite.go_count)).toFixed(2);
									})
									 that.list.push(item);
								});
								
								// this.list.concat(res.data.data);
							}	
							
							if(res.data.data.length < 10){
								//没有了
								this.loadingType = 2;
								
							}else{
								// 还有
								this.loadingType = 1;
							}
							
						}else{
							uni.showToast({
							  icon: 'none',
							  title: res.data.msg,
							  duration: 1000
							});
						}
						
					},
					fail: (res) => {
						uni.showToast({
						  icon: 'none',
						  title: res.data.msg,
						  duration: 1000
						});
					},
				});
			},
			
			
			loadMore() {
				this.loadingType = 1;
				this.page++;
				this.orderList();
			},
			
			
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
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-around;
		height: 80upx;
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
	}
	
	.item_content_wrap{
		flex: 1;
		margin-left: 20upx;
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	
	.item_title{
		color: #464646;
		font-size: 28upx;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		width: 100%;
	}
	.sub_title{
		color: #464646;
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
		width: 100%;
		align-items: center;
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
	
	.num{
		color: #000000;
		font-size: 28upx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		flex: 1;
	}
	
	.money_text{
		color: #000000;
		font-size: 34upx;
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
		img{
			width: 30upx;
			height: 30upx;
			border-radius: 50%;
		}
		span{
			white-space: nowrap;
			display: inline-block;
			overflow: hidden;
			text-overflow: ellipsis;
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
