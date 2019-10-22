<template>
	<view>
		<!-- <div class="head_wrap">
			<div v-for="(item, index) in typeList" :key="index" @click="changeType(index)"
				class="head_item row_center" >
				<span :class="{'active_type': (curType == index)}">{{item}}</span>
			</div>
		</div> -->
		
		
		<div >

			<block  v-for="(item,index) in list" :key="index" >
				<div class="item_wrap">
					<div class="item_header">
						<div>快递公司: {{item.kuaidigongsi}}</div>
						<div>运单号：{{item.expressSN}}</div>
					</div>
					
					<div>入库人：{{item.lanjianren}}</div>
					<div>入库时间：{{item.lujianrenTime}}</div>
					
					<div class="order_status_wrap">
						<img src="../../static/img/order_status_icon.png" mode="aspectFill">
						<span>{{orderStatusList[parseInt(item.orderStatus)]}}</span>
					</div>
				</div>
				
				
			</block>

		</div>
		
			
		<div v-if="(list.length == 0)&&(loadingType==2)" class="uni-center-item no_data_wrap">
			<span>暂无订单信息</span>
		</div>
		
		<view class="uni-tab-bar-loading" v-if="list.length != 0">
			<uni-load-more :loadingType="loadingType" :contentText="loadingText"  ></uni-load-more>
		</view>
		
		<uni-popup :show="popupParam === 'bottom'" position="bottom" mode="fixed" :payWay="'-1'" :orderSN="orderSN" :orderID="orderID" :money="allMoney" @hidePopup="payPopup('')" />
		
		
	</view>
</template>

<script>
	import { BASE_IMAGE_URL,getQsOrderList,getOrderList,cancelOrder,RefundOrder,getExpressInfoByorderSN } from '@/utils/api'
	import uniLoadMore from '@/components/uni-load-more.vue';
	import uniPopup from '@/components/popup-pay.vue';
	
	//  0 删除 ， 2 已退回  3 已派送  4 异常件 5 已出库、派送中 6 已入库
	export default {
		components: {
			uniLoadMore,
			uniPopup
		},
		data() {
			return {
				loadingText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
				list: [],
				loadingType: 2,
				page: 1,
				selectIndex: 0,
				keywords: '',
				popupParam:'',
				orderSN:'',
				orderID:'',
				allMoney:'0',
				orderStatus: 0,
				typeList: ['发件列表','收件列表'],
				curType: 1,
				orderStatusList: ['删除','','已退回','已派送','异常件','已出库','已入库']
			}
		},
		methods: {
			changeType(index){
				this.curType = index;
				this.page = 1;
				this.getList();
			},
			actionOrder(type, index){
				let that = this;
				uni.showModal({
					title:"提醒",
					content: type== 1?"是否取消":"是否删除",
					success(result) {
						if (result.confirm) {
							that.cancelOrder(type, index);
						} else if (result.cancel) {
							console.log('用户点击取消');
						}
					}
				})
			},
			payPopup(popupParam) {
				this.popupParam=popupParam;
			},
			moneyPay(orderSN,orderID,allMoney){
				
				this.orderSN=orderSN;
				this.orderID=orderID;
				this.allMoney=allMoney;
				this.popupParam="bottom";
				
			},
			async moneyBack(index){
				let params = {
					orderID: this.list[index].orderID
				};
				let res = await RefundOrder(params);
				if(res.status == 1){
					this.page = 1;
					this.getList();
				}else{
					uni.showToast({
					  icon: 'none',
					  title: res.message,
					  duration: 1000
					});
				}
			},
			async lookDetail(index){
				this.selectIndex = index;
				uni.navigateTo({
					url: '/pages/express_detail/express_detail?orderID='+this.list[index].orderID+"&orderStatus=1"
				});
				return;
				let params = {
					orderSN: this.list[index].orderSN
				};
				let res = await getExpressInfoByorderSN(params);
				if(res.status == 1){
					// this.list[index].wuliu = res.data.data[0].context;
					uni.showModal({
						title:"最新物流信息",
						content:res.data.data[0].context,
						showCancel:false,
						success(res) {}
					})
				}else{
					// this.list[index].wuliu = res.message;
					uni.showModal({
						title:"最新物流信息",
						content:res.message,
						showCancel:false,
						success(res) {}
					})
				}
			},
			async cancelOrder(type, index){
				let params = {
					orderID: this.list[index].orderID,
					type: type
				};
				let res = await cancelOrder(params);
				if(res.status == 1){
					this.page = 1;
					this.getList();
					
				}else{
					uni.showToast({
					  icon: 'none',
					  title: res.message,
					  duration: 1000
					});
				}
			},
			async getList(){
				let userInfo = uni.getStorageSync("userInfo");
				let res;
				if(true){
					let params = {
						userID: userInfo.userID,
						page: this.page,
						searchStr: this.keywords
					};
					
					res = await getQsOrderList(params);
					uni.stopPullDownRefresh();
					if(res.status == 1){
						
						if(this.page==1)
						{
							this.list=res.data?res.data:[];
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
					
				};
				
				
			},
			goToDetail(index){
				this.selectIndex = index;
				uni.navigateTo({
					url: '/pages/express_detail/express_detail?orderID='+this.list[index].orderID
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
			this.getList();
		},
		onLoad() {
			
		},
		onShow(){
			
			this.page = 1;
			this.getList();
			
			this.popupParam='';
			
			/* let orderItem = this.$store.getters.getOrderItem;
			console.log(orderItem);
			if(orderItem){
				this.list[this.selectIndex] = JSON.parse(orderItem);
				this.$forceUpdate();
			} */
			
		},
		onNavigationBarSearchInputChanged (e) {
            console.log(e.text)
			this.page = 1;
			this.keywords = e.text.trim();
			this.getList();
			
        },
		onNavigationBarButtonTap() {  
			console.log("点击了自定义按钮");
			uni.scanCode({
				success: function (res) {
					console.log('条码类型：' + res.scanType);
					console.log('条码内容：' + res.result);
				}
			});

		}
		
	}
</script>

<style>

.item_wrap{box-shadow: 0px 2px 6px 0px rgba(126,125,125,0.14); position: relative; padding: 20upx;box-sizing: border-box; margin: 20upx;}
.item_header{background: #fff; padding-bottom: 20upx; border-bottom: 2upx solid #F1F1F1;margin-bottom: 20upx;}

.order_status_wrap{position: absolute;right: 0upx; top: 0upx;}
.order_status_wrap img{width: 120upx; height: 120upx; }
.order_status_wrap span{position: absolute;top: 16upx; right: 10upx; color: #ffffff; display: inline-block;transform:rotate(45deg);}


</style>
