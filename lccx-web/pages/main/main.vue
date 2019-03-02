<template>
	<view class="uni-tab-bar">
		<!-- <scroll-view id="tab-bar" class="uni-swiper-tab uni-center-item" >
			<view v-for="(tab,index) in tabBars" :key="tab.id" :class="['swiper-tab-list',tabIndex==index ? 'active' : '']" :id="tab.id"
			 :data-current="index" @click="tapTab(index)">{{tab.name}}</view>
		</scroll-view> -->
		
		<div class="uni-center-item tab_bar">
			<view v-for="(tab,index) in tabBars" :key="tab.id" :class="['swiper-tab-list',tabIndex==index ? 'active' : '']" :id="tab.id"
			 :data-current="index" @click="tapTab(index)">
				<span :class="[tabIndex==index ? 'tab_text' : '']" >{{tab.name}}</span> 
				<span :class="[tabIndex==index ? 'line' : '']" ></span>
			 </view>
		</div>
		
		<swiper :current="tabIndex" class="swiper-box" duration="300" @change="changeTab" >
			<swiper-item v-for="(tab,index1) in listData" :key="index1">
				<scroll-view class="list" scroll-y @scrolltolower="loadMore(index1)">
					<block v-for="(newsitem,index2) in tab.data" :key="index2" >
						
						<view @click="goDetail(newsitem)" class="item_wrap">
							
							<div class="item_content_wrap">
								<div class="item_title">里程车险</div>
								<div class="item_no">车牌号：沪A42320</div>
								<div class="item_name">姓名：张无双</div>
							</div>
							
							<div class="bottom_wrap">
								<span class="bottom_action" v-if="index2%2 != 0">立即付款</span>
								<span v-if="index2%2 == 0">查看详情</span>
							</div>
							
							<img src="../../static/img/read_pay.png" v-if="index2%2 != 0">
							<img src="../../static/img/finish_pay.png" v-if="index2%2 == 0">
							
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
				listData: [],
				data0: {
					"datetime": "40分钟前",
					"article_type": 0,
					"title": "uni-app行业峰会频频亮相，开发者反响热烈!",
					"source": "DCloud",
					"comment_count": 639
				},
				data1: {
					"datetime": "一天前",
					"article_type": 1,
					"title": "DCloud完成B2轮融资，uni-app震撼发布!",
					"image_url": "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/shuijiao.jpg?imageView2/3/w/200/h/100/q/90",
					"source": "DCloud",
					"comment_count": 11395
				},
				data2: {
					"datetime": "一天前",
					"article_type": 2,
					"title": "中国技术界小奇迹：HBuilder开发者突破200万",
					"image_url": "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/muwu.jpg?imageView2/3/w/200/h/100/q/90",
					"source": "DCloud",
					"comment_count": 11395
				},
				data4: {
					"datetime": "2小时前",
					"article_type": 4,
					"title": "uni-app 支持原生小程序自定义组件，更开放、更自由",
					"image_url": "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/cbd.jpg?imageView2/3/w/200/h/100/q/90",
					"source": "DCloud",
					"comment_count": 69
				},
				data3: {
					"article_type": 3,
					"image_list": [{
						"url": "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/cbd.jpg?imageView2/3/w/200/h/100/q/90",
						"width": 563,
						"height": 316
					}, {
						"url": "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/muwu.jpg?imageView2/3/w/200/h/100/q/90",
						"width": 641,
						"height": 360
					}, {
						"url": "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/shuijiao.jpg?imageView2/3/w/200/h/100/q/90",
						"width": 640,
						"height": 360
					}],
					"datetime": "5分钟前",
					"title": "uni-app 支持使用 npm 安装第三方包，生态更趋丰富",
					"source": "DCloud",
					"comment_count": 11
				},
				tabBars: [{
					name: '全部',
					id: 'quanbu'
				}, {
					name: '未付款',
					id: 'weifukuan'
				}, {
					name: '已完成',
					id: 'yiwancheng'
				}]
			}
		},
		onLoad: function() {
			this.listData = this.randomfn()
		},
		methods: {
			goDetail(e) {
				uni.navigateTo({
					url: '/pages/template/tabbar/detail/detail?data=' + e.title
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
				if (this.tabIndex === index) {
					return false;
				} else {
					this.isClickChange = true;
					this.tabIndex = index;
				}
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

<style scoped>
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
		color: #427DFF;
	}
	
	.swiper-tab-list{
		position: relative;
		color: rgba(0,0,0,0.4)
	}
	
	.line{
		height: 6upx;
		width: 34upx;
		position: absolute;
		bottom: -24upx;
		z-index: 1;
		background-color: #427DFF;
		left: 60upx;
	}
	
	.item_wrap{
		box-sizing: border-box;
		margin: 30upx;
		border-radius: 12upx;
		box-shadow:0px 0px 14upx 0px rgba(222,222,222,0.5);
		background-color: #FFFFFF;
		padding-top: 36upx;
		padding-left: 34upx;
		padding-right: 34upx;
		color: #9F9F9F;
		font-size: 26upx;
		position: relative;
	}
	
	.item_content_wrap{
		border-bottom: 4upx solid #F1F1F1;
	}
	
	.item_title{
		color: #4D4D4D;
		font-size: 34upx;
		margin-bottom: 16upx;
	}
	
	.item_name{
		margin-bottom: 24upx;
	}
	
	.bottom_wrap{
		text-align: center;
		padding-top: 16upx;
		box-sizing: border-box;
		height: 80upx;
		color: #3A7FF7;
		font-size: 26upx;
	}
	
	.bottom_action{
		padding: 8upx 24upx;
		background-color: #E9F3FB;
		border-radius: 26upx;
	}
	
	.item_wrap img{
		width: 188upx;
		height: 164upx;
		position: absolute;
		top: 22upx;
		right: 20upx;
		padding: 16upx 10upx;
		box-sizing: border-box;
	}
	
</style>
