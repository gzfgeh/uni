(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/mall_list/mall_list"],{"532b":function(t,e,n){"use strict";var i=n("b5bb"),o=n.n(i);o.a},5669:function(t,e,n){"use strict";n.r(e);var i=n("e9d7"),o=n("c1f3");for(var a in o)"default"!==a&&function(t){n.d(e,t,function(){return o[t]})}(a);n("532b");var s=n("2877"),r=Object(s["a"])(o["default"],i["a"],i["b"],!1,null,null,null);e["default"]=r.exports},a422:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=a(n("a34a")),o=n("692b");function a(t){return t&&t.__esModule?t:{default:t}}function s(t,e,n,i,o,a,s){try{var r=t[a](s),l=r.value}catch(u){return void n(u)}r.done?e(l):Promise.resolve(l).then(i,o)}function r(t){return function(){var e=this,n=arguments;return new Promise(function(i,o){var a=t.apply(e,n);function r(t){s(a,i,o,r,l,"next",t)}function l(t){s(a,i,o,r,l,"throw",t)}r(void 0)})}}var l=function(){return n.e("components/uni-load-more").then(n.bind(null,"2ba6"))},u={components:{uniLoadMore:l},data:function(){return{loadingText:{contentdown:"上拉显示更多",contentrefresh:"正在加载...",contentnomore:"没有更多数据了"},list:[1,2,3,4,5],keyword:"",loadingType:0,page:1,typeList:["店铺","商品"],curType:0,showType:0}},methods:{goToDetail:function(e){0==this.curType?t.navigateTo({url:"../mall_shop/mall_shop?storeID="+this.list[e].id}):t.navigateTo({url:"../mall_detail/mall_detail?goodsID="+this.list[e].id})},changeType:function(t){this.curType=t,this.page=1,this.getList()},getList:function(){var e=r(i.default.mark(function e(){var n,a;return i.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n={keyword:this.keyword,page:this.page,limit:20,searchType:0==this.curType?2:1},e.next=3,(0,o.search)(n);case 3:a=e.sent,t.stopPullDownRefresh(),1==a.status&&(1==this.page?this.list=a.data:this.list=this.list.concat(a.data),a.data.length<10?this.loadingType=2:this.loadingType=0);case 7:case"end":return e.stop()}},e,this)}));function n(){return e.apply(this,arguments)}return n}()},onReachBottom:function(){this.loadingType=1,this.page++,this.getList()},onPullDownRefresh:function(){console.log("dddddd"," at pages/mall_list/mall_list.vue:118"),this.page=1,this.getList()},onLoad:function(t){console.log(t," at pages/mall_list/mall_list.vue:123"),this.showType=t.type?t.type:0,1==this.showType?this.curType=0:2==this.showType?this.curType=1:this.curType=0,this.keyword=t.keyword?t.keyword:"","搜索"==this.keyword&&(this.keyword="");var e=this.$mp.page.$getAppWebview();e.setTitleNViewSearchInputText(t.keyword),this.getList()},onNavigationBarSearchInputClicked:function(e){t.navigateTo({url:"../mall_search/mall_search?keyword="+this.keyword})}};e.default=u}).call(this,n("6e42")["default"])},b5bb:function(t,e,n){},c1f3:function(t,e,n){"use strict";n.r(e);var i=n("a422"),o=n.n(i);for(var a in i)"default"!==a&&function(t){n.d(e,t,function(){return i[t]})}(a);e["default"]=o.a},e9d7:function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement;t._self._c},o=[];n.d(e,"a",function(){return i}),n.d(e,"b",function(){return o})}},[["db9d","common/runtime","common/vendor"]]]);