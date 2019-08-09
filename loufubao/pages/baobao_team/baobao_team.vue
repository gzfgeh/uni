<template>
	<view>
		<block  v-for="(item,index) in list" :key="index" >
			<div class="row item_wrap" @click="contactUs(index)" >
				<img class="logo" :src="(item.courierImg?item.courierImg:'../../static/img/mtyou_icon.png')" mode="aspectFill">
				<div class="content_wrap">
					<div class="row">
						<span>{{item.nickName}}</span>
					</div>
					<span>昵称：{{item.nickName}}</span>
					<span>工号：{{item.employee_number}}</span>
				</div>
				<img class="phone_icon" src="../../static/img/call_phone_icon.png" mode="aspectFill" >
			</div>
		</block>	
		<div v-if="list.length == 0&&loadingType==2" class="uni-center-item no_data_wrap">
			<span>暂无数据</span>
		</div>
					
	</view>
</template>

<script>
	import { BASE_IMAGE_URL,getYZCourierList} from '@/utils/api'
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
			async getList(){
				let res = await getYZCourierList(uni.getStorageSync("userInfo").buildingID);
				if(res.status == 1){
					this.list = res.data;
				}
			},
			contactUs(index){
				let that = this;
				uni.showModal({
					title: "联系我们",
					content: "是否拨打客服电话 \r\n"+that.list[index].phone,
					success: function (result) {
						if (result.confirm) {
							console.log('用户点击确定');
							uni.makePhoneCall({
								phoneNumber:that.list[index].phone,
								success: () => {
									console.log("成功拨打电话")
								}
							})
						} else if (result.cancel) {
							console.log('用户点击取消');
						}
					}
				});
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
			this.list = [];
			this.getList();
		},
		onLoad(){
			this.getList();
		}
	}
</script>

<style>
.item_wrap{padding: 20upx 40upx; border-bottom: 1upx solid #E3E3E3;}
.item_wrap .logo{width: 160upx; margin-right: 20upx; border-radius: 50%; height: 160upx;}
.content_wrap{display: flex;flex-direction: column; flex: 1;}
.item_wrap .phone_icon{width: 50upx; padding: 20upx;}
</style>
