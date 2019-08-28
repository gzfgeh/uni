<template>
	<view class="content">
		<view class="search-keyword" @touchstart="blur">
			<!-- <scroll-view class="keyword-list-box" v-show="isShowKeywordList" scroll-y>
				<view class="keyword-entry" hover-class="keyword-entry-tap" v-for="row in keywordList" :key="row.keyword">
					<view class="keyword-text" @tap="doSearch(row.keyword)">
						<rich-text :nodes="row.htmlStr"></rich-text>
					</view>
					<view class="keyword-img" @tap="setkeyword(row)">
						<image src="/static/HM-search/back.png"></image>
					</view>
				</view>
			</scroll-view> -->
			<scroll-view class="keyword-box" v-show="false" scroll-y>
				<view class="keyword-block" v-if="oldKeywordList.length>0">
					<view class="keyword-list-header">
						<view>历史搜索</view>
						<view>
							<image @tap="oldDelete" src="/static/HM-search/delete.png"></image>
						</view>
					</view>
					<view class="keyword">
						<view v-for="(keyword,index) in oldKeywordList" @tap="doSearch(keyword)" :key="index">{{keyword}}</view>
					</view>
				</view>
				<view class="keyword-block">
					<view class="keyword-list-header">
						<view>热门搜索</view>
						<view>
							<image @tap="hotToggle" :src="'/static/HM-search/attention'+forbid+'.png'"></image>
						</view>
					</view>
					<view class="keyword" v-if="forbid==''">
						<view v-for="(keyword,index) in hotKeywordList" @tap="doSearch(keyword)" :key="index">{{keyword}}</view>
					</view>
					<view class="hide-hot-tis" v-else>
						<view>当前搜热门搜索已隐藏</view>
					</view>
				</view>
			</scroll-view>
			
			<block v-for="(item, index) in list" :key="index" class="row">  
				<navigator  @click="goToDetail(index)" class="search_item">  
					<text v-if="item.name">{{item.name}}</text>  
					<text v-if="item.store_name">{{item.store_name}}</text>  
				</navigator>  
			</block> 
			
				
			
		</view>
	</view>
</template>

<script>
	import { BASE_IMAGE_URL,search} from '@/utils/api'
	
	//引用mSearch组件，如不需要删除即可
	export default {
		data() {
			return {
				defaultKeyword: "",
				keyword: "",
				oldKeywordList: [],
				hotKeywordList: [],
				keywordList: [],
				forbid: '',
				isShowKeywordList: false,
				list: [],
				searchType: 1
			}
		},
		onNavigationBarButtonTap (e) {
			// #ifdef APP-PLUS
				var webview = this.$mp.page.$getAppWebview();  
				let text = webview.getTitleNViewSearchInputText();
				console.log(text);
				this.keyword = text;
				this.doSearch(text);
			// #endif
			
			// #ifdef H5
				let value = document.querySelector("input").value;
				console.log(value);
				this.keyword = value;
				this.doSearch(value);
			// #endif
			
        },
		onNavigationBarSearchInputChanged(e) {
			console.log(e.text)
			this.inputChange(e);
		},
		onNavigationBarSearchInputConfirmed(e) {
			console.log(e.text)
			this.doSearch(e.text);
		},
		onLoad(opt) {
			this.type = opt.type;
			if(this.type == 1){
				//商品列表
				this.isShowKeywordList = true;
			}else{
				this.init();
			};
			//店铺搜索还是商品搜索
			console.log(opt);
			this.keyword = opt.keyword?opt.keyword:'';
			// // #ifdef APP-PLUS
			// var webview = this.$mp.page.$getAppWebview();  
			// webview.setTitleNViewSearchInputText(opt.keyword);
			// // #endif
			// 
			// // #ifdef H5
			// setTimeout( () => {
			// 	console.log(document.querySelector(".uni-page-head-search-placeholder"))
			// 	if(this.keyword){
			// 		document.querySelector(".uni-page-head-search-placeholder").placeholder = "";
			// 	}
			// 	
			// 	document.querySelector("input").value = this.keyword?this.keyword:'';
			// 	this.$forceUpdate();
			// }, 500);
			// 
			// // #endif
			
		},
		methods: {
			goToDetail(index){
				// if(!this.list[index].price){
				// 	//店铺
				// 	uni.navigateTo({
				// 		url: '../mall_shop/mall_shop?storeID='+this.list[index].id
				// 	})
				// }else{
				// 	// 商品
				// 	uni.navigateTo({
				// 		url: '../mall_detail/mall_detail?goodsID='+this.list[index].id
				// 	})
				// }
				
				// 商品
				uni.navigateTo({
					url: '../mall_detail/mall_detail?goodsID='+this.list[index].id
				})
				
			},
			init() {
				this.loadDefaultKeyword();
				this.loadOldKeyword();
				this.loadHotKeyword();
			},
			blur(){
				uni.hideKeyboard()
			},
			//加载默认搜索关键字
			loadDefaultKeyword() {
				//定义默认搜索关键字，可以自己实现ajax请求数据再赋值,用户未输入时，以水印方式显示在输入框，直接不输入内容搜索会搜索默认关键字
				this.defaultKeyword = "默认关键字";
			},
			//加载历史搜索,自动读取本地Storage
			loadOldKeyword() {
				uni.getStorage({
					key: 'OldKeys',
					success: (res) => {
						var OldKeys = JSON.parse(res.data);
						this.oldKeywordList = OldKeys;
					}
				});
			},
			//加载热门搜索
			loadHotKeyword() {
				//定义热门搜索关键字，可以自己实现ajax请求数据再赋值
				this.hotKeywordList = ['键盘', '鼠标', '显示器', '电脑主机', '蓝牙音箱', '笔记本电脑', '鼠标垫', 'USB', 'USB3.0'];
			}, 
			//监听输入
			inputChange(event) {
				//兼容引入组件时传入参数情况
				var keyword = event.text;
				console.log(keyword);
				if (!keyword) {
					this.keywordList = [];
					this.isShowKeywordList = false;
					return;
				}
				this.isShowKeywordList = true;
				//以下示例截取淘宝的关键字，请替换成你的接口
				this.search(2, keyword);
			},
			async search(searchType, keyword){
				let params = {
					searchType: searchType,
					keyword: keyword,
					page:1,
					limit:20
				};
				let res = await search(params);
				if(res.status == 1){
					if(searchType == 2){
						//店铺搜索
						this.list = res.data;
						this.search(1, keyword);
					}else{
						//商品搜索
						this.list = this.list.concat(res.data);
					}
					
				}
			},
			//高亮关键字
			drawCorrelativeKeyword(keywords, keyword) {
				var len = keywords.length,
					keywordArr = [];
				for (var i = 0; i < len; i++) {
					var row = keywords[i];
					//定义高亮#9f9f9f
					var html = row[0].replace(keyword, "<span style='color: #9f9f9f;'>" + keyword + "</span>");
					html = '<div>' + html + '</div>';
					var tmpObj = {
						keyword: row[0],
						htmlStr: html
					};
					keywordArr.push(tmpObj)
				}
				return keywordArr;
			},
			//顶置关键字
			setkeyword(data) {
				this.keyword = data.keyword;
			},
			//清除历史搜索
			oldDelete() {
				uni.showModal({
					content: '确定清除历史搜索记录？',
					success: (res) => {
						if (res.confirm) {
							console.log('用户点击确定');
							this.oldKeywordList = [];
							uni.removeStorage({
								key: 'OldKeys'
							});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			//热门搜索开关
			hotToggle() {
				this.forbid = this.forbid ? '' : '_forbid';
			},
			//执行搜索
			doSearch(key) {
				this.keyword = key;
				//this.saveKeyword(key); //保存为历史 
				uni.navigateTo({
					url: '../mall_list/mall_list?keyword='+key+"&tab_type=1"
				})
			},
			//保存关键字到历史记录
			saveKeyword(keyword) {
				uni.getStorage({
					key: 'OldKeys',
					success: (res) => {
						console.log(res.data);
						var OldKeys = JSON.parse(res.data);
						var findIndex = OldKeys.indexOf(keyword);
						if (findIndex == -1) {
							OldKeys.unshift(keyword);
						} else {
							OldKeys.splice(findIndex, 1);
							OldKeys.unshift(keyword);
						}
						//最多10个纪录
						OldKeys.length > 10 && OldKeys.pop();
						uni.setStorageSync("OldKeys", JSON.stringify(OldKeys));
						this.oldKeywordList = OldKeys; //更新历史搜索
						console.log(keyword);
						uni.navigateTo({
							url: '../mall_list/mall_list?keyword='+keyword
						})
					},
					fail: (e) => {
						var OldKeys = [keyword];
						uni.setStorage({
							key: 'OldKeys',
							data: JSON.stringify(OldKeys)
						});
						this.oldKeywordList = OldKeys; //更新历史搜索
					}
				});
			}
		}
	}
</script>
<style>
	view{display:block;}
	.placeholder-class {color:#9e9e9e;}
	.search-keyword {width:100%;background-color:rgb(242,242,242);}
	.keyword-list-box {height:calc(100vh - 110upx);padding-top:10upx;border-radius:20upx 20upx 0 0;background-color:#fff;}
	.keyword-entry-tap {background-color:#eee;}
	.keyword-box {height:calc(100vh - 110upx);border-radius:20upx 20upx 0 0;background-color:#fff;}
	.keyword-box .keyword-block {padding:10upx 0;}
	.keyword-box .keyword-block .keyword-list-header {width:94%;padding:10upx 3%;font-size:27upx;color:#333;display:flex;justify-content:space-between;}
	.keyword-box .keyword-block .keyword-list-header image {width:40upx;height:40upx;}
	.keyword-box .keyword-block .keyword {width:94%;padding:3px 3%;display:flex;flex-flow:wrap;justify-content:flex-start;}
	.keyword-box .keyword-block .hide-hot-tis {display:flex;justify-content:center;font-size:28upx;color:#6b6b6b;}
	.keyword-box .keyword-block .keyword>view {display:flex;justify-content:center;align-items:center;border-radius:60upx;padding:0 20upx;margin:10upx 20upx 10upx 0;height:60upx;font-size:28upx;background-color:rgb(242,242,242);color:#6b6b6b;}


.search_item{padding: 20upx; border-bottom: #E3E3E3 solid 2upx;background: #FFFFFF;}
</style>
