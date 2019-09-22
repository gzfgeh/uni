<template>
	<view >
		<view class="row_center" style="width: 100vw; height: 100vh;">
			敬请期待
		</view>
		<view v-if="false">
			<div class="fuli-top row_center" :style="{'padding-top': (isAPP?'30px':'0upx')}">
				<div class="left-col louyu-xuanze">
					<div  id="louyuText" class="louyu" @tap="selectBuild()">
						<span class="lou_text">{{buildingName}}</span>
					</div>
					<img src="../../../static/img/fuli_arraw.jpg" mode="widthFix"/>
				</div>
				
				<div class="row_center head_wrap">
					<div class="col" @click="changeType(0)" style="margin-left: 50upx;">
						<span>会员福利</span>
						<span :class="{'active': (curTypeIndex == 0)}"></span>
					</div>
					<div class="col" @click="changeType(1)" style="margin-left: 80upx;">
						<span>线上特卖会</span>
						<span :class="{'active': (curTypeIndex == 1)}"></span>
					</div>
				</div>
				<div class="right-col" id="sosuo"  @click="goToOrderList">
					<img src="../../../static/img/kuaidi_search.png" mode="widthFix"/>
					<div>搜索</div>
				</div>
			</div>
			
			<view class="content" v-if="curTypeIndex == 0" :style="{'margin-top': (isAPP?'180upx':'120upx')}">
				<swiper :indicator-dots="false" :autoplay="true" @change="slideChange"
							:interval="5000" :duration="1000" class="head_img">            
						<swiper-item v-for="(item, index) in imageList" :key="index" class="head_img" @tap="goToH5(index)">  
							<image :src="item.bannerImageUrl" mode="widthFix" class="head_img"  />           
						</swiper-item>        
				</swiper> 
				
				<view class="dots">
					<block v-for="(item, index) in itemList" :key="index">
						<view class="dot_normal" :class="{'active': (index==curIndex)}"></view>
					</block>
				</view>
			</view>
			
			<div class="row_center" style="box-shadow:0px 4px 12px 0px rgba(126,125,125,0.16);" v-if="curTypeIndex == 0">
				<div v-for="(item, index) in timeList" :key="index" class="col_center time_item" @click="changeTimeType(index)">
					<img src="../../../static/img/fuli_bg.png" mode="aspectFill" v-if="index == curTimeIndex">
					<span class="time" :class="{'active': (index==curTimeIndex)}">{{item.start}}~{{item.end}}</span>
					<!-- <span class="text" :class="{'active': (index==curTimeIndex)}">活动开始</span> -->
				</div>
				
			</div>
			
			<div :style="{'margin-top': (isAPP?(curTypeIndex==0?'0upx':'200upx!important'):(curTypeIndex==0?'0upx':'140upx'))}">
				<navigator v-for="(item,index) in couponList" :key="index" @click="goToQuestion(item)"
					class="fuli_wrap" v-if="curTypeIndex == 0" :class="{'fuli_active':(item.is_used == 0)}">
					<img class="item_bg" src="../../../static/img/fuli_item_bg.jpg" />
					<div class="row content_wrap">
						<img  class="coupon_image" :src="item.img" />
						<div class="content_item" >
							<span class="name">{{item.title}}</span>
							<div class="address" v-if="false">
								<img src="../../../static/img/weizhi.jpg" mode="widthFix" class="weizhi">
								<span>上海歌斐中心</span>
							</div>
							<span class="flex_one"></span>
							<span class="time ">{{item.start_time}} 至 {{item.end_time}}</span>
						</div>
					</div>
					<div class="lingqu" >
						<div>立即</div>
						<div>领取</div>
					</div>
				</navigator>
				
				<div v-if="couponList.length == 0" class="uni-center-item no_data_wrap">
					<span>暂无信息</span>
				</div>
				
				<navigator v-for="(item,index) in teMaiList" :key="index" :url="'../../mall_shop/mall_shop?storeID='+item.id"
				class="temai_wrap" v-if="curTypeIndex == 1">
					<img class="item_bg" :src="item.special_img" mode="aspectFill"/>
					<div class="row content_wrap">
						<div class="price_wrap flex_one">
							<div class="name_wrap row">
								<img :src="item.logo" mode="aspectFill">
								<span class="name">{{item.store_name}}</span>
							</div>
							
							<span class="">{{item.desc}}</span>
						</div>
						<span class="btn">立即抢购</span>
					</div>
				</navigator>
			</div>
			
		</view>
		
		
	</view>
</template>

<script>
		import { BASE_IMAGE_URL,sale_store,welfare_coupon_list,getBanners,welfare_coupon_time,search } from '@/utils/api'
	export default {
		data() {
			return {
				itemList: [],
				t_url: '',
				buildingName:"请选择楼宇",
				curIndex: 0,
				list: [],
				teMaiList: [],
				timeList: [],
				couponList: [],
				curTimeIndex: 0,
				curTypeIndex: 0,
				isAPP:true,
				loadingText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
				loadingType: 0,
				page: 1,
				imageList: []
			}
		},
		onLoad() {
			// #ifdef APP-PLUS
				this.isAPP = true;
			// #endif
			// #ifdef H5
				this.isAPP = false;
			// #endif
		},
		onShow(){
			
			this.buildingName=uni.getStorageSync("userInfo").buildingName;
			if(!this.buildingName){
				this.buildingName = "请选择楼宇";
			};
			this.curTimeIndex = 0;
			this.getBanners();
			this.search();
			this.welfare_coupon_time();
		},
		methods: {
			goToQuestion(item){
				let userInfo = uni.getStorageSync("userInfo");
				console.log(userInfo);
				if(userInfo){
					if(item.is_used == 1){
						//可以领取
						uni.navigateTo({
							url:'../../mall_question/mall_question?wc_id='+item.wc_id
						})
					}else{
						wx.showToast({
							title: "目前不能领取此优惠券",
							icon: 'none',
							duration: 1000
						})
					}
				}else{
					uni.navigateTo({
						url: '../../login/login'
					});
				}
				
				
			},
			async getBanners(){
				let res = await getBanners(22, uni.getStorageSync("userInfo").buildingID);
				if(res.status == 1){
					this.imageList = res.data;
				}
			},
			changeTimeType(index){
				this.curTimeIndex = index;
				this.welfare_coupon_list(index);
			},
			selectBuild: function(){
				
				if(!this.isLogin()){
					return;
				}
				
				uni.navigateTo({
					url: '/pages/build/build'
				});
			},
			slideChange(e){
				this.curIndex = e.mp.detail.current;
			},
			changeType(index){
				this.curTypeIndex = index;
				this.$forceUpdate();
			},
			async welfare_coupon_time(){
				let res = await welfare_coupon_time();
				if(res.status == 1){
					this.timeList = res.data;
					this.timeList.map((item) => {
						item.starts = item.start_time.split(" ")[1].split(":");
						item.start = item.starts[0]+":"+item.starts[1];
						
						item.ends = item.end_time.split(" ")[1].split(":");
						item.end = item.ends[0]+":"+item.ends[1];
					});
					this.welfare_coupon_list(0);
				}
			},
			async welfare_coupon_list(index){
				let params = {
					start_time: this.timeList[index].start_time,
					end_time: this.timeList[index].end_time,
					user_id: uni.getStorageSync("userInfo").userID
				};
				let res = await welfare_coupon_list(params);
				if(res.status == 1){
					if(this.page==1)
					{
						this.couponList=res.data;
					}
					else{
						this.couponList=this.couponList.concat(res.data);
					}
					
					if(res.data.length < 10){
						this.loadingType = 2;
					}else{
						this.loadingType = 0;
					}
					console.log(this.couponList)
				};
			},
			
			async search(){
				let params = {
					searchType: 2,
					keyword: "",
					page:this.page,
					limit:20,
					special_sale: 1
				};
				let res = await search(params);
				if(res.status == 1){
					if(this.page==1)
					{
						this.teMaiList=res.data;
					}
					else{
						this.teMaiList=this.teMaiList.concat(res.data);
					}
					
					if(res.data.length < 10){
						this.loadingType = 2;
					}else{
						this.loadingType = 0;
					}
					
				}
			},
			
			
			async sale_store(){
				let params = {
					page: this.page,
					limit: 10
				}
				let res = await sale_store(params);
				if(res.status == 1){
					if(this.page==1)
					{
						this.teMaiList=res.data;
					}
					else{
						this.teMaiList=this.teMaiList.concat(res.data);
					}
					
					if(res.data.length < 10){
						this.loadingType = 2;
					}else{
						this.loadingType = 0;
					}
				};
			},
			
			goToOrderList(){
				uni.navigateTo({
					url:"../../mall_goods_list/mall_goods_list"
				})
			}
		}
	}
</script>

<style>
.time_item{position: relative; height: 100upx; flex: 1; line-height: 40upx;border-right: 2upx solid #E3E3E3;}	
.time_item img{width: 100%; height: 110upx; position: absolute;top: 0upx; left: 0upx; z-index: -1;}
.time_item .time{color: #26262D; font-size: 20upx;}
.time_item .text{color: #CCCCCC; font-size: 24upx;}
.time_item .active{color: #FFFFFF!important;}
	
	
.fuli-top{position: fixed;text-align: center;height:120upx;top:0px;box-shadow:0px 6upx 54upx 0px rgba(221,221,221,0.41);width:100%;z-index:1000;
background: #fff;width:100%;left:0; }
.fuli-top .left-col{position: absolute;left:30upx;font-size:22upx;}
.fuli-top .left-col div{width:80upx;line-height: 36upx;padding-top:30upx;color:#666;}
.fuli-top .left-col img{width:32upx;position: absolute;right:-40upx;top:52upx;}
.fuli-top .right-col div{font-size:22upx;color:#7A7A7A;position: relative;top:-8px;}

.fuli-top .right-col img{width:36upx;margin-top:20px;}
.fuli-top .right-col{position: absolute;right:0;padding:0upx 20upx;}

.fuli-top .middle-col{color:#333;font-size:32upx;color:#999999;line-height: 104upx;}
.fuli-top .middle-col span{display: inline-block;position: relative;padding:0 12upx;}
.fuli-top .middle-col span.active{color:#333;display: inline-block;}
.fuli-top .middle-col span.active:after{content: " ";width:50upx;margin-left:-25upx;height:8upx;background: #107EFF;bottom:4upx;border-radius:6upx;position:absolute;left:50%;display: block;}

.content {height: 400upx;position: relative; margin-top: 140upx;}
.head_img{width: 100%;height: 400upx!important;}
.dots{display: flex;flex-direction: row;justify-content: center;align-items: center;position: absolute;bottom: 20upx;height: 20upx;width: 100%;z-index: 100;}
.dot_normal{width: 10upx;height: 10upx;border-radius: 50%;background-color: #E0E5ED;margin: 0upx 6upx;position: relative;z-index: 100;}
.content .active{width: 30upx;height: 10upx;border-radius: 30%;background-color: #107EFF;z-index: 100;}


.head_wrap .active{width: 60upx;height: 10upx;border-radius: 10upx;background-color: #107EFF;z-index: 100;position: absolute;bottom: 10upx; left: 50%; margin-left: -30upx;}
.head_wrap{height: 120upx;}
.head_wrap div{height: 120upx; margin-right: 10upx; position: relative;display: flex;flex-direction: row;}

.fuli-list{padding-bottom:40upx;}
.fuli_wrap{height:230upx;width:94%;border:1px solid rgba(243, 243, 243, 1);
			box-shadow:0px 2px 6px 0px rgba(126,125,125,0.14);position: relative;margin:20upx 3%;box-sizing: border-box;}
.fuli_active{position:relative; top:0; left:0; z-index:2; background:#f5f5f5; opacity:0.4;}			
			
.fuli_wrap .item_bg{position: absolute;top: 0upx; left: 0upx; height: 100%; width: 100%;z-index: -1; }
.fuli_wrap .content_wrap{height: 100%; padding: 25upx; box-sizing: border-box;}
.fuli_wrap .address{display: flex;flex-direction: row; align-items: center;}
.fuli_wrap .coupon_image{width:180upx;height:180upx; margin-right: 20upx;}
.fuli_wrap .content_item{display: flex; flex-direction: column; color: #666; font-size: 24upx; height: 100%;}
.fuli_wrap .content_item .name{color: #333333; font-size: 32upx;}
.fuli_wrap .weizhi{width:22upx;font-size:12px;font-weight:400;color:#666;line-height:14px;}
.fuli_wrap .biaoti{font-size:16px;padding-top:44upx;padding-bottom:12upx;font-weight:bold; max-width: 320upx;
			color:rgba(51,51,51,1);line-height:40upx;}
.fuli_wrap .weizhi img{width:24upx;position: relative;top:6upx;}
.fuli_wrap .riqi{color:#999;font-size:11px;position: absolute;bottom:20upx;}
.fuli_wrap .time{font-size: 22upx; color: #999;align-self: flex-end; display: flex; flex-direction: row;}
.fuli_wrap .lingqu{position: absolute;right:0;top:0;font-size:30upx;color:#fff;text-align: center;width:132upx;height:230upx;box-sizing: border-box;padding-top:64upx;}

.temai_wrap{box-shadow:0px 2px 6px 0px rgba(126,125,125,0.14);display: flex;flex-direction: column;width:94%;margin:20upx 3%;}
.temai_wrap img{width: 100%; height: 300upx;}
.temai_wrap .content_wrap{padding: 15upx 26upx;}
.temai_wrap .content_wrap .price_wrap{display: flex; flex-direction: column; color: #333; font-size: 28upx;}
.temai_wrap .content_wrap .price_wrap .price{color: #FF5269; font-size: 36upx;}
.temai_wrap .content_wrap .btn{color: #ffffff; font-size: 28upx; padding: 10upx 36upx;background: #F39800;border-radius: 10upx;margin-left: 20upx;}

.name_wrap{}
.name_wrap img{border-radius: 50%; margin-right: 10upx; width: 50upx; height: 50upx;}

.temai_top{margin-top: 180upx;}
.lou_text{text-overflow: ellipsis;
display: -webkit-box;
-webkit-line-clamp: 2;
-webkit-box-orient: vertical;
overflow: hidden; max-width: 60px; font-size: 24upx;
}
</style>
