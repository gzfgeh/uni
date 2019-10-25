<template>
	<view>
		
		<block  v-for="(item,index) in list" :key="index" >
			<div class="item_wrap">
				<div class="row title_wrap" >
					<div class="row flex_one">
						<span class="title">{{item.user_info}}</span>
					</div>
					
					<span>{{item.write_time}}</span>
				</div>
			</div>
		</block>	
		<div v-if="list.length == 0&&loadingType==2" class="uni-center-item no_data_wrap">
			<span>暂无数据</span>
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
				// userInfo.courierID
				let params = {
						courier_id:  userInfo.courierID,
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
page{background: #F8F8F8;}
.item_wrap{background: #fff; padding: 20upx; color: #999; font-size: 28upx; margin: 20upx; padding: 0upx 15upx;
	display: flex;flex-direction: column;box-shadow:0px 6upx 54upx 0px rgba(221,221,221,0.41); border-radius: 10upx;}
.item_wrap .dot{width: 12upx; height: 12upx; background: #cccccc; border-radius: 50%;margin-right: 10upx;}
.item_wrap .title{color: #333; font-size: 32upx;}
.title_wrap{padding: 20upx 0upx; width: 100%; border-bottom: 1upx solid #E4E4E4;}
.look_btn{text-align: right; color: #1480FF; font-size: 28upx;}
.content{padding: 20upx 0upx;}

.only_one{overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
.active{background: #FC3E3E!important;}
</style>
