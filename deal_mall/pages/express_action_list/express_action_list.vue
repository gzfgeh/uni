<template>
	<view>
		
		<div class="head_wrap">
			<div v-for="(item, index) in typeList" :key="index" @click="changeType(index)"
				class="head_item row_center" :class="{'active_type': (curType == index)}">
				<span>{{item}}</span>
			</div>
		</div>
		
		<ul class="express-list" style="margin-top: 100upx;">

			<block  v-for="(item,index) in list" :key="index" >
				<li @click="goToDetail">
					<div class="clearfix top">
						<div class="left">
							<div class="name">张得发</div>
							<p>上海市黄浦区歌斐中心</p>
						</div>
						<img class="middle-img" src="../../static/img/express_arraw.jpg" mode="widthFix">
						<div class="right">
							<div class="name">李玖哲</div>
							<p>上海市黄浦区歌斐中心 拷贝</p>
						</div>
					</div>
					<div class="middle">
						<span class="first" >
							<span>未签收</span>
						</span>
						<span class="second">广东深圳南山区建华路报社村30栋-01</span>
					</div>
					<div class="bottom">
						<img src="../../static/img/express_list_logo.jpg" mode="widthFix"/>
						<span class="first">顺丰快递  </span>
						<span>11001010123030306</span>
					</div>
				</li>
			</block>

		</ul>
		
			
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
				page: 1
			}
		},
		methods: {
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
	@import url("../../static/style/yun_fei.css");
	.head_wrap{width: 100%; display: flex; flex-direction: row;position: fixed;top: 0upx; left: 0upx;background-color: #FFF;border-top: 2upx solid #E3E3E3; height: 100upx;}
	.head_item{flex: 1;}
	.active_type{color: #FF4544;}
	
.header-bar{position: relative;height:88upx;line-height: 88upx;z-index:1;width:100%;left:0;top:var(--status-bar-height);box-shadow:0px 6upx 54upx 0px rgba(221,221,221,0.41);background: #fff;}
.header-bar .header-title{font-size:34upx;color:#333333;text-align: center;font-weight: 500;}
.header-bar .header-right{position: absolute;right:0;top:0;padding:0 20upx;}
.header-bar .header-right img{width:56upx;margin-top:16upx;}
.has-header{padding-top:96upx;}
.header-bar .header-left{position: absolute;left:0;padding:0 32upx;top:-8upx;}
.header-bar .header-left img{width:32upx;margin-top:30upx;}

.header-search{padding-left:100upx;box-sizing: border-box;padding-right:30upx;box-shadow: none;}
.header-search .search-input{background:rgba(250,250,250,1);border:2upx solid rgba(227,227,227,1);border-radius:36upx;height:72upx;box-sizing: border-box;padding-left:80upx;text-align: left;}
.header-search .right-img{width:60upx;position: absolute;right:50upx;top:-4upx;text-align: center;}
.header-search .right-img img{width:48upx;}
.header-search .left-img{width:42upx;position: absolute;left:120upx;top:16upx; z-index: 2;}
</style>
