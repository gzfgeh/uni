(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-reg-reg"],{"01a0":function(t,e,n){"use strict";var i=n("6942"),o=n.n(i);o.a},"02d2":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=c(n("a34a")),o=n("0e24");function c(t){return t&&t.__esModule?t:{default:t}}function r(t,e,n,i,o,c,r){try{var a=t[c](r),s=a.value}catch(u){return void n(u)}a.done?e(s):Promise.resolve(s).then(i,o)}function a(t){return function(){var e=this,n=arguments;return new Promise(function(i,o){var c=t.apply(e,n);function a(t){r(c,i,o,a,s,"next",t)}function s(t){r(c,i,o,a,s,"throw",t)}a(void 0)})}}var s={data:function(){return{}},methods:{orderStaus:function(){var t=a(i.default.mark(function t(){var e,n;return i.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return e={id:153},t.next=3,(0,o.orderStaus)(e);case 3:n=t.sent,uni.showModal({title:"res",content:JSON.stringify(n),success:function(t){t.confirm||t.cancel&&console.log("用户点击取消")}}),200==n.code||wx.showToast({icon:"none",title:n.msg,duration:1e3});case 6:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}(),next:function(){var t=uni.getStorageSync("token");t?uni.navigateTo({url:"../baojia/baojia"}):this.H5login(1)},H5login:function(){var t=a(i.default.mark(function t(e){var n,c,r;return i.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return n={partner_id:uni.getStorageSync("partner_id"),imei:uni.getStorageSync("imei")},t.next=3,(0,o.H5login)(n);case 3:c=t.sent,200==c.code&&(r=c.data.token,console.log(r),r&&uni.setStorageSync("token",r),1==e?this.next():this.myOrder());case 5:case"end":return t.stop()}},t,this)}));function e(e){return t.apply(this,arguments)}return e}(),callCustom:function(){window.location.href="tel:4000880329"},myOrder:function(){var t=uni.getStorageSync("token");t?uni.navigateTo({url:"../bill_detail/bill_detail"}):this.H5login(2)}}};e.default=s},1898:function(t,e,n){e=t.exports=n("2350")(!1),e.push([t.i,"uni-image[data-v-7dc6cc16]{width:100%}img[data-v-7dc6cc16]{width:100%}.info_img[data-v-7dc6cc16]{min-height:%?1000?%}\n\t\n/* color: #ffffff;\n\tbackground-color: #427DFF; */.button[data-v-7dc6cc16]{margin:%?0?% 0;width:100%;height:%?174?%;line-height:%?174?%;background-color:#fff;border-radius:%?0?%;text-align:center;font-size:%?32?%;position:fixed;bottom:%?0?%}.button uni-button[data-v-7dc6cc16]{margin:%?40?% 5%;width:90%;height:%?94?%;line-height:%?94?%;color:#fff;background-color:#427dff}.my_order[data-v-7dc6cc16]{color:#fff;border-radius:50%;font-size:%?24?%;background-color:#304095;position:fixed;right:%?10?%;top:%?500?%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;width:%?84?%;height:%?84?%;line-height:%?30?%}.call[data-v-7dc6cc16]{color:#fff;border-radius:50%;font-size:%?24?%;background-color:#304095;position:fixed;right:%?10?%;top:%?640?%;width:%?84?%!important;height:%?84?%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center}",""])},3273:function(t,e,n){"use strict";n.r(e);var i=n("4b1d"),o=n("3e55");for(var c in o)"default"!==c&&function(t){n.d(e,t,function(){return o[t]})}(c);n("01a0");var r=n("2877"),a=Object(r["a"])(o["default"],i["a"],i["b"],!1,null,"7dc6cc16",null);e["default"]=a.exports},"3e55":function(t,e,n){"use strict";n.r(e);var i=n("02d2"),o=n.n(i);for(var c in i)"default"!==c&&function(t){n.d(e,t,function(){return i[t]})}(c);e["default"]=o.a},"4b1d":function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"content"},[i("v-uni-image",{attrs:{src:"../../static/img/info_one.png",mode:"widthFix"}}),i("v-uni-image",{attrs:{src:"../../static/img/info_two.png",mode:"widthFix"}}),i("v-uni-image",{staticStyle:{"margin-bottom":"194rpx"},attrs:{src:"../../static/img/info_three.png",mode:"widthFix"}}),i("div",{staticClass:"button btn-primary abs",on:{click:function(e){e=t.$handleEvent(e),t.next(e)}}},[i("v-uni-button",[t._v("立即报价")])],1),i("div",{staticClass:"my_order",on:{click:function(e){e=t.$handleEvent(e),t.myOrder(e)}}},[t._v("我的"),i("br"),t._v("订单")]),i("img",{staticClass:"call",attrs:{src:n("cc1e")},on:{click:function(e){e=t.$handleEvent(e),t.callCustom(e)}}})],1)},o=[];n.d(e,"a",function(){return i}),n.d(e,"b",function(){return o})},6942:function(t,e,n){var i=n("1898");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var o=n("4f06").default;o("d68b5864",i,!0,{sourceMap:!1,shadowMode:!1})},cc1e:function(t,e){t.exports="data:image/png;base64,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"}}]);