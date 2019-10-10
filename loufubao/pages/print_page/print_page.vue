<template>
	<view>
		<ul class="express-list" style="background: #fff; margin-bottom: 100upx;">

			<block  v-for="(item,index) in list" :key="index" >
				<li  v-if="parseInt(item.orderStatus)>=0" class="item_wrap" @click="goToDetail(index)">
					<radio  :checked="item.checked" />
					
					<div class="clearfix top" >
						
						<div class="detail-col">
							<!-- <div class="icon-col">寄</div> -->
							<img src="../../static/img/express_ji_icon.png" class="icon-col">
							<div class="name">{{item.sendName}}</div>
							<p>{{item.sendProvince}}{{item.sendCity}}{{item.sendArea}}{{item.sendDetail}}</p>
						</div>
						
						<div class="detail-col" v-if="item.qcOrderType==3">
							<img src="../../static/img/express_shou_icon.png" class="icon-col">
							<div class="name" id="from_name">{{item.sendorder_address_data[0].receiveName}}</div>
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
					<div class="middle">
						<span class="first row_between" >
							<span>下单时间：{{item.createTime}}</span>
							
						</span>
						
					</div>
					<div class="bottom">
						<img :src="item.logoURL" mode="widthFix"/>
						<div>{{item.expressCompanyName}}  {{item.orderSN}}</div>
					</div>
					
					<div class="order_status_wrap">
						<img src="../../static/img/order_status_icon.png" mode="aspectFill">
						<span>{{orderStatusList[parseInt(item.orderStatus)+1]}}</span>
					</div>
					
				</li>
			</block>
		</ul>
		
		<div class="button btn-primary abs"  @tap="insertOrderToPrintask">
		  <button hover-class="hover_class">打印快递标签</button>
		</div>
			
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
	import { BASE_IMAGE_URL,getPrintOrderList,insertOrderToPrintask } from '@/utils/api'
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
				typeList: ['全部','待揽件', '已揽件', '已寄出'],
				curType: 0,
				allChecked: false
			}
		},
		onNavigationBarButtonTap (e) {
			this.allChecked = !this.allChecked;
			this.list.map((item) => {
				item.checked = this.allChecked
			});
		},
		methods: {
			payPopup(popupParam) {
				this.popupParam=popupParam;
			},
			async insertOrderToPrintask(){
				let orderIDs = "";
				this.list.map((item) => {
					if(item.checked){
						orderIDs += item.orderID+",";
					}
				});
				if(!orderIDs){
					uni.showToast({
					  icon: 'none',
					  title: "请选择快递订单",
					  duration: 1000
					});
					return;
				};
				let params = {
					orderIDs: orderIDs.substring(0, orderIDs.length-1)
				};
				let res = await insertOrderToPrintask(params);
				if(res.status == 1){
					uni.showToast({
					  icon: 'none',
					  title: "操作成功",
					  duration: 1000
					});
					
					setTimeout(()=>{
						uni.navigateBack({
							delta:1
						})
					}, 1000)
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
				
				let params = {
					userID: userInfo.userID,
					page: this.page,
					keywords: this.keywords,
					limit: 10
				};
				
				let res = await getPrintOrderList(params);
				uni.stopPullDownRefresh();
				if(res.status == 1){
					res.data.map((item) => {
						item.checked = this.allChecked;
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
				}else{
					uni.showToast({
					  icon: 'none',
					  title: res.message,
					  duration: 1000
					});
				}
			},
			goToDetail(index){
				this.selectIndex = index;
				this.list[index].checked = !this.list[index].checked;
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
			this.page = 1;
			this.getList();
		},
		onShow(){
			
			this.popupParam='';
			
			this.page = 1;
			this.getList();
			
			this.companyCode=uni.getStorageSync("userInfo").companyCode;
			
		},
		onNavigationBarSearchInputChanged (e) {
            console.log(e.text)
			this.page = 1;
			this.keywords = e.text.trim();
			this.getList();
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

.item_wrap{display: flex;flex-direction: column; position: relative; margin-left: 60upx!important;}
.item_wrap radio{position: absolute; left: -70upx; top: 40%;}
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

.express-list .bottom img{top: 10upx!important; width: 50upx!important;}

.button{
  margin: 0upx 0%;
  width: 100%;
  height: 174upx;
	line-height: 174upx;
	background-color: #ffffff;
	border-radius: 0upx;
	text-align: center;
	font-size: 32upx;
	position: fixed;
	bottom: 0upx;
	z-index: 10000;
	box-shadow:0px 6upx 54upx 0px rgba(221,221,221,0.41);
}

.button button{
	margin: 40upx 5%;
  width: 90%;
  height: 94upx;
	line-height: 94upx;
	color: #ffffff;
	background-color: #427DFF;
}

</style>
