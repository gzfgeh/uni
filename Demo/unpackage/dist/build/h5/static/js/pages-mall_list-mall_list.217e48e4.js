(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-mall_list-mall_list"],{"082d":function(t,e,i){var a=i("7513");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var n=i("4f06").default;n("77b3e06f",a,!0,{sourceMap:!1,shadowMode:!1})},2366:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={name:"load-more",props:{loadingType:{type:Number,default:0},showImage:{type:Boolean,default:!0},color:{type:String,default:"#777777"},contentText:{type:Object,default:function(){return{contentdown:"上拉显示更多",contentrefresh:"正在加载...",contentnomore:"没有更多数据了"}}}},data:function(){return{}}};e.default=a},2923:function(t,e,i){"use strict";i.r(e);var a=i("445e"),n=i("84c2");for(var o in n)"default"!==o&&function(t){i.d(e,t,function(){return n[t]})}(o);i("6a15");var r=i("2877"),d=Object(r["a"])(n["default"],a["a"],a["b"],!1,null,"c552e444",null);e["default"]=d.exports},"2a46":function(t,e,i){var a=i("5467");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var n=i("4f06").default;n("7d90820e",a,!0,{sourceMap:!1,shadowMode:!1})},"445e":function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",[i("div",{staticClass:"head_wrap"},t._l(t.typeList,function(e,a){return i("div",{key:a,staticClass:"head_item row_center",on:{click:function(e){e=t.$handleEvent(e),t.changeType(a)}}},[i("span",{class:{active_type:t.curType==a}},[t._v(t._s(e))])])}),0),i("div",{staticStyle:{background:"#fff","padding-top":"100upx"}},[t._l(t.list,function(e,a){return[i("v-uni-navigator",{key:a+"_0",staticClass:"item_wrap",on:{click:function(e){e=t.$handleEvent(e),t.goToDetail(a)}}},[i("div",{staticClass:"item"},[i("img",{attrs:{src:0==t.curType?e.goods_list_img:e.logo,mode:"aspectFill"}}),i("div",{staticClass:"content_item"},[i("span",[t._v(t._s(0==t.curType?e.intro:e.desc))]),0==t.curType?i("div",{staticClass:"row_between"},[i("span",{staticClass:"price"},[t._v("￥"+t._s(e.price))])]):t._e()])])])]})],2),0==t.list.length&2==t.loadingType?i("div",{staticClass:"uni-center-item no_data_wrap"},[i("span",[t._v("暂无信息")])]):t._e(),0!=t.list.length?i("v-uni-view",{staticClass:"uni-tab-bar-loading"},[i("uni-load-more",{attrs:{loadingType:t.loadingType,contentText:t.loadingText}})],1):t._e()],1)},n=[];i.d(e,"a",function(){return a}),i.d(e,"b",function(){return n})},5250:function(t,e,i){"use strict";i.r(e);var a=i("2366"),n=i.n(a);for(var o in a)"default"!==o&&function(t){i.d(e,t,function(){return a[t]})}(o);e["default"]=n.a},5467:function(t,e,i){e=t.exports=i("2350")(!1),e.push([t.i,".load-more[data-v-1961c275]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;height:%?80?%;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center}.loading-img[data-v-1961c275]{height:24px;width:24px;margin-right:10px}.loading-text[data-v-1961c275]{font-size:%?28?%;color:#777}.loading-img>uni-view[data-v-1961c275]{position:absolute}.load1[data-v-1961c275],.load2[data-v-1961c275],.load3[data-v-1961c275]{height:24px;width:24px}.load2[data-v-1961c275]{-webkit-transform:rotate(30deg);-ms-transform:rotate(30deg);transform:rotate(30deg)}.load3[data-v-1961c275]{-webkit-transform:rotate(60deg);-ms-transform:rotate(60deg);transform:rotate(60deg)}.loading-img>uni-view uni-view[data-v-1961c275]{width:6px;height:2px;-webkit-border-top-left-radius:1px;border-top-left-radius:1px;-webkit-border-bottom-left-radius:1px;border-bottom-left-radius:1px;background:#777;position:absolute;opacity:.2;-webkit-transform-origin:50%;-ms-transform-origin:50%;transform-origin:50%;-webkit-animation:load-data-v-1961c275 1.56s ease infinite}.loading-img>uni-view uni-view[data-v-1961c275]:first-child{-webkit-transform:rotate(90deg);-ms-transform:rotate(90deg);transform:rotate(90deg);top:2px;left:9px}.loading-img>uni-view uni-view[data-v-1961c275]:nth-child(2){-webkit-transform:rotate(180deg);top:11px;right:0}.loading-img>uni-view uni-view[data-v-1961c275]:nth-child(3){-webkit-transform:rotate(270deg);-ms-transform:rotate(270deg);transform:rotate(270deg);bottom:2px;left:9px}.loading-img>uni-view uni-view[data-v-1961c275]:nth-child(4){top:11px;left:0}.load1 uni-view[data-v-1961c275]:first-child{-webkit-animation-delay:0s;animation-delay:0s}.load2 uni-view[data-v-1961c275]:first-child{-webkit-animation-delay:.13s;animation-delay:.13s}.load3 uni-view[data-v-1961c275]:first-child{-webkit-animation-delay:.26s;animation-delay:.26s}.load1 uni-view[data-v-1961c275]:nth-child(2){-webkit-animation-delay:.39s;animation-delay:.39s}.load2 uni-view[data-v-1961c275]:nth-child(2){-webkit-animation-delay:.52s;animation-delay:.52s}.load3 uni-view[data-v-1961c275]:nth-child(2){-webkit-animation-delay:.65s;animation-delay:.65s}.load1 uni-view[data-v-1961c275]:nth-child(3){-webkit-animation-delay:.78s;animation-delay:.78s}.load2 uni-view[data-v-1961c275]:nth-child(3){-webkit-animation-delay:.91s;animation-delay:.91s}.load3 uni-view[data-v-1961c275]:nth-child(3){-webkit-animation-delay:1.04s;animation-delay:1.04s}.load1 uni-view[data-v-1961c275]:nth-child(4){-webkit-animation-delay:1.17s;animation-delay:1.17s}.load2 uni-view[data-v-1961c275]:nth-child(4){-webkit-animation-delay:1.3s;animation-delay:1.3s}.load3 uni-view[data-v-1961c275]:nth-child(4){-webkit-animation-delay:1.43s;animation-delay:1.43s}@-webkit-keyframes load-data-v-1961c275{0%{opacity:1}to{opacity:.2}}",""])},6944:function(t,e,i){"use strict";var a=i("2a46"),n=i.n(a);n.a},"6a15":function(t,e,i){"use strict";var a=i("082d"),n=i.n(a);n.a},7513:function(t,e,i){e=t.exports=i("2350")(!1),e.push([t.i,".item_wrap[data-v-c552e444]{width:100%;-webkit-box-sizing:border-box;box-sizing:border-box;padding-left:%?30?%;background:#fff}.item[data-v-c552e444]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;border-bottom:#e3e3e3 solid %?2?%;padding:%?35?% %?0?%;font-size:%?28?%;color:#666}.item img[data-v-c552e444]{width:%?140?%;height:%?140?%;-webkit-border-radius:%?8?%;border-radius:%?8?%;margin-right:%?32?%}.item .content_item[data-v-c552e444]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;padding-right:%?30?%}.item .content_item .price[data-v-c552e444]{color:#ff6262;font-size:%?30?%}.head_wrap[data-v-c552e444]{width:100%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;position:fixed;left:%?0?%;background-color:#fff;border-bottom:%?2?% solid #e3e3e3;height:%?100?%;z-index:101}.head_item[data-v-c552e444]{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;padding:%?0?% %?24?%}.head_item span[data-v-c552e444]{height:%?100?%;line-height:%?100?%}.active_type[data-v-c552e444]{color:#107eff;border-bottom:%?2?% solid #107eff}",""])},"84c2":function(t,e,i){"use strict";i.r(e);var a=i("f45a"),n=i.n(a);for(var o in a)"default"!==o&&function(t){i.d(e,t,function(){return a[t]})}(o);e["default"]=n.a},a34a:function(t,e,i){t.exports=i("bbdd")},aa42:function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"load-more"},[i("v-uni-view",{directives:[{name:"show",rawName:"v-show",value:1===t.loadingType&&t.showImage,expression:"loadingType === 1 && showImage"}],staticClass:"loading-img"},[i("v-uni-view",{staticClass:"load1"},[i("v-uni-view",{style:{background:t.color}}),i("v-uni-view",{style:{background:t.color}}),i("v-uni-view",{style:{background:t.color}}),i("v-uni-view",{style:{background:t.color}})],1),i("v-uni-view",{staticClass:"load2"},[i("v-uni-view",{style:{background:t.color}}),i("v-uni-view",{style:{background:t.color}}),i("v-uni-view",{style:{background:t.color}}),i("v-uni-view",{style:{background:t.color}})],1),i("v-uni-view",{staticClass:"load3"},[i("v-uni-view",{style:{background:t.color}}),i("v-uni-view",{style:{background:t.color}}),i("v-uni-view",{style:{background:t.color}}),i("v-uni-view",{style:{background:t.color}})],1)],1),i("v-uni-text",{staticClass:"loading-text",style:{color:t.color}},[t._v(t._s(0===t.loadingType?t.contentText.contentdown:1===t.loadingType?t.contentText.contentrefresh:t.contentText.contentnomore))])],1)},n=[];i.d(e,"a",function(){return a}),i.d(e,"b",function(){return n})},bbdd:function(t,e,i){var a=function(){return this||"object"===typeof self&&self}()||Function("return this")(),n=a.regeneratorRuntime&&Object.getOwnPropertyNames(a).indexOf("regeneratorRuntime")>=0,o=n&&a.regeneratorRuntime;if(a.regeneratorRuntime=void 0,t.exports=i("96cf"),n)a.regeneratorRuntime=o;else try{delete a.regeneratorRuntime}catch(r){a.regeneratorRuntime=void 0}},e63f:function(t,e,i){"use strict";i.r(e);var a=i("aa42"),n=i("5250");for(var o in n)"default"!==o&&function(t){i.d(e,t,function(){return n[t]})}(o);i("6944");var r=i("2877"),d=Object(r["a"])(n["default"],a["a"],a["b"],!1,null,"1961c275",null);e["default"]=d.exports},f45a:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=r(i("a34a")),n=i("9797"),o=r(i("e63f"));function r(t){return t&&t.__esModule?t:{default:t}}function d(t,e,i,a,n,o,r){try{var d=t[o](r),l=d.value}catch(s){return void i(s)}d.done?e(l):Promise.resolve(l).then(a,n)}function l(t){return function(){var e=this,i=arguments;return new Promise(function(a,n){var o=t.apply(e,i);function r(t){d(o,a,n,r,l,"next",t)}function l(t){d(o,a,n,r,l,"throw",t)}r(void 0)})}}var s={components:{uniLoadMore:o.default},data:function(){return{loadingText:{contentdown:"上拉显示更多",contentrefresh:"正在加载...",contentnomore:"没有更多数据了"},list:[1,2,3,4,5],keyword:"",goods_type_id:"",loadingType:0,page:1,typeList:["商品","店铺"],curType:0}},methods:{goToDetail:function(t){0==this.curType?uni.navigateTo({url:"../mall_detail/mall_detail?goodsID="+this.list[t].id}):uni.navigateTo({url:"../mall_shop/mall_shop?storeID="+this.list[t].id})},changeType:function(t){this.curType=t,this.page=1,this.getList()},getList:function(){var t=l(a.default.mark(function t(){var e,i;return a.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return e={goods_type_id:this.goods_type_id?this.goods_type_id:"",keyword:this.keyword,page:this.page,limit:20,searchType:this.curType+1},t.next=3,(0,n.search)(e);case 3:i=t.sent,uni.stopPullDownRefresh(),1==i.status&&(1==this.page?this.list=i.data:this.list=this.list.concat(i.data),i.data.length<10?this.loadingType=2:this.loadingType=0);case 6:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}()},onReachBottom:function(){this.loadingType=1,this.page++,this.getList()},onPullDownRefresh:function(){console.log("dddddd"),this.page=1,this.getList()},onLoad:function(t){console.log(t),this.keyword=t.keyword?t.keyword:"",this.goods_type_id=t.id,console.log(this.goods_type_id),this.curType=t.type?t.type:0,this.getList()},onNavigationBarSearchInputClicked:function(t){console.log(t.text),uni.navigateTo({url:"../mall_search/mall_search?keyword="+this.keyword})}};e.default=s}}]);