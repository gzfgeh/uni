(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/address/addressManage"],{"636c":function(a,t,e){"use strict";var n,s=function(){var a=this,t=a.$createElement;a._self._c},i=[];e.d(t,"b",function(){return s}),e.d(t,"c",function(){return i}),e.d(t,"a",function(){return n})},8110:function(a,t,e){"use strict";(function(a){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var e={data:function(){return{addressData:{name:"",mobile:"",addressName:"在地圖選擇",address:"",area:"",default:!1}}},onLoad:function(t){var e="新增收貨地址";"edit"===t.type&&(e="編輯收貨地址",this.addressData=JSON.parse(t.data)),this.manageType=t.type,a.setNavigationBarTitle({title:e})},methods:{switchChange:function(a){this.addressData.default=a.detail},chooseLocation:function(){var t=this;a.chooseLocation({success:function(a){t.addressData.addressName=a.name,t.addressData.address=a.name}})},confirm:function(){var t=this.addressData;t.name?/(^1[3|4|5|7|8][0-9]{9}$)/.test(t.mobile)?t.address?t.area?(this.$api.prePage().refreshList(t,this.manageType),this.$api.msg("地址".concat("edit"==this.manageType?"修改":"添加","成功")),setTimeout(function(){a.navigateBack()},800)):this.$api.msg("請填寫門牌號信息"):this.$api.msg("請在地圖選擇所在位置"):this.$api.msg("請輸入正確的手機號碼"):this.$api.msg("請填寫收貨人姓名")}}};t.default=e}).call(this,e("6e42")["default"])},"9dbd":function(a,t,e){"use strict";e.r(t);var n=e("8110"),s=e.n(n);for(var i in n)"default"!==i&&function(a){e.d(t,a,function(){return n[a]})}(i);t["default"]=s.a},a200:function(a,t,e){"use strict";var n=e("ae9e"),s=e.n(n);s.a},ae9e:function(a,t,e){},bbcc:function(a,t,e){"use strict";(function(a){e("d435"),e("921b");n(e("66fd"));var t=n(e("f8f1"));function n(a){return a&&a.__esModule?a:{default:a}}a(t.default)}).call(this,e("6e42")["createPage"])},f8f1:function(a,t,e){"use strict";e.r(t);var n=e("636c"),s=e("9dbd");for(var i in s)"default"!==i&&function(a){e.d(t,a,function(){return s[a]})}(i);e("a200");var r,c=e("f0c5"),d=Object(c["a"])(s["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],r);t["default"]=d.exports}},[["bbcc","common/runtime","common/vendor"]]]);