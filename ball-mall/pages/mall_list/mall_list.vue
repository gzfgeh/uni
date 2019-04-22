<template>
	<view style="width: 100%;">
		
		<div v-for="(item,index) in listData" :key="index" >
			<view  class="row item_wrap">
				
				<img :src="item.g_img">
				
				<div class="item_content_wrap">
					<div class="item_title">{{item.g_name}}</div>
					<div class="sub_title" v-if="item.g_miaoshu">{{item.g_miaoshu}}</div>
					<span class="item_tag" v-if="item.g_tag">{{item.g_tag}}</span>
					<div class="bottom_wrap">
						<span class="price">￥{{item.g_price}}</span>
						<!-- <span class="old_price">￥38</span> -->
						<span class="num">{{item.g_danwei}}</span>
					</div>
				</div>
				
				<div class="item_right_wrap">
					<span>{{item.g_sheng}}{{item.g_shi}}{{item.g_qu}}</span>
					<!-- <uni-number-box @change="onNumberChange" :min="0"></uni-number-box> -->
					<span @click="goDetail(item)" v-if="m_is_gys==1">编辑</span>
					<img src="../../static/img/add_card.png" @click="jiaruCart(item)">
				</div>
				
			</view>
			
		</div>
		
		<div v-if="listData.length == 0" class="uni-center-item no_data_wrap">
			<img src="../../static/img/no_data.png" class="no_data">
			<span>暂无商品信息</span>
		</div>
		
		<view class="uni-tab-bar-loading" v-if="listData.length != 0">
			<uni-load-more :loadingType="loadingType" :contentText="loadingText"  ></uni-load-more>
		</view>
		
		<div class="gou_wu_che" @click="goToShopping" v-if="listData.length != 0">
			<img src="../../static/img/shopping_card_icon.jpg" >
			<span>{{goods_num}}</span>
		</div>
		
		
	</view>
</template>
<script>
	import uniLoadMore from '@/components/uni-load-more.vue';
	import { BASE_IMAGE_URL,goodsList, jiaruCart, getCart} from "@/utils/api";
	
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
				goods_num: 0,
				scrollLeft: 0,
				isClickChange: false,
				page: 1,
				listData: [1,2,3,4,5,6],
				loadingType: 0,
				typeList:['新鲜蔬菜','肉禽产品','米面粮油','海鲜水产','蛋品豆类','调料干货'],
				ids: [],
				index: 0,
				m_is_gys: 0,
				list: []
			}
		},
		onLoad: function(e){
			console.log(e);
			this.index = e?e.id:0;
			
			this.goodsList();
			this.getCart();
			
			this.m_is_gys = uni.getStorageSync("m_is_gys");
			console.log(this.m_is_gys);
			if(this.m_is_gys && (this.m_is_gys.length>0)){
				this.m_is_gys = parseInt(this.m_is_gys);
			}else{
				this.m_is_gys = 0;
			}
			console.log(this.m_is_gys);
			
		},
		onShow: function(e) {
			// this.listData = this.randomfn()
			
			
			
			let editItem = uni.getStorageSync("editItem");
			if(editItem){
				this.listData.map(data => {
					if(data.g_id == editItem.g_id){
						data.g_price = editItem.g_price;
					}
				})
			}
		},
		onReachBottom() {
			this.loadMore();
		},
		onPullDownRefresh() {
			console.log("dddddd");
			
			this.page = 1;
			this.listData = [];
			this.goodsList();
		},
		methods: {
			async getCart(){
				
				
				let res = await getCart(uni.getStorageSync("openid"));
				if(res.code == 1000){
					console.log(res.data.length)
					
					this.list = [];
					let address = uni.getStorageSync("address").split("|");
					res.data.map((item) => {
						if(item.g_shi && item.g_qu){
							if( (item.g_shi.substring(0, 2) == address[1].substring(0, 2)) && (item.g_qu.substring(0, 2) == address[2].substring(0,2)) ){
								this.list.push(item);
							}
						}
						
					})
					
					this.goods_num = this.list.length;
				}else{
// 					uni.showModal({
// 						title: '提示',
// 						content: JSON.stringify(res),
// 						success: function (res) {
// 							if (res.confirm) {
// 								
// 							} else if (res.cancel) {
// 								console.log('用户点击取消');
// 							}
// 						}
// 					});
// 					return;
				}
			},
			async jiaruCart(item){
				let bindPhone = uni.getStorageSync("bindPhone");
				console.log('bindPhone');
				console.log(bindPhone);
				if(!bindPhone){
					uni.navigateTo({
						url: '../bind_phone/bind_phone'
					})
					return;
				}
				
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
					this.ids.map(ite => {
						if(ite == item.g_id){
							return;
						}
					})
					this.ids.push(item.g_id);
					this.getCart();
					// this.goods_num ++;
				}else{
					uni.showToast({
					  icon: 'none',
					  title: '加入购物车失败',
					  duration: 1000
					});
				}
			},
			async goodsList(){
				let address = uni.getStorageSync("address").split('|');
				// address = "湖南省|长沙市|芙蓉区".split('|');
				
				let res = await goodsList(this.page, this.typeList[this.index], address[0], address[1], address[2]);
				if(res.code == 1000){
					if(this.page == 1){
						uni.stopPullDownRefresh();
						this.listData = res.data;
					}else{
						this.listData = this.listData.concat(res.data);
						
					}
					
					if(res.data.length < 10){
						//没有了
						this.loadingType = 2;
						
					}else{
						// 还有
						this.loadingType = 1;
						
					}
					
				}
				console.log(res);
			},
			goToShopping: function(){
				let phoneNum = uni.getStorageSync("bindPhone");
				if(phoneNum){
					uni.navigateTo({
						url: '../shopping_card/shopping_card'
					})
				}else{
					uni.navigateTo({
						url: '../bind_phone/bind_phone'
					})
				}
				
				
			},
			goDetail(item) {
				let phoneNum = uni.getStorageSync("bindPhone");
				if(phoneNum){
					uni.navigateTo({
						url: '../list_detail/list_detail?id='+item.g_id
					})
				}else{
					uni.navigateTo({
						url: '../bind_phone/bind_phone'
					})
				}
				
				
			},
			loadMore() {
				this.loadingType = 1;
				this.page++;
				this.goodsList();
			}
		}
	}
</script>

<style lang="less" scoped>
	@color: #35B583;
	@gray_color: #ADADAD;
	
	/* #ifdef MP-ALIPAY */
	.swiper-tab-list {
		display: inline-block;
	}
	/* #endif */
	
	uni-page-body{
		height: 100%;
		background-color: #F6F6F8!important;
	}
	
	.tab_bar{
		height: 100upx;
		line-height: 100upx;
		background-color: #ffffff;
		position: relative;
		font-size: 28upx;
		color: rgba(0,0,0,0.4)
	}
	
	.tab_text{
		color: @color;
	}
	
	.swiper-tab-list{
		position: relative;
		color: rgba(0,0,0,0.4)
	}
	
	.line{
		height: 6upx;
		width: 100%;
		position: absolute;
		bottom: -24upx;
		z-index: 1;
		background-color: @color;
		left: 0upx;
	}
	
	.item_wrap{
		box-sizing: border-box;
		margin: 30upx;
		padding: 20upx;
		border-radius: 12upx;
		box-shadow:0px 0px 14upx 0px rgba(222,222,222,0.5);
		background-color: #FFFFFF;
		color: #9F9F9F;
		font-size: 26upx;
		
		height: 260upx;
	}
	
	.item_content_wrap{
		flex: 1;
		margin-left: 20upx;
		position: relative;
	}
	
	.item_title{
		color: #464646;
		font-size: 34upx;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.sub_title{
		color: @gray_color;
		font-size: 24upx;
		margin: 6upx 0upx;
	}
	
	.item_tag{
		border: 1px solid @color;
		color: @color;
		padding: 0upx 4upx;
		border-radius: 10upx;
		font-size: 24upx;
	}
	
	.bottom_wrap{
		color: @gray_color;
		font-size: 24upx;
		position: absolute;
		left: 0upx;
		bottom: 0upx;
		.price{
			color: red;
			font-size: 28upx;
			margin-right: 20upx;
		}
		.old_price{
			margin: 0upx 20upx;
			text-decoration:line-through;
		}
	}
	
	.bottom_action{
		padding: 8upx 24upx;
		background-color: #E9F3FB;
		border-radius: 26upx;
	}
	
	.item_wrap img{
		width: 200upx;
		height: 200upx;
	}
	
	.item_right_wrap{
		color: @color;
		font-size: 24upx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-end;
		img{
			width: 50upx;
			height: 50upx;
			border-radius: 50%;
		}
	}
	
	.gou_wu_che{
		position: fixed;
		bottom: 100upx;
		right: 60upx;
		height: 90upx;
		width: 90upx;
		img{
			width: 90upx;
			height: 90upx;
		}
		span{
			border-radius: 50%;
			font-size: 24upx;
			color: #FFFFFF;
			background-color: @color;
			position: absolute;
			top: 0upx;
			right: 0upx;
			display: inline-block;
			height: 30upx;
			width: 30upx;
			text-align: center;
			line-height: 30upx;
		}
		
	}
	
	.ball-container{
      .ball{
        position:fixed;
        left: 64upx;
        bottom: 44upx;
        z-index:200;
        transition: all .6s cubic-bezier(0.49, -0.29, 0.75, 0.41);
        .inner{
          width:32upx;
          height:32upx;
          border-radius:50%;
          background: rgb(0,160,220);
          transition: all .6s linear;
		  }
		}
	}
	
	.item_content_wrap{
		.item_tag,
		.sub_title{
			max-width: 200upx;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
	}
</style>
