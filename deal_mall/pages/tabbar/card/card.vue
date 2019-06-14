<template>
	<view class="content">
		<div style="padding-bottom: 100upx;">
			<block v-for="(item,index) in list" :key="index" >
				<div class="row item_content">
					<radio :checked="item.checked" @click="changeChecked(item)" ></radio>
					<div class="flex_one row item_wrap">
						<image :src="item.g_img" mode="aspectFill"></image>
						<div class="content_wrap">
							<div class="flex_one col">
								<span class="goods_name">{{item.g_name}}</span>
								<!-- <div class="attr-list" v-for="(ite,ind) in item.attrs" :key="ind">
									<span class="attr-item"> 规格:默认 </span>
								</div> -->
								<span class="attr-list">{{item.g_miaoshu}}</span>
							</div>
							<div class="row item_bottom">
								<span class="price">￥{{item.g_price}}</span>
								<div class="actionWrap" >
								  <span class="actionClass" @click="reduceAction(index)">-</span>
								  <input type="number" class="item_num" v-model="item.ct_count" 
										maxlength="4" @blur="inputChange">
								  <span class="actionClass" @click="addAction(index)">+</span>
							  </div>
				  
								<!-- <uni-number-box :min="1" :max="1000" :step="1" v-on:change="onNumberChange" :value="numberValue"></uni-number-box> -->
							</div>
						</div>
					</div>
				</div>
			</block>
		
		</div>
		
		<div class="all_wrap">
			<div class="row_wrap row">
				<label class="radio">
					<radio @click="allStatusChange" :checked="allStatus" />全选
				</label>
				<span class="money">总计:￥{{allPrice}}</span>
			</div>
			<span class="edit_btn" @click="editAction">{{isEditStatus?'完成':'编辑'}}</span>
			<span class="buy_btn" @click="deleteCart">{{isEditStatus?'删除':'下单'}}</span>
		</div>
		
		<div v-if="list.length == 0" class="no_data_wrap">
			<div class="img_wrap">
				<img src="https://bay.2donghua.com/web/statics/wxapp/images/nav-icon-cart.png" mode="widthFix">
			</div>
			<span>购物车还是空的哦</span>
		</div>
		
		
	</view>
</template> 

<script>
	import { BASE_IMAGE_URL,getCart,saveCart,deleteCart } from '@/utils/api'
	
	import uniNumberBox from '../../../components/uni-number-box.vue'
	export default {
		components: {
			uniNumberBox
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
				allPrice: 0,
				allNum: 0,
				indexList: [],
				allStatus: false,
				isEditStatus: false
			};
		},
		onShow(){
			let userInfo = uni.getStorageSync("userInfo");
			if(!userInfo){
				uni.navigateTo({
					url: '/pages/login/login'
				});
				return;
			}else{
				if(userInfo.m_role == 0){
					//游客
					uni.showModal({
						title: "提示",
						content: "无权浏览，如需使用请联系客服开通权限",
						showCancel: false,
						success(res) {
							if(res.confirm){
								uni.switchTab({
									url: '../home/home'
								})
							}
						}
					})
				}else if(userInfo.m_role == 1){
					//区域经销商
					this.getCart();
				}else if(userInfo.m_role == 2){
					//分销商
					this.getCart();
				}
				
			}
		},
		methods: {
			editAction(){
				if(this.isEditStatus){
					this.isEditStatus = !this.isEditStatus;
					this.allStatus = true;
					this.allStatusChange();
				}else{
					this.isEditStatus = !this.isEditStatus;
					this.allStatus = true;
					this.allStatusChange();
				}
			},
			async deleteCart(){
				if(!this.isEditStatus){
					let p = [];
					this.list.map(function(item, index){
						if(item.checked){
						  p.push(item);
						}
					 });
					 
					 if(p.length == 0){
						 uni.showToast({
							icon: 'none',
							duration: 1000,
							title: "请选择商品"
						});
						 return;
					 }
					
					uni.setStorageSync("itemList", p);
					uni.navigateTo({
						url: '/pages/post_order/post_order'
					});
						  
					return;
				}
				let ids = "";
				let that = this;
			  this.list.map(function(item, index){
				if(item.checked){
				  ids = that.list[index].ct_id+",";
				}
			  });
			  
			  let params = {
				ct_id: ids.substring(0, ids.length-1),
			  };
			  let result = await deleteCart(params);
			  if(result.code == 1000){
				wx.showToast({
					title: '删除成功',
					icon: 'none',
					duration: 1000
				});
				this.getCart();
			  }
			},
			inputChange(e){
				this.calcStatus();
			},
			changeChecked: function(item){
			  console.log(item);
			  item.checked = !item.checked;
			  this.calcStatus();
			},
			calcStatus: function(){
			  let that = this;
			  this.allNum = 0;
			  this.allPrice = 0;
			  this.indexList = [];
			  this.list.map(function(item, index){
				if(item.checked){
				  that.allNum++;
				  that.allPrice = parseFloat(parseFloat(that.allPrice) + parseFloat(item.g_price*item.ct_count)).toFixed(2);
				  that.indexList.push(index);
				}
				if(that.allNum == that.list.length){
				  that.allStatus = true;
				}else{
				  that.allStatus = false;
				}
			  });
			},
			
			allStatusChange: function(){
			  let that = this;
			  this.allStatus = !this.allStatus;
			  this.allPrice = 0;
			  this.allNum = this.list.length;
			  this.list.map(function(item, index){
				if(that.allStatus){
				  item.checked = true;
				  that.allPrice = parseFloat(parseFloat(that.allPrice) + parseFloat(item.g_price*item.ct_count)).toFixed(2) ;
				  that.indexList.push(index);
				}else{
				  item.checked = false;
				  that.indexList = [];
				  that.allPrice = 0;
				}
				
			  });

			},
			reduceAction: function(index){
			  this.addCart(index, 1);
			},
			addAction: function(index){
			  this.addCart(index, 0);
			},
			async addCart(index, type){
				if(type == 0){
					this.list[index].ct_count++;
				}else{
					if(this.list[index].ct_count != 1){
					  this.list[index].ct_count --;
					}
				};
				let params = {
					ct_openid: wx.getStorageSync("openid"),
					ct_g_id: this.list[index].ct_g_id,
					ct_count: this.list[index].ct_count,
					ct_id: this.list[index].ct_id
				};
				let result = await saveCart(params);
				if(result.code == 1000){
					this.calcStatus();
				}else{
					wx.showToast({
						title: '操作失败',
						icon: 'none',
						duration: 1000
					})
				}
			},
			
			async getCart(){
			  this.allPrice = 0;
			  this.allNum = 0;
			  this.allStatus = false;
			  let result = await getCart(uni.getStorageSync("openid"));
			  if(result.code == 1000){
				this.list = result.data;
				this.list.map(function(item){
				  item.checked = false;
				});
			  }else{
				uni.showToast({
					title: result.msg,
					icon: 'none',
					duration: 1000
				})
			  }
			},
	
	
		}
	};

</script>

<style>
page{height: 100%; background-color: #F3F3F3;}	
.no_data_wrap{display: flex; flex-direction: column;align-items: center;justify-content: center;width: 100%;color: #888;}
.img_wrap{width: 160upx; height: 160upx; display: flex;flex-direction: row; justify-content: center;align-items: center;border-radius: 50%;background-color: rgba(0,0,0,0.1);margin-bottom: 32upx;}
.no_data_wrap img{width: 68upx;}

.all_wrap{display: flex; flex-direction: row; width: 100%; justify-content: center;align-items: center; height: 100upx;
	position: fixed;bottom: 0upx;left: 0upx;border-top: 1rpx solid #E3E3E3; z-index: 10; font-size: 32upx;}
.row_wrap{flex: 1; padding-left: 20upx;background: #FFFFFF;height: 100%;}
.row_wrap .money{margin-left: 10upx; color: #FF4544;}
.edit_btn{background: #3c8ee5; color: #fff; width: 160upx; text-align: center;height: 100upx;line-height: 100upx;}
.buy_btn{background: #ff4544; color: #fff; width: 160upx; text-align: center;height: 100upx;line-height: 100upx;}


.item_content{background: #fff; padding: 32upx 24upx 16upx 0upx; border-bottom: 1upx solid #E3E3E3;}
.item_content radio{height: 100%; padding: 0upx 0upx 0upx 20upx;}
.item_wrap{}
.item_wrap image{width: 156upx; height: 156upx; margin-right: 20upx;}
.content_wrap{display: flex; flex-direction: column;}
.attr-list{font-size: 24upx; color: #888;}
.attr-item{display: inline-block;}
.item_bottom{width: 100%;}
.item_bottom .price{flex: 1; color:#ff4544}
.radio{display: flex; flex-direction: row; align-items: center;}

.actionWrap{display: flex;flex-direction: row;justify-content: space-around;align-items: center;padding: 10upx 0upx;min-width: 200upx;}
.actionClass{background: #ffffff;display: inline-block;height: 40upx;line-height: 40upx;text-align: center;width: 60upx;color: #000000;border: 1upx solid #dddddd;}
.item_num{display: inline-block;color: #000;width: 60upx;text-align: center;font-size: 24upx;}
</style>
