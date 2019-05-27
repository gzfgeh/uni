<template>
	<view>
		<block  v-for="(item,index) in list" :key="index" >
			<div class="item_wrap">
				<div class="row_between wrap">
					<span class="sex">123</span>
					<div class="content_wrap">
						<span class="name">王先生 
							<span class="tel">1380013000</span>
						</span>
						<span class="address">上海普陀区金沙江路1518弄近铁城市广场 100室</span>
					</div>
					<img  src="../../static/img/edit_address_icon.png" mode="widthFix">
				</div>
			</div>
		</block>	
		<div v-if="list.length == 0" class=" no_data_wrap">
			<span>暂无订单信息</span>
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
				list: [1,2,3,4,5,6,7,8,9,0,11,22,33,44],
				loadingType: 0,
				page: 1
			}
		},
		methods: {
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
            margin: 10upx 5% 2upx;
            background-color: #FAFAFA;
            box-sizing: border-box;
            border-radius: 36upx;
            padding: 0rem 3upx;
            border: 2upx solid #E3E3E3;
			
        }

        .input_wrap img {
            width: 28upx;
            margin-right: 20upx;
        }

        .input_wrap input {
            border: none;
            background-color: transparent;
            margin: 0px;
            padding: 0px;
            text-align: left;
        }

        .input_wrap input.address_search {
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
			height: 200upx;
			width: 100%;
			box-sizing: border-box;
		}
		
		.wrap .sex{
			width: 72upx;
			height: 72upx;
			text-align: center;
			line-height: 72upx;
			background-color: #DCE8FF;
			font-size: 32upx;
			color: #FFFFFF;
			border-radius: 50%;
		}
		
		.wrap img{
			width: 40upx;
			height: 40upx;
		}
		
		.content_wrap{
			flex: 1;
			text-align: left;
			display: flex;
			flex-direction: column;
			padding:0px 60upx 0px 20upx;
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
		}
		
</style>
