<template>
	<view>
		
		<navigator class="bottom_wrap" url="../add_address/add_address">添加新地址</navigator>
		
		<block  v-for="(item,index) in list" :key="index" class="list_wrap">
			<div class="item_wrap">
				<div class="row_between item_head">
					<span>收货人：张三</span>
					<span>020-81167888</span>
				</div>
				<div class="detail">收货地址：广东省广州市海珠区新港中路397号</div>
				
				<div class="row_between">
					<div class="row" style="flex: 1;" @click="selectItem(index)">
						<img :src="(cur_index == index)?select_icon_url:normal_icon_url" class="radio_icon">
						<span :class="{'active': (cur_index == index)}">设为默认</span>
					</div>
					
					<div class="row_between">
						<div class="row edit_item">
							<img src="https://bay.2donghua.com/web/statics/wxapp/images/icon-edit.png" class="edit_icon">
							<span>编辑</span>
						</div>
						
						<div class="row edit_item">
							<img src="https://bay.2donghua.com/web/statics/wxapp/images/icon-delete.png" class="edit_icon">
							<span>删除</span>
						</div>
					</div>
				</div>
			</div>
		</block>	
		<div v-if="list.length == 0" class=" no_data_wrap">
			<span>暂无地址信息</span>
		</div>
					
	</view>
</template>

<script>
	
	import { BASE_IMAGE_URL,getAllAddress } from '@/utils/api'
	
	export default {
		data() {
			return {
				list: [1,2],
				select_icon_url: "https://bay.2donghua.com/web/statics/wxapp/images/icon-checked.png",
				normal_icon_url: "https://bay.2donghua.com/web/statics/wxapp/images/icon-uncheck.png",
				cur_index: -1
			}
		},
		methods: {
			selectItem(index){
				this.cur_index = index;
			},
			async getList(){
				let params = {
					userID: '',
					type: 1
				};
				let res = await getAllAddress(params);
				if(res.status == 1){
					
				}
				setTimeout(() => {
					uni.stopPullDownRefresh();
					this.list = this.list.concat([1,2,3,4,5,6,7,8,9,0,11,22,33,44]) ;
					if(this.list.length < 10){
						this.loadingType = 2;
					}else{
						this.loadingType = 0;
					}
				}, 1000);
			}
		},
		onReachBottom() {
			this.loadingType = 1;
			this.page++;
			this.getList();
		},
		
		onPullDownRefresh() {
			console.log("dddddd");
			this.page = 1;
			this.list = [];
			this.getList();
		},
		onLoad(){
			
		},
		onNavigationBarButtonTap:function(e){
            uni.navigateTo({
				url: '/pages/add_address/add_address'
			});
        },
	}
</script>

<style>
page{height: 100%; color: #555; background: #EFEFF4; overflow: hidden;}	
.bottom_wrap{position: fixed;bottom: 0upx;left: 0upx; width: 100%; z-index: 10; color: #FFF; background-color: #ff4544;height: 100upx;line-height: 100upx; text-align: center;}

.list_wrap{padding-bottom: 100upx;}
.item_wrap{background: #FFF; padding: 32upx 24upx; margin-bottom: 20upx;}
.item_head{margin-bottom: 24upx;}
.detail{border-bottom: 1upx solid #EEE; margin-bottom: 24upx; padding-bottom: 24upx;}
.edit_item{margin-left: 48upx;}
.edit_icon{width: 32upx; height: 32upx; margin-right: 16upx;}
.radio_icon{width: 38upx; height: 38upx; margin-right: 10upx;}
.active{color: #fe6e00;}

.empty_text {
	width: 100%;
	height: 800upx;
	line-height: 800upx;
	text-align: center;
	background: #f4f4f4;
	border: none;
	z-index: 10;
	background: #f2f2f2;
}

</style>
