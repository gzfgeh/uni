(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-service_form_sure-service_form_sure"],{3057:function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",[i("div",{staticClass:"mui-content"},[i("div",{staticClass:" content_wrap"},[i("div",{staticClass:"col_between border"},[i("div",{staticClass:"content_up"},[i("img",{attrs:{src:t.params.imgPic,mode:"widthFix"}}),i("span",{staticClass:"content_center"},[t._v(t._s(t.params.service_order_name))]),i("div",{staticClass:"content_end"},[0==t.type?i("span",[t._v("￥"+t._s(t.params.waterPrice))]):t._e()])]),0==t.type?i("div",{staticClass:"content_down"},[i("span",{staticClass:"first_txt"},[t._v("共"),i("span",{staticClass:"num"},[t._v(t._s(t.params.quantity))]),t._v("件")]),i("span",{staticClass:"sencod_txt"},[t._v("应付金额:"),i("span",{staticClass:"money"},[t._v("￥")]),i("span",{staticClass:"money_number"},[t._v(t._s(t.params.money))])])]):t._e()])]),i("v-uni-navigator",{staticClass:"row_around img_wrap",attrs:{url:"../agressment/agressment"}},[i("img",{attrs:{src:a("f727"),mode:"widthFix"}}),i("span",{staticStyle:{flex:"1"}},[t._v("查看合同")]),i("span",{staticClass:"arraw"})]),t._e(),i("div",{staticClass:"content_wrap"},[i("div",{staticClass:"info"},[t._v("联系人信息")]),i("div",{staticClass:"row_between item_wrap"},[i("span",[t._v("姓名")]),i("span",{staticClass:"content name"},[t._v(t._s(t.params.name))])]),i("div",{staticClass:"row_between item_wrap"},[i("span",[t._v("手机")]),i("span",{staticClass:"content mobile"},[t._v(t._s(t.params.phone))])]),i("div",{staticClass:"row_between item_wrap"},[i("span",[t._v("地址")]),i("span",{staticClass:"content mobile"},[t._v(t._s(t.params.address))])]),i("div",{staticClass:"row_between item_wrap"},[i("span",[t._v("服务时间")]),i("span",{staticClass:"content company_name"},[t._v(t._s(t.params.serviceTime))])]),1==t.type?i("div",{staticClass:"row_between item_wrap"},[i("span",[t._v("公司名称")]),i("span",{staticClass:"content company_name"},[t._v(t._s(t.params.companyName))])]):t._e()]),i("div",{staticClass:"content_wrap",staticStyle:{height:"236upx","margin-bottom":"200upx"}},[i("div",{staticClass:"info"},[t._v("需求明细")]),i("div",{staticClass:"area requirements"},[t._v(t._s(t.params.demandDetail))])]),i("div",{staticClass:"row_center bottom_wrap"},[0==t.type?i("div",{staticClass:"money_info"},[i("span",[t._v("总价:")]),i("span",{staticClass:"money_num",staticStyle:{"font-size":"32upx"}},[t._v("¥")]),i("span",{staticClass:"money_num pay_money"},[t._v(t._s(t.params.money))])]):t._e(),i("span",{staticClass:"btn",on:{click:function(e){e=t.$handleEvent(e),t.create_water_order(e)}}},[t._v(t._s(0==t.type?"立即支付":"提交订单"))])])],1),i("uni-popup",{attrs:{show:"bottom"===t.popupParam,position:"bottom",mode:"fixed",payWay:"2",orderID:t.orderID,money:t.params.money+""},on:{hidePopup:function(e){e=t.$handleEvent(e),t.payPopup("")}}})],1)},o=[];a.d(e,"a",function(){return i}),a.d(e,"b",function(){return o})},3627:function(t,e,a){"use strict";a.r(e);var i=a("a3af"),o=a.n(i);for(var n in i)"default"!==n&&function(t){a.d(e,t,function(){return i[t]})}(n);e["default"]=o.a},5082:function(t,e,a){"use strict";a.r(e);var i=a("3057"),o=a("3627");for(var n in o)"default"!==n&&function(t){a.d(e,t,function(){return o[t]})}(n);a("fa5c");var s=a("2877"),r=Object(s["a"])(o["default"],i["a"],i["b"],!1,null,"75039303",null);e["default"]=r.exports},a3af:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=s(a("a34a")),o=a("9797"),n=s(a("5a57"));function s(t){return t&&t.__esModule?t:{default:t}}function r(t,e,a,i,o,n,s){try{var r=t[n](s),d=r.value}catch(c){return void a(c)}r.done?e(d):Promise.resolve(d).then(i,o)}function d(t){return function(){var e=this,a=arguments;return new Promise(function(i,o){var n=t.apply(e,a);function s(t){r(n,i,o,s,d,"next",t)}function d(t){r(n,i,o,s,d,"throw",t)}s(void 0)})}}var c={components:{uniPopup:n.default},data:function(){return{type:0,isAgress:!1,params:"",popupParam:"",allMoney:"0",orderID:"0"}},methods:{create_water_order:function(){var t=d(i.default.mark(function t(){var e;return i.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,(0,o.create_water_order)(this.params);case 2:e=t.sent,console.log(e),console.log(JSON.stringify(e)),1==e.status?1==this.type?this.goToList():(this.payPopup("bottom"),this.orderID=e.data.orderID):uni.showToast({icon:"none",title:e.message,duration:1e3});case 6:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}(),goToList:function(){uni.redirectTo({url:"/pages/service_order_list/service_order_list"})},payPopup:function(t){this.popupParam=t}},onLoad:function(t){this.type=t.type,1==this.type?uni.setNavigationBarTitle({title:"企业饮水服务"}):uni.setNavigationBarTitle({title:"个人饮水服务"}),this.params=uni.getStorageSync("serviceOrder")},onShow:function(){var t=this;this.$eventHub.$on("agressment",function(e){t.isAgress=e,console.log(t.isAgress),t.isAgress||uni.showModal({title:"提示",content:"请点击同意协议，不然没法下单哦",success:function(t){t.confirm}})})},onUnload:function(){this.$eventHub.$off("agressment")}};e.default=c},e714:function(t,e,a){e=t.exports=a("2350")(!1),e.push([t.i,".mui-content[data-v-75039303]{background-color:#fff}.agree_wrap[data-v-75039303]{position:fixed;bottom:%?140?%;left:%?0?%;width:92%;margin:%?0?% 4%;-webkit-box-sizing:border-box;box-sizing:border-box;background-color:#fff;height:%?100?%}.head_wrap[data-v-75039303]{padding:%?36?% 0 %?36?% %?32?%;width:100%;text-align:left;color:#333;font-size:%?32?%;-webkit-box-sizing:border-box;box-sizing:border-box}.item_wrap[data-v-75039303]{width:100%;background-color:#fff;height:%?96?%;border-bottom:%?2?% solid #e3e3e3;color:#333;font-size:%?28?%}.item_wrap .content[data-v-75039303]{color:#666;font-size:%?28?%}.button[data-v-75039303]{-webkit-border-radius:%?6?%;border-radius:%?6?%;width:90%;margin:%?28?% 5%;-webkit-box-sizing:border-box;box-sizing:border-box;background-color:#107eff;color:#fefefe;font-size:%?32?%;height:%?88?%}.img_wrap[data-v-75039303]{width:92%;text-align:center;height:%?140?%;margin-left:4%;-webkit-box-shadow:0 0 %?20?% 0 #eaeaea;box-shadow:0 0 %?20?% 0 #eaeaea;padding:%?0?% %?36?%;-webkit-box-sizing:border-box;box-sizing:border-box}.img_wrap img[data-v-75039303]{width:%?40?%;height:%?46?%;margin-right:%?36?%}.img_wrap span[data-v-75039303]{font-size:%?28?%;color:#333;font-weight:700;text-align:left}.time_wrap[data-v-75039303]{padding:%?0?% %?32?%;color:#999;font-size:%?28?%;margin:%?26?% %?0?% %?46?%}.content_wrap[data-v-75039303]{-webkit-box-sizing:border-box;box-sizing:border-box;padding:%?30?% %?30?%;-webkit-box-shadow:0 0 %?20?% 0 #eaeaea;box-shadow:0 0 %?20?% 0 #eaeaea;margin:%?36?% %?30?% %?16?%}.content_wrap .border[data-v-75039303]{width:100%}.content_up[data-v-75039303]{width:100%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between}.content_up img[data-v-75039303]{width:%?140?%;height:%?140?%;-webkit-border-radius:%?8?%;border-radius:%?8?%}.content_center[data-v-75039303]{width:%?336?%;max-height:%?114?%;position:relative;line-height:%?40?%;overflow:hidden;font-size:%?28?%;color:#666;-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;padding:0 %?32?%}.content_end[data-v-75039303]{color:#666;font-size:%?28?%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column}.content_end .number[data-v-75039303]{text-align:right}.first_txt[data-v-75039303]{color:#999;font-size:%?28?%;margin-right:%?20?%}.bottom_wrap[data-v-75039303]{height:%?144?%;padding:%?0?% %?30?%;position:fixed;bottom:%?0?%;left:%?0?%;width:100%;-webkit-box-sizing:border-box;box-sizing:border-box;background-color:#fff;-webkit-box-shadow:0 0 %?20?% 0 #eaeaea;box-shadow:0 0 %?20?% 0 #eaeaea}.bottom_wrap .btn[data-v-75039303]{width:%?364?%;height:%?88?%;line-height:%?88?%;color:#fff;background-color:#107eff;-webkit-border-radius:%?6?%;border-radius:%?6?%;text-align:center}.money_info[data-v-75039303]{color:#333;font-size:%?32?%;min-width:40%}.money_num[data-v-75039303]{color:#ff5269;font-size:%?48?%;margin-left:%?10?%}.content_down[data-v-75039303]{width:100%;text-align:right;margin-bottom:%?20?%}",""])},f727:function(t,e){t.exports="data:image/png;base64,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"},f883:function(t,e,a){var i=a("e714");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var o=a("4f06").default;o("4e687f26",i,!0,{sourceMap:!1,shadowMode:!1})},fa5c:function(t,e,a){"use strict";var i=a("f883"),o=a.n(i);o.a}}]);