(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-service_order_detail-service_order_detail"],{"01f6":function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var o=n(e("a34a")),a=e("9797"),s=n(e("5a57"));function n(t){return t&&t.__esModule?t:{default:t}}function r(t,i,e,o,a,s,n){try{var r=t[s](n),d=r.value}catch(l){return void e(l)}r.done?i(d):Promise.resolve(d).then(o,a)}function d(t){return function(){var i=this,e=arguments;return new Promise(function(o,a){var s=t.apply(i,e);function n(t){r(s,o,a,n,d,"next",t)}function d(t){r(s,o,a,n,d,"throw",t)}n(void 0)})}}var l={components:{uniPopup:s.default},data:function(){return{orderID:0,item:{},popupParam:"",orderSN:"",allMoney:"0",isShowDetail:!0,isEmptyOrder:!1,detailList:[],orderStatusList:["删除","已取消","待支付","待收货","已收货","","","","","","已退款"]}},methods:{payPopup:function(t){this.popupParam=t},moneyPay:function(t,i,e){this.orderSN=t,this.orderID=i,this.allMoney=e.toString(),this.popupParam="bottom",console.log("支付")},water_order_detail:function(){var t=d(o.default.mark(function t(){var i,e;return o.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return i={orderID:this.orderID},t.next=3,(0,a.water_order_detail)(i);case 3:e=t.sent,1==e.status&&(this.item=e.data);case 5:case"end":return t.stop()}},t,this)}));function i(){return t.apply(this,arguments)}return i}(),changeType:function(){this.isShowDetail=!this.isShowDetail},tuikuan:function(){var t=this;uni.showModal({title:"提醒",content:"是否退款",success:function(i){i.confirm?t.waterRefund():i.cancel&&console.log("用户点击取消")}})},waterRefund:function(){var t=d(o.default.mark(function t(){var i,e;return o.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return i={orderID:this.orderID},t.next=3,(0,a.waterRefund)(i);case 3:e=t.sent,1==e.status?this.water_order_detail():uni.showToast({icon:"none",title:e.message,duration:1e3});case 5:case"end":return t.stop()}},t,this)}));function i(){return t.apply(this,arguments)}return i}(),quxiao:function(){var t=this;uni.showModal({title:"提醒",content:"是否取消订单",success:function(i){i.confirm?t.cancel_water_order():i.cancel&&console.log("用户点击取消")}})},cancel_water_order:function(){var t=d(o.default.mark(function t(){var i,e;return o.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return 1,i={orderID:this.orderID},t.next=4,(0,a.cancel_water_order)(i);case 4:e=t.sent,1==e.status?(console.log(JSON.stringify(this.item)),this.water_order_detail()):uni.showToast({icon:"none",title:e.message,duration:1e3});case 6:case"end":return t.stop()}},t,this)}));function i(){return t.apply(this,arguments)}return i}()},onShow:function(){this.popupParam="",this.water_order_detail()},onLoad:function(t){this.orderID=t.orderID}};i.default=l},"398f":function(t,i,e){"use strict";e.r(i);var o=e("4f66"),a=e("c2e1");for(var s in a)"default"!==s&&function(t){e.d(i,t,function(){return a[t]})}(s);e("4e67");var n=e("2877"),r=Object(n["a"])(a["default"],o["a"],o["b"],!1,null,"352725fc",null);i["default"]=r.exports},"4e67":function(t,i,e){"use strict";var o=e("aa72"),a=e.n(o);a.a},"4f66":function(t,i,e){"use strict";var o=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("v-uni-view",[e("div",{staticClass:"yunfei-col"},[e("div",{staticClass:"yunfei-top-col"},[e("div",{staticClass:"yunfei-top-detail"},[e("div",{staticClass:"middle"},[e("img",{staticClass:"expressLogo",attrs:{src:t.item.waterImageUrl,mode:"aspectFill"}}),e("div",{staticClass:"clearfix row_between"},[e("span",{staticClass:"left expressName"},[t._v(t._s(t.item.waterShowName))]),e("span",{staticClass:"order_status"},[t._v(t._s(t.orderStatusList[parseInt(t.item.orderStatus)+1]))])]),"0"==t.item.isCompany?e("div",{staticClass:"danhao row_between"},[e("span",[t._v("x "+t._s(t.item.quantity))]),e("span",{staticClass:"price"},[t._v("单价: ￥"+t._s(t.item.unitPrice))])]):t._e()])])]),e("div",{staticClass:"main-tab-detail"},[e("ul",{staticClass:"express-detail-list"},[e("li",{staticClass:"clearfix"},[e("span",{staticClass:"left"},[t._v("订单号")]),e("span",{staticClass:"right"},[t._v(t._s(t.item.orderSN))])]),e("li",{staticClass:"clearfix"},[e("span",{staticClass:"left"},[t._v("姓名")]),e("span",{staticClass:"right"},[t._v(t._s(t.item.name))])]),e("li",{staticClass:"clearfix"},[e("span",{staticClass:"left"},[t._v("手机号")]),e("span",{staticClass:"right"},[t._v(t._s(t.item.phone))])]),e("li",{staticClass:"clearfix"},[e("span",{staticClass:"left"},[t._v("地址")]),e("span",{staticClass:"right"},[t._v(t._s(t.item.province)+t._s(t.item.city)+t._s(t.item.area)+t._s(t.item.detail))])]),"1"==t.item.isCompany?e("li",{staticClass:"clearfix"},[e("span",{staticClass:"left"},[t._v("公司名称")]),e("span",{staticClass:"right"},[t._v(t._s(t.item.companyName))])]):t._e(),e("li",{staticClass:"clearfix"},[e("span",{staticClass:"left"},[t._v("类型")]),e("span",{staticClass:"right"},[t._v(t._s(t.item.waterShowName))])]),e("li",{staticClass:"clearfix"},[e("span",{staticClass:"left"},[t._v("服务时间")]),e("span",{staticClass:"right"},[t._v(t._s(t.item.serviceTime))])]),e("li",{staticClass:"clearfix"},[e("span",{staticClass:"left"},[t._v("数量")]),e("span",{staticClass:"right"},[t._v(t._s(t.item.quantity))])]),e("li",{staticClass:"clearfix"},[e("span",{staticClass:"left"},[t._v("订单类型")]),e("span",{staticClass:"right"},[t._v(t._s("0"==t.item.isCompany?"个人饮水":"企业饮水"))])]),"0"==t.item.isCompany?e("li",{staticClass:"clearfix"},[e("span",{staticClass:"left"},[t._v("费用")]),e("span",{staticClass:"right"},[t._v("￥"+t._s(t.item.price))])]):t._e()]),t.item.demandDetail?e("div",{staticClass:"row detail_wrap"},[e("div",{staticClass:"left"},[t._v("需求明细")])]):t._e(),t.item.demandDetail?e("div",{staticClass:"row detail_wrap"},[t._v(t._s(t.item.demandDetail))]):t._e(),e("div",{staticClass:"bottom-btn bottom-btn-list clearfix"},[1==t.item.orderStatus?e("v-uni-button",{staticClass:"yellow-bg xiadan ",attrs:{type:"button"},on:{click:function(i){i=t.$handleEvent(i),t.quxiao()}}},[t._v("取消订单")]):t._e(),1==t.item.orderStatus&&0==parseInt(t.item.isCompany)?e("v-uni-button",{staticClass:"blue-bg xiadan",attrs:{type:"button"},on:{click:function(i){i=t.$handleEvent(i),t.moneyPay(t.item.orderSN,t.item.orderID,t.item.price)}}},[t._v("立即支付")]):t._e(),2==t.item.orderStatus&&0==parseInt(t.item.isCompany)?e("v-uni-button",{staticClass:"blue-bg xiadan",attrs:{type:"button"},on:{click:function(i){i=t.$handleEvent(i),t.tuikuan()}}},[t._v("退款")]):t._e(),e("uni-popup",{attrs:{show:"bottom"===t.popupParam,position:"bottom",mode:"fixed",payWay:"2",orderSN:t.orderSN,orderID:t.orderID,money:t.allMoney},on:{hidePopup:function(i){i=t.$handleEvent(i),t.payPopup("")}}})],1)])])])},a=[];e.d(i,"a",function(){return o}),e.d(i,"b",function(){return a})},aa72:function(t,i,e){var o=e("f918");"string"===typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);var a=e("4f06").default;a("6c35e927",o,!0,{sourceMap:!1,shadowMode:!1})},c2e1:function(t,i,e){"use strict";e.r(i);var o=e("01f6"),a=e.n(o);for(var s in o)"default"!==s&&function(t){e.d(i,t,function(){return o[t]})}(s);i["default"]=a.a},f918:function(t,i,e){i=t.exports=e("2350")(!1),i.push([t.i,'.yunfei-col .yunfei-list[data-v-352725fc]{margin-top:%?14?%}.yunfei-col .yunfei-list li[data-v-352725fc]{height:%?100?%;padding-left:%?30?%;background:#fff;-webkit-box-sizing:border-box;box-sizing:border-box}.yunfei-col .yunfei-list .middle-col[data-v-352725fc]{height:%?140?%}.yunfei-col .yunfei-list .middle-col>div[data-v-352725fc]{line-height:%?140?%;height:%?140?%}.yunfei-col .yunfei-list li>div[data-v-352725fc]{border-bottom:%?2?% solid #e3e3e3;line-height:%?100?%;height:%?100?%;position:relative}.yunfei-col .yunfei-list li>div .right[data-v-352725fc]{position:absolute;right:%?30?%;font-size:%?26?%;color:#666;z-index:100;top:0}.yunfei-col .yunfei-list li>div .right .mui-icon-arrowright[data-v-352725fc]{color:#999;font-size:%?28?%}.yunfei-col .yunfei-list li>div .right.no-arrow .text[data-v-352725fc]{margin-right:%?30?%;display:inline-block}.yunfei-col .yunfei-list li>div .left[data-v-352725fc]{font-size:%?26?%;position:absolute;left:0;z-index:100}.yunfei-col .yunfei-list li>div[data-v-352725fc]{text-align:center}.yunfei-img-title[data-v-352725fc]{font-size:%?28?%;padding:%?30?%}.yunfei-col .yunfei-list li>div .right .mui-switch[data-v-352725fc]{margin-top:%?20?%}.yunfei-col .yunfei-list li .middle img[data-v-352725fc]{width:%?68?%;display:inline-block;vertical-align:middle}.yunfei-col .yunfei-list li .middle span[data-v-352725fc]{vertical-align:middle;display:inline-block;width:%?106?%;color:#333}.yunfei-col .yunfei-list li .middle span.active[data-v-352725fc]{color:#107eff}.yunfei-col .yunfei-list li .middle[data-v-352725fc]{position:relative;-webkit-box-sizing:border-box;box-sizing:border-box}.yunfei-col .yunfei-list li .middle .beizhu[data-v-352725fc]{width:100%;padding-right:%?80?%;text-align:left;display:inline-block;font-size:%?28?%;color:#999;-webkit-box-sizing:border-box;box-sizing:border-box;padding-left:%?140?%;white-space:nowrap;-o-text-overflow:ellipsis;text-overflow:ellipsis;overflow:hidden;position:relative}.yunfei-col .yunfei-list li .middle .beizhu.active[data-v-352725fc]{color:#333}.yunfei-col .yunfei-list li .middle uni-input[data-v-352725fc]{background:rgba(0,0,0,0);border:0;padding:0 %?40?% 0 %?140?%;position:relative;-webkit-box-sizing:border-box;box-sizing:border-box;font-size:%?28?%}.yunfei-img-list[data-v-352725fc]{padding:0 0 0 %?30?%;-webkit-box-sizing:border-box;box-sizing:border-box}.yunfei-img-list .swiper-slide[data-v-352725fc]{width:%?180?%;height:%?224?%;display:inline-block;margin-right:%?20?%}.yunfei-img-list .swiper-slide img[data-v-352725fc]{width:%?94?%;height:%?94?%}.yunfei-img-list .swiper-slide[data-v-352725fc]{border:%?2?% solid #f3f3f3;-webkit-box-shadow:0 %?4?% %?12?% 0 rgba(126,125,125,.14);box-shadow:0 %?4?% %?12?% 0 rgba(126,125,125,.14);text-align:center;padding:%?32?% %?30?% %?10?%;position:relative;background:#fff;-webkit-border-radius:%?8?%;border-radius:%?8?%}.yunfei-img-list .swiper-slide p[data-v-352725fc]{font-size:%?24?%;margin-bottom:0}.yunfei-img-list .swiper-slide .bottom[data-v-352725fc]{color:#666;font-size:%?28?%}.yunfei-img-list .swiper-slide .bottom .second[data-v-352725fc]{font-size:%?16?%;color:#999;position:relative;margin-left:%?10?%}.yunfei-img-list .swiper-slide .bottom .second[data-v-352725fc]:after{width:100%;height:%?2?%;background:#999;content:" ";left:0;top:50%;position:absolute}.yunfei-img-list .swiper-slide.active[data-v-352725fc]{border:%?2?% solid #107eff}.yunfei-bottom[data-v-352725fc]{height:%?144?%;position:fixed;bottom:0;width:100%;left:0;width:100%;-webkit-box-shadow:%?-2?% %?-14?% %?22?% 0 rgba(126,125,125,.08);box-shadow:%?-2?% %?-14?% %?22?% 0 rgba(126,125,125,.08);-webkit-box-sizing:border-box;box-sizing:border-box;padding-top:%?26?%;background:#fff;z-index:90}.yunfei-bottom uni-button[data-v-352725fc]{background:#107eff;line-height:%?88?%;font-size:%?26?%;color:#fff;padding:0;width:%?364?%;text-align:center;float:right;margin-right:%?30?%}.yunfei-bottom .left[data-v-352725fc]{font-size:%?30?%;display:inline-block;margin-left:%?30?%;color:#666;padding-top:%?24?%;text-align:center}.yunfei-bottom .left .tip[data-v-352725fc]{font-size:%?24?%;color:#999}.yunfei-bottom .left span[data-v-352725fc]{font-size:%?44?%;color:#ff5269}.yunfei-bottom .left span.small[data-v-352725fc]{font-size:%?24?%;color:#ff5269}.yunfei-bottom .left.has-tip[data-v-352725fc]{position:relative;top:%?-16?%}.beizhu-col .shadow-col[data-v-352725fc]{background:rgba(0,0,0,.6);left:0;top:0;position:fixed;height:100%;width:100%;z-index:1000}.beizhu-text[data-v-352725fc]{background:#fff;-webkit-border-radius:4px;border-radius:4px;width:100%;left:0;bottom:0;position:fixed;padding:%?30?%;z-index:10000;-webkit-box-sizing:border-box;box-sizing:border-box}\n/* .beizhu-text .right-close{position: relative;top:-24upx;right:20upx;z-index: 1000;}\n.beizhu-text .right-close span{color:#333333;font-size:64upx;} */.beizhu-text .right-close img[data-v-352725fc]{width:%?30?%}.beizhu-text .clearfix[data-v-352725fc]{padding-bottom:%?26?%;font-size:%?28?%;font-weight:700}.beizhu-text .clearfix .fr[data-v-352725fc]{color:#107eff;font-size:%?26?%;display:inline-block;padding:%?4?% 0 %?4?% %?10?%}.beizhu-text uni-textarea[data-v-352725fc]{font-size:%?26?%;border:none;background-color:#fbf8f9;width:100%;padding:%?20?%;-webkit-box-sizing:border-box;box-sizing:border-box}.beizhu-text .tag-list[data-v-352725fc]{margin:%?0?% %?-10?%}.beizhu-text .tag-list span[data-v-352725fc]{color:#666;border:%?2?% solid #999;width:%?200?%;text-align:center;line-height:%?68?%;display:inline-block;font-size:%?26?%;border:%?2?% solid #999;-webkit-border-radius:%?34?%;border-radius:%?34?%;padding:0 0;margin:%?10?%}.beizhu-text .tag-list span.active[data-v-352725fc]{background:#107eff;color:#fff;border-color:#107eff}.express-list[data-v-352725fc]{padding:0 %?30?% %?20?%}.express-list li[data-v-352725fc]{border:%?2?% solid #f3f3f3;-webkit-box-shadow:0 %?4?% %?12?% 0 rgba(126,125,125,.14);box-shadow:0 %?4?% %?12?% 0 rgba(126,125,125,.14);-webkit-border-radius:%?8?%;border-radius:%?8?%;-webkit-box-sizing:border-box;box-sizing:border-box;padding:0 %?30?%;color:#666;font-size:%?24?%;margin:%?40?% 0;position:relative;z-index:100}.express-list .top .detail-col[data-v-352725fc]{padding-right:%?20?%;-webkit-box-sizing:border-box;box-sizing:border-box;padding-left:%?70?%;position:relative}.express-list .top .detail-col .icon-col[data-v-352725fc]{width:%?40?%;height:%?40?%;-webkit-border-radius:50%;border-radius:50%;color:#999;font-size:%?24?%;text-align:center;line-height:%?40?%;position:absolute;left:0;top:%?14?%}.express-list .top .name[data-v-352725fc]{font-size:%?28?%;color:#000;font-weight:700}.express-list .top p[data-v-352725fc]{margin-bottom:0;padding-top:%?6?%;font-size:%?24?%;color:#666}.express-list .middle[data-v-352725fc]{padding:%?20?% 0}.express-list .middle .first[data-v-352725fc]{color:#f39800;margin-right:%?4?%;padding:%?0?% 0}.express-list .middle .first .yuandian[data-v-352725fc]{display:inline-block;width:%?6?%;height:%?6?%;-webkit-border-radius:50%;border-radius:50%;background:#f39800;display:inline-block;vertical-align:middle;margin-right:%?6?%}.express-list .bottom[data-v-352725fc]{border-top:%?2?% solid #e3e3e3;padding:%?16?% 0 %?16?% %?80?%;position:relative;-webkit-box-sizing:border-box;box-sizing:border-box}.express-list .bottom .order_look[data-v-352725fc]{color:#107eff;font-size:%?28?%}.express-list .status-text[data-v-352725fc]{position:absolute;right:0;top:0;color:#fff;border-top:%?40?% solid #f39800;border-right:%?40?% solid #f39800;border-left:%?40?% solid rgba(0,0,0,0);border-bottom:%?40?% solid rgba(0,0,0,0)}.express-list .bottom img[data-v-352725fc]{width:%?64?%;display:inline-block;position:absolute;left:0;top:%?40?%}.express-list .bottom span[data-v-352725fc]{display:inline-block;vertical-align:middle}.express-list .bottom .first[data-v-352725fc]{width:%?120?%}.express-list .top[data-v-352725fc]{position:relative;padding-top:%?20?%}.express-list .top .middle-img[data-v-352725fc]{width:%?52?%;left:48%;position:absolute;margin-left:%?-26?%;top:%?50?%}.express-detail-list[data-v-352725fc]{padding-left:%?30?%;padding-bottom:%?20?%}.express-detail-list .more-row[data-v-352725fc]{line-height:%?44?%;padding:%?20?% %?30?% %?40?% %?110?%}.express-detail-list .more-row .left[data-v-352725fc]{position:absolute;left:0;top:%?20?%}.express-detail-list li[data-v-352725fc]{border-bottom:%?2?% solid #e3e3e3;height:%?104?%;line-height:%?104?%;padding-right:%?30?%;position:relative}.express-detail-list li .left[data-v-352725fc]{float:left;font-size:%?26?%}.express-detail-list li .right[data-v-352725fc]{float:right;font-size:%?26?%;color:#666}.bottom-btn[data-v-352725fc]{padding:%?20?% %?50?% %?50?%}.bottom-btn uni-button[data-v-352725fc]{border:%?2?% solid #107eff;color:#107eff;padding:0;line-height:%?98?%;-webkit-box-sizing:border-box;box-sizing:border-box;display:block;width:100%;font-size:%?30?%;margin:%?0?% %?20?%}\n/* .bottom-btn-list button{width:48%;float:left;margin:0 1%;}\n.bottom-btn-list button.one{width:100%;} */.bottom-btn-list .blue-bg[data-v-352725fc]{background:#107eff;color:#fff}.bottom-btn-list .yellow-bg[data-v-352725fc]{background:#f39800;color:#fff;border:%?2?% solid #f39800}.yunfei-top-col[data-v-352725fc]{padding:0 %?30?%;margin-top:%?30?%;-webkit-box-sizing:border-box;box-sizing:border-box}.yunfei-top-col .yunfei-top-detail[data-v-352725fc]{border:%?2?% solid #f3f3f3;-webkit-box-shadow:0 %?4?% %?12?% 0 rgba(126,125,125,.14);box-shadow:0 %?4?% %?12?% 0 rgba(126,125,125,.14);-webkit-border-radius:%?8?%;border-radius:%?8?%}.yunfei-top-col img[data-v-352725fc]{width:%?140?%;height:%?140?%;left:%?30?%;top:%?30?%;position:absolute}.yunfei-top-col .middle[data-v-352725fc]{padding-top:%?26?%;position:relative;padding-left:%?200?%;padding-bottom:%?26?%;padding-right:%?20?%;height:%?160?%}.yunfei-top-col .middle .left[data-v-352725fc]{color:#666;font-size:%?26?%}.yunfei-top-col .middle .right[data-v-352725fc]{color:#107eff;font-size:%?28?%;float:right;margin-right:%?30?%}.yunfei-top-col .middle .right .yuandian[data-v-352725fc]{width:%?12?%;height:%?12?%;background:#107eff;-webkit-border-radius:50%;border-radius:50%;display:inline-block;vertical-align:middle}.yunfei-top-col .middle .danhao[data-v-352725fc]{font-size:%?24?%;color:#666;margin-top:%?40?%}.yunfei-top-col .middle .danhao .price[data-v-352725fc]{font-size:%?28?%;color:#ff6262}.main-tab-detail[data-v-352725fc]{margin-top:%?20?%}.bottom-btn[data-v-352725fc]{margin-bottom:%?100?%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row}.detail_empty[data-v-352725fc]{margin-top:%?40?%;width:100%;display:block;text-align:center}.uni-timeline-item-keynode span[data-v-352725fc]{width:100%;line-height:normal!important}.genzong-list li[data-v-352725fc]{padding:%?0?% %?20?%}.price[data-v-352725fc]{display:inline-block;width:80%;text-align:right;-webkit-box-sizing:border-box;box-sizing:border-box}.order_status[data-v-352725fc]{color:#ff5269;font-size:%?28?%}.order_detail[data-v-352725fc]{padding:%?0?% %?20?%;-webkit-box-sizing:border-box;box-sizing:border-box}.detail_wrap[data-v-352725fc]{width:92%;-webkit-box-sizing:border-box;box-sizing:border-box;margin:%?0?% 4%}.detail_wrap .left[data-v-352725fc]{width:%?150?%}.detail_wrap .right[data-v-352725fc]{-webkit-box-flex:1!important;-webkit-flex:1!important;-ms-flex:1!important;flex:1!important}',""])}}]);