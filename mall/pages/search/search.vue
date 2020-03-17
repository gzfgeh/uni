<template>
	<view class="wrapper">
		<view v-if="dataLists.length > 0" class="history-list-box">
			<view class="history-list-item col" v-for="(item, index) in dataLists" :key="index" @click="detailTap(item)">
				<view class="uni-list-item__ioc">
					<image :src="item.storeIcon" mode="aspectFill"></image>
				</view>
				<view class="uni-list-item__content">{{ item.storeName }}</view>
			</view>
		</view>
		<view v-else class="no-data">暂无数据！</view>
	</view>
</template>

<script>
import { BASE_URL, searchStoreList,searchProductList } from '@/utils/api';
	
export default {
	data() {
		return {
			dataLists: [],
			name: ''
		};
	},
	onLoad() {
		
	},
	methods: {
		detailTap(e) {
			console.log(JSON.stringify(e));
		},
		async searchProductList(name) {
			let res = await searchProductList(name);
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
		if (text) {
			this.searchProductList(text);
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
</style>
