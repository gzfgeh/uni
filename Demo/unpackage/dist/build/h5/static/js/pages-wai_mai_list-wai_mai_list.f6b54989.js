(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-wai_mai_list-wai_mai_list"],{"211e":function(t,i,e){"use strict";var a=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("v-uni-view",[t._l(t.list,function(i,a){return e("v-uni-navigator",{key:a,on:{click:function(i){i=t.$handleEvent(i),t.goToDetail(a)}}},[e("div",{staticClass:"item_wrap"},[e("div",{staticClass:"row"},[e("div",{staticClass:"title_wrap"},[e("span",[t._v("订单编号："+t._s(i.orderSN))]),e("span",{staticClass:"time"},[t._v("下单时间："+t._s(i.payTime))])])]),e("div",{staticClass:"money_wrap"},[e("span",[t._v("金额：￥")]),e("span",{staticClass:"money"},[t._v(t._s(i.price))])]),e("v-uni-view",{staticClass:"uni-uploader-body"},[e("v-uni-view",{staticClass:"uni-uploader__files"},[t._l(i.img,function(i,a){return[e("v-uni-view",{key:a+"_0",staticClass:"uni-uploader__file",staticStyle:{position:"relative",width:"180upx",height:"180upx"}},[e("v-uni-image",{staticClass:"uni-uploader__img",staticStyle:{width:"180upx",height:"180upx"},attrs:{src:i},on:{click:function(i){i=t.$handleEvent(i),t.previewImage(i)}}})],1)]})],2)],1)],1)])}),0==t.list.length&&2==t.loadingType?e("div",{staticClass:"uni-center-item no_data_wrap"},[e("span",[t._v("暂无数据")])]):t._e(),0!=t.list.length?e("v-uni-view",{staticClass:"uni-tab-bar-loading"},[e("uni-load-more",{attrs:{loadingType:t.loadingType,contentText:t.loadingText}})],1):t._e()],2)},n=[];e.d(i,"a",function(){return a}),e.d(i,"b",function(){return n})},2366:function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var a={name:"load-more",props:{loadingType:{type:Number,default:0},showImage:{type:Boolean,default:!0},color:{type:String,default:"#777777"},contentText:{type:Object,default:function(){return{contentdown:"上拉显示更多",contentrefresh:"正在加载...",contentnomore:"没有更多数据了"}}}},data:function(){return{}}};i.default=a},"2a46":function(t,i,e){var a=e("5467");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var n=e("4f06").default;n("7d90820e",a,!0,{sourceMap:!1,shadowMode:!1})},"4cdb":function(t,i,e){"use strict";e.r(i);var a=e("211e"),n=e("73f1");for(var o in n)"default"!==o&&function(t){e.d(i,t,function(){return n[t]})}(o);e("bd35");var r=e("2877"),d=Object(r["a"])(n["default"],a["a"],a["b"],!1,null,"f736ad3c",null);i["default"]=d.exports},5250:function(t,i,e){"use strict";e.r(i);var a=e("2366"),n=e.n(a);for(var o in a)"default"!==o&&function(t){e.d(i,t,function(){return a[t]})}(o);i["default"]=n.a},5467:function(t,i,e){i=t.exports=e("2350")(!1),i.push([t.i,".load-more[data-v-1961c275]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;height:%?80?%;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center}.loading-img[data-v-1961c275]{height:24px;width:24px;margin-right:10px}.loading-text[data-v-1961c275]{font-size:%?28?%;color:#777}.loading-img>uni-view[data-v-1961c275]{position:absolute}.load1[data-v-1961c275],.load2[data-v-1961c275],.load3[data-v-1961c275]{height:24px;width:24px}.load2[data-v-1961c275]{-webkit-transform:rotate(30deg);-ms-transform:rotate(30deg);transform:rotate(30deg)}.load3[data-v-1961c275]{-webkit-transform:rotate(60deg);-ms-transform:rotate(60deg);transform:rotate(60deg)}.loading-img>uni-view uni-view[data-v-1961c275]{width:6px;height:2px;-webkit-border-top-left-radius:1px;border-top-left-radius:1px;-webkit-border-bottom-left-radius:1px;border-bottom-left-radius:1px;background:#777;position:absolute;opacity:.2;-webkit-transform-origin:50%;-ms-transform-origin:50%;transform-origin:50%;-webkit-animation:load-data-v-1961c275 1.56s ease infinite}.loading-img>uni-view uni-view[data-v-1961c275]:first-child{-webkit-transform:rotate(90deg);-ms-transform:rotate(90deg);transform:rotate(90deg);top:2px;left:9px}.loading-img>uni-view uni-view[data-v-1961c275]:nth-child(2){-webkit-transform:rotate(180deg);top:11px;right:0}.loading-img>uni-view uni-view[data-v-1961c275]:nth-child(3){-webkit-transform:rotate(270deg);-ms-transform:rotate(270deg);transform:rotate(270deg);bottom:2px;left:9px}.loading-img>uni-view uni-view[data-v-1961c275]:nth-child(4){top:11px;left:0}.load1 uni-view[data-v-1961c275]:first-child{-webkit-animation-delay:0s;animation-delay:0s}.load2 uni-view[data-v-1961c275]:first-child{-webkit-animation-delay:.13s;animation-delay:.13s}.load3 uni-view[data-v-1961c275]:first-child{-webkit-animation-delay:.26s;animation-delay:.26s}.load1 uni-view[data-v-1961c275]:nth-child(2){-webkit-animation-delay:.39s;animation-delay:.39s}.load2 uni-view[data-v-1961c275]:nth-child(2){-webkit-animation-delay:.52s;animation-delay:.52s}.load3 uni-view[data-v-1961c275]:nth-child(2){-webkit-animation-delay:.65s;animation-delay:.65s}.load1 uni-view[data-v-1961c275]:nth-child(3){-webkit-animation-delay:.78s;animation-delay:.78s}.load2 uni-view[data-v-1961c275]:nth-child(3){-webkit-animation-delay:.91s;animation-delay:.91s}.load3 uni-view[data-v-1961c275]:nth-child(3){-webkit-animation-delay:1.04s;animation-delay:1.04s}.load1 uni-view[data-v-1961c275]:nth-child(4){-webkit-animation-delay:1.17s;animation-delay:1.17s}.load2 uni-view[data-v-1961c275]:nth-child(4){-webkit-animation-delay:1.3s;animation-delay:1.3s}.load3 uni-view[data-v-1961c275]:nth-child(4){-webkit-animation-delay:1.43s;animation-delay:1.43s}@-webkit-keyframes load-data-v-1961c275{0%{opacity:1}to{opacity:.2}}",""])},"68cd":function(t,i,e){i=t.exports=e("2350")(!1),i.push([t.i,"uni-page-body[data-v-f736ad3c]{background:#f8f8f8}.item_wrap[data-v-f736ad3c]{background:#fff;border:1px solid #f3f3f3;-webkit-box-shadow:0 4px 12px 0 rgba(126,124,125,.14);box-shadow:0 4px 12px 0 rgba(126,124,125,.14);-webkit-border-radius:8px;border-radius:8px;padding:%?20?%;color:#999;font-size:%?28?%;margin:%?20?% %?30?%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column}.item_wrap img[data-v-f736ad3c]{width:%?140?%;height:%?140?%;margin-right:%?32?%}.title_wrap[data-v-f736ad3c]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;color:#333;font-size:%?28?%}.title_wrap .time[data-v-f736ad3c]{color:#666;font-size:%?24?%;margin-top:%?20?%}.money_wrap[data-v-f736ad3c]{text-align:right;color:#323333;font-size:%?28?%}.money_wrap .money[data-v-f736ad3c]{font-size:%?36?%}body.?%PAGE?%[data-v-f736ad3c]{background:#f8f8f8}",""])},6944:function(t,i,e){"use strict";var a=e("2a46"),n=e.n(a);n.a},"73f1":function(t,i,e){"use strict";e.r(i);var a=e("b37a"),n=e.n(a);for(var o in a)"default"!==o&&function(t){e.d(i,t,function(){return a[t]})}(o);i["default"]=n.a},a34a:function(t,i,e){t.exports=e("bbdd")},aa42:function(t,i,e){"use strict";var a=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("v-uni-view",{staticClass:"load-more"},[e("v-uni-view",{directives:[{name:"show",rawName:"v-show",value:1===t.loadingType&&t.showImage,expression:"loadingType === 1 && showImage"}],staticClass:"loading-img"},[e("v-uni-view",{staticClass:"load1"},[e("v-uni-view",{style:{background:t.color}}),e("v-uni-view",{style:{background:t.color}}),e("v-uni-view",{style:{background:t.color}}),e("v-uni-view",{style:{background:t.color}})],1),e("v-uni-view",{staticClass:"load2"},[e("v-uni-view",{style:{background:t.color}}),e("v-uni-view",{style:{background:t.color}}),e("v-uni-view",{style:{background:t.color}}),e("v-uni-view",{style:{background:t.color}})],1),e("v-uni-view",{staticClass:"load3"},[e("v-uni-view",{style:{background:t.color}}),e("v-uni-view",{style:{background:t.color}}),e("v-uni-view",{style:{background:t.color}}),e("v-uni-view",{style:{background:t.color}})],1)],1),e("v-uni-text",{staticClass:"loading-text",style:{color:t.color}},[t._v(t._s(0===t.loadingType?t.contentText.contentdown:1===t.loadingType?t.contentText.contentrefresh:t.contentText.contentnomore))])],1)},n=[];e.d(i,"a",function(){return a}),e.d(i,"b",function(){return n})},b37a:function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var a=r(e("a34a")),n=e("9797"),o=r(e("e63f"));function r(t){return t&&t.__esModule?t:{default:t}}function d(t,i,e,a,n,o,r){try{var d=t[o](r),l=d.value}catch(s){return void e(s)}d.done?i(l):Promise.resolve(l).then(a,n)}function l(t){return function(){var i=this,e=arguments;return new Promise(function(a,n){var o=t.apply(i,e);function r(t){d(o,a,n,r,l,"next",t)}function l(t){d(o,a,n,r,l,"throw",t)}r(void 0)})}}var s={components:{uniLoadMore:o.default},data:function(){return{loadingText:{contentdown:"上拉显示更多",contentrefresh:"正在加载...",contentnomore:"没有更多数据了"},list:[],loadingType:0,page:1}},methods:{goToDetail:function(t){uni.navigateTo({url:"/pages/wai_mai_detail/wai_mai_detail?orderID="+this.list[t].orderID})},getList:function(){var t=l(a.default.mark(function t(){var i,e;return a.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return i={userID:uni.getStorageSync("userInfo").userID,page:this.page,limit:20},t.next=3,(0,n.orderList_takeout)(i);case 3:e=t.sent,uni.stopPullDownRefresh(),1==e.status?(1==this.page?this.list=e.data:this.list=this.list.concat(e.data),this.list.map(function(t){t.isClicked=!1}),this.list.length<20?this.loadingType=2:this.loadingType=0):this.loadingType=2;case 6:case"end":return t.stop()}},t,this)}));function i(){return t.apply(this,arguments)}return i}()},onReachBottom:function(){this.loadingType=1,this.page++,this.getList()},onPullDownRefresh:function(){console.log("dddddd"),this.loadingType=0,this.page=1,this.getList()},onLoad:function(){this.getList()}};i.default=s},bbdd:function(t,i,e){var a=function(){return this||"object"===typeof self&&self}()||Function("return this")(),n=a.regeneratorRuntime&&Object.getOwnPropertyNames(a).indexOf("regeneratorRuntime")>=0,o=n&&a.regeneratorRuntime;if(a.regeneratorRuntime=void 0,t.exports=e("96cf"),n)a.regeneratorRuntime=o;else try{delete a.regeneratorRuntime}catch(r){a.regeneratorRuntime=void 0}},bd35:function(t,i,e){"use strict";var a=e("fc7f"),n=e.n(a);n.a},e63f:function(t,i,e){"use strict";e.r(i);var a=e("aa42"),n=e("5250");for(var o in n)"default"!==o&&function(t){e.d(i,t,function(){return n[t]})}(o);e("6944");var r=e("2877"),d=Object(r["a"])(n["default"],a["a"],a["b"],!1,null,"1961c275",null);i["default"]=d.exports},fc7f:function(t,i,e){var a=e("68cd");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var n=e("4f06").default;n("8d93a83a",a,!0,{sourceMap:!1,shadowMode:!1})}}]);