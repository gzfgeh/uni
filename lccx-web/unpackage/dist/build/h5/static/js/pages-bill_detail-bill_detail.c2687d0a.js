(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-bill_detail-bill_detail"],{"203e":function(t,e,a){"use strict";var i=a("4eef"),n=a.n(i);n.a},"4eef":function(t,e,a){var i=a("ec70");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var n=a("4f06").default;n("d740aa72",i,!0,{sourceMap:!1,shadowMode:!1})},a87a:function(t,e,a){"use strict";a.r(e);var i=a("fca3"),n=a.n(i);for(var s in i)"default"!==s&&function(t){a.d(e,t,function(){return i[t]})}(s);e["default"]=n.a},b828:function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"container"},[i("div",{staticClass:"row select_type"},[i("div",{staticClass:"col_center item",on:{click:function(e){e=t.$handleEvent(e),t.changeType(0)}}},[i("div",{staticClass:"tab_item"},[i("span",{staticClass:"titleType",class:{active:0==t.currentTab}},[t._v("全部")]),i("span",{class:{active_line:0==t.currentTab}})])]),i("div",{staticClass:"col_center item",on:{click:function(e){e=t.$handleEvent(e),t.changeType(1)}}},[i("div",{staticClass:"tab_item"},[i("span",{staticClass:"titleType",class:{active:1==t.currentTab}},[t._v("未付款")]),i("span",{class:{active_line:1==t.currentTab}})])]),i("div",{staticClass:"col_center item",on:{click:function(e){e=t.$handleEvent(e),t.changeType(2)}}},[i("div",{staticClass:"tab_item"},[i("span",{staticClass:"titleType",class:{active:2==t.currentTab}},[t._v("已完成")]),i("span",{class:{active_line:2==t.currentTab}})])])]),i("div",{staticClass:"list_wrap"},t._l(t.list,function(e,a){return 1==e.type||2==e.type?i("div",{key:a,staticClass:"ticket",on:{click:function(a){a=t.$handleEvent(a),t.next(e)}}},[i("div",{staticClass:"main"},[1==e.type?i("div",{staticClass:"title"},[t._v("里程车险")]):t._e(),2==e.type?i("div",{staticClass:"title"},[t._v("交强险")]):t._e(),i("div",{staticClass:"text"},[t._v("被保险人："+t._s(e.name))]),i("div",{staticClass:"text"},[t._v("保障期限："+t._s(e.starts_on)+" - "+t._s(e.ends_on))]),1==e.status?i("v-uni-image",{attrs:{src:"../../static/img/dai_pay_icon.png",mode:"widthFix"}}):t._e(),e.status>=3?i("v-uni-image",{attrs:{src:"../../static/img/finish_icon.png",mode:"widthFix"}}):t._e()],1),1==e.status?i("div",{staticClass:"link"},[i("span",{staticClass:"pay_text"},[t._v("立即付款")])]):t._e(),e.status>=3?i("div",{staticClass:"link"},[t._v("查看详情")]):t._e()]):t._e()}),0),0==t.list.length?i("div",{staticClass:" no_data_wrap"},[i("img",{staticClass:"no_data",attrs:{src:a("8bae")}}),i("span",[t._v("暂无订单信息")])]):t._e()])},n=[];a.d(e,"a",function(){return i}),a.d(e,"b",function(){return n})},c033:function(t,e,a){"use strict";a.r(e);var i=a("b828"),n=a("a87a");for(var s in n)"default"!==s&&function(t){a.d(e,t,function(){return n[t]})}(s);a("203e");var o=a("2877"),c=Object(o["a"])(n["default"],i["a"],i["b"],!1,null,"2a5a5085",null);e["default"]=c.exports},ec70:function(t,e,a){e=t.exports=a("2350")(!1),e.push([t.i,".container[data-v-2a5a5085]{background-color:#f3f3f3;font-size:%?26?%;width:100%}.list_wrap[data-v-2a5a5085]{margin-top:%?130?%;background-color:#f3f3f3}.select_type[data-v-2a5a5085]{height:%?100?%;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-justify-content:space-around;-ms-flex-pack:distribute;justify-content:space-around;background:#fff;color:rgba(0,0,0,.4);font-size:%?28?%;position:fixed;width:100%;z-index:10;padding:%?0?% %?100?%;-webkit-box-sizing:border-box;box-sizing:border-box}.tab_item[data-v-2a5a5085]{height:%?100?%;line-height:%?100?%;position:relative}.active_line[data-v-2a5a5085]{background-color:#427dff;width:100%;height:%?6?%;position:absolute;bottom:%?0?%;left:%?0?%}.active[data-v-2a5a5085]{color:#427dff}.hoverClass[data-v-2a5a5085]{opacity:.8}.row[data-v-2a5a5085]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center}.col_center[data-v-2a5a5085]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center}.item[data-v-2a5a5085]{height:%?100?%;position:relative;-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1}.no_data_wrap[data-v-2a5a5085]{height:100%;width:100%;position:absolute;z-index:1;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center}.no_data_wrap img[data-v-2a5a5085]{width:%?288?%;height:%?270?%}.no_data_wrap span[data-v-2a5a5085]{color:#9f9f9f;font-size:%?28?%;margin-top:%?40?%}.ticket[data-v-2a5a5085]{background-color:#fff;border-radius:%?10?%;padding:%?40?% %?40?% %?20?% %?40?%;-webkit-box-shadow:0 0 10px 0 rgba(0,0,0,.03);box-shadow:0 0 10px 0 rgba(0,0,0,.03);margin:%?0?% %?30?% %?30?% %?30?%}.ticket .main[data-v-2a5a5085]{border-bottom:1px solid #f1f1f1;position:relative}.ticket .main uni-image[data-v-2a5a5085]{position:absolute;right:%?0?%;top:%?0?%;width:%?168?%}.ticket .main .title[data-v-2a5a5085]{padding-bottom:%?20?%;font-size:%?34?%;color:#4d4d4d;font-weight:700}.ticket .main .text[data-v-2a5a5085]{color:#9f9f9f;font-size:%?26?%}.ticket .main .text[data-v-2a5a5085]:last-child{margin-bottom:%?30?%}.ticket .link[data-v-2a5a5085]{text-align:center;color:#3a7ff7;font-size:%?26?%;padding-top:%?20?%}.ticket .pay_text[data-v-2a5a5085]{color:#3a7ff7;font-size:%?26?%;background-color:#e9f3fb;border-radius:%?26?%;padding:%?8?% %?24?%}",""])},fca3:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=s(a("a34a")),n=a("4dd9");function s(t){return t&&t.__esModule?t:{default:t}}function o(t,e,a,i,n,s,o){try{var c=t[s](o),r=c.value}catch(l){return void a(l)}c.done?e(r):Promise.resolve(r).then(i,n)}function c(t){return function(){var e=this,a=arguments;return new Promise(function(i,n){var s=t.apply(e,a);function c(t){o(s,i,n,c,r,"next",t)}function r(t){o(s,i,n,c,r,"throw",t)}c(void 0)})}}var r={data:function(){return{currentTab:0,list:[],dai_pay_icon:n.BASE_IMAGE_URL+"dai_pay_icon.png",finish_icon:n.BASE_IMAGE_URL+"finish_icon.png",baozhangzhong_icon:n.BASE_IMAGE_URL+"baozhangzhong_icon.png",weiqibao_icon:n.BASE_IMAGE_URL+"weiqibao_icon.png",yidaoqi_icon:n.BASE_IMAGE_URL+"yidaoqi_icon.png"}},methods:{changeType:function(t){console.log(t),this.currentTab=t,window.scrollTo(0,0),this.getOrders()},getOrders:function(){var t=c(i.default.mark(function t(){var e,a=this;return i.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return this.list=[],t.next=3,(0,n.getOrders)();case 3:e=t.sent,200==e.code&&(0==this.currentTab?e.data.map(function(t){1!=t.type&&2!=t.type||a.list.push(t)}):1==this.currentTab?e.data.map(function(t){1!=t.type&&2!=t.type||1==t.status&&a.list.push(t)}):e.data.map(function(t){1!=t.type&&2!=t.type||t.status>=3&&a.list.push(t)}));case 5:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}(),next:function(t){var e=t.type;if(1==t.status)if(1==e){var a="../pay_address/pay_address?id="+t.id;wx.navigateTo({url:a})}else wx.showModal({title:"提示",content:"请先支付里程车险，再支付交强险,现在为您跳转",success:function(e){if(e.cancel);else{var a="../pay_address/pay_address?id="+t.id;wx.navigateTo({url:a})}}});else if(1==e){var i="../order_one_detail/order_one_detail?id="+t.id;wx.navigateTo({url:i})}else{var n="../order_two_detail/order_two_detail?id="+t.id;wx.navigateTo({url:n})}}},onLoad:function(){this.getOrders()}};e.default=r}}]);