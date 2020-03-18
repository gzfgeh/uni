<template>
	<view class="wrapper">
		<div class="head_wrap" :style="{'top': (isAPP?'0rpx': '66rpx')}">
			<div v-for="(item, index) in typeList" :key="index" @click="changeType(index)"
				class="head_item" >
				<span :class="{'active_type': (curType == index)}">{{item}}</span>
			</div>
		</div>
		
		<view v-if="dataLists.length > 0" class="history-list-box" :style="{'margin-top': (isAPP?'100rpx': '100rpx')}">
			<view class="history-list-item col" v-for="(item, index) in dataLists" :key="index" @tap="detailTap(item)">
				<view class="uni-list-item__ioc">
					<image :src="item.productImg?item.productImg:item.storeIcon" mode="aspectFill"></image>
				</view>
				<view class="uni-list-item__content">{{item.productName?item.productName:item.storeName }}</view>
			</view>
		</view>
		<view v-else class="no-data">暫無數據！</view>
	</view>
</template>

<script>
import { BASE_URL, searchStoreList,searchProductList } from '@/utils/api';
	
export default {
	data() {
		return {
			dataLists: [],
			name: '',
			typeList: ['商品','店鋪'],
			curType: 0,
			showType: 0,
			isAPP: false
		};
	},
	onLoad() {
		// #ifdef APP-PLUS
		this.isAPP = true;
		// #endif
	},
	methods: {
		detailTap(e) {
			if(this.curType == 0){
				uni.navigateTo({
					url: '/pages/product/product'
				})
			}else{
				uni.navigateTo({
					url: '/pages/storeInfo/storeInfo?storeID='+e.storeID
				})
			}
			
		},
		changeType(index){
			if(this.curType != index){
				this.dataLists = [];
				this.curType = index;
				if(this.curType == 0){
					this.searchProductList();
				}else{
					this.searchStoreList();
				}
			}
			
		},
		async searchStoreList() {
			let res = await searchStoreList(this.name);
			if (res.rCode == "0000") {
				console.log(res);
				this.dataLists = res.Data;
			} else {
				this.$api.msg(res.msg);
			}
		},
		async searchProductList() {
			let res = await searchProductList(this.name);
			if (res.rCode == "0000") {
				console.log(res);
				this.dataLists = res.Data;
			} else {
				this.$api.msg(res.msg);
			}
		}
	},
	/**
	 * 当 searchInput 输入时触发
	 */
	onNavigationBarSearchInputChanged(e) {
		// let text = e.text;
		// console.log(text);
		// if (text) {
		// 	this.getConsumers(text);
		// }
	},
	/**
	 * 点击软键盘搜索按键触发
	 */
	onNavigationBarSearchInputConfirmed(e) {
		let text = e.text;
		this.name = text;
		if (text) {
			if(this.curType == 0){
				this.searchProductList(text);
			}else{
				this.searchStoreList(text);
			}
			
		};
		// #ifdef APP-PLUS
		plus.key.hideSoftKeybord();
		// #endif
	}
};
</script>

<style>
.history-list-box {
	/* margin: 10upx 0; */
}
.history-list-item {
	padding: 30upx 0;
	margin-left: 30upx;
	border-bottom: 1px #eeeeee solid;
	font-size: 28upx;
	display: flex;
	flex-direction: row;
	align-items: center;
}

.no-data {
	text-align: center;
	color: rgba(153, 153, 153, 1);
	margin-top: 351upx;
	font-size: 34upx;
}
.uni-list-item__ioc {
	height: 60upx;
	margin-right: 20upx;
}
.uni-list-item__ioc image {
	width: 60upx;
	height: 60upx;
	border-radius: 50%;
}

.head_wrap{width: 100%; display: flex; flex-direction: row;position: fixed;left: 0upx;background-color: #FFF;border-bottom: 2upx solid #E3E3E3; height: 100rpx;z-index: 101;}
.head_item{flex: 1; padding: 0upx 24upx; display: flex; flex-direction: row; align-items: center; text-align: center; justify-content: center;}
.head_item span{height: 100upx; line-height: 100upx;}
.active_type{color: #107EFF;border-bottom: 2upx solid #107EFF;}

</style>
