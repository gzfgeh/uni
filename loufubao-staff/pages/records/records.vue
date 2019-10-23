<template>
	<view>
		
		<navigator class="item_wrap" >
		
			<block  v-for="(item,index) in list" :key="index" >
				<div class="row_between item" @click="goToDetail(index)">
					<div class="row">
						<img :src="item.goodsInfo.goods_list_img" mode="aspectFill">
						<span>{{item.goodsInfo.name}}</span>
					</div>
					
					<span v-if="false">{{item.time}}</span>
				</div>
			</block>
		
		</navigator>
		
			
		<div v-if="(list.length == 0)&&(loadingType==2)" class="uni-center-item no_data_wrap">
			<span>暂无信息</span>
		</div>
		
		<view class="uni-tab-bar-loading" v-if="list.length != 0">
			<uni-load-more :loadingType="loadingType" :contentText="loadingText"  ></uni-load-more>
		</view>
		
	</view>
</template>

<script>
	import { BASE_IMAGE_URL,writeOff_record } from '@/utils/api'
	
	export default {
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
			async getList(){
				let userInfo = uni.getStorageSync("userInfo");
				// userInfo.userID
				let params = {
						courier_id:  20712,
						page: this.page,
						limit: 10
				};
				let res = await writeOff_record(params);
				uni.stopPullDownRefresh();
				if(res.status == 1){
					
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
			},
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
.item_wrap{background: #fff;}
.item{padding: 30upx; border-bottom: 2upx solid #E3E3E3;}
.item img{width: 100upx; height: 100upx; margin-right: 20upx;}
</style>
