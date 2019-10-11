<template>
	<view>
		
		<div class="head_wrap">
			<div v-for="(item, index) in typeList" :key="index" @click="changeType(index)"
				class="head_item row_center" >
				<span :class="{'active_type': (curType == index)}">{{item}}</span>
			</div>
		</div>
		
		<ul class="express-list" style="background: #fff;margin-top: 120upx;">

			<block  v-for="(item,index) in list" :key="index" >
				<li  v-if="parseInt(item.orderStatus)>=0" class="item_wrap">
					<div class="clearfix top" @click="goToDetail(index)">
						
						<div class="detail-col">
							<!-- <div class="icon-col">寄</div> -->
							<img src="../../static/img/express_ji_icon.png" class="icon-col">
							<div class="name">{{item.truename?item.truename:item.sendName}} {{item.depName?item.depName:''}}</div>
							<p>{{item.sendProvince}}{{item.sendCity}}{{item.sendArea}}{{item.sendDetail}}</p>
						</div>
						
						<div class="detail-col" v-if="item.qcOrderType==3 && item.sendorder_address_data[0]">
							<img src="../../static/img/express_shou_icon.png" class="icon-col">
							<div class="name" v-if="item.sendorder_address_data[0]">{{item.sendorder_address_data[0].receiveName}}</div>
							<p id="from_address">
							{{item.sendorder_address_data[0].receiveProvince}}
							{{item.sendorder_address_data[0].receiveCity}}
							{{item.sendorder_address_data[0].receiveArea}}
							{{item.sendorder_address_data[0].receiveDetail}}
							</p>
						</div>
						
						
						<div class="detail-col">
							<img src="../../static/img/express_shou_icon.png" class="icon-col">
							<div class="name">{{item.receiveName}}</div>
							<p>{{item.receiveProvince}}{{item.receiveCity}}{{item.receiveArea}}{{item.receiveDetail}}</p>
						</div>
						
						
						
					</div>
					<div class="middle" @click="goToDetail(index)">
						<span class="first row_between" >
							<!-- <span>{{orderStatusList[parseInt(item.orderStatus)+1]}}</span> -->
							<span>下单时间：{{item.createTime}}</span>
							<span class="price" v-if="parseFloat(item.price) > 0&&item.isDaoFu==0 && !item.buchajiaflag">价格: {{item.price}}</span>
							<span class="price" v-if="parseFloat(item.price) > 0&&item.isDaoFu==0 && item.buchajiaflag">补差价价格: {{item.buchajiaflag}}</span>
							<span class="price" v-if="item.orderType == 1&&parseFloat(item.price) == 0&&item.isDaoFu==0">联系工作人员改价</span>
							
							<span class="price" v-if="item.isDaoFu==1">到付件无需支付</span>
							
						</span>
						<!-- <span class="second" v-if="parseInt(item.orderStatus)>=10" >{{item.newDetail}}</span> -->
						
					</div>
					<div class="bottom">
						<img :src="item.logoURL" mode="widthFix"/>
						<div class="first">{{item.enName}}  </div>
						<div>{{item.orderSN}}</div>
						<div class="order_look" 
							@click.stop="lookDetail(index)">{{item.orderStatus==10?'物流查询':'暂无物流'}}</div>
						
						<div class="btn_wrap">
							<!-- <span class="cancle" v-if="item.orderStatus == 0" @click="actionOrder(2, index)">删除订单</span> -->
							<span class="cancle" v-if="item.orderStatus== 1 || item.orderStatus== 11" @click="actionOrder(1, index)">取消订单</span>
							<span class="pay" v-if="item.orderStatus == 1&&item.orderType==1&&item.isDaoFu==0&&parseFloat(item.price) > 0" @tap="moneyPay(item.orderSN,item.orderID,item.buchajiaflag?item.buchajiaflag:item.price)">支付</span>
							<span class="pay" v-if="item.orderStatus==8" @click="tuikuan(index)">退款</span>
						</div>
					</div>
					
					<div class="order_status_wrap">
						<img src="../../static/img/order_status_icon.png" mode="aspectFill">
						<span>{{orderStatusList[parseInt(item.orderStatus)+1]}}</span>
					</div>
					
				</li>
			</block>
		</ul>
			
		<div v-if="list.length == 0&loadingType==2" class="uni-center-item no_data_wrap">
			<span>暂无订单信息</span>
		</div>
		
		<view class="uni-tab-bar-loading" v-if="list.length != 0">
			<uni-load-more :loadingType="loadingType" :contentText="loadingText"  ></uni-load-more>
		</view>
		
		<uni-popup :show="popupParam === 'bottom'" position="bottom" mode="fixed" :payWay="'-1'" :orderSN="orderSN" :orderID="orderID" :money="allMoney" @hidePopup="payPopup('')" />
		
		
	</view>
	
	
	
</template>

<script>
	import { BASE_IMAGE_URL,getOrderList,getExpressInfoByorderSN,cancelOrder,RefundOrder } from '@/utils/api'
	import uniLoadMore from '@/components/uni-load-more.vue';
	import uniPopup from '@/components/popup-pay.vue';
	import {mapState,mapMutations, mapActions, mapGetters} from 'vuex';
	
	
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
				companyCode:"",
				loadingType: 0,
				page: 1,
				popupParam:'',
				orderSN:'',
				orderID:'',
				allMoney:'0',
				selectIndex: 0,
				keywords: '',
				orderStatus: 0,
				orderStatusList: ['删除','已取消','已下单','已揽收','已寄出','已签收','已打印','打印中','已评价','已支付','已退款','已推送给快递公司','待确认','退款中'],
				typeList: ['全部','待支付','待揽件', '已揽件', '已寄出'],
				curType: 0,
			}
		},
		methods: {
			changeType(index){
				this.curType = index;
				console.log(index);
				this.orderStatus=index;
				this.page = 1;
				this.getList();
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
			
			tuikuan(index)
			{
				let that = this;
				uni.showModal({
					title:"提醒",
					content: "是否退款",
					success(result) {
						if (result.confirm) {
							that.moneyBack(index);
						} else if (result.cancel) {
							console.log('用户点击取消');
						}
					}
				})
			},
			
			async moneyBack(index){

				let params = {
					orderID: this.list[index].orderID
				};
				let res = await RefundOrder(params);
				if(res.status == 1){
					this.page = 1;
					uni.showToast({
					  icon: 'none',
					  title: res.message,
					  duration: 1000
					});
					
					setTimeout( () => {
						this.getList();
					}, 1000)
					
				}else{
					uni.showToast({
					  icon: 'none',
					  title: res.message,
					  duration: 1000
					});
				}
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
			async getList(){
				let userInfo = uni.getStorageSync("userInfo");
				
				let params = {
					userID: userInfo.userID,
					page: this.page,
					keywords: this.keywords,
					orderStatus: this.orderStatus
				};
				
				let res = await getOrderList(params);
				uni.stopPullDownRefresh();
				if(res.status == 1){
					res.data.map((item) => {
						item.newDetail = "物流查询";
						item.wuliu = "";
					})
					
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
			
			//this.$store.commit('changeOrderItem', "");
		},
		onShow(){
			
			this.popupParam='';
			
			this.page = 1;
			this.getList();
			
			this.companyCode=uni.getStorageSync("userInfo").companyCode;
			
			let orderItem = this.$store.getters.getOrderItem;
			console.log(orderItem);
			if(orderItem){
				this.list[this.selectIndex] = JSON.parse(orderItem);
				this.$forceUpdate();
			}
			
		},
		onNavigationBarSearchInputChanged (e) {
            console.log(e.text)
			this.page = 1;
			this.keywords = e.text.trim();
			this.getList();
        },
		onNavigationBarButtonTap() {  
			console.log("点击了自定义按钮");
			var $that=this;
			uni.scanCode({
				success: function (res) {
					console.log('条码类型：' + res.scanType);
					console.log('条码内容：' + res.result);
					$that.keywords=res.result;
					$that.page = 1;
					$that.getList();
				}
			});

		}
		
	}
</script>

<style>
	@import url("../../static/style/yun_fei.css");
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
.second{color: #007AFF; margin-left: 20upx;}

.item_wrap{display: flex;flex-direction: column; position: relative;}
.btn_wrap{position: absolute;right:0upx;top:52upx;}
.btn_wrap .pay{color: #fff; font-size: 24upx; padding: 6upx 26upx; border:1px solid #107EFF;border-radius: 8upx;text-align: center;margin: 0upx 10upx;background: #107EFF;}
.btn_wrap .cancle{color: #666; font-size: 24upx; padding: 6upx 10upx; background-color: #fff;border-radius: 8upx;text-align: center;border: 1upx solid #999;margin: 0upx 10upx;}


.head_wrap{width: 100%; display: flex; flex-direction: row;position: fixed;margin-top:-120upx;left: 0upx;background-color: #FFF;border-bottom: 2upx solid #E3E3E3; height: 100upx;z-index: 101;}
.head_item{flex: 1; padding: 0upx 24upx;}
.head_item span{height: 100upx; line-height: 100upx;}
.active_type{color: #107EFF;border-bottom: 2upx solid #107EFF;}

.price{display: inline-block; text-align: right;box-sizing: border-box;}

.order_status_wrap{position: absolute;right: 0upx; top: 0upx;}
.order_status_wrap img{width: 120upx; height: 120upx; }
.order_status_wrap span{position: absolute;top: 16upx; right: 10upx; color: #ffffff; display: inline-block;transform:rotate(45deg);}

</style>
