<template>
	
	<view class="contain" :class="{'body_active': (showModal)}">
		
		<view class="content" >
			<swiper :indicator-dots="false" :autoplay="true" @change="slideChange"
						:interval="5000" :duration="1000" class="head_img" :style="{'height': swipeHeight}">            
					<swiper-item v-for="(ite, index) in item.goods_imgs" :key="index" class="head_img" @tap="goToH5(index)">  
						<image :src="ite.img" mode="widthFix" class="head_img"  @load="imageLoad"/>           
					</swiper-item>        
			</swiper> 
			
			<view class="dots">
				<block v-for="(ite, index) in item.goods_imgs" :key="index">
					<view class="dot_normal" :class="{'active': (index==curIndex)}"></view>
				</block>
			</view>
		</view>
		
		<div class="name_wrap">
			<div>{{item.intro}}</div>
			<div class="price" v-if="item.price">￥{{item.price}}</div>
		</div>
		
		<navigator class="shop_wrap" v-if="item.store" :url="'../mall_shop/mall_shop?storeID='+item.store[0].id">
			<div class="wrap row_between">
				<div class="row_center">
					<img :src="item.store[0].logo" mode="aspectFill">
					<span>{{item.store[0].store_name}}</span>
				</div>
				<span class="btn">进店逛</span>
			</div>
		</navigator>
		
		<div class="row_between recommand_wrap" v-if="false">
			<span>店铺推荐</span>
			<div class="row">
				<span class="text">更多</span>
				<span class="arraw"></span>
			</div>
		</div>
		
		<scroll-view class="nav" scroll-x="true"  scroll-with-animation v-if="false">
			<block v-for="(item,index) in shopList" :key="index">
				<div class="nav-item">
					<img src="../../static/img/home_banner.jpg" />
					<div class="content_wrap">
						<span>优品波司登冬季12345678羽绒服</span>
						<span class="price">¥210.00</span>
					</div>
				</div>
				
			</block>
		</scroll-view>
		
		<div style="padding: 20upx;" v-if="detail">
			<rich-text :nodes="detail"></rich-text>
		</div>
		
		
		
		<div class="btn_wrap row">
			<div class="left_wrap row_around">
				<div class="col" @click="collect">
					<img :src="collect_icon" mode="widthFix">
					<span>{{collect_text}}</span>
				</div>
				
				<div class="col" @click="callPhone">
					<img src="../../static/img/kefu_icon.png" mode="widthFix">
					<span>客服</span>
				</div>
			</div>
			
			<span class="flex_one card" @click="jiaCard(0)">加入购物车</span>
			
			<span class="flex_one buy" @click="jiaCard(1)">立即购买</span>
		</div>
		
		<div style="height: 100upx;"></div>
		
		<div class="modal-mask" v-if="showModal" @tap="closeModal"></div>
		<div class="modal-dialog" v-if="showModal">
			<div style="height: 80upx; background-color: rgba(0,0,0,0);"></div>
			<img :src="item.goods_list_img" mode="aspectFill" class="goods_img"/>
			<div style="background: #FFFFFF;padding: 20upx;">
				<div class="row_between item_wrap">
					<div class="price_wrap">
						<span class="price">￥{{item.price}}</span>
					</div>
					
					<img src="../../static/img/kuaidi_close.png" mode="aspectFill" class="close" @click="closeModal"/>
				</div>
				
				<div style="padding: 20upx 0upx;" v-if="item.spec1">
					<div style="padding-left: 20upx;">{{item.spec1}}</div>
					<scroll-view class="color_wrap" scroll-x="true"  scroll-with-animation>
						<block v-for="(ite,index) in item.spec_child_name1" :key="index">
							<div class="color_item" :class="{'select_active': (index == firstIndex)}" @click="changeFirst(index)">{{ite.name}}</div>
						</block>
					</scroll-view>
				</div>
				
				<div style="padding: 20upx 0upx;" v-if="item.spec2">
					<div style="padding-left: 20upx;">{{item.spec2}}</div>
					<scroll-view class="color_wrap" scroll-x="true"  scroll-with-animation>
						<block v-for="(ite,index) in item.spec_child_name2" :key="index">
							<div class="color_item" :class="{'select_active': (index == secondIndex)}" @click="changeSecond(index)">{{ite.name}}</div>
						</block>
					</scroll-view>
				</div>
				
				<div style="padding: 20upx 0upx;" v-if="item.spec3">
					<div style="padding-left: 20upx;">{{item.spec3}}</div>
					<scroll-view class="color_wrap" scroll-x="true"  scroll-with-animation>
						<block v-for="(ite,index) in item.spec_child_name3" :key="index">
							<div class="color_item" :class="{'select_active': (index == thirdIndex)}" @click="changeThird(index)">{{ite.name}}</div>
						</block>
					</scroll-view>
				</div>
				
				<div style="padding: 20upx 0upx;" v-if="item.spec4">
					<div style="padding-left: 20upx;">{{item.spec4}}</div>
					<scroll-view class="color_wrap" scroll-x="true"  scroll-with-animation>
						<block v-for="(ite,index) in item.spec_child_name4" :key="index">
							<div class="color_item" :class="{'select_active': (index == fourIndex)}" @click="changeFourth(index)">{{ite.name}}</div>
						</block>
					</scroll-view>
				</div>
				
				<div class="row_between input_wrap" >
					  <img src="../../static/img/reduce_icon.png" class="actionClass" :class="{'un_active': (ct_count == 1)}" @click="reduceAction" />
					  <input type="number" class="item_num" v-model="ct_count" 
							maxlength="3" @input="inputChange" @blur="inputChange">
							<!-- <span>{{ct_count}}</span> -->
					  <img src="../../static/img/add_blue_icon.png" class="actionClass" :class="{'un_active': (true)}" @click="addAction" />
					
				</div>
			</div>
			
			
			
		</div>
		
	</view>
</template> 

<script>
	import { BASE_IMAGE_URL,goods_detail,collect,shopcart,shopcart_list} from '@/utils/api'
	export default {
	data() {
		return {
			isAPP: false,
			buildingName:"请选择楼宇",
			itemList: [1,2,1,3,4,5],
			t_url: '',
			curIndex: 0,
			contentCurIndex: 0,
			statusBarHeight: 0,
			scrollWidth: 0,
			swipeHeight: 0,
			shopList: [],
			thirdIndex: 0,
			firstIndex: 0,
			secondIndex: 0,
			fourIndex: 0,
			showModal: false,
			ct_count: 1,
			id: 0,
			item: {},
			detail: '',
			collect_icon: '../../static/img/like_icon.png',
			collect_text: '收藏',
			spec: ''
		};
	},
	onLoad(opt) {
		let that = this;
		this.id = opt.goodsID;
		this.goods_detail();
		uni.getSystemInfo({
		  success: function(res) {
			that.scrollWidth = res.windowWidth;
		  },
		});
	},
	methods: {
		inputChange(e){
			setTimeout(()=>{
				if(parseInt(this.ct_count) > 1){
					
				}else{
					this.ct_count = 1;
				}
			}, 200)
			
		},
		addAction(){
			this.ct_count++;
		},
		reduceAction(){
			this.ct_count--;
			if(this.ct_count<=0){
				this.ct_count=1;
			}
		},
		async collect(){
			let params = {
				userID: uni.getStorageSync("userInfo").userID,
				goodsID: this.item.id
			};
			let res = await collect(params);
			if(res.status == 1){
				uni.showToast({
					icon:"none",
					duration:1000,
					title: res.message
				});
				if(this.collect_icon == '../../static/img/like_icon.png'){
					this.collect_icon = '../../static/img/like_icon_active.png';
					this.collect_text = '取消';
				}else{
					this.collect_icon = '../../static/img/like_icon.png';
					this.collect_text = '收藏';
				}
				
			}else{
				uni.showToast({
					icon:"none",
					duration:1000,
					title: res.message
				})
			}
		},
		callPhone(){
			uni.makePhoneCall({
				phoneNumber:this.item.store[0].store_phone,
				success: () => {
					console.log("成功拨打电话")
				}
			})
		},
		jiaCard(index){
			let userInfo = uni.getStorageSync("userInfo");
			if(userInfo){
				if(this.showModal){
					this.shopcart(index);
					
				}else{
					this.ct_count = 1;
					this.showModal = true;
				}
			}else{
				uni.navigateTo({
					url: '/pages/login/login'
				});
			}
			
			
		},
		async shopcart(index){
			let spec = "";
			if(this.item.spec1){
				spec += this.item.spec_child_name1[this.firstIndex].name+";";
			}
			if(this.item.spec2){
				spec += this.item.spec_child_name2[this.secondIndex].name+";";
			}
			if(this.item.spec3){
				spec += this.item.spec_child_name3[this.thirdIndex].name+";";
			}
			if(this.item.spec4){
				spec += this.item.spec_child_name4[this.fourIndex].name+";";
			}
			
			let params = {
				user_id: uni.getStorageSync("userInfo").userID,
				goods_id: this.item.id,
				store_id: this.item.store_id,
				price: uni.getStorageSync("userInfo").is_member == 1?this.item.member_price:this.item.price,
				count: this.ct_count,
				spec: spec.substring(0, spec.length-1)
			};
			let res = await shopcart(params);
			if(res.status == 1){
				if(index==0){
					//加入购物车
					this.showModal = false;
					uni.showToast({
						duration:1000,
						icon: 'none',
						title:"加入购物车成功"
					});
				}else{
					// 直接购买
					this.shopcart_list(params.spec);
				}
				
				
			}
		},
		async shopcart_list(spec){
			let res = await shopcart_list({user_id: uni.getStorageSync("userInfo").userID});
			if(res.status == 1){
				res.list.map( (ite) => {
					if(ite.store_id == this.item.store_id){
						ite.goodsInfo.map((itemm) => {
							if((itemm.spec_name == spec) && (itemm.goods_id == this.item.id)){
								let id = itemm.id
								let shopcartID = [];
								shopcartID.push(id);
								let params = {
									user_id: uni.getStorageSync("userInfo").userID,
									  shopcartID: shopcartID,
									  coupon_shopcart_id: shopcartID,
									  addressID: ''
								  };
								  uni.setStorageSync('params', params);
								uni.navigateTo({
									url: '../mall_post/mall_post'
								})
							}
						})
					}
				});
				
				
					
			}
		},
		closeModal(){
			this.showModal = false;
		},
		changeFirst(index){
			this.firstIndex = index;
		},
		changeSecond(index){
			this.secondIndex = index;
		},
		changeThird(index){
			this.thirdIndex = index;
		},
		changeFourth(index){
			this.fourIndex = index;
		},
		imageLoad: function(e){
		  let imgWidth = e.mp.detail.width;
		  let imgHeight = e.mp.detail.height;
		  this.swipeHeight = parseFloat(imgHeight*this.scrollWidth/imgWidth)+"px";
		},
		slideChange: function(e){
			this.curIndex = e.mp.detail.current;
		},
		async goods_detail(){
			let res = await goods_detail({goodsID: this.id, userID: uni.getStorageSync("userInfo").userID});
			if(res.status == 1){
				this.item = res.data;
				this.collect_icon = this.item.is_collect == 0?'../../static/img/like_icon.png':'../../static/img/like_icon_active.png';
				this.collect_text = this.item.is_collect == 0?'收藏':'取消';
				
				this.detail = res.data.detail;
				var richtext=  this.detail;
				const regex = new RegExp('<img', 'gi');
				richtext= richtext.replace(regex, `<img style="width: 100%!important;"`);
			 
				this.detail = richtext;
						
			}
		}
	},
	onNavigationBarButtonTap() {
		uni.navigateTo({
			url: '../mall_card/mall_card'
		})
	}
};
</script>

<style lang="scss" scoped>
	
.contain{background-color: #ffffff;}

.content {position: relative; min-height: 400upx;}
.head_img{width: 100%;}
.center_img{width: 92%; margin: 30upx 4% 0upx; box-sizing: border-box;}

.dots{display: flex;flex-direction: row;justify-content: center;align-items: center;position: absolute;bottom: 20upx;height: 20upx;width: 100%;z-index: 100;}
.dot_normal{width: 10upx;height: 10upx;border-radius: 50%;background-color: #E0E5ED;margin: 0upx 6upx;position: relative;z-index: 100;}
.active{width: 24upx;height: 10upx;border-radius: 40%;background-color: #107EFF;z-index: 100;}
.home_head_wrap{position: absolute;top: var(--status-bar-height); width: 100%; color: #FFFFFF; font-size: 24upx; padding: 0upx 20upx; box-sizing: border-box;}
.home_head_left span{font-size: 24upx; overflow: hidden;width: 130upx;white-space: nowrap;text-overflow:ellipsis;}
.home_head_left img{width: 24upx; height: 24upx; margin-left: 5upx;}
.msg_wrap{position: relative;}
.msg_wrap img{width: 50upx; height: 40upx;}
.red_hot{width: 20upx; height: 20upx; position: absolute;right: 0upx; top: 0upx;background-color: red; z-index: 2;border-radius: 50%;}

.name_wrap{padding: 36upx 30upx; color: #333333; font-size: 28upx; border-bottom: rgb(249,249,249) solid 15upx;}
.name_wrap .price{color: #FF5269; margin-top: 28upx;}

.shop_wrap{padding: 0upx 30upx; width: 100%; box-sizing: border-box;}
.shop_wrap .wrap{padding: 30upx 0upx; border-bottom: solid 2upx #E3E3E3; font-size: 28upx; color: #333333;}
.shop_wrap .wrap img{width: 68upx; height: 68upx; border-radius: 50%; margin-right: 20upx;}
.shop_wrap .wrap .btn{padding: 6upx 33upx; background: #107EFF; font-size: 24upx; color: #ffffff; border-radius: 24upx;}

.recommand_wrap{color: #333333; font-size: 28upx; padding: 30upx;}
.recommand_wrap .text{color: #999999; font-size: 24upx;margin-right: 10upx;}

.nav{padding: 0upx 2%;display: flex; flex-direction: row;white-space: nowrap; width: 96%;border-bottom: rgb(249,249,249) solid 15upx;}
.nav-item{display: flex; flex-direction: column; padding: 15upx; width: 210upx; display: inline-block;}
.nav img{width: 210upx; height: 210upx;}
.nav .content_wrap{display: flex; flex-direction: column; height: 150upx; justify-content: space-between;}
.nav .content_wrap span{text-overflow: ellipsis; overflow: hidden;width: 210upx;white-space: normal; display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;}
.nav .content_wrap .price{color: #FF5269;}

.type_wrap{width: 100%; display: flex; flex-direction: row;background-color: #FFF; height: 100upx;z-index: 101;}
.head_item{flex: 1; padding: 0upx 24upx;}
.head_item span{height: 100upx; line-height: 100upx;}
.active_type{color: #107EFF;border-bottom: 2upx solid #107EFF;}

.btn_wrap{position: fixed; bottom: 0upx; width: 100%; height:100upx; border-top: 2upx solid #E3E3E3;background: #FFFFFF;}
.btn_wrap .left_wrap{flex: 1.2; color: #666666; font-size: 24upx; padding: 0upx 10upx; box-sizing: border-box;}
.btn_wrap .left_wrap img{width: 36upx; margin-bottom: 5upx;}

.btn_wrap .card{background: #F39800; height: 100upx; color: #FFFFFF; text-align: center; line-height: 100upx;}
.btn_wrap .buy{background: #107EFF;height: 100upx; color: #FFFFFF; text-align: center; line-height: 100upx;}


.modal-mask {width: 100%;height: 80%;position: fixed;top: 0;left: 0;background: #000;opacity: 0.5;overflow: hidden;z-index: 99;color: #fff;}
.modal-dialog {width: 100%;overflow: hidden;position: fixed;bottom: 100upx;left: 0;z-index: 100;box-sizing: border-box;}

.modal-dialog .goods_img{width: 160upx; height: 160upx; position: absolute; top: 0upx; left: 30upx; z-index: 999999;border: 1upx solid #E3E3E3; padding: 5upx;background: #FFF;box-shadow:0px 6upx 54upx 0px rgba(221,221,221,0.41);}
.modal-dialog .close{width: 40upx; height: 40upx; padding: 20upx; position: absolute; top: 80upx;right: 10upx;}
.modal-dialog .item_wrap{min-height: 100upx;}
.price_wrap{display: flex;flex-direction: column;padding-left: 200upx; font-size: 28upx; color:#666666; }
.price_wrap .price{color: #FF4544; font-size: 32upx;}
.actionWrap{display: flex;flex-direction: row;justify-content: space-around;align-items: center;padding: 10upx 0upx;min-width: 200upx;}
.actionClass{height: 60upx;width: 60upx;}
.item_num{display: inline-block;color: #000;width: 260upx;text-align: center;font-size: 32upx;}

.color_wrap{padding: 0upx 2%;display: flex; flex-direction: row;white-space: nowrap; width: 96%;border-bottom: rgb(240,240,240) solid 2upx;}
.color_item{display: flex; flex-direction: column; padding: 15upx; width: 160upx; display: inline-block; text-align: center;}
.select_active{color: #107EFF;}

.input_wrap{margin: 20upx 0upx 2upx; border-bottom: 2upx solid #F0F0F0; padding-bottom: 20upx;}

.body_active{position:fixed;overflow:hidden;width: 100%;}
</style>
