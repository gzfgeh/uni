(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/agressment/agressment"],{"408e":function(t,e,n){"use strict";n.r(e);var r=n("98ad"),i=n.n(r);for(var a in r)"default"!==a&&function(t){n.d(e,t,function(){return r[t]})}(a);e["default"]=i.a},"5f14":function(t,e,n){"use strict";n.r(e);var r=n("ab87"),i=n("408e");for(var a in i)"default"!==a&&function(t){n.d(e,t,function(){return i[t]})}(a);n("e6ba");var s=n("2877"),u=Object(s["a"])(i["default"],r["a"],r["b"],!1,null,null,null);e["default"]=u.exports},"98ad":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=a(n("a34a")),i=n("692b");function a(t){return t&&t.__esModule?t:{default:t}}function s(t,e,n,r,i,a,s){try{var u=t[a](s),o=u.value}catch(c){return void n(c)}u.done?e(o):Promise.resolve(o).then(r,i)}function u(t){return function(){var e=this,n=arguments;return new Promise(function(r,i){var a=t.apply(e,n);function u(t){s(a,r,i,u,o,"next",t)}function o(t){s(a,r,i,u,o,"throw",t)}u(void 0)})}}var o={data:function(){return{detail:"",isAgress:!1}},methods:{setAgress:function(){this.isAgress=!this.isAgress,this.$eventHub.$emit("agressment",this.isAgress)},getConfigList:function(){var t=u(r.default.mark(function t(){var e,n,a;return r.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,(0,i.getConfigList)();case 2:e=t.sent,1==e.status&&(this.detail=e.data,n=this.detail,a=new RegExp("<img","gi"),n=n.replace(a,'<img style="max-width: 100%;"'),this.detail=n);case 4:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}()},onLoad:function(){this.getConfigList()}};e.default=o},ab87:function(t,e,n){"use strict";var r=function(){var t=this,e=t.$createElement;t._self._c},i=[];n.d(e,"a",function(){return r}),n.d(e,"b",function(){return i})},b572:function(t,e,n){},e6ba:function(t,e,n){"use strict";var r=n("b572"),i=n.n(r);i.a}},[["cdd7","common/runtime","common/vendor"]]]);