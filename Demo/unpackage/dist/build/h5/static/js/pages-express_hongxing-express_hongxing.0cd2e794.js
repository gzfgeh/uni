(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-express_hongxing-express_hongxing"],{"2f44":function(e,t,o){var i=o("6ee6");"string"===typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);var s=o("4f06").default;s("29317eaa",i,!0,{sourceMap:!1,shadowMode:!1})},"5f6f":function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=n(o("a34a")),s=o("9797"),a=n(o("dfb6"));function n(e){return e&&e.__esModule?e:{default:e}}function r(e,t,o,i,s,a,n){try{var r=e[a](n),d=r.value}catch(p){return void o(p)}r.done?t(d):Promise.resolve(d).then(i,s)}function d(e){return function(){var t=this,o=arguments;return new Promise(function(i,s){var a=e.apply(t,o);function n(e){r(a,i,s,n,d,"next",e)}function d(e){r(a,i,s,n,d,"throw",e)}n(void 0)})}}var p={components:{uniPopup:a.default},data:function(){return{type:"",orderType:0,companyCode:"",QrCodeOrderSN:"",hongxing:0}},onLoad:function(e){this.QrCodeOrderSN=e.orderSN,uni.showLoading({title:"加载中..."}),setTimeout(function(){uni.hideLoading()},500),this.hongxing=e.hongxing,console.log(this.hongxing),1==e.orderType?(this.orderType=e.orderType,uni.setNavigationBarTitle({title:"个人快递"})):2==e.orderType?(this.orderType=e.orderType,uni.setNavigationBarTitle({title:"企业快递"})):uni.setNavigationBarTitle({title:"快递"})},onShow:function(){var e=uni.getStorageSync("userInfo").companyCode;e&&(this.companyCode=e)},methods:{goToExpressList:function(){this.isLogin()&&uni.navigateTo({url:"/pages/express_list/express_list"})},bindCompanyCode:function(){var e=d(i.default.mark(function e(){var t,o;return i.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(this.isLogin()){e.next=2;break}return e.abrupt("return");case 2:if(this.companyCode){e.next=5;break}return uni.showToast({icon:"none",title:"请输入企业号",duration:1e3}),e.abrupt("return");case 5:return console.log(this.companyCode),t=uni.getStorageSync("userInfo"),e.next=9,(0,s.addQycompany)({userID:t.userID,companyCode:this.companyCode});case 9:o=e.sent,console.log(o),1==o.status?(this.type="",uni.setStorageSync("userInfo",o.data.userInfo),uni.showToast({icon:"none",title:o.message,duration:1e3})):uni.showToast({icon:"none",title:o.message,duration:1e3});case 12:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}(),goToExpressInfo:function(e,t){this.isLogin()&&(2!=e||""!=this.companyCode?this.QrCodeOrderSN?uni.navigateTo({url:"/pages/express_info/express_info?createOrderType="+t+"&orderType="+e+"&QrCodeOrderSN="+this.QrCodeOrderSN}):uni.navigateTo({url:"/pages/express_info/express_info?createOrderType="+t+"&orderType="+e}):this.type="middle")},goToPrintList:function(){this.isLogin()&&(""!=this.companyCode?uni.navigateTo({url:"/pages/print_page/print_page"}):this.type="middle")},goToYunFei:function(){this.isLogin()&&uni.navigateTo({url:"/pages/print_page/print_page"})},goToForbid:function(){uni.navigateTo({url:"/pages/forbid/forbid"})},bindCompany:function(e){this.type=e}}};t.default=p},"60db":function(e,t){e.exports="data:image/png;base64,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"},"6ee6":function(e,t,o){t=e.exports=o("2350")(!1),t.push([e.i,".logo_wrap[data-v-eba6b79c]{padding-top:%?20?%}.logo_wrap img[data-v-eba6b79c]{width:%?180?%}.company-modal[data-v-eba6b79c]{width:%?500?%;text-align:center}.company-code[data-v-eba6b79c]{padding:%?30?% 0 %?30?% 0}.company-code uni-input[data-v-eba6b79c]{border:1px solid #eee;text-align:left;padding:%?20?%}.pd[data-v-eba6b79c]{padding:0 %?30?%}.person-express-list[data-v-eba6b79c]{border:%?2?% solid #f3f3f3;-webkit-box-shadow:0 %?4?% %?12?% 0 rgba(126,125,125,.14);box-shadow:0 %?4?% %?12?% 0 rgba(126,125,125,.14);-webkit-border-radius:%?8?%;border-radius:%?8?%;margin:%?32?% 0}.person-express-list li[data-v-eba6b79c]{height:%?160?%;width:90%;padding:%?0?% %?40?%}.person-express-list li .person-express-detail[data-v-eba6b79c]{border-bottom:%?2?% solid #e3e3e3;height:%?158?%}\n/* .person-express-list li .person-express-detail:last-child{border-bottom:0;} */.person-express-list li img[data-v-eba6b79c]{width:%?78?%;margin-right:%?34?%}.person-express-list li .right-col[data-v-eba6b79c]{position:absolute;right:%?20?%;top:%?52?%}.person-express-list li .right-col span[data-v-eba6b79c]{font-size:%?48?%;color:#999}.person-express-list li .text p[data-v-eba6b79c]{color:#999;font-size:%?26?%;padding-top:%?4?%}.person-express-bottom[data-v-eba6b79c]{padding:0 %?16?%}.person-express-bottom .person-express-col[data-v-eba6b79c]{width:50%;float:left;-webkit-box-sizing:border-box;box-sizing:border-box;padding:0 %?16?%;margin-bottom:%?50?%!important}.person-express-bottom .person-express-col .person-express-detail[data-v-eba6b79c]{border:%?2?% solid #f3f3f3;-webkit-box-shadow:0 %?4?% %?12?% 0 rgba(126,125,125,.14);box-shadow:0 %?4?% %?12?% 0 rgba(126,125,125,.14);-webkit-border-radius:%?8?%;border-radius:%?8?%}.person-express-bottom .person-express-col .person-express-detail[data-v-eba6b79c]{text-align:center;height:%?188?%;-webkit-box-sizing:border-box;box-sizing:border-box;padding-top:%?32?%}.person-express-bottom .person-express-col .person-express-detail div[data-v-eba6b79c]{font-size:%?26?%;color:#666;text-align:center}.person-express-bottom .person-express-col .person-express-detail img[data-v-eba6b79c]{width:%?108?%}",""])},"7cc3":function(e,t,o){"use strict";o.r(t);var i=o("5f6f"),s=o.n(i);for(var a in i)"default"!==a&&function(e){o.d(t,e,function(){return i[e]})}(a);t["default"]=s.a},"8a78":function(e,t,o){"use strict";o.r(t);var i=o("aa27"),s=o("7cc3");for(var a in s)"default"!==a&&function(e){o.d(t,e,function(){return s[e]})}(a);o("eca4");var n=o("2877"),r=Object(n["a"])(s["default"],i["a"],i["b"],!1,null,"eba6b79c",null);t["default"]=r.exports},aa27:function(e,t,o){"use strict";var i=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("v-uni-view",[i("div",{staticClass:"mui-content has-header person-express-col"},[i("div",{staticClass:"logo_wrap row_center"},[i("img",{attrs:{src:o("60db"),mode:"widthFix"}})]),i("div",{staticClass:"pd"},[i("div",{staticClass:"col person-express-list"},[0==e.orderType||1==e.orderType?i("li",{on:{click:function(t){t=e.$handleEvent(t),e.goToExpressInfo(1,1)}}},[i("div",{staticClass:"person-express-detail row_center"},[i("img",{attrs:{src:o("89f5"),mode:"widthFix"}}),i("div",{staticClass:"text"},[i("div",[e._v("国内快递")]),i("p",[e._v("价格实惠、速度快，江浙沪次日达")])]),i("span",{staticStyle:{flex:"1"}}),i("span",{staticClass:"arraw"})])]):e._e(),0==e.orderType||1==e.orderType?i("li",{on:{click:function(t){t=e.$handleEvent(t),e.goToExpressInfo(1,3)}}},[i("div",{staticClass:"person-express-detail row_center"},[i("img",{attrs:{src:o("b4bb"),mode:"widthFix"}}),i("div",{staticClass:"text"},[i("div",[e._v("同城快递")]),i("p",[e._v("今天送，今天达哦～！")])]),i("span",{staticStyle:{flex:"1"}}),i("span",{staticClass:"arraw"})])]):e._e(),i("li",{on:{click:function(t){t=e.$handleEvent(t),e.goToExpressList(t)}}},[i("div",{staticClass:"person-express-detail row_center",staticStyle:{border:"none"}},[i("img",{attrs:{src:o("a2ef"),mode:"widthFix"}}),i("div",{staticClass:"text"},[i("div",[e._v("快递订单查询")]),i("p",[e._v("订单快速查询，时刻关注物流信息")])]),i("span",{staticStyle:{flex:"1"}}),i("span",{staticClass:"arraw"})])])]),i("uni-popup",{attrs:{show:"middle"===e.type,position:"middle",mode:"fixed"},on:{hidePopup:function(t){t=e.$handleEvent(t),e.bindCompany("")}}},[i("div",{staticClass:"company-modal"},[i("div",{staticClass:"modal-title"},[e._v("绑定企业")]),i("div",{staticClass:"company-code"},[i("v-uni-input",{attrs:{type:"text",placeholder:"输入企业号"},model:{value:e.companyCode,callback:function(t){e.companyCode=t},expression:"companyCode"}})],1),i("v-uni-button",{attrs:{type:"primary"},on:{click:function(t){t=e.$handleEvent(t),e.bindCompanyCode()}}},[e._v("提交")])],1)])],1),i("div",{staticClass:"person-express-bottom clearfix"},[i("div",{staticClass:"person-express-col",on:{click:function(t){t=e.$handleEvent(t),e.goToYunFei(t)}}},[i("div",{staticClass:"person-express-detail"},[i("img",{attrs:{src:o("71fd"),mode:"widthFix"}}),i("div",[e._v("打印标签")])])]),i("div",{staticClass:"person-express-col",on:{click:function(t){t=e.$handleEvent(t),e.goToForbid(t)}}},[i("div",{staticClass:"person-express-detail"},[i("img",{attrs:{src:o("3039"),mode:"widthFix"}}),i("div",[e._v("违禁品信息")])])])])])])},s=[];o.d(t,"a",function(){return i}),o.d(t,"b",function(){return s})},eca4:function(e,t,o){"use strict";var i=o("2f44"),s=o.n(i);s.a}}]);