<template>
	<view class="wrapper">
		<view v-if="dataLists.length > 0" class="history-list-box">
			<view class="history-list-item row" v-for="(item, index) in dataLists" :key="index" @click="detailTap(item)">
				<view class="uni-list-item__ioc"><image :src="item.avatar" mode="aspectFill"></image></view>
				<view class="uni-list-item__content">{{ item.name }}</view>
			</view>
		</view>
		<view v-else class="no-data">暂无该好友！</view>
	</view>
</template>

<script>
import { BASE_URL, consumers,getSingleChatStatus } from '@/utils/api';

// #ifdef APP-PLUS
		const rongIm = uni.requireNativePlugin('GZF-RongIM');
	// #endif
	
export default {
	data() {
		return {
			dataLists: [],
			name: ''
		};
	},
	onLoad() {},
	methods: {
		detailTap(e) {
			console.log(JSON.stringify(e));
			this.getSingleChatStatus(e);
		},
		async getSingleChatStatus(item){
			let res = await getSingleChatStatus(item.id);
			if(res.status == 0){
				item.expiryDate = res.data.expiryDate+"";
				item.status = res.data.status;
				item.targetId = item.id;
				console.log(item);
				rongIm.startTalk(JSON.stringify(item));
			}
		},
		async getConsumers(name) {
			// name = encodeURI(name);
			console.log(name);
			let that = this;
			let res = await consumers(name);
			if (res.status == 0) {
				console.log(res);
				that.dataLists = res.data;
			} else {
				uni.showToast({
					icon: 'none',
					title: res.message,
					duration: 1000
				});
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
			this.getConsumers(text);
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
