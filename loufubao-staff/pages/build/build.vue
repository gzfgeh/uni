<template>
	<view>
		
		<view class="uni-padding-wrap">
			
		<block  v-for="(item,index) in list" :key="index" >
			
			
			<view class="uni-flex uni-row build-row" @tap="addUserChooseBuilding(item.buildingID, item)">
					<view class="left">
						<img model="scaleToFill" v-bind:src="item.buildingImg" />
					</view>
					<view class="right" style="flex: 1;">
						<div class="name">{{item.buildingName}}</div>
						<div class="address">{{item.buildingAddress}}</div>
						<div class="tag">
						<span class="yellow">{{item.buildingMark.split(",")[0]}}</span>
						<span>{{item.buildingMark.split(",")[1]}}</span>
						</div>
					</view>
			</view>
			
			
		</block>	
		<div v-if="list.length == 0&&loadingType==2" class="uni-center-item no_data_wrap">
			<span>暂无数据</span>
		</div>
		
		<view class="uni-tab-bar-loading" v-if="list.length != 0">
			<uni-load-more :loadingType="loadingType" :contentText="loadingText"  ></uni-load-more>
		</view>
		
		</view>
					
	</view>
</template>

<script>
	
	import uniLoadMore from '@/components/uni-load-more.vue';
	import uniNavBar from '@/components/uni-nav-bar.vue';
	import { BASE_IMAGE_URL,getYzByRegionId,addUserChooseBuilding } from '@/utils/api'
	
	export default {
		components: {
			uniNavBar,
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
				searchStr:'',
				loadingType: 0,
				page: 1,
				addressType: 0
			}
		},
		methods: {
			async addUserChooseBuilding(buildingID, item)
			{
				console.log(uni.getStorageSync("userInfo"));
				if(this.addressType == 1){
					//选择收货地址
					uni.setStorageSync("couponAddress",item);
					uni.navigateBack();
					return;
				}
				
				var userID=uni.getStorageSync("userInfo").userID;
				let res =await addUserChooseBuilding(userID,buildingID);
				
				if(res.status==1)
				{
					uni.setStorageSync("userInfo",res.data.userInfo);
					uni.navigateBack();
				}
				else
				{
					uni.showToast({
					  icon: 'none',
					  title: res.message,
					  duration: 1000
					});
				}
				
				
			},
			
			async getList(searchStr){
				
				var param={
					regionID:1,
					page:this.page,
					limit:20,
					searchStr:searchStr
				}
				let res =await getYzByRegionId(param);
				console.log(res);
				
				if(res.status==1)
				{
					if(this.page==1)
					{
						this.list=res.data;
					}
					else{
						this.list=this.list.concat(res.data);
					}
					
					
					if(res.data.length < 20){
						this.loadingType = 2;
					}else{
						this.loadingType = 0;
					}
					
				}
				else
				{
					uni.showToast({
					  icon: 'none',
					  title: '获取失败',
					  duration: 1000
					});
				}
				
			}
		},
		onReachBottom() {
			this.loadingType = 1;
			this.page++;
			this.getList(this.searchStr);
		},
		
		onPullDownRefresh() {
			console.log("dddddd");
			setTimeout(() => {
				this.page = 1;
				this.getList(this.searchStr);
				uni.stopPullDownRefresh();
			}, 3000);
			
		},
		onLoad(opt){
			console.log("开始");
			this.addressType = opt.addressType;
			this.getList(this.searchStr);
		},
		onNavigationBarSearchInputChanged (e) {
            console.log(e.text)
			this.page = 1;
			this.getList(e.text.trim());
        }
	}
</script>

<style>
	
	.build-row{padding:30upx 30upx;border-bottom:1px solid #eee;font-size:32upx;background:#fff;}
    .build-row img{width:160upx;height:160upx;border-radius: 10upx;display: block;background: #eee;}
	.build-row .address{color:#666;font-size:28upx;}
	.build-row .right{padding-left:20upx;}
	.build-row .right .tag{font-size:24upx;}
	.build-row .right .tag span{border:1px solid #09BB07;border-radius: 4px;color:#09BB07;display: inline-block;padding:4upx 6upx;}
	.build-row .right .tag .yellow{margin-right:10upx;color:orange;border:1px solid orange;}
	
	.input-view {
		width: 100%;
		display: flex;
		background-color: #e7e7e7;
		height: 30px;
		border-radius: 15px;
		padding: 0 4%;
		flex-wrap: nowrap;
		margin: 7px 0;
		line-height: 30px;
	}

	.input-view .uni-icon {
		line-height: 30px !important;
	}

	.input-view .input {
		height: 30px;
		line-height: 30px;
		width: 94%;
		padding: 0 3%;
	}
	
</style>
