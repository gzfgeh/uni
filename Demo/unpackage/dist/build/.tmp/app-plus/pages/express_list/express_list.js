(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/express_list/express_list"],{"0390":function(t,e,s){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=o(s("a34a")),r=s("692b");s("2f62");function o(t){return t&&t.__esModule?t:{default:t}}function a(t,e,s,n,r,o,a){try{var i=t[o](a),u=i.value}catch(c){return void s(c)}i.done?e(u):Promise.resolve(u).then(n,r)}function i(t){return function(){var e=this,s=arguments;return new Promise(function(n,r){var o=t.apply(e,s);function i(t){a(o,n,r,i,u,"next",t)}function u(t){a(o,n,r,i,u,"throw",t)}i(void 0)})}}var u=function(){return s.e("components/uni-load-more").then(s.bind(null,"2ba6"))},c=function(){return s.e("components/popup-pay").then(s.bind(null,"787f"))},l={components:{uniLoadMore:u,uniPopup:c},data:function(){return{loadingText:{contentdown:"上拉显示更多",contentrefresh:"正在加载...",contentnomore:"没有更多数据了"},list:[],companyCode:"",loadingType:0,page:1,popupParam:"",orderSN:"",orderID:"",allMoney:"0",selectIndex:0,keywords:"",orderStatus:0,orderStatusList:["删除","已取消","已下单","已揽收","已寄出","已签收","已打印","打印中","已评价","已支付","已退款","已推送给快递公司","待确认","退款中"],typeList:["全部","待揽件","已揽件","已寄出"],curType:0}},methods:{changeType:function(t){this.curType=t,console.log(t," at pages/express_list/express_list.vue:137"),this.orderStatus=t,this.page=1,this.getList()},payPopup:function(t){this.popupParam=t},moneyPay:function(t,e,s){this.orderSN=t,this.orderID=e,this.allMoney=s,this.popupParam="bottom"},tuikuan:function(e){var s=this;t.showModal({title:"提醒",content:"是否退款",success:function(t){t.confirm?s.moneyBack(e):t.cancel&&console.log("用户点击取消"," at pages/express_list/express_list.vue:164")}})},moneyBack:function(){var e=i(n.default.mark(function e(s){var o,a;return n.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return o={orderID:this.list[s].orderID},e.next=3,(0,r.RefundOrder)(o);case 3:a=e.sent,1==a.status?(this.page=1,this.getList()):t.showToast({icon:"none",title:a.message,duration:1e3});case 5:case"end":return e.stop()}},e,this)}));function s(t){return e.apply(this,arguments)}return s}(),actionOrder:function(e,s){var n=this;t.showModal({title:"提醒",content:1==e?"是否取消":"是否删除",success:function(t){t.confirm?n.cancelOrder(e,s):t.cancel&&console.log("用户点击取消"," at pages/express_list/express_list.vue:196")}})},cancelOrder:function(){var e=i(n.default.mark(function e(s,o){var a,i;return n.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return a={orderID:this.list[o].orderID,type:s},e.next=3,(0,r.cancelOrder)(a);case 3:i=e.sent,1==i.status?(this.page=1,this.getList()):t.showToast({icon:"none",title:i.message,duration:1e3});case 5:case"end":return e.stop()}},e,this)}));function s(t,s){return e.apply(this,arguments)}return s}(),lookDetail:function(){var e=i(n.default.mark(function e(s){var r;return n.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return this.selectIndex=s,t.navigateTo({url:"/pages/express_detail/express_detail?orderID="+this.list[s].orderID+"&orderStatus=1"}),e.abrupt("return");case 6:r=e.sent,1==r.status?t.showModal({title:"最新物流信息",content:r.data.data[0].context,showCancel:!1,success:function(t){}}):t.showModal({title:"最新物流信息",content:r.message,showCancel:!1,success:function(t){}});case 8:case"end":return e.stop()}},e,this)}));function s(t){return e.apply(this,arguments)}return s}(),getList:function(){var e=i(n.default.mark(function e(){var s,o,a;return n.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return s=t.getStorageSync("userInfo"),o={userID:s.userID,page:this.page,keywords:this.keywords,orderStatus:this.orderStatus},e.next=4,(0,r.getOrderList)(o);case 4:a=e.sent,t.stopPullDownRefresh(),1==a.status&&(a.data.map(function(t){t.newDetail="物流查询",t.wuliu=""}),1==this.page?this.list=a.data:this.list=this.list.concat(a.data),this.list.length<10?this.loadingType=2:this.loadingType=0);case 7:case"end":return e.stop()}},e,this)}));function s(){return e.apply(this,arguments)}return s}(),goToDetail:function(e){this.selectIndex=e,t.navigateTo({url:"/pages/express_detail/express_detail?orderID="+this.list[e].orderID})}},onReachBottom:function(){this.loadingType=1,this.page++,this.getList()},onPullDownRefresh:function(){console.log("dddddd"," at pages/express_list/express_list.vue:295"),this.page=1,this.getList()},onLoad:function(){},onShow:function(){this.popupParam="",this.page=1,this.getList(),this.companyCode=t.getStorageSync("userInfo").companyCode;var e=this.$store.getters.getOrderItem;console.log(e," at pages/express_list/express_list.vue:313"),e&&(this.list[this.selectIndex]=JSON.parse(e),this.$forceUpdate())},onNavigationBarSearchInputChanged:function(t){console.log(t.text," at pages/express_list/express_list.vue:321"),this.page=1,this.keywords=t.text.trim(),this.getList()},onNavigationBarButtonTap:function(){console.log("点击了自定义按钮"," at pages/express_list/express_list.vue:327");var e=this;t.scanCode({success:function(t){console.log("条码类型："+t.scanType," at pages/express_list/express_list.vue:331"),console.log("条码内容："+t.result," at pages/express_list/express_list.vue:332"),e.keywords=t.result,e.page=1,e.getList()}})}};e.default=l}).call(this,s("6e42")["default"])},"11bf":function(t,e,s){},4906:function(t,e,s){"use strict";var n=s("11bf"),r=s.n(n);r.a},"5e37":function(t,e,s){"use strict";s.r(e);var n=s("7bec"),r=s("ca0c");for(var o in r)"default"!==o&&function(t){s.d(e,t,function(){return r[t]})}(o);s("4906");var a=s("2877"),i=Object(a["a"])(r["default"],n["a"],n["b"],!1,null,null,null);e["default"]=i.exports},"7bec":function(t,e,s){"use strict";var n=function(){var t=this,e=t.$createElement,n=(t._self._c,s("9827")),r=s("7d32"),o=s("7d32"),a=s("06d0"),i=t.__map(t.list,function(e,s){var n=parseInt(e.orderStatus),r=parseFloat(e.price),o=parseFloat(e.price),a=parseInt(e.price),i=parseInt(e.orderStatus);return{$orig:t.__get_orig(e),m0:n,m4:r,m5:o,m6:a,m8:i}});t.$mp.data=Object.assign({},{$root:{m1:n,m2:r,m3:o,m7:a,l0:i}})},r=[];s.d(e,"a",function(){return n}),s.d(e,"b",function(){return r})},ca0c:function(t,e,s){"use strict";s.r(e);var n=s("0390"),r=s.n(n);for(var o in n)"default"!==o&&function(t){s.d(e,t,function(){return n[t]})}(o);e["default"]=r.a}},[["1fac","common/runtime","common/vendor"]]]);