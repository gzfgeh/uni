<template>
	<view style="padding: 10upx;">
		<navigator class="item_wrap row_center" url="../join_build/join_build">
			<img src="../../static/img/lou_yu_jia_meng.png" mode="aspectFill">
			<!-- <span>楼宇加盟</span> -->
		</navigator>
		
		<navigator class="item_wrap row_center" url="../join_gys/join_gys">
			<img src="../../static/img/gong_ying_shang.png" mode="aspectFill">
			<!-- <span>供应商加盟</span> -->
		</navigator>
		
		<navigator class="item_wrap row_center" url="../join_zp/join_zp">
			<img src="../../static/img/ren_yuan_zhao_pin.png" mode="aspectFill">
			<!-- <span>人员招聘</span> -->
		</navigator>
					
	</view>
</template>

<script>
	
	import { BASE_IMAGE_URL,getAllAddress } from '@/utils/api'
	
	export default {
		data() {
			return {
				loadingText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
				list: [],
				loadingType: 0,
				page: 1,
				type: 1,
				keywords: ""
			}
		},
		methods: {
			goToChange(index){
				let params = JSON.stringify(this.list[index]); // 这里转换成 字符串
				uni.navigateTo({
					url: '/pages/add_address_global/add_address_global?params='+params
				});
			},
			search(){
				this.page = 1;
				this.list = [];
				this.getList();
			},
			async getList(){
				let params = {
					userID: uni.getStorageSync("userInfo").userID,
					isInternationalAddress: this.type,
					page: this.page
				};
				let res = await getAllAddress(params);
				uni.stopPullDownRefresh();
				if(res.status == 1){
					if(this.page == 1){
						this.list = res.data;
					}else{
						this.list = this.list.concat(res.data);
					}
					
					if(this.list.length < 10){
						this.loadingType = 2;
					}else{
						this.loadingType = 0;
					}
				}
			},
			selectItem(index){
				this.$store.dispatch("changeAddressFunc", this.list[index].addressID);
				uni.navigateBack({
					delta: 1
				});
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
			this.getList();
		},
		onNavigationBarButtonTap:function(e){
            uni.navigateTo({
				url: '/pages/add_address_global/add_address_global'
			});
        },
	}
</script>

<style>
.item_wrap{height: 400upx; width: 96%; margin: 10upx 2%;position: relative;color: #FFF; font-size: 32upx;}
.item_wrap img{position: absolute;top: 0upx; left: 0upx; width: 100%; height: 100%; z-index: -1;border-radius: 20upx;}
</style>
