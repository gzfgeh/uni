<template>
	<view>
		
		<div class="head_wrap">
			<div v-for="(item, index) in typeList" :key="index" @click="changeType(index)"
				class="head_item row_center" >
				<span :class="{'active_type': (curType == index)}">{{item}}</span>
			</div>
		</div>
		
		<div class="list_wrap">
			<div v-for="(item, index) in list" :key="index" class="list_item" v-if="item.good_list.length>0">
				<!-- <div class="item_head">平台自营</div> -->
				<div class="row_between">
					<span>订单号:{{item.o_out_trade_no}}</span>
					<span>{{item.o_create_time}}</span>
				</div>
				
				
				
				<div class="item_info row" v-for="(ite, ind) in item.good_list" :key="ind">
					<img :src="ite.go_g_img" mode="aspectFill">
					<div class="item_tag flex_one item_content" >
						<div class="item_tag flex_one">
							<span class="name">{{ite.go_g_name}}</span>
							<!-- <span class="tag"> 规格:默认 </span> -->
						</div>
						<div class="row">
							<span class="num flex_one">x{{ite.go_count}}</span>
							<span class="price">￥:{{ite.go_g_price}}</span>
						</div>
					</div>
				</div>
				
				<div class="row_between express_wrap"  v-if="curType > 0">
					<span>快递公司：{{item.o_express_name}}</span>
					<span>快递编号: {{item.o_express_no}}</span>
				</div>
				
				<div class="row">
					<span class="price flex_one">合计：￥{{item.o_money}}</span>
					<span class="send_goods_btn" v-if="curType == 1" @click="confirmReceipt(index)">确认收货</span>
					<!-- <span class="send_goods_btn" v-if="(curType == 2) && (m_role == 2)" @click="showSetSell(index)">销售记录</span> -->
					<span v-if="curType == 0">状态：{{typeList[curType]}}</span>
				</div>
			</div>
		</div>
		
		<div v-if="list.length == 0" class="uni-center-item no_data_wrap">
			<span>暂无订单信息</span>
		</div>
		
		<view class="uni-tab-bar-loading" v-if="list.length != 0">
			<uni-load-more :loadingType="loadingType" :contentText="loadingText"  ></uni-load-more>
		</view>
		
		<uni-popup :show="type === 'middle'" position="middle" mode="fixed"  @hidePopup="hidePop">
			<div class="company-modal">
				<div class="modal-title">设置收货记录</div>
				<div class="content_wrap">
					<div class="company-code">
						<span>产品编号</span>
						<input type="text" maxlength="5" v-model="o_number" placeholder="请输入产品编号"  />
					</div>
				</div>
				
				<button size="mini" @tap="addOrder()">提交</button>
			</div>
		</uni-popup>
		
		
		
	</view>
</template>

<script>
	import { BASE_IMAGE_URL,getOrder,addOrder,confirmReceipt } from '@/utils/api'
	import uniPopup from '@/components/uni-popup.vue'
	import uniLoadMore from '@/components/uni-load-more.vue';
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
				loadingType: 0,
				page: 1,
				typeList: ['待发货', '待收货', '已完成'],
				curType: 0,
				type:'',
				o_name: '',
				o_phone: '',
				activeIndex: 0,
				o_num: '',
				m_role: 0
			}
		},
		methods: {
			changeType(index){
				this.curType = index;
				this.page = 1;
				this.list = [];
				this.getList();
			},
			showSetSell(index){
				this.type = 'middle';
				this.o_name = "";
				this.o_phone = "";
				this.activeIndex = index;
			},
			async getList(){
				let res = await getOrder(this.curType, this.page);
				uni.stopPullDownRefresh();
				if(res.code == 1000){
					if(this.page == 1){
						this.list = res.data;
					}else{
						this.list = this.list.concat(res.data);
					}
					
					if(res.data.length < 10){
						this.loadingType = 2;
					}else{
						this.loadingType = 0;
					}
				}
			},
			
			async confirmReceipt(index){
				let item = this.list[index];
				let flag = false;
				item.good_list.map((ite) => {
					if(parseInt(ite.go_is_kucun) == 0){
						flag = true;
					}
				});
				
				if(flag){
					uni.setStorageSync("item", item);
					uni.navigateTo({
						url: '/pages/kucun_record/kucun_record'
					});
				}else{
					let params = {
						o_id: this.list[index].o_id
					};
					
					let res = await confirmReceipt(params);
					if(res.code == 1000){
						uni.showToast({
							icon: 'none',
							duration: 1000,
							title: "操作成功"
						});
						this.getList();
					}
				}
				
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
			this.list = [];
			this.getList();
		},
		onLoad(options){
			this.curType = options.index;
			if(!this.curType){
				this.curType = 0;
			}
			let typeIndex = options.typeIndex;
			if(typeIndex == 3){
				uni.setNavigationBarTitle({
					title:"入货订单"
				})
			}else if(typeIndex == 4){
				uni.setNavigationBarTitle({
					title:"出货订单"
				})
			}
			this.m_role = uni.getStorageSync("userInfo").m_role;
			
		
		},
		onShow() {
			this.getList();
		}
		
	}
</script>

<style>
.head_wrap{width: 100%; display: flex; flex-direction: row;position: fixed;top: 0upx; left: 0upx;background-color: #FFF;border-bottom: 2upx solid #E3E3E3; height: 100upx;}
.head_item{flex: 1; padding: 0upx 24upx;}
.head_item span{height: 100upx; line-height: 100upx;}
.active_type{color: #f00;border-bottom: 2upx solid #f00;}

.list_wrap{padding-top: 102upx; width: 100%;background-color: #EFEFF4; box-sizing: border-box;}
.list_item{border-bottom: 1upx solid #E3E3E3;width: 100%; margin-bottom: 20upx;background-color: #FFF;padding: 32upx 24upx;box-sizing: border-box;font-size: 28upx;}
.list_item .item_head{overflow: hidden;text-overflow: ellipsis;white-space: nowrap;margin-bottom: 12upx;font-size: 24upx;}

.list_item .item_info{padding: 32upx 0upx; border-bottom: 1upx solid #E3E3E3;background: #fff;}
.list_item .item_info .name{margin-bottom: 20upx; overflow: hidden;text-overflow: ellipsis;word-break: break-all;line-clamp: 2;}
.list_item .item_info img{width: 156upx; height: 156upx; margin-right: 20upx;}
.list_item .item_info .tag{color: #888; font-size: 24upx;}
.list_item .item_content{height: 156upx; box-sizing:border-box;}
.list_item .item_tag{display: flex; flex-direction: column;}
.price{color: #ff4544;}
.list_item .item_info .num{color: #888; font-size: 24upx;}

.send_goods_btn{padding: 5upx 20upx; color: #fff; border: 1upx solid #E3E3E3; background: #107EFF;border-radius: 10upx;}

.quick_icon{position: fixed;right: 50upx; bottom: 140upx; z-index: 20;width: 100upx; height: 100upx; border-radius: 50%; background-color: rgba(0,0,0,0.7); color: #FFF; font-size: 24upx;}


.company-modal{width:600upx;text-align:center;}
.company-modal .content_wrap{margin: 20upx 0upx;}
.company-code{padding:10upx 0 10upx 0;display: flex; flex-direction: row; align-items: center;border:1px solid #eee;}
.company-code span{display: inline-block; min-width: 200upx;}
.company-code input{border:none;text-align:left;padding:10upx; flex: 1;}


.express_wrap{font-size: 30upx; padding-bottom: 20upx; border-bottom: 1upx solid #E3E3E3; margin-bottom: 20upx;}

</style>
