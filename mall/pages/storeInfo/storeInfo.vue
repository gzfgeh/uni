<template>
	<view class="tabs">
		<!-- <view class="title_wrap">
			<image :src="storeIcon" mode="aspectFill"></image>
			<text style="font-size: 30rpx; font-weight: bold;">{{storeName}}</text>
			
		</view>
		<view class="title_wrap" style="justify-content: space-around;">
			<text>商品總件數：{{storeInfoData.productTotal}}</text>
			<text>瀏覽人次：{{storeInfoData.links}}</text>
			<text>購買人次：{{storeInfoData.buys}}</text>
		</view> -->
		
		<scroll-view id="tab-bar" class="scroll-h" :scroll-x="true" :show-scrollbar="false" >
		    <view v-for="(tab,index) in tabBars" :key="index" class="uni-tab-item" :id="index" :data-current="index" @click="ontabtap">
		        <text class="uni-tab-item-title" :class="tabIndex==index ? 'uni-tab-item-title-active' : ''">{{tab}}</text>
		    </view>
		</scroll-view>
		<view class="line-h"></view>
		<swiper :current="tabIndex" class="swiper-box" style="flex: 1;" :duration="300" @change="ontabchange">
		    <swiper-item class="swiper-item" v-for="(tab,index1) in newsList" :key="index1">
				<scroll-view class="scroll-v list" enableBackToTop="true" scroll-y >
					<view v-if="index1 == 0 && marketList" class="market_item">
						<image :src="item.marketImg" mode="widthFix" v-for="(item,ind) in marketList" :key="ind" @tap="goToWebView(item)"></image>
					</view>
					<view v-else>
						正常情況應該顯示店鋪內的商品列表但是API沒有返回這部分數據，所以不知道顯示什麼
					</view>
				</scroll-view>
		    </swiper-item>
		</swiper>
		
	</view>
</template>

<script>
	import { BASE_URL, storeInfo } from '@/utils/api';
	
	export default {
		data() {
			return {
				storeID: 0,
				storeName: '',
				storeIcon: '',
				storeInfoData: {},
				tabBars: [],
				tabIndex: 0,
				newsList: [],
				scrollInto: '',
				marketList:[]
			}
		},
		methods: {
			goToWebView(item){
				uni.navigateTo({
					url:'/pages/webview/webview?url='+item.marketUrl
				})
			},
			ontabtap(e) {
			    let index = e.target.dataset.current || e.currentTarget.dataset.current;
			    this.switchTab(index);
			},
			ontabchange(e) {
			    let index = e.target.current || e.detail.current;
			    this.switchTab(index);
			},
			switchTab(index) {
			    if (this.tabIndex === index) {
			        return;
			    }
			
			    this.tabIndex = index;
				this.scrollInto = this.tabIndex+"";
			},
			async storeInfo() {
				let res = await storeInfo(this.storeID);
				if (res.rCode == "0000") {
					console.log(res.Data);
					uni.setNavigationBarTitle({
						title: res.Data.storeName
					});
					this.storeName = res.Data.storeName;
					this.storeIcon = res.Data.storeIconUrl;
					this.storeInfoData = res.storeInfo;
					this.tabBars = res.TopList;
					this.newsList = this.tabBars;
					this.marketList = res.storeHome.marketList;
				} else {
					this.$api.msg(res.msg);
				}
			},
		},
		onLoad(opt) {
			this.storeID = opt.storeID;
			this.storeInfo();
		}
	}
</script>

<style>
.title_wrap{display: flex;flex-direction: row;align-items: center;height: 100rpx;  font-size: 26rpx;justify-content: center;}
.title_wrap image{width: 100rpx; height: 100rpx;}

.market_item image{width: 100vw;}

.tabs {
        flex: 1;
        flex-direction: column;
        overflow: hidden;
        background-color: #ffffff;
        /* #ifdef MP-ALIPAY || MP-BAIDU */
        height: 100vh;
        /* #endif */
    }

    .scroll-h {
        width: 750upx;
        height: 80upx;
        flex-direction: row;
        /* #ifndef APP-PLUS */
        white-space: nowrap;
        /* #endif */
        /* flex-wrap: nowrap; */
        /* border-color: #cccccc;
		border-bottom-style: solid;
		border-bottom-width: 1px; */
    }

    .line-h {
        height: 1upx;
        background-color: #cccccc;
    }

    .uni-tab-item {
        /* #ifndef APP-PLUS */
        display: inline-block;
        /* #endif */
        flex-wrap: nowrap;
        padding-left: 34upx;
        padding-right: 34upx;
    }

    .uni-tab-item-title {
        color: #555;
        font-size: 30upx;
        height: 80upx;
        line-height: 80upx;
        flex-wrap: nowrap;
        /* #ifndef APP-PLUS */
        white-space: nowrap;
        /* #endif */
    }

    .uni-tab-item-title-active {
        color: #007AFF;
    }

    .swiper-box {
        flex: 1;
    }

    .swiper-item {
        flex: 1;
        flex-direction: row;
    }

    .scroll-v {
        flex: 1;
        /* #ifndef MP-ALIPAY */
        flex-direction: column;
        /* #endif */
        width: 750upx;
    }
	
	
	
</style>
