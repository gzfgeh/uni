(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/tabbar/mall/mall"],{"76b9":function(t,e,n){"use strict";n.r(e);var a=n("fe70"),r=n.n(a);for(var i in a)"default"!==i&&function(t){n.d(e,t,function(){return a[t]})}(i);e["default"]=r.a},7719:function(t,e,n){"use strict";var a=n("aae5"),r=n.n(a);r.a},aae5:function(t,e,n){},b160:function(t,e,n){"use strict";n.r(e);var a=n("c7ab"),r=n("76b9");for(var i in r)"default"!==i&&function(t){n.d(e,t,function(){return r[t]})}(i);n("7719");var s=n("2877"),u=Object(s["a"])(r["default"],a["a"],a["b"],!1,null,"3f517248",null);e["default"]=u.exports},c7ab:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,a=(t._self._c,n("f39a")),r=n("5677"),i=n("ac50"),s=n("083f");t.$mp.data=Object.assign({},{$root:{m0:a,m1:r,m2:i,m3:s}})},r=[];n.d(e,"a",function(){return a}),n.d(e,"b",function(){return r})},fe70:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=i(n("a34a")),r=n("692b");function i(t){return t&&t.__esModule?t:{default:t}}function s(t,e,n,a,r,i,s){try{var u=t[i](s),o=u.value}catch(c){return void n(c)}u.done?e(o):Promise.resolve(o).then(a,r)}function u(t){return function(){var e=this,n=arguments;return new Promise(function(a,r){var i=t.apply(e,n);function u(t){s(i,a,r,u,o,"next",t)}function o(t){s(i,a,r,u,o,"throw",t)}u(void 0)})}}var o={data:function(){return{isAPP:!1,buildingName:"请选择楼宇",itemList:[],t_url:"",curIndex:0,contentCurIndex:0,statusBarHeight:0,typeList:[],typeIndex:0,list:[]}},onLoad:function(){this.isAPP=!0,this.getStoreTag()},onShow:function(){this.getBanners(),t.getStorageSync("userInfo").buildingName&&(this.buildingName=t.getStorageSync("userInfo").buildingName)},methods:{goToShop:function(e){this.isLogin()&&(2==e.store_show_type?t.navigateTo({url:"/pages/mall_shop_text/mall_shop_text?storeID="+e.id}):t.navigateTo({url:"/pages/mall_shop/mall_shop?storeID="+e.id}))},goToSearch:function(){t.navigateTo({url:"/pages/mall_search/mall_search?searchType=2"})},goToMallType:function(){this.isLogin()&&t.navigateTo({url:"/pages/mall_type/mall_type"})},goToCard:function(){this.isLogin()&&t.navigateTo({url:"/pages/mall_card/mall_card"})},selectBuild:function(){this.isLogin()&&t.navigateTo({url:"/pages/build/build"})},changeType:function(t){this.typeIndex=t,this.search(this.typeList[t].id)},slideChange:function(t){this.curIndex=t.mp.detail.current},search:function(){var t=u(a.default.mark(function t(e){var n;return a.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,(0,r.search)({storeTag:e,searchType:2,page:1,limit:10});case 2:n=t.sent,1==n.status&&(this.list=n.data);case 4:case"end":return t.stop()}},t,this)}));function e(e){return t.apply(this,arguments)}return e}(),getBanners:function(){var e=u(a.default.mark(function e(){var n;return a.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,(0,r.getBanners)(24,t.getStorageSync("userInfo").buildingID);case 2:n=e.sent,1==n.status&&(this.itemList=n.data);case 4:case"end":return e.stop()}},e,this)}));function n(){return e.apply(this,arguments)}return n}(),getStoreTag:function(){var t=u(a.default.mark(function t(){var e;return a.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,(0,r.getStoreTag)();case 2:e=t.sent,1==e.status&&(this.typeList=e.data,this.search(this.typeList[0].id));case 4:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}()}};e.default=o}).call(this,n("6e42")["default"])}},[["412c","common/runtime","common/vendor"]]]);