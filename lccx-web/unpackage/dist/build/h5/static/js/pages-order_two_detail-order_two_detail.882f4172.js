(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-order_two_detail-order_two_detail"],{"0fcf":function(e,t,i){"use strict";var n=i("1e87"),a=i.n(n);a.a},"18c4":function(e,t,i){"use strict";var n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"contain"},[i("div",{staticClass:"title_wrap"},[e._v("交强险")]),i("div",{staticClass:"header uni-between-item"},[i("div",{staticClass:"brand_wrap"},[i("img",{class:{hidden:e.isHidden},attrs:{src:e.company_logo,mode:"widthFix"}}),i("span",[e._v(e._s(e.company_name))])])]),i("div",{staticClass:"content_wrap"},[i("div",{staticClass:"content_item uni-between-item"},[i("span",[e._v("投保地区")]),i("div",[e._v(e._s(e.name))])]),i("div",{staticClass:"content_item uni-between-item"},[i("span",[e._v("保障期限")]),i("div",[e._v(e._s(e.starts_on)+" ~ "+e._s(e.ends_on))])]),i("div",{staticClass:"content_item uni-between-item"},[i("span",[e._v("保单号：")]),i("div",[e._v(e._s(e.sn))])])]),e._m(0),i("div",{staticClass:"content_wrap"},[i("div",{staticClass:"content_item uni-between-item"},[i("span",[e._v("交强险")]),i("div",[e._v(e._s(e.compulsory)+"万")])]),i("div",{staticClass:"content_item uni-between-item"},[i("span",[e._v("车船税")]),i("div",[e._v(e._s(e.tax)+"万")])])]),e._m(1),i("div",{staticClass:"content_wrap"},[i("div",{staticClass:"content_item uni-between-item"},[i("span",[e._v("姓名")]),i("div",[e._v(e._s(e.name))])]),i("div",{staticClass:"content_item uni-between-item"},[i("span",[e._v("手机号")]),i("div",[e._v(e._s(e.trueMobile))])]),i("div",{staticClass:"content_item uni-between-item"},[i("span",[e._v("身份证号")]),i("div",[e._v(e._s(e.trueIdcard))])])]),e._m(2),i("div",{staticClass:"content_wrap",staticStyle:{"padding-bottom":"20upx"}},[i("div",{staticClass:"content_item uni-between-item"},[i("span",[e._v("车牌号码")]),i("div",[e._v(e._s(e.license_no))])]),i("div",{staticClass:"content_item uni-between-item"},[i("span",[e._v("品牌型号")]),i("div",[e._v(e._s(e.brand))])]),i("div",{staticClass:"content_item uni-between-item"},[i("span",[e._v("车辆识别代码")]),i("div",[e._v(e._s(e.trueVin))])]),i("div",{staticClass:"content_item uni-between-item"},[i("span",[e._v("发动机号码")]),i("div",[e._v(e._s(e.trueEngineNo))])]),i("div",{staticClass:"content_item uni-between-item"},[i("span",[e._v("注册日期")]),i("div",[e._v(e._s(e.first_reg_date))])])]),i("div",{staticClass:" button",on:{click:function(t){t=e.$handleEvent(t),e.applyUnderwrite(t)}}},[e._v("我要理赔")])])},a=[function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"title uni-between-item"},[i("span",[e._v("交强险")])])},function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"title uni-between-item"},[i("span",[e._v("车主信息")])])},function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"title uni-between-item"},[i("span",[e._v("车辆信息")])])}];i.d(t,"a",function(){return n}),i.d(t,"b",function(){return a})},"1e87":function(e,t,i){var n=i("a2de");"string"===typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);var a=i("4f06").default;a("1e60fb3c",n,!0,{sourceMap:!1,shadowMode:!1})},"20fa":function(e,t,i){"use strict";i.r(t);var n=i("28d2"),a=i.n(n);for(var o in n)"default"!==o&&function(e){i.d(t,e,function(){return n[e]})}(o);t["default"]=a.a},"28d2":function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=o(i("a34a")),a=i("0e24");function o(e){return e&&e.__esModule?e:{default:e}}function s(e,t,i,n,a,o,s){try{var r=e[o](s),d=r.value}catch(c){return void i(c)}r.done?t(d):Promise.resolve(d).then(n,a)}function r(e){return function(){var t=this,i=arguments;return new Promise(function(n,a){var o=e.apply(t,i);function r(e){s(o,n,a,r,d,"next",e)}function d(e){s(o,n,a,r,d,"throw",e)}r(void 0)})}}var d={data:function(){return{global:{},item:{quote_details:{}},quote_result:{},order_id:3,list:[],trueMobile:"",trueIdcard:"",name:"",license_no:"",brand:"",trueVin:"",trueEngineNo:"",first_reg_date:"",city_name:"",monthly_expense:"",mileage_expense:"",compulsory:"",tax:"",starts_on:"",sn:0,ends_on:"",companyNameList:["安盛天平","天安财险","大地保险"],companyLogo:[a.BASE_IMAGE_URL+"an_sheng.png",a.BASE_IMAGE_URL+"tian_an.png",a.BASE_IMAGE_URL+"da_di.png"],company_logo:"",company_name:"",isHidden:!1}},methods:{next:function(){var e="../pay_address/main";uni.navigateTo({url:e})},applyUnderwrite:function(){var e=r(n.default.mark(function e(){var t,i;return n.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t={insurer:this.item.quote_result.data[0].insurerCode,biz_id:this.item.biz_id,channel_code:"QUANLIAN_PROXY_INSURE",address_name:this.global.name,address_mobile:this.global.mobile,address_details:"路",address_county:"110112",address_city:"110100",address_province:"110000",policy_email:"caingougou@qq.com"},e.next=3,(0,a.applyUnderwrite)(t);case 3:i=e.sent,200==i.code&&(this.global.monthly_expense=this.item.monthly_expense,this.global.mileage_expense=this.item.mileage_expense,this.global.compulsory=this.item.compulsory,this.global.tax=this.item.tax,uni.setStorageSync("global",this.global),this.next());case 5:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}(),getOrders:function(){var e=r(n.default.mark(function e(){var t,i,o=this;return n.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=this,e.next=3,(0,a.getOrders)();case 3:i=e.sent,200==i.code&&i.data.map(function(e){e.id==t.order_id&&(o.item=e,o.item.quote_details=e.detail,o.item.insurance_company?"ASTP"==o.item.insurance_company?(o.company_name=o.companyNameList[0],o.company_logo=o.companyLogo[0]):"TAIC"==o.item.insurance_company?(o.company_name=o.companyNameList[1],o.company_logo=o.companyLogo[1]):"CCIC"==o.item.insurance_company?(o.company_name=o.companyNameList[2],o.company_logo=o.companyLogo[2]):(o.company_name="",o.isHidden=!0):(o.company_name="",o.isHidden=!0),o.starts_on=o.item.starts_on,o.ends_on=o.item.ends_on,o.sn=o.item.sn,o.monthly_expense=o.item.monthly_expense,o.mileage_expense=o.item.mileage_expense,o.compulsory=parseInt(o.item.compulsory),o.tax=parseInt(o.item.tax),o.name=o.item.name,o.item.mobile&&(o.trueMobile=o.item.mobile.substring(0,3)+"****"+o.item.mobile.substring(7,11)),o.item.idcard&&(o.trueIdcard=o.item.idcard.substring(0,3)+"***********"+o.item.idcard.substring(14,18)),o.item.vin&&(o.trueVin=o.item.vin.substring(0,3)+"***********"+o.item.vin.substring(o.item.vin.length-3,o.item.vin.length)),o.item.engine_no&&(o.trueEngineNo=o.item.engine_no.substring(0,1)+"****"+o.item.engine_no.substring(o.item.engine_no.length-1,o.item.engine_no.length)),o.license_no=o.item.license_no,o.brand=o.item.model,o.first_reg_date=o.item.registered_on,o.list=[],Object.keys(o.item.quote_details).forEach(function(e){t.item.quote_details[e];var i={};"burn"==e?i.name="自燃险":"destroy"==e?i.name="车损险":"stolen"==e?i.name="盗抢险":"liability"==e?i.name="第三者责任险":"driver_seat"==e?i.name="司机座位险":"passenger_seat"==e?i.name="乘客座位险":"stolen"==e?i.name="盗抢险":"glasses"==e?i.name="玻璃险":"scratch"==e?i.name="刮痕险":"water"==e?i.name="涉水险":"escape"==e?i.name="无法找到第三方险":"lights"==e?i.name="车灯险":"compulsory"==e?i.name="交强险":"no_3rd_party"==e&&(i.name="无法找到第三方特约险"),"boolean"==typeof t.item.quote_details[e]&&t.item.quote_details[e]?i.value="投保":"boolean"==typeof t.item.quote_details[e]&&0==t.item.quote_details[e]?i.value="不投保":"glasses"==e?i.value=1==t.item.quote_details[e]?"国产玻璃":"进口玻璃":(i.value=parseInt(t.item.quote_details[e]),i.value>1e4&&(i.value=i.value/1e4+"万")),"excluding"==e||"compulsory"==e||"boolean"==typeof t.item.quote_details[e]&&0==t.item.quote_details[e]||t.list.push(i)}))});case 5:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}()},onLoad:function(){this.global=wx.getStorageSync("global"),this.order_id=this.$root.$mp.query.id,this.order_id=this.order_id?this.order_id:3,this.getOrders()}};t.default=d},"5c5f":function(e,t,i){"use strict";i.r(t);var n=i("18c4"),a=i("20fa");for(var o in a)"default"!==o&&function(e){i.d(t,e,function(){return a[e]})}(o);i("0fcf");var s=i("2877"),r=Object(s["a"])(a["default"],n["a"],n["b"],!1,null,"ba746820",null);t["default"]=r.exports},a2de:function(e,t,i){t=e.exports=i("2350")(!1),t.push([e.i,".contain[data-v-ba746820]{width:100%}.title_wrap[data-v-ba746820]{width:100%;height:%?94?%;line-height:%?94?%;text-align:center;color:#070707;font-size:%?34?%;border-bottom:1px solid rgba(0,0,0,.1)}.header[data-v-ba746820]{margin-top:%?60?%;width:100%;padding:%?0?% %?40?%;-webkit-box-sizing:border-box;box-sizing:border-box}.brand_wrap[data-v-ba746820]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column}.brand_wrap img[data-v-ba746820]{width:%?124?%;height:%?34?%}.brand_wrap span[data-v-ba746820]{color:#000;font-size:%?32?%}.price[data-v-ba746820]{color:red;font-size:%?32?%;text-align:right;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column}.price .name[data-v-ba746820]{font-size:%?28?%;color:#bbb}.address_wrap[data-v-ba746820]{width:100%;-webkit-box-sizing:border-box;box-sizing:border-box;padding:%?40?%;font-size:%?30?%;color:#676767}.title[data-v-ba746820]{border-left:#427dff %?10?% solid;padding:%?0?% %?30?%;font-size:%?34?%;color:#3d3d3d;font-weight:600;background-color:#f9f9f9;height:%?70?%;line-height:%?70?%;-webkit-box-sizing:border-box;box-sizing:border-box}.change[data-v-ba746820]{text-align:right;color:#427dff;font-size:%?28?%}.content_wrap[data-v-ba746820]{width:100%;-webkit-box-sizing:border-box;box-sizing:border-box;background-color:#fff;padding:%?10?% %?40?% %?30?%;font-size:%?30?%;color:#676767}.content_item[data-v-ba746820]{margin-top:%?10?%}.content_item .tag[data-v-ba746820]{font-size:%?20?%;color:#ff4242;background-color:#fff2ec;-webkit-border-radius:%?6?%;border-radius:%?6?%;padding:%?0?% %?10?%;margin-left:%?32?%}.license[data-v-ba746820]{padding:%?20?% %?40?% %?0?%;border-top:%?1?% solid #e4e4e4}.hidden[data-v-ba746820]{visibility:hidden}.link[data-v-ba746820]{color:#427dff}.button[data-v-ba746820]{margin:%?40?% 5%;width:90%;height:%?94?%;line-height:%?94?%;color:#fff;background-color:#427dff;-webkit-border-radius:%?10?%;border-radius:%?10?%;text-align:center;-webkit-box-sizing:border-box;box-sizing:border-box}uni-checkbox .wx-checkbox-input[data-v-ba746820]{-webkit-border-radius:50%;border-radius:50%;/* 圆角 */width:%?30?%; /* 背景的宽 */height:%?30?% /* 背景的高 */}\n\t/* 选中后的 背景样式 （红色背景 无边框 可根据UI需求自己修改） */uni-checkbox .wx-checkbox-input.wx-checkbox-input-checked[data-v-ba746820]{border:none;background:#427dff;padding:%?3?%}\n\t/* 选中后的 对勾样式 （白色对勾 可根据UI需求自己修改） */uni-checkbox .wx-checkbox-input.wx-checkbox-input-checked[data-v-ba746820]:before{-webkit-border-radius:50%;border-radius:50%;/* 圆角 */width:%?30?%;/* 选中后对勾大小，不要超过背景的尺寸 */height:%?30?%;/* 选中后对勾大小，不要超过背景的尺寸 */line-height:%?30?%;text-align:center;font-size:%?20?%; /* 对勾大小 30upx */color:#fff; /* 对勾颜色 白色 */background:rgba(0,0,0,0);-ms-transform:translate(-50%,-50%) scale(1);transform:translate(-50%,-50%) scale(1);-webkit-transform:translate(-50%,-50%) scale(1)}",""])}}]);