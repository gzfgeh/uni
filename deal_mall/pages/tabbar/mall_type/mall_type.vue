<template>
	<view class="contain">
		<div class="head_wrap row_center" @click="goToSearchList">
			<navigator class="search_wrap row_center">
				<img src="https://bay.2donghua.com/web/statics/wxapp/images/icon-search.png" mode="widthFix">
				<span>搜索</span>
			</navigator>
		</div>
		
		<div class="content_wrap">
			
			<scroll-view scroll-y class="scoll_wrap">
				<div v-for="(item, index) in list" :key="index" :class="{'active_type': (typeIndex == index)}"
					class="item_wrap row_center" @click="changeType(index)">
					<span>{{item.t_name}}</span>
				</div>
			</scroll-view>
			
			<div class="content_list" >
				<div v-for="(item, index) in dateList" :key="index" class="item col_center" @click="goToGoodsList(index)">
					<img :src="item.t_img" alt="">
					<span>{{item.t_name}}</span>
				</div>
			</div>
			
		</div>
	</view>
</template>

<script>
	import { BASE_IMAGE_URL,getFirstTypeList,getSecondTypeList } from '@/utils/api'
	
	export default {
		data() {
			return {
				list: [],
				dateList: [],
				typeIndex: 0
			}
		},
		onShow(){
			let userInfo = uni.getStorageSync("userInfo");
			if(!userInfo){
				uni.navigateTo({
					url: '/pages/login/login'
				});
				return;
			}
		},
		onLoad() {
			this.getFirstTypeList();
		},
		methods: {
			changeType(index){
				this.typeIndex = index;
				this.getSecondTypeList(this.list[index].t_id);
			},
			goToGoodsList(index){
				uni.navigateTo({
					url: '/pages/mall_list/mall_list?g_type='+this.dateList[index].t_id
				});
			},
			goToSearchList: function(){
				uni.navigateTo({
					url: '/pages/goods_search/goods_search'
				});
			},
			async getSecondTypeList(t_id){
				let res = await getSecondTypeList(t_id);
				if(res.code == 1000){
					this.dateList = res.data;
				}
			},
			async getFirstTypeList(){
				let res = await getFirstTypeList();
				if(res.code == 1000){
					this.list = res.data;
					this.getSecondTypeList(this.list[0].t_id);
				}
			}
		}
	}
</script>

<style>
page{background: #FFFFFF;height: 100%;}
.contain{display: flex; flex-direction: column;height: 100%;}
.head_wrap{height: 110upx; position: fixed;border-bottom: 2upx solid #E3E3E3; border-top: 2upx solid #E3E3E3;width: 100%;top:0upx;
			background-color: #EFEFF4;}
.search_wrap{width: 90%; height: 66upx; border: 1upx solid #E3E3E3;border-radius: 10upx; background-color: #FFFFFF;color: #B2B2B2; font-size: 24upx;}			
.search_wrap img{margin-right: 10upx; width: 26upx;}

.content_wrap{margin-top: 114upx; flex:1; width: 100%;display: flex; flex-direction: row;}
.scoll_wrap{width: 224upx; height: 100%;background-color: #F7F7F7;}
.item_wrap{height: 106upx;border-left: 8upx solid transparent;}
.active_type{border-left-color:#ff4544; background-color: #FFFFFF;color:#ff4544;}

.content_list{display: flex; flex-direction: row;background-color: #FFFFFF; width: 100%; flex-flow: wrap;}
.content_list .item{font-size: 28upx; width: 33.33%; height: 200upx; margin: 0upx!important;}
.content_list .item img{width: 92upx; height: 92upx;}
</style>
