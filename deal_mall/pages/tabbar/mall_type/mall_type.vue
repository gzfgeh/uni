<template>
	<view class="contain">
		<div class="head_wrap row_center">
			<navigator class="search_wrap row_center">
				<img src="https://bay.2donghua.com/web/statics/wxapp/images/icon-search.png" mode="widthFix">
				<span>搜索</span>
			</navigator>
		</div>
		
		<div class="content_wrap">
			
			<scroll-view scroll-y class="scoll_wrap">
				<div v-for="(item, index) in list" :key="index" :class="{'active_type': (typeIndex == index)}"
					class="item_wrap row_center" @click="changeType(index)">
					<span>{{item}}</span>
				</div>
			</scroll-view>
			
			<div class="content_list" >
				<navigator v-for="(item, index) in dateList" :key="index" class="item col_center">
					<img src="https://bay.2donghua.com/web/uploads/image/store_1/4bb3e57de292c4586168e73ce82834b9102186ea.png" alt="">
					<span>男上衣</span>
				</navigator>
			</div>
			
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: ["服装", "食品", "家用电器", "书籍杂志", "鞋子包包", "化妆配饰"],
				dateList: [1,2,3,4,5,6,7,8,9,0],
				typeIndex: 0
			}
		},
		onLoad() {

		},
		methods: {
			changeType(index){
				this.typeIndex = index;
			},
			goToGeRenKuaidi(){
				uni.navigateTo({
					url: '/pages/express_main/express_main'
				});
			},
			goToExpressList(){
				uni.navigateTo({
					url: '/pages/express_list/express_list'
				});
			},
			goToServiceForm(){
				uni.navigateTo({
					url: '/pages/service_form/service_form'
				});
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
