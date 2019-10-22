<template>
	<view>
		<div class="tag_wrap" v-if="type == 0">
			<div class="inner row_center" :class="{'active' : (typeIndex == 0)}" @click="changeType(0)">
				<span>国内地址</span>
				</div>
			<div class="outer row_center" :class="{'active' : (typeIndex == 1)}" @click="changeType(1)">
				<span>国际地址</span>
			</div>
		</div>
		<div class="row input_wrap">
			<img src="../../static/img/kuaidi_search.png" mode="widthFix" />
			<input type="search" placeholder="请输入地址" class="address_search" confirm-type="search" v-model="keywords" @confirm="search">
		</div>
		
		<div style="border-top: 1upx solid #F3F3F3;">
			<block  v-for="(item,index) in list" :key="index" >
				<div class="item_wrap" >
					<div class="row_between wrap">
						<span class="sex">{{item.name[0]}}</span>
						<div class="content_wrap" @click="selectItem(index)">
							<span class="name">{{item.name}} 
								<span class="tel">{{item.phone?item.phone:item.fixedphone}}</span>
							</span>
							<span class="address">{{item.province}}{{item.city}}{{item.area}}{{item.detail}}</span>
							<span v-if="item.companyName" >{{item.companyName}}</span>
						</div>
						<img  src="../../static/img/edit_address_icon.png" mode="widthFix" @click="goToChange(index)">
					</div>
				</div>
		</block>
		</div>
		
			
		<div v-if="list.length == 0 &&loadingType==2" class=" no_data_wrap">
			<span>暂无内容</span>
		</div>
		
		<view class="uni-tab-bar-loading" v-if="list.length != 0">
			<uni-load-more :loadingType="loadingType" :contentText="loadingText"  ></uni-load-more>
		</view>
					
	</view>
</template>

<script>
	import uniLoadMore from '@/components/uni-load-more.vue';
	import uniNavBar from '@/components/uni-nav-bar.vue'
	import uniIcon from '@/components/uni-icon.vue'
	
	import { BASE_IMAGE_URL,getAllAddress } from '@/utils/api'
	import {mapState,mapMutations, mapActions, mapGetters} from 'vuex';
	
	export default {
		components: {
			uniLoadMore,
			uniNavBar,
			uniIcon
		},
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
				type: 0,
				keywords: "",
				typeIndex: 0,
				shou: 0
			}
		},
		computed:{
			...mapState({
				addressID: state => state.addressID
			})
		},
		methods: {
			changeType(index){
				this.typeIndex = index;
				this.$forceUpdate();
				this.page = 1;
				this.getList();
			},
			selectItem(index){
				if(this.type == 1){
					//从快递选择地址而来
					this.$store.dispatch("changeAddressFunc", this.list[index].addressID);
					uni.navigateBack({
						delta: 1
					});
				}else{
					this.goToChange(index);
				}
				
				
			},
			goToChange(index){
				let params = JSON.stringify(this.list[index]); // 这里转换成 字符串
				if(this.typeIndex == 0){
					uni.navigateTo({
						url: '/pages/add_address/add_address?params='+params
					});
				}else{
					uni.navigateTo({
						url: '/pages/add_address_global/add_address_global?params='+params
					});
				}
				
			},
			search(){
				uni.showToast({
				  icon: 'none',
				  title: this.keywords,
				  duration: 1000
				});
				this.page = 1;
				this.list = [];
				this.getList();
			},
			async getList(){
				let params = {
					userID: uni.getStorageSync("userInfo").userID,
					isInternationalAddress: this.typeIndex,
					page: this.page,
					keywords: this.keywords
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
			this.getList();
		},
		onLoad(options) {
			this.$store.dispatch("changeAddressFunc", 0);
			if(options.typeIndex){
				this.typeIndex = options.typeIndex;
				this.type = 1;
			};
			this.shou = options.shou;
		},
		onShow(){
			this.getList();
		},
		onNavigationBarButtonTap:function(e){
			// #ifdef APP-PLUS
				plus.key.hideSoftKeybord();
			// #endif
			if(this.typeIndex == 0){
				uni.navigateTo({
					url: '/pages/add_address/add_address?shou='+this.shou
				});
			}else{
				uni.navigateTo({
					url: '/pages/add_address_global/add_address_global'
				});
			}
        },
	}
</script>

<style>
.tag_wrap{display: flex;border-bottom:1px solid #F3F3F3;flex-direction: row; align-items: center; justify-content: center; background: #fff;margin: 10upx 0upx;}
.tag_wrap div{flex: 1;}
.tag_wrap .active span{color: #107EFF;border-bottom:1px solid #107EFF;display: inline-block;padding: 10upx 24upx;}

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

        .input_wrap {
            width: 90%;
            height: 72upx;
            margin: 10upx 5% 10upx;
            background-color: #FAFAFA;
            box-sizing: border-box;
            border-radius: 36upx;
            padding: 0rem 15upx;
            border: 2upx solid #E3E3E3;
			
        }

        .input_wrap img {
            width: 45upx;
            margin-right: 20upx;
        }

        .input_wrap input {
            border: none;
            background-color: transparent;
            margin: 0px;
            padding: 0px;
            text-align: left;
			flex: 1;
        }

        .input_wrap input .address_search {
            font-size: 28upx;
        }

        .menu_add {
            font-size: 28upx;
            color: #107EFF;
            position: absolute;
            right: 40upx;
            top: 24upx;
        }
        
        .mui-bar-nav {
            box-shadow: none;
            border-bottom: 2upx solid #E1E1E1;
        }
		
		.list_wrap {
		    padding: 0px;
		    box-sizing: border-box;
			background-color: #FFFFFF;
		}
		
		.item_wrap {
			padding-left: 20upx;
			background-color: #FFFFFF;
		}
		
		.wrap{
			padding-right: 30upx;
			border-bottom: 2upx solid #E3E3E3;
			width: 100%;
			box-sizing: border-box;
			padding-top: 10upx;
			padding-bottom: 10upx;
		}
		
		.wrap .sex{
			width: 72upx;
			height: 72upx;
			min-width: 72upx;
			min-height: 72upx;
			text-align: center;
			line-height: 72upx;
			background-color: #DCE8FF;
			font-size: 32upx;
			color: #FFFFFF;
			border-radius: 50%;
		}
		
		.wrap img{
			width: 40upx;
			min-width: 40upx;
			padding: 20upx 0upx 20upx 20upx;
		}
		
		.content_wrap{
			flex: 1;
			text-align: left;
			display: flex;
			flex-direction: column;
			padding:0px 60upx 0px 20upx;
			max-width: 500upx;
		}
		
		.content_wrap .name{
			color: #333333;
			font-size: 32upx;
		}
		
		.content_wrap .tel{
			color: #666666;
			font-size: 28upx;
			margin-left: 20upx;
		}
		
		.address{
			color: #333333;
			font-size: 28upx;
			margin-top: 10upx;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
			display: inline;
		}
		
</style>
