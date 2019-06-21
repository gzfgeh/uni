<template>
	<view>
		<div class="list_wrap">
			<navigator v-for="(item, index) in list" :key="index" class="list_item" >
				<image :src="item.g_img" mode="aspectFill"></image>
				<div class="item_info">
					<span class="item_info_text">{{item.g_name}}</span>
					
					<div class="row_between" style="margin: 20upx 0upx;">
						<span class="price">￥{{item.g_price}}</span>
						<span class="sell_num">库存{{item.k_kucun}}件</span>
					</div>
					
					<div class="row_between" style="margin-bottom: 10upx;">
						<span class="yu_jing">预警数: {{item.k_yj_value}}</span>
						<span class="yu_jing_btn" @click.stop="setYuJing(index)">设置预警</span>
					</div>
					
					<div class="row_between" style="margin-bottom: 10upx; margin-top: 20upx;">
						<span class="yu_jing"></span>
						<span class="yu_jing_btn" @click.stop="setSellValue(index)" v-if="m_role == 2">销售记录</span>
					</div>
				</div>
				
			</navigator>
		</div>
		
		<div v-if="list.length == 0" class="uni-center-item no_data_wrap">
			<span>暂无数据</span>
		</div>
		
		<view class="uni-tab-bar-loading" v-if="list.length != 0">
			<uni-load-more :loadingType="loadingType" :contentText="loadingText"  ></uni-load-more>
		</view>
		
		<!-- <div class="quick_icon col_center">
			<span>快捷</span>
			<span>导航</span>
		</div> -->
		
		<uni-popup :show="type === 'middle'" position="middle" mode="fixed"  @hidePopup="hidePop">
			<div class="company-modal">
				<div class="modal-title">设置预警数</div>
				<div class="company-code">
					<input type="number" maxlength="5" v-model="companyCode" placeholder="输入预警数"  />
				</div>
				<button type="primary" @tap="bindCompanyCode()">提交</button>
			</div>
		</uni-popup>
		
		<uni-popup :show="sellType === 'middle'" position="middle" mode="fixed"  @hidePopup="hideSellPop">
			<div class="company-modal1">
				<div class="modal-title">设置销售记录</div>
				<div class="content_wrap">
					<div class="company-code1">
						<span>姓名</span>
						<input type="text" maxlength="5" v-model="o_name" placeholder="请输入姓名"  />
					</div>
					<div class="company-code1">
						<span>手机号</span>
						<input type="number" maxlength="11" v-model="o_phone" placeholder="请输入手机号"  />
					</div>
					<div class="company-code1">
						<span>数量</span>
						<input type="number" maxlength="5" v-model="o_num" placeholder="请输入数量"  />
					</div>
				</div>
				
				<!-- <button type="primary">提交</button> -->
				<form @submit="formSubmit" :report-submit="reportForm">
					<view class="btn-area">
						<button form-type="submit" class="bottom_wrap formid">提交</button>
					</view>
				</form>
			</div>
		</uni-popup>
		
	</view>
</template>

<script>
	import { BASE_IMAGE_URL,getKucun,setKucunYujing,addSaleOrder } from '@/utils/api'
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
				typeList: ['综合', '最新', '价格', '库存'],
				curType: 0,
				g_type: 0,
				type:'',
				companyCode: '',
				o_name: '',
				o_phone: '',
				o_num: '',
				sellType: '',
				m_role: 0
			}
		},
		methods: {
			formSubmit: function(e) {
				console.log('form发生了submit事件，携带数据为：', e.detail.formId);
				this.addSaleOrder(e.detail.formId);
			 },
			hidePop(){
				this.type="";
			},
			hideSellPop(){
				this.sellType = "";
			},
			setSellValue(index){
				this.sellType = "middle";
				this.o_name = "";
				this.o_phone = "";
				this.o_num = "";
				this.curType = index;
			},
			async addSaleOrder(formid){
				if(!this.o_name){
					uni.showToast({
						icon: 'none',
						duration: 1000,
						title: "请输入姓名"
					});
					return;
				};
				
				if(!this.o_phone){
					uni.showToast({
						icon: 'none',
						duration: 1000,
						title: "请输入手机号"
					});
					return;
				};
				
				if(!this.o_num || (this.o_num == 0)){
					uni.showToast({
						icon: 'none',
						duration: 1000,
						title: "请输入正确的数值"
					});
					return;
				};
				
				let params = {
					o_name: this.o_name,
					o_phone: this.o_phone,
					go_g_id: this.list[this.curType].g_id,
					go_count: this.o_num,
					go_g_price: this.list[this.curType].g_price,
					go_g_name: this.list[this.curType].g_name,
					go_g_img: this.list[this.curType].g_img,
					o_openid: uni.getStorageSync("openid"),
					go_t_is_no: this.list[this.curType].go_t_is_no,
					formid: formid
				};
				let res = await addSaleOrder(params);
				if(res.code == 1000){
					this.sellType = "";
					this.getList();
				}else{
					uni.showToast({
						icon: 'none',
						duration: 1000,
						title: res.msg
					});
				}
			},
			async bindCompanyCode(){
				if(!this.companyCode || (this.companyCode == 0)){
					uni.showToast({
						icon: 'none',
						duration: 1000,
						title: "请输入正确的数值"
					});
					return;
				};
				let params = {
					k_g_id: this.list[this.curType].g_id,
					k_m_id: uni.getStorageSync("userInfo").m_id,
					k_yj_value: this.companyCode
				};
				
				let res = await setKucunYujing(params);
				if(res.code == 1000){
					uni.showToast({
					  icon: 'none',
					  title: '设置成功',
					  duration: 1000
					});
					this.getList();
				}
				this.type="";
				
			},
			setYuJing(index){
				console.log(index);
				this.curType = index;
				this.type = 'middle';
			},
			async getList(){
				let res = await getKucun(this.page);
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
			goToDetail(index){
				uni.navigateTo({
					url: '/pages/goods_detail/goods_detail?g_id='+this.list[index].g_id
				});
			},
			async jiaruCart(item){
				let params = {
					ct_openid: uni.getStorageSync("openid"),
					ct_g_id: item.g_id,
				};
				let res = await jiaruCart(params);
				if(res.code == 1000){
					uni.showToast({
					  icon: 'none',
					  title: '添加成功',
					  duration: 1000
					});
				}else{
					uni.showToast({
					  icon: 'none',
					  title: '加入购物车失败',
					  duration: 1000
					});
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
			this.list = [];
			this.getList();
		},
		onLoad(options){
			this.g_type = options.g_type;
			this.m_role = uni.getStorageSync("userInfo").m_role;
			this.getList();
		}
		
	}
</script>

<style>
	
.bottom_wrap{position: absolute;bottom: 0upx;left:0upx; width: 100%; height: 100upx;line-height: 100upx;text-align: center;color: #FFF; background: #FF4544; font-size: 34upx;border-radius: 0upx;}

.head_wrap{width: 100%; display: flex; flex-direction: row;position: fixed;top: 0upx; left: 0upx;background-color: #FFF;border-top: 2upx solid #E3E3E3; height: 100upx;}
.head_item{flex: 1;}
.active_type{color: #FF4544;}

.list_wrap{display: flex; flex-direction: row; flex-flow: wrap;width: 100%;background-color: #ffffff;}
.list_item{display: flex; flex-direction: column;width: 49%; margin: 5upx 0.5%;background-color: #FFFFFF;}
.list_item .item_info{padding: 4upx 22upx; font-size: 28upx;}
.list_item .item_info .item_info_text{font-size: 34upx; overflow: hidden;text-overflow: ellipsis;word-break: break-all;line-clamp: 2;}
.list_item image{width: 100%; height: 365upx;}
.list_item .item_info .price{color: #ff334b;}
.list_item .item_info .sell_num{color: #999;}

.yu_jing{font-size: 24upx;}
.yu_jing_btn{border-radius: 20upx; color: #FFF; background-color: #107EFF; font-size: 24upx; padding: 6upx 20upx;}


.company-modal{width:500upx;text-align:center;}
.company-code{padding:10upx 0 30upx 0;}
.company-code input{border:1px solid #eee;text-align:left;padding:20upx;}
	
.company-modal1{width:600upx;text-align:center;}
.company-modal1 .content_wrap{margin: 20upx 0upx;}
.company-code1{padding:10upx 0 10upx 0;display: flex; flex-direction: row; align-items: center;border:1px solid #eee;}
.company-code1 span{display: inline-block; min-width: 200upx;}
.company-code1 input{border:none;text-align:left;padding:10upx; flex: 1;}
	
.quick_icon{position: fixed;right: 50upx; bottom: 140upx; z-index: 20;width: 100upx; height: 100upx; border-radius: 50%; background-color: rgba(0,0,0,0.7); color: #FFF; font-size: 24upx;}
</style>
