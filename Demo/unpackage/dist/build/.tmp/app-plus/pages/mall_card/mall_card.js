(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/mall_card/mall_card"],{"203a":function(t,e,a){"use strict";a.r(e);var s=a("6eb7"),o=a("6211");for(var n in o)"default"!==n&&function(t){a.d(e,t,function(){return o[t]})}(n);a("3225");var i=a("2877"),r=Object(i["a"])(o["default"],s["a"],s["b"],!1,null,null,null);e["default"]=r.exports},3225:function(t,e,a){"use strict";var s=a("3d7e"),o=a.n(s);o.a},"3d7e":function(t,e,a){},6211:function(t,e,a){"use strict";a.r(e);var s=a("e7ba"),o=a.n(s);for(var n in s)"default"!==n&&function(t){a.d(e,t,function(){return s[t]})}(n);e["default"]=o.a},"6eb7":function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,s=(t._self._c,a("8378")),o=a("ea71"),n=a("b766");t.$mp.data=Object.assign({},{$root:{m0:s,m1:o,m2:n}})},o=[];a.d(e,"a",function(){return s}),a.d(e,"b",function(){return o})},e7ba:function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var s=n(a("a34a")),o=a("692b");function n(t){return t&&t.__esModule?t:{default:t}}function i(t,e,a,s,o,n,i){try{var r=t[n](i),c=r.value}catch(l){return void a(l)}r.done?e(c):Promise.resolve(c).then(s,o)}function r(t){return function(){var e=this,a=arguments;return new Promise(function(s,o){var n=t.apply(e,a);function r(t){i(n,s,o,r,c,"next",t)}function c(t){i(n,s,o,r,c,"throw",t)}r(void 0)})}}var c={data:function(){return{list:[],companyCode:"",loadingType:0,page:1,popupParam:"",orderSN:"",orderID:"",allPrice:"0",allNum:0,allStatus:!1,indexList:[],curType:0,shopcartIDs:[]}},methods:{payPopup:function(t){this.popupParam=t},couponList:function(){var e=r(s.default.mark(function e(){var a,n,i=this;return s.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return a={userID:t.getStorageSync("userInfo").userID,shopcartID:this.shopcartIDs},e.next=3,(0,o.couponList)(a);case 3:n=e.sent,1==n.status&&(this.list.map(function(t,e){var a=0;for(a=0;a<e;a++)if(i.list[a].goods_id==t.goods_id){t.coupon=null;break}a==e&&(t.coupon=n.data[e].coupon)}),this.$forceUpdate());case 5:case"end":return e.stop()}},e,this)}));function a(){return e.apply(this,arguments)}return a}(),shopcartDel:function(){var e=r(s.default.mark(function e(){var a,n,i,r;return s.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(0!=this.indexList.length){e.next=3;break}return wx.showToast({title:"没有选择商品",icon:"none",duration:1e3}),e.abrupt("return");case 3:return a=[],n=this,this.indexList.map(function(t){a.push(n.list[parseInt(t)].id)}),i={user_id:t.getStorageSync("userInfo").userID,shopcartID:a},e.next=10,(0,o.shopcartDel)(i);case 10:r=e.sent,1==r.status?(wx.showToast({title:"删除成功",icon:"none",duration:1e3}),this.getList()):wx.showToast({title:r.message,icon:"none",duration:1e3});case 12:case"end":return e.stop()}},e,this)}));function a(){return e.apply(this,arguments)}return a}(),goToPost:function(){if(0!=this.allPrice){var e=this,a=[],s=[],o=[];this.indexList.map(function(t){e.list[parseInt(t)].goods_id,e.list[parseInt(t)].store_id,e.list[parseInt(t)].count,e.list[parseInt(t)].price,e.list[parseInt(t)].spec_name;o.push(e.list[parseInt(t)].id),e.list[parseInt(t)].coupon&&s.push(e.list[parseInt(t)].id),a.push(e.list[parseInt(t)])});var n={user_id:t.getStorageSync("userInfo").userID,shopcartID:o,coupon_shopcart_id:s,addressID:""};t.setStorageSync("params",n),t.setStorageSync("selectItems",a),t.navigateTo({url:"../mall_post/mall_post"})}else wx.showToast({title:"没有选择商品",icon:"none",duration:1e3})},getList:function(){var e=r(s.default.mark(function e(){var a,n,i,r,c=this;return s.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return a=t.getStorageSync("userInfo"),n={user_id:a.userID},i=this,i.shopcartIDs=[],this.list=[],e.next=7,(0,o.shopcart_list)(n);case 7:r=e.sent,1==r.status&&(r.list.map(function(t){t.goodsInfo.map(function(e,a){if(e.checked=!1,i.shopcartIDs.push(e.id),c.list.push(e),console.log(e,a," at pages/mall_card/mall_card.vue:196"),0==a)e.coupon&&e.coupon.price?e.money=parseFloat(parseFloat(e.price)*parseFloat(e.count)-parseFloat(e.coupon.price)).toFixed(2):(e.money=parseFloat(parseFloat(e.price)*parseFloat(e.count)).toFixed(2),e.coupon=null);else{var s=0;for(s=0;s<a;s++)e.goods_id==t.goodsInfo[s].goods_id&&(e.money=parseFloat(parseFloat(e.price)*parseFloat(e.count)).toFixed(2),e.coupon=null);s==a&&e.coupon&&e.coupon.price?e.money=parseFloat(parseFloat(e.price)*parseFloat(e.count)-parseFloat(e.coupon.price)).toFixed(2):(e.money=parseFloat(parseFloat(e.price)*parseFloat(e.count)).toFixed(2),e.coupon=null)}c.allMoney+=parseFloat(e.money)})}),console.log(this.list," at pages/mall_card/mall_card.vue:223"),this.calcStatus());case 9:case"end":return e.stop()}},e,this)}));function a(){return e.apply(this,arguments)}return a}(),reduceAction:function(t){this.addCart(t,1)},addAction:function(t){this.addCart(t,0)},addCart:function(){var t=r(s.default.mark(function t(e,a){var n,i;return s.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return 0==a?this.list[e].count++:1!=this.list[e].count&&this.list[e].count--,n={user_id:wx.getStorageSync("userInfo").userID,goods_id:this.list[e].goods_id,store_id:this.list[e].store_id,spec:this.list[e].spec_name,count:this.list[e].count,price:this.list[e].price},t.next=5,(0,o.shopcart)(n);case 5:i=t.sent,1==i.status?this.calcStatus():wx.showToast({title:i.message,icon:"none",duration:1e3});case 7:case"end":return t.stop()}},t,this)}));function e(e,a){return t.apply(this,arguments)}return e}(),goToDetail:function(t){this.list[t].checked=!this.list[t].checked,this.calcStatus()},calcStatus:function(){var t=this;this.allNum=0,this.allPrice=0,this.indexList=[],this.allStatus=!1,console.log(this.list," at pages/mall_card/mall_card.vue:273"),this.list.map(function(e,a){e.checked&&(t.allNum++,e.coupon&&e.coupon.price?t.allPrice=parseFloat(parseFloat(t.allPrice)+parseFloat(e.price*e.count)-parseFloat(e.coupon.price)).toFixed(2):t.allPrice=parseFloat(parseFloat(t.allPrice)+parseFloat(e.price*e.count)).toFixed(2),t.indexList.push(a)),t.allNum==t.list.length?t.allStatus=!0:t.allStatus=!1})},allStatusChange:function(){var t=this;this.allStatus=!this.allStatus,this.allPrice=0,this.allNum=this.list.length,this.list.map(function(e,a){t.allStatus?(e.checked=!0,e.coupon&&e.coupon.price?t.allPrice=parseFloat(parseFloat(t.allPrice)+parseFloat(e.price*e.count)-parseFloat(e.coupon.price)).toFixed(2):t.allPrice=parseFloat(parseFloat(t.allPrice)+parseFloat(e.price*e.count)).toFixed(2),t.indexList.push(a)):(e.checked=!1,t.indexList=[],t.allPrice=0)})}},onLoad:function(){this.getList()},onNavigationBarButtonTap:function(e){var a=this;0!=this.indexList.length?t.showModal({title:"提示",content:"确认是否删除",success:function(t){t.confirm&&a.shopcartDel()}}):wx.showToast({title:"没有选择商品",icon:"none",duration:1e3})}};e.default=c}).call(this,a("6e42")["default"])}},[["aaf5","common/runtime","common/vendor"]]]);