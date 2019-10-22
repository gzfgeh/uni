<template>
	<view>
		<div class="head_wrap">
			<div v-for="(item, index) in typeList" :key="index" @click="changeType(index)"
				class="head_item row_center" >
				<span :class="{'active_type': (curType == index)}">{{item}}</span>
			</div>
		</div>
		
		<div style="background: #fff; padding-top: 100upx;">

			<block  v-for="(item,index) in list" :key="index" >
				<div class="item_wrap">
					<span class="build_num" v-if="item.isShow">{{item.buildLevel}}F</span>
					<div class="row" style="min-height: 100upx; padding-left: 20upx;">
						<img :src="item.companyYZLogoImg" mode="widthFix" v-if="item.companyYZLogoImg">
						<span>{{item.companyYZShortName}}</span>
					</div>
				</div>
			</block>

		</div>
		
			
		<div v-if="(list.length == 0)" class="uni-center-item no_data_wrap">
			<span>暂无数据</span>
		</div>
		
	</view>
</template>

<script>
	import { BASE_IMAGE_URL,getLouYuListByYzID } from '@/utils/api'
	
	
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
				page: 1,
				selectIndex: 0,
				keywords: '',
				orderStatus: 0,
				typeList: ['企业','商业'],
				curType: 0,
				orderStatusList: ['删除','已取消','已下单','已揽收','已寄出','已签收','已打印','打印中','已评价','已支付','已退款','已推送给快递公司',]
			}
		},
		methods: {
			changeType(index){
				this.curType = index;
				this.page = 1;
				this.getList();
			},
			async getList(){
				let userInfo = uni.getStorageSync("userInfo");
				this.list = [];
				let res = await getLouYuListByYzID(userInfo.buildingID, this.curType+1);
				
				uni.stopPullDownRefresh();
				if(res.status == 1){
					for(var key in res.data){
					  res.data[key].map((item, index) => {
						  if(index == 0){
							  item.isShow = true;
						  }else{
							  item.isShow = false;
						  }
					  })
					  
					  this.list = this.list.concat(res.data[key]);
					  
					}
					console.log(this.list);
					this.list.sort((a, b) => {
						return parseInt(a.buildLevel) - parseInt(b.buildLevel);
					})
				}
			},
			goToDetail(index){
				this.selectIndex = index;
				uni.navigateTo({
					url: '/pages/express_detail/express_detail?orderID='+this.list[index].orderID
				});
			}
		},
		
		onPullDownRefresh() {
			this.list = [];
			this.getList();
		},
		onLoad() {
			this.list = [];
			this.getList();
		},
		onPageScroll(res){
			console.log(res.scrollTop);
		}
		
	}
</script>

<style>

.head_wrap{width: 100%; display: flex; flex-direction: row;position: fixed; left: 0upx;background-color: #FFF;border-bottom: 2upx solid #E3E3E3; height: 100upx;z-index: 10000;}
.head_item{flex: 1; padding: 0upx 24upx;}
.head_item span{height: 100upx; line-height: 100upx;}
.active_type{color: #107EFF;border-bottom: 2upx solid #107EFF;}

.item_wrap{background: #FFF;display: flex; flex-direction: column;border-bottom: 1upx solid #E3E3E3;}
.item_wrap .build_num{color: #999; padding: 20upx; background: #E3E3E3;}
.item_wrap img{width: 100upx;margin: 0upx 20upx 0upx 20upx; padding: 20upx 0upx;}

</style>
