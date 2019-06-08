<template>
	<view>
		
		<navigator class="bottom_wrap" url="../add_address/add_address">添加新地址</navigator>
		
		<block  v-for="(item,index) in list" :key="index" class="list_wrap">
			<div class="item_wrap" @click="selectItem(index)">
				<div class="row_between item_head" >
					<span>收货人：{{item.a_name}}</span>
					<span>{{item.a_phone}}</span>
				</div>
				<div class="detail">收货地址：{{item.a_sheng}}{{item.a_shi}}{{item.a_qu}}{{item.a_address}}</div>
				
				<div class="row_between">
					<div class="row" style="flex: 1;" >
						<span :class="{'active': (item.a_is_default == 1)}">{{(item.a_is_default == 1)?'默认地址':' '}}</span>
					</div>
					
					<div class="row_between" >
						<div class="row edit_item" @click.stop="goToEditAddress(index)">
							<img src="https://bay.2donghua.com/web/statics/wxapp/images/icon-edit.png" class="edit_icon">
							<span>编辑</span>
						</div>
						
						<div class="row edit_item" @click.stop="deleteAction(index)">
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
	
	import { BASE_IMAGE_URL,getAddressList,deleteAddress } from '@/utils/api'
	
	export default {
		data() {
			return {
				list: [],
				select_icon_url: "https://bay.2donghua.com/web/statics/wxapp/images/icon-checked.png",
				normal_icon_url: "https://bay.2donghua.com/web/statics/wxapp/images/icon-uncheck.png",
				cur_index: -1
			}
		},
		methods: {
			selectItem(index){
				console.log("1111")
				uni.setStorageSync("addressItem", this.list[index]);
				uni.navigateBack({
					delta: 1
				});
			},
			async getList(){
				let res = await getAddressList(uni.getStorageSync("openid"));
				if(res.code == 1000){
					this.list = res.data;
				}
			},
			goToEditAddress(index){
				console.log("0000")
				uni.setStorageSync("itemList", this.list[index]);
				uni.navigateTo({
					url: '/pages/add_address/add_address'
				});
			},
			deleteAction(index){
				uni.showModal({
					title:"提示",
					content:"是否删除?",
					success: (res) => {
						if(res.confirm){
							this.deleteAddress(index);
						}
					}
				})
			},
			async deleteAddress(index){
				let params = {
					a_id: this.list[index].a_id
				};
				let res = await deleteAddress(params);
				if(res.code == 1000){
					uni.showToast({
					  icon: 'none',
					  title: '删除成功',
					  duration: 1000
					});
					this.getList();
				}
			}
		},
		onLoad(){
			this.getList();
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
