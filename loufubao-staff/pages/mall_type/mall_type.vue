<template>
	<view class="container">
		<view class="page-body">
			<scroll-view class="nav-left" scroll-y :style="'height:'+height+'px'">
				<view class="nav-left-item" @click="categoryClickMain(item,index)" :key="index" :class="index==categoryActive?'active':''"
				    v-for="(item,index) in categoryList">
					<span class="left_line" v-if="index==categoryActive"></span>
					{{item.name}}
				</view>
			</scroll-view>
			<scroll-view class="nav-right" scroll-y :scroll-top="scrollTop" @scroll="scroll" :style="'height:'+height+'px'" scroll-with-animation>
				<navigator :id="index===0?'first':''" class="nav-right-item" :url="'../mall_list/mall_list?type=1&id='+item.id"
				v-for="(item,index) in subCategoryList" :key="index">
					<image :src="item.img" />
					<view>{{item.name}}</view>
				</navigator>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import { BASE_IMAGE_URL,getStoreType} from '@/utils/api'
	export default {
		data() {
			return {
				categoryList: [],
				subCategoryList: [],
				height: 0,
				categoryActive: 0,
				scrollTop: 0,
				scrollHeight: 0,
				name: "七月_"
			}
		},
		methods: {
			scroll(e) {
				this.scrollHeight = e.detail.scrollHeight;
			},
			categoryClickMain(categroy, index) {
				this.categoryActive = index;
				this.subCategoryList = categroy.children;
				this.scrollTop = -this.scrollHeight * index;
			},
			async getStoreType(){
				let res = await getStoreType();
				if(res.status == 1){
					this.categoryList = res.data;
					this.subCategoryList = this.categoryList[0].children;
				}
			},
		},
		onLoad: function () {
			this.height = uni.getSystemInfoSync().windowHeight;
			this.getStoreType();
			
			// #ifdef H5
				setTimeout( () => {
					console.log(document.querySelector(".uni-page-head-search-placeholder"))
					document.querySelector(".uni-page-head-search-placeholder").style.visibility = "visible";
					document.querySelector("input").placeholder = "";
					this.$forceUpdate();
				}, 500)
				
				// #endif
				
		},
		onNavigationBarSearchInputClicked (e) {
            
			uni.navigateTo({
				url: '../mall_search/mall_search?searchType=1'
			})
        }
		
	}
</script>

<style>
	.page-body {
		display: flex;
	}

	.nav {
		display: flex;
		width: 100%;
	}

	.nav-left {
		width: 30%;
		background: #F9F9F9;
	}

	.nav-left-item {
		height: 100upx;
		border-right: solid 1px #E0E0E0;
		border-bottom: solid 1px #E0E0E0;
		font-size: 30upx;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
	}
	
	.nav-left-item .left_line{
		height: 40upx; position: absolute; top: 30upx; left: 0upx; width: 8upx; background: #007AFF;
		border-radius: 4upx;
	}

	.nav-right {
		width: 70%;
	}

	.nav-right-item {
		width: 28%;
		height: 220upx;
		float: left;
		text-align: center;
		padding: 11upx;
		font-size: 28upx;
	}

	.nav-right-item image {
		width: 100upx;
		height: 100upx;
	}

	.active {
		color: #007AFF;
		background: #FFFFFF;
		border-right: none;
	}
</style>
