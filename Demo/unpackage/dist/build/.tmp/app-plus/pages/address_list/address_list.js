(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/address_list/address_list"],{"2e10":function(t,e,n){"use strict";n.r(e);var a=n("4acd"),s=n.n(a);for(var o in a)"default"!==o&&function(t){n.d(e,t,function(){return a[t]})}(o);e["default"]=s.a},"413f":function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,a=(t._self._c,n("d3e2")),s=n("ae3f");t.$mp.data=Object.assign({},{$root:{m0:a,m1:s}})},s=[];n.d(e,"a",function(){return a}),n.d(e,"b",function(){return s})},"4acd":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=i(n("a34a")),s=n("692b"),o=n("2f62");function i(t){return t&&t.__esModule?t:{default:t}}function r(t,e,n,a,s,o,i){try{var r=t[o](i),d=r.value}catch(u){return void n(u)}r.done?e(d):Promise.resolve(d).then(a,s)}function d(t){return function(){var e=this,n=arguments;return new Promise(function(a,s){var o=t.apply(e,n);function i(t){r(o,a,s,i,d,"next",t)}function d(t){r(o,a,s,i,d,"throw",t)}i(void 0)})}}function u(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{},a=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(a=a.concat(Object.getOwnPropertySymbols(n).filter(function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),a.forEach(function(e){c(t,e,n[e])})}return t}function c(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var l=function(){return n.e("components/uni-load-more").then(n.bind(null,"2ba6"))},f=function(){return n.e("components/uni-nav-bar").then(n.bind(null,"9017"))},h=function(){return n.e("components/uni-icon").then(n.bind(null,"22a9"))},p={components:{uniLoadMore:l,uniNavBar:f,uniIcon:h},data:function(){return{loadingText:{contentdown:"上拉显示更多",contentrefresh:"正在加载...",contentnomore:"没有更多数据了"},list:[],loadingType:0,page:1,type:0,keywords:"",typeIndex:0,shou:0}},computed:u({},(0,o.mapState)({addressID:function(t){return t.addressID}})),methods:{changeType:function(t){this.typeIndex=t,this.$forceUpdate(),this.page=1,this.getList()},selectItem:function(e){1==this.type?(this.$store.dispatch("changeAddressFunc",this.list[e].addressID),t.navigateBack({delta:1})):this.goToChange(e)},goToChange:function(e){var n=JSON.stringify(this.list[e]);0==this.typeIndex?t.navigateTo({url:"/pages/add_address/add_address?params="+n}):t.navigateTo({url:"/pages/add_address_global/add_address_global?params="+n})},search:function(){t.showToast({icon:"none",title:this.keywords,duration:1e3}),this.page=1,this.list=[],this.getList()},getList:function(){var e=d(a.default.mark(function e(){var n,o;return a.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n={userID:t.getStorageSync("userInfo").userID,isInternationalAddress:this.typeIndex,page:this.page,keywords:this.keywords},e.next=3,(0,s.getAllAddress)(n);case 3:o=e.sent,t.stopPullDownRefresh(),1==o.status&&(1==this.page?this.list=o.data:this.list=this.list.concat(o.data),this.list.length<10?this.loadingType=2:this.loadingType=0);case 6:case"end":return e.stop()}},e,this)}));function n(){return e.apply(this,arguments)}return n}()},onReachBottom:function(){this.loadingType=1,this.page++,this.getList()},onPullDownRefresh:function(){console.log("dddddd"," at pages/address_list/address_list.vue:154"),this.page=1,this.getList()},onLoad:function(t){this.$store.dispatch("changeAddressFunc",0),t.typeIndex&&(this.typeIndex=t.typeIndex,this.type=1),this.shou=t.shou},onShow:function(){this.getList()},onNavigationBarButtonTap:function(e){plus.key.hideSoftKeybord(),0==this.typeIndex?t.navigateTo({url:"/pages/add_address/add_address?shou="+this.shou}):t.navigateTo({url:"/pages/add_address_global/add_address_global"})}};e.default=p}).call(this,n("6e42")["default"])},"94cc":function(t,e,n){"use strict";n.r(e);var a=n("413f"),s=n("2e10");for(var o in s)"default"!==o&&function(t){n.d(e,t,function(){return s[t]})}(o);n("acec");var i=n("2877"),r=Object(i["a"])(s["default"],a["a"],a["b"],!1,null,null,null);e["default"]=r.exports},acec:function(t,e,n){"use strict";var a=n("baad"),s=n.n(a);s.a},baad:function(t,e,n){}},[["5098","common/runtime","common/vendor"]]]);