(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-main-main"],{"05ac":function(n,t,a){t=n.exports=a("2350")(!1),t.push([n.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nuni-page-body[data-v-0118556d]{height:100%;background-color:#f6f6f8!important}.tab_bar[data-v-0118556d]{height:%?100?%;line-height:%?100?%;background-color:#fff;position:relative;font-size:%?28?%;color:rgba(0,0,0,.4)}.tab_text[data-v-0118556d]{color:#427dff}.swiper-tab-list[data-v-0118556d]{position:relative;color:rgba(0,0,0,.4)}.line[data-v-0118556d]{height:%?6?%;width:%?34?%;position:absolute;bottom:%?-24?%;z-index:1;background-color:#427dff;left:%?60?%}.item_wrap[data-v-0118556d]{-webkit-box-sizing:border-box;box-sizing:border-box;margin:%?30?%;-webkit-border-radius:%?12?%;border-radius:%?12?%;-webkit-box-shadow:0 0 %?14?% 0 hsla(0,0%,87.1%,.5);box-shadow:0 0 %?14?% 0 hsla(0,0%,87.1%,.5);background-color:#fff;padding-top:%?36?%;padding-left:%?34?%;padding-right:%?34?%;color:#9f9f9f;font-size:%?26?%;position:relative}.item_content_wrap[data-v-0118556d]{border-bottom:%?4?% solid #f1f1f1}.item_title[data-v-0118556d]{color:#4d4d4d;font-size:%?34?%;margin-bottom:%?16?%}.item_name[data-v-0118556d]{margin-bottom:%?24?%}.bottom_wrap[data-v-0118556d]{text-align:center;padding-top:%?16?%;-webkit-box-sizing:border-box;box-sizing:border-box;height:%?80?%;color:#3a7ff7;font-size:%?26?%}.bottom_action[data-v-0118556d]{padding:%?8?% %?24?%;background-color:#e9f3fb;-webkit-border-radius:%?26?%;border-radius:%?26?%}.item_wrap img[data-v-0118556d]{width:%?188?%;height:%?164?%;position:absolute;top:%?22?%;right:%?20?%;padding:%?16?% %?10?%;-webkit-box-sizing:border-box;box-sizing:border-box}",""])},"06d8":function(n,t,a){"use strict";a.r(t);var i=a("de76"),e=a("50ce");for(var o in e)"default"!==o&&function(n){a.d(t,n,function(){return e[n]})}(o);a("24bf");var r=a("2877"),d=Object(r["a"])(e["default"],i["a"],i["b"],!1,null,"16c4b028",null);t["default"]=d.exports},"0803":function(n,t,a){var i=a("bac8");"string"===typeof i&&(i=[[n.i,i,""]]),i.locals&&(n.exports=i.locals);var e=a("4f06").default;e("5cd98092",i,!0,{sourceMap:!1,shadowMode:!1})},"1c67":function(n,t,a){var i=a("05ac");"string"===typeof i&&(i=[[n.i,i,""]]),i.locals&&(n.exports=i.locals);var e=a("4f06").default;e("93b4b734",i,!0,{sourceMap:!1,shadowMode:!1})},"22a9":function(n,t,a){"use strict";a.r(t);var i=a("4ee9"),e=a("6d22");for(var o in e)"default"!==o&&function(n){a.d(t,n,function(){return e[n]})}(o);a("9a92");var r=a("2877"),d=Object(r["a"])(e["default"],i["a"],i["b"],!1,null,"0118556d",null);t["default"]=d.exports},"24bf":function(n,t,a){"use strict";var i=a("0803"),e=a.n(i);e.a},"46e7":function(n,t,a){n.exports=a.p+"static/img/read_pay.4da9ebb6.png"},"4ee9":function(n,t,a){"use strict";var i=function(){var n=this,t=n.$createElement,i=n._self._c||t;return i("v-uni-view",{staticClass:"uni-tab-bar"},[i("div",{staticClass:"uni-center-item tab_bar"},n._l(n.tabBars,function(t,a){return i("v-uni-view",{key:t.id,class:["swiper-tab-list",n.tabIndex==a?"active":""],attrs:{id:t.id,"data-current":a},on:{click:function(t){t=n.$handleEvent(t),n.tapTab(a)}}},[i("span",{class:[n.tabIndex==a?"tab_text":""]},[n._v(n._s(t.name))]),i("span",{class:[n.tabIndex==a?"line":""]})])}),1),i("v-uni-swiper",{staticClass:"swiper-box",attrs:{current:n.tabIndex,duration:"300"},on:{change:function(t){t=n.$handleEvent(t),n.changeTab(t)}}},n._l(n.listData,function(t,e){return i("v-uni-swiper-item",{key:e},[i("v-uni-scroll-view",{staticClass:"list",attrs:{"scroll-y":""},on:{scrolltolower:function(t){t=n.$handleEvent(t),n.loadMore(e)}}},[n._l(t.data,function(t,e){return[i("v-uni-view",{key:e+"_0",staticClass:"item_wrap",on:{click:function(a){a=n.$handleEvent(a),n.goDetail(t)}}},[i("div",{staticClass:"item_content_wrap"},[i("div",{staticClass:"item_title"},[n._v("里程车险")]),i("div",{staticClass:"item_no"},[n._v("车牌号：沪A42320")]),i("div",{staticClass:"item_name"},[n._v("姓名：张无双")])]),i("div",{staticClass:"bottom_wrap"},[e%2!=0?i("span",{staticClass:"bottom_action"},[n._v("立即付款")]):n._e(),e%2==0?i("span",[n._v("查看详情")]):n._e()]),e%2!=0?i("img",{attrs:{src:a("46e7")}}):n._e(),e%2==0?i("img",{attrs:{src:a("d338")}}):n._e()])]}),0==t.data.length?i("div",{staticClass:"uni-center-item no_data_wrap"},[i("img",{staticClass:"no_data",attrs:{src:a("c617")}}),i("span",[n._v("暂无订单信息")])]):n._e(),0!=t.data.length?i("v-uni-view",{staticClass:"uni-tab-bar-loading"},[i("uni-load-more",{attrs:{loadingType:t.loadingType,contentText:n.loadingText}})],1):n._e()],2)],1)}),1)],1)},e=[];a.d(t,"a",function(){return i}),a.d(t,"b",function(){return e})},"50ce":function(n,t,a){"use strict";a.r(t);var i=a("c529"),e=a.n(i);for(var o in i)"default"!==o&&function(n){a.d(t,n,function(){return i[n]})}(o);t["default"]=e.a},"6d22":function(n,t,a){"use strict";a.r(t);var i=a("7973"),e=a.n(i);for(var o in i)"default"!==o&&function(n){a.d(t,n,function(){return i[n]})}(o);t["default"]=e.a},7973:function(n,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=o(a("a34a")),e=o(a("06d8"));function o(n){return n&&n.__esModule?n:{default:n}}function r(n,t,a,i,e,o,r){try{var d=n[o](r),s=d.value}catch(c){return void a(c)}d.done?t(s):Promise.resolve(s).then(i,e)}function d(n){return function(){var t=this,a=arguments;return new Promise(function(i,e){var o=n.apply(t,a);function d(n){r(o,i,e,d,s,"next",n)}function s(n){r(o,i,e,d,s,"throw",n)}d(void 0)})}}var s={components:{uniLoadMore:e.default},data:function(){return{loadingText:{contentdown:"上拉显示更多",contentrefresh:"正在加载...",contentnomore:"没有更多数据了"},scrollLeft:0,isClickChange:!1,tabIndex:0,listData:[],data0:{datetime:"40分钟前",article_type:0,title:"uni-app行业峰会频频亮相，开发者反响热烈!",source:"DCloud",comment_count:639},data1:{datetime:"一天前",article_type:1,title:"DCloud完成B2轮融资，uni-app震撼发布!",image_url:"https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/shuijiao.jpg?imageView2/3/w/200/h/100/q/90",source:"DCloud",comment_count:11395},data2:{datetime:"一天前",article_type:2,title:"中国技术界小奇迹：HBuilder开发者突破200万",image_url:"https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/muwu.jpg?imageView2/3/w/200/h/100/q/90",source:"DCloud",comment_count:11395},data4:{datetime:"2小时前",article_type:4,title:"uni-app 支持原生小程序自定义组件，更开放、更自由",image_url:"https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/cbd.jpg?imageView2/3/w/200/h/100/q/90",source:"DCloud",comment_count:69},data3:{article_type:3,image_list:[{url:"https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/cbd.jpg?imageView2/3/w/200/h/100/q/90",width:563,height:316},{url:"https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/muwu.jpg?imageView2/3/w/200/h/100/q/90",width:641,height:360},{url:"https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/shuijiao.jpg?imageView2/3/w/200/h/100/q/90",width:640,height:360}],datetime:"5分钟前",title:"uni-app 支持使用 npm 安装第三方包，生态更趋丰富",source:"DCloud",comment_count:11},tabBars:[{name:"全部",id:"quanbu"},{name:"未付款",id:"weifukuan"},{name:"已完成",id:"yiwancheng"}]}},onLoad:function(){this.listData=this.randomfn()},methods:{goDetail:function(n){uni.navigateTo({url:"/pages/template/tabbar/detail/detail?data="+n.title})},close:function(n,t){var a=this;uni.showModal({content:"是否删除本条信息？",success:function(i){i.confirm&&a.listData[n].data.splice(t,1)}})},loadMore:function(n){var t=this;this.listData[n].loadingType=1,setTimeout(function(){t.addData(n)},1200)},addData:function(n){if(this.listData[n].data.length>30)this.listData[n].loadingType=2;else{for(var t=1;t<=10;t++)this.listData[n].data.push(this["data"+Math.floor(5*Math.random())]);this.listData[n].loadingType=1}},changeTab:function(){var n=d(i.default.mark(function n(t){var a;return i.default.wrap(function(n){while(1)switch(n.prev=n.next){case 0:if(a=t.detail.current,!this.isClickChange){n.next=5;break}return this.tabIndex=a,this.isClickChange=!1,n.abrupt("return");case 5:this.isClickChange=!1,this.tabIndex=a;case 7:case"end":return n.stop()}},n,this)}));function t(t){return n.apply(this,arguments)}return t}(),tapTab:function(){var n=d(i.default.mark(function n(t){return i.default.wrap(function(n){while(1)switch(n.prev=n.next){case 0:if(this.tabIndex!==t){n.next=4;break}return n.abrupt("return",!1);case 4:this.isClickChange=!0,this.tabIndex=t;case 6:case"end":return n.stop()}},n,this)}));function t(t){return n.apply(this,arguments)}return t}(),randomfn:function(){for(var n=[],t=0,a=this.tabBars.length;t<a;t++){for(var i={loadingType:0,data:[]},e=1;e<=10;e++)i.data.push(this["data"+Math.floor(5*Math.random())]);n.push(i)}return n}}};t.default=s},"9a92":function(n,t,a){"use strict";var i=a("1c67"),e=a.n(i);e.a},a34a:function(n,t,a){n.exports=a("bbdd")},bac8:function(n,t,a){t=n.exports=a("2350")(!1),t.push([n.i,".load-more[data-v-16c4b028]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;height:%?80?%;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center}.loading-img[data-v-16c4b028]{height:24px;width:24px;margin-right:10px}.loading-text[data-v-16c4b028]{font-size:%?28?%;color:#777}.loading-img>uni-view[data-v-16c4b028]{position:absolute}.load1[data-v-16c4b028],.load2[data-v-16c4b028],.load3[data-v-16c4b028]{height:24px;width:24px}.load2[data-v-16c4b028]{-webkit-transform:rotate(30deg);-ms-transform:rotate(30deg);transform:rotate(30deg)}.load3[data-v-16c4b028]{-webkit-transform:rotate(60deg);-ms-transform:rotate(60deg);transform:rotate(60deg)}.loading-img>uni-view uni-view[data-v-16c4b028]{width:6px;height:2px;-webkit-border-top-left-radius:1px;border-top-left-radius:1px;-webkit-border-bottom-left-radius:1px;border-bottom-left-radius:1px;background:#777;position:absolute;opacity:.2;-webkit-transform-origin:50%;-ms-transform-origin:50%;transform-origin:50%;-webkit-animation:load-data-v-16c4b028 1.56s ease infinite}.loading-img>uni-view uni-view[data-v-16c4b028]:first-child{-webkit-transform:rotate(90deg);-ms-transform:rotate(90deg);transform:rotate(90deg);top:2px;left:9px}.loading-img>uni-view uni-view[data-v-16c4b028]:nth-child(2){-webkit-transform:rotate(180deg);top:11px;right:0}.loading-img>uni-view uni-view[data-v-16c4b028]:nth-child(3){-webkit-transform:rotate(270deg);-ms-transform:rotate(270deg);transform:rotate(270deg);bottom:2px;left:9px}.loading-img>uni-view uni-view[data-v-16c4b028]:nth-child(4){top:11px;left:0}.load1 uni-view[data-v-16c4b028]:first-child{-webkit-animation-delay:0s;animation-delay:0s}.load2 uni-view[data-v-16c4b028]:first-child{-webkit-animation-delay:.13s;animation-delay:.13s}.load3 uni-view[data-v-16c4b028]:first-child{-webkit-animation-delay:.26s;animation-delay:.26s}.load1 uni-view[data-v-16c4b028]:nth-child(2){-webkit-animation-delay:.39s;animation-delay:.39s}.load2 uni-view[data-v-16c4b028]:nth-child(2){-webkit-animation-delay:.52s;animation-delay:.52s}.load3 uni-view[data-v-16c4b028]:nth-child(2){-webkit-animation-delay:.65s;animation-delay:.65s}.load1 uni-view[data-v-16c4b028]:nth-child(3){-webkit-animation-delay:.78s;animation-delay:.78s}.load2 uni-view[data-v-16c4b028]:nth-child(3){-webkit-animation-delay:.91s;animation-delay:.91s}.load3 uni-view[data-v-16c4b028]:nth-child(3){-webkit-animation-delay:1.04s;animation-delay:1.04s}.load1 uni-view[data-v-16c4b028]:nth-child(4){-webkit-animation-delay:1.17s;animation-delay:1.17s}.load2 uni-view[data-v-16c4b028]:nth-child(4){-webkit-animation-delay:1.3s;animation-delay:1.3s}.load3 uni-view[data-v-16c4b028]:nth-child(4){-webkit-animation-delay:1.43s;animation-delay:1.43s}@-webkit-keyframes load-data-v-16c4b028{0%{opacity:1}to{opacity:.2}}",""])},bbdd:function(n,t,a){var i=function(){return this||"object"===typeof self&&self}()||Function("return this")(),e=i.regeneratorRuntime&&Object.getOwnPropertyNames(i).indexOf("regeneratorRuntime")>=0,o=e&&i.regeneratorRuntime;if(i.regeneratorRuntime=void 0,n.exports=a("96cf"),e)i.regeneratorRuntime=o;else try{delete i.regeneratorRuntime}catch(r){i.regeneratorRuntime=void 0}},c529:function(n,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i={name:"load-more",props:{loadingType:{type:Number,default:0},showImage:{type:Boolean,default:!0},color:{type:String,default:"#777777"},contentText:{type:Object,default:function(){return{contentdown:"上拉显示更多",contentrefresh:"正在加载...",contentnomore:"没有更多数据了"}}}},data:function(){return{}}};t.default=i},d338:function(n,t,a){n.exports=a.p+"static/img/finish_pay.d38796b4.png"},de76:function(n,t,a){"use strict";var i=function(){var n=this,t=n.$createElement,a=n._self._c||t;return a("v-uni-view",{staticClass:"load-more"},[a("v-uni-view",{directives:[{name:"show",rawName:"v-show",value:1===n.loadingType&&n.showImage,expression:"loadingType === 1 && showImage"}],staticClass:"loading-img"},[a("v-uni-view",{staticClass:"load1"},[a("v-uni-view",{style:{background:n.color}}),a("v-uni-view",{style:{background:n.color}}),a("v-uni-view",{style:{background:n.color}}),a("v-uni-view",{style:{background:n.color}})],1),a("v-uni-view",{staticClass:"load2"},[a("v-uni-view",{style:{background:n.color}}),a("v-uni-view",{style:{background:n.color}}),a("v-uni-view",{style:{background:n.color}}),a("v-uni-view",{style:{background:n.color}})],1),a("v-uni-view",{staticClass:"load3"},[a("v-uni-view",{style:{background:n.color}}),a("v-uni-view",{style:{background:n.color}}),a("v-uni-view",{style:{background:n.color}}),a("v-uni-view",{style:{background:n.color}})],1)],1),a("v-uni-text",{staticClass:"loading-text",style:{color:n.color}},[n._v(n._s(0===n.loadingType?n.contentText.contentdown:1===n.loadingType?n.contentText.contentrefresh:n.contentText.contentnomore))])],1)},e=[];a.d(t,"a",function(){return i}),a.d(t,"b",function(){return e})}}]);