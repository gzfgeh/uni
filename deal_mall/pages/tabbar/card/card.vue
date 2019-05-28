<template>
	<view class="content">
		
		<div class="all_wrap">
			<div class="row_wrap row">
				<label class="radio">
					<radio @click="changeRadio" :checked="all_radio" />全选
				</label>
				<span class="money">总计:￥1000</span>
			</div>
			<span class="edit_btn">编辑</span>
			<span class="buy_btn">下单</span>
		</div>
		
		<div v-if="list.length == 0" class="no_data_wrap">
			<div class="img_wrap">
				<img src="https://bay.2donghua.com/web/statics/wxapp/images/nav-icon-cart.png" mode="widthFix">
			</div>
			<span>购物车还是空的哦</span>
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
				list: [],
				loadingType: 0,
					page: 1,
					all_radio: false
			};
		},
		onLoad() {},
		methods: {
			changeRadio(e){
				console.log(e);
			},
			goToPage() {
				uni.navigateTo({
					url
				});
			}
		}
	};

</script>

<style>
page{height: 100%; background-color: #F3F3F3;}	
.no_data_wrap{display: flex; flex-direction: column;align-items: center;justify-content: center;width: 100%;color: #888;}
.img_wrap{width: 160upx; height: 160upx; display: flex;flex-direction: row; justify-content: center;align-items: center;border-radius: 50%;background-color: rgba(0,0,0,0.1);margin-bottom: 32upx;}
.no_data_wrap img{width: 68upx;}

.all_wrap{display: flex; flex-direction: row; width: 100%; justify-content: center;align-items: center; height: 100upx;
	position: fixed;bottom: 0upx;left: 0upx;border-top: 1rpx solid #E3E3E3; z-index: 10;}
.row_wrap{flex: 1; padding-left: 20upx;background: #FFFFFF;height: 100%;}
.row_wrap .money{margin-left: 20upx; color: #FF4544;}
.edit_btn{background: #3c8ee5; color: #fff; width: 160upx; text-align: center;height: 100upx;line-height: 100upx;}
.buy_btn{background: #ff4544; color: #fff; width: 160upx; text-align: center;height: 100upx;line-height: 100upx;}


</style>
