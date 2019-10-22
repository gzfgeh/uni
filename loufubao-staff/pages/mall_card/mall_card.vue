<template>
	<view>
		<block  v-for="(item,index) in list" :key="index" >
			<div @click="goToDetail(index)" class="row" style="padding-left: 20upx;">
				<radio  :checked="item.checked" />
				<div class="item_wrap" >
					<div class="item">
						<img  :src="item.goods_list_img" mode="aspectFill" class="goods_item" @click.stop="goToGoodsDetail(item)">
						<div class="content_item">
							<span>{{item.name}}  {{item.spec_name}}</span>
							<div class="row_between">
								<span class="price">￥{{item.price}}</span>
								<div class="row_between action_wrap">
									  <img src="../../static/img/reduce_icon.png" class="actionClass" :class="{'un_active': (item.count == 1)}" @click.stop="reduceAction(index)" />
									  <!-- <input type="number" class="item_num" v-model="item.count" 
											maxlength="4" @blur="inputChange"> -->
										<span style="width: 80upx; text-align: center;">{{item.count}}</span>
									  <img src="../../static/img/add_icon.png" class="actionClass" :class="{'un_active': (true)}" @click.stop="addAction(index)" />
								</div>
							</div>
						</div>
					</div>
					<div class="coupon_item" v-if="item.coupon">
						<span>优惠券 <span class="price">￥{{item.coupon.price}}</span> </span>
						
					</div>
				</div>
				
			</div>
		</block>
		
		<div v-if="list.length == 0" class="no_data_wrap">
			<div class="img_wrap">
				<img src="../../static/img/cart_empty.jpg" mode="widthFix">
			</div>
			<span>购物车还是空的哦</span>
		</div>
		
		<div class="button row_between"  >
			<radio  :checked="allStatus" @click="allStatusChange"/>
			<span class="text" @click="allStatusChange">全选</span>
			<span>总计：</span>
			<span class="price">¥{{allPrice}} </span>
			<button @click="goToPost">结算({{allNum}})</button>
		</div>
			
	
		
	</view>
	
	
	
</template>

<script>
	import { BASE_IMAGE_URL,shopcart_list,shopcart,shopcartDel,couponList } from '@/utils/api'
	
	
	export default {
		data() {
			return {
				list: [],
				companyCode:"",
				loadingType: 0,
				page: 1,
				popupParam:'',
				orderSN:'',
				orderID:'',
				allPrice:'0',
				allNum: 0,
				allStatus: false,
				indexList: [],
				curType: 0,
				shopcartIDs: []
			}
		},
		methods: {
			payPopup(popupParam) {
				this.popupParam=popupParam;
			},
			async couponList(){
				let params = {
					userID: uni.getStorageSync("userInfo").userID,
					shopcartID: this.shopcartIDs
				};
				let res = await couponList(params);
				if(res.status == 1){
					this.list.map((item, index) => {
						let i=0;
						for(i =0; i<index; i++){
							if(this.list[i].goods_id == item.goods_id){
								item.coupon = null;
								break;
							}
						}
						if(i== index){
							item.coupon = res.data[index].coupon
						}
						
					})
					this.$forceUpdate();
				}
			},
			async shopcartDel(){
				if(this.indexList.length == 0){
					wx.showToast({
						title: '没有选择商品',
						icon: 'none',
						duration: 1000
					})
					return;
				};
				let listID = [];
				let that = this;
				this.indexList.map(function(item){
					listID.push(that.list[parseInt(item)].id);
				  })
				let params = {
					user_id: uni.getStorageSync("userInfo").userID,
					shopcartID: listID
				};
				let res = await shopcartDel(params);
				if(res.status == 1){
					wx.showToast({
						title: '删除成功',
						icon: 'none',
						duration: 1000
					});
					this.getList();
				}else{
					wx.showToast({
						title: res.message,
						icon: 'none',
						duration: 1000
					})
				}
			},
			goToPost(){
				if(this.allPrice == 0){
					wx.showToast({
						title: '没有选择商品',
						icon: 'none',
						duration: 1000
					})
					return;
				}
				 let that = this;
				 let selectItems = [];
				let coupon_shopcart_id = [];
				let shopcartID = [];
				 this.indexList.map(function(item){
					let p = {
						goods_id: that.list[parseInt(item)].goods_id,
						store_id: that.list[parseInt(item)].store_id,
						count: that.list[parseInt(item)].count,
						spce_price: that.list[parseInt(item)].price,
						spec_name: that.list[parseInt(item)].spec_name
					};
					
					shopcartID.push(that.list[parseInt(item)].id);
					if(that.list[parseInt(item)].coupon){
						coupon_shopcart_id.push(that.list[parseInt(item)].id);
					}
					selectItems.push(that.list[parseInt(item)]);
				  })
				  
				  let params = {
					  user_id: uni.getStorageSync("userInfo").userID,
					  shopcartID: shopcartID,
					  coupon_shopcart_id: coupon_shopcart_id,
					  addressID: ''
				  };
				  uni.setStorageSync('params', params);
				  uni.setStorageSync('selectItems', selectItems);
				  
					uni.navigateTo({
						url: '../mall_post/mall_post'
					})
			},
			async getList(){
				let userInfo = uni.getStorageSync("userInfo");
				
				let params = {
					user_id: userInfo.userID
				};
				let that = this;
				that.shopcartIDs = [];
				this.list = [];
				let res = await shopcart_list(params);
				if(res.status == 1){
					res.list.map( (ite) => {
						ite.goodsInfo.map((item, index) => {
							item.checked = false;
							that.shopcartIDs.push(item.id);
							this.list.push(item);
							console.log(item, index);
							if(index == 0){
								if(item.coupon && item.coupon.price){
									item.money =parseFloat(parseFloat(item.price)*parseFloat(item.count) - parseFloat(item.coupon.price)).toFixed(2); 
								}else{
									item.money =parseFloat(parseFloat(item.price)*parseFloat(item.count)).toFixed(2);
									item.coupon = null;
								}
							}else{
								let i=0;
								for(i=0; i<index; i++){
									if(item.goods_id == ite.goodsInfo[i].goods_id){
										item.money =parseFloat(parseFloat(item.price)*parseFloat(item.count)).toFixed(2);
										item.coupon = null;
									}
								};
								if(i == index && item.coupon && item.coupon.price){
									item.money =parseFloat(parseFloat(item.price)*parseFloat(item.count) - parseFloat(item.coupon.price)).toFixed(2); 
								}else{
									item.money =parseFloat(parseFloat(item.price)*parseFloat(item.count)).toFixed(2);
									item.coupon = null;
								}
							}
							this.allMoney += parseFloat(item.money);
						})
					})
					
					console.log(this.list);
					this.calcStatus();
					
				}
			},
			reduceAction: function(index){
			  this.addCart(index, 1);
			},
			addAction: function(index){
			  this.addCart(index, 0);
			},
			async addCart(index, type){
			  if(type == 0){
				this.list[index].count++;
			  }else{
				if(this.list[index].count != 1){
				  this.list[index].count --;
				}
			  };
					
			  let params = {
				user_id: wx.getStorageSync("userInfo").userID,
				goods_id: this.list[index].goods_id,
				store_id: this.list[index].store_id,
				spec: this.list[index].spec_name,
				count: this.list[index].count,
				price: this.list[index].price
			  };
			  let result = await shopcart(params);
			  if(result.status == 1){
				this.calcStatus();
			  }else{
					wx.showToast({
						title: result.message,
						icon: 'none',
						duration: 1000
					})
				}
			},
	
			goToDetail(index){
				this.list[index].checked = !this.list[index].checked;
				this.calcStatus();
			},
			goToGoodsDetail(item){
				console.log(JSON.stringify(item));
				uni.navigateTo({
					url: '/pages/mall_detail/mall_detail?goodsID='+item.goods_id
				})
			},
			calcStatus: function(){
			  let that = this;
			  this.allNum = 0;
			  this.allPrice = 0;
			  this.indexList = [];
			  this.allStatus = false;
			  console.log(this.list);
			  this.list.map(function(item, index){
				if(item.checked){
				  that.allNum++;
				  if(item.coupon && item.coupon.price){
					  that.allPrice = parseFloat(parseFloat(that.allPrice) + parseFloat(item.price*item.count) - parseFloat(item.coupon.price)).toFixed(2);
				  }else{
					  that.allPrice = parseFloat(parseFloat(that.allPrice) + parseFloat(item.price*item.count)).toFixed(2);
				  
				  }
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
				  if(item.coupon && item.coupon.price){
					  that.allPrice = parseFloat(parseFloat(that.allPrice) + parseFloat(item.price*item.count) - parseFloat(item.coupon.price)).toFixed(2) ;
				  }else{
					  that.allPrice = parseFloat(parseFloat(that.allPrice) + parseFloat(item.price*item.count)).toFixed(2) ;
				  }
				  that.indexList.push(index);
				}else{
				  item.checked = false;
				  that.indexList = [];
				  that.allPrice = 0;
				}
				
			  });

			},
	
	
		},
		onLoad() {
			this.getList();
		},
		onNavigationBarButtonTap (e) {
			if(this.indexList.length == 0){
					wx.showToast({
						title: '没有选择商品',
						icon: 'none',
						duration: 1000
					})
					return;
				};
			uni.showModal({
				title:"提示",
				content:"确认是否删除",
				success: (res) => {
					if(res.confirm){
						this.shopcartDel();
					}
				}
			})
        }
		
	}
</script>

<style>

.item_wrap{width: 100%;box-sizing: border-box;padding-left: 20upx; background: #FFFFFF;border-bottom: #E3E3E3 solid 2upx; padding-bottom: 10upx;}
.item{display: flex;flex-direction: row; padding-top: 35upx; padding-bottom: 10upx; font-size: 28upx; color: #666666;}
.goods_item{width: 140upx; height: 140upx;border-radius: 8upx; margin-right: 32upx;}
.item .content_item{display: flex; flex-direction: column; justify-content: space-between;flex: 1; padding-right: 30upx;}
.item .content_item .price{color: #FF6262; font-size: 30upx;}
.item .content_item img{width: 48upx; height: 48upx;}
.item .content_item input{width: 80upx; margin: 0upx 20upx; text-align: center;}

.item_wrap .coupon_item{padding-right: 20upx; font-size: 32upx; color: #666666; text-align: right;}
.item_wrap .coupon_item .price{color: #FF6262;}

.button{
  margin: 0upx 0%;
  width: 100%;
  height: 150upx;
	line-height: 150upx;
	background-color: #ffffff;
	padding:0upx 20upx;
	text-align: center;
	font-size: 28upx;
	position: fixed;
	bottom: 0upx;
	z-index: 10000;
	box-shadow:0px 6upx 54upx 0px rgba(221,221,221,0.41);
	box-sizing: border-box;
}

.button .text{margin: 0upx 10upx;}
.button .price{margin-right: 10upx; color: #FF5269; font-size: 32upx;}

.button button{
	margin: 40upx 10upx;
  flex:1;
  height: 94upx;
	line-height: 94upx;
	border-radius: 10upx;
	color: #ffffff;
	background-color: #427DFF;
}

</style>
