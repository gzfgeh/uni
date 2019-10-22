<template>
	<view>
		<block  v-for="(item,index) in list" :key="index" >
			<div class="item_wrap">
				<div class="row title_wrap" >
					<div class="row flex_one">
						<span class="dot" :class="{'active':(parseInt(item.weixinMessageStatus) == 0)}"></span>
						<span class="title">{{item.weixinMessageInfo}}</span>
					</div>
					
					<span>{{item.weixinMessageAddTime}}</span>
				</div>
				<div class="content" :class="{'only_one': (!item.isClicked)}">{{item.weixinMessageText}}</div>
				<div class="look_btn" @click="MessageRead(index)">{{item.isClicked?'点击收起':'查看全部'}}</div>
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
	import { BASE_IMAGE_URL,getMessageListByType,MessageRead } from '@/utils/api'
	
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
				isEmpty: false
			}
		},
		methods: {
			async MessageRead(index){
				if(this.list[index].weixinMessageStatus == 1){
					// 已读
					this.list[index].isClicked = !this.list[index].isClicked;
					this.$forceUpdate();
					return;
				};
				
				
				let params = {
					weixinMessageID: this.list[index].weixinMessageID
				};
				let res = await MessageRead(params);
				if(res.status == 1){
					this.list[index].isClicked = !this.list[index].isClicked;
					this.list[index].weixinMessageStatus = 1;
					this.$forceUpdate();
				}
				
			},
			async getList(){
				let params = {
					userID: uni.getStorageSync("userInfo").userID,
					page: this.page,
					limit: 20
				};
				let res = await getMessageListByType(params);
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
				}
				
			}
		},
		onReachBottom() {
			this.loadingType = 1;
			this.isEmpty = false;
			this.page++;
			this.getList();
		},
		
		onPullDownRefresh() {
			console.log("dddddd");
			this.isEmpty = false;
			this.page = 1;
			this.getList();
		},
		onLoad(opt){
			console.log(opt.id);
			this.getList();
		}
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
