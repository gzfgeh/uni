(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-pay_address-pay_address"],{"1cd0":function(e,t,i){"use strict";i.r(t);var n=i("e131"),o=i("9dd4");for(var a in o)"default"!==a&&function(e){i.d(t,e,function(){return o[e]})}(a);i("5d42");var r=i("2877"),s=Object(r["a"])(o["default"],n["a"],n["b"],!1,null,"370eb4a5",null);t["default"]=s.exports},"2d39":function(e,t,i){"use strict";function n(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}!function(t,i){e.exports=i(t)}(window,function(e,t){function i(t,i,n){e.WeixinJSBridge?WeixinJSBridge.invoke(t,a(i),function(e){s(t,e,n)}):d(t,n)}function o(t,i,n){e.WeixinJSBridge?WeixinJSBridge.on(t,function(e){n&&n.trigger&&n.trigger(e),s(t,e,i)}):d(t,n||i)}function a(e){return(e=e||{}).appId=T.appId,e.verifyAppId=T.appId,e.verifySignType="sha1",e.verifyTimestamp=T.timestamp+"",e.verifyNonceStr=T.nonceStr,e.verifySignature=T.signature,e}function r(e){return{timeStamp:e.timestamp+"",nonceStr:e.nonceStr,package:e.package,paySign:e.paySign,signType:e.signType||"SHA1"}}function s(e,t,i){"openEnterpriseChat"==e&&(t.errCode=t.err_code),delete t.err_code,delete t.err_desc,delete t.err_detail;var n=t.errMsg;n||(n=t.err_msg,delete t.err_msg,n=function(e,t){var i=e,n=m[i];n&&(i=n);var o="ok";if(t){var a=t.indexOf(":");"confirm"==(o=t.substring(a+1))&&(o="ok"),"failed"==o&&(o="fail"),-1!=o.indexOf("failed_")&&(o=o.substring(7)),-1!=o.indexOf("fail_")&&(o=o.substring(5)),"access denied"!=(o=(o=o.replace(/_/g," ")).toLowerCase())&&"no permission to execute"!=o||(o="permission denied"),"config"==i&&"function not exist"==o&&(o="ok"),""==o&&(o="fail")}return i+":"+o}(e,n),t.errMsg=n),(i=i||{})._complete&&(i._complete(t),delete i._complete),n=t.errMsg||"",T.debug&&!i.isInnerInvoke&&alert(JSON.stringify(t));var o=n.indexOf(":");switch(n.substring(o+1)){case"ok":i.success&&i.success(t);break;case"cancel":i.cancel&&i.cancel(t);break;default:i.fail&&i.fail(t)}i.complete&&i.complete(t)}function c(e){if(e){for(var t=0,i=e.length;t<i;++t){var n=e[t],o=p[n];o&&(e[t]=o)}return e}}function d(e,t){if(!(!T.debug||t&&t.isInnerInvoke)){var i=m[e];i&&(e=i),t&&t._complete&&delete t._complete,console.log('"'+e+'",',t||"")}}function l(){return(new Date).getTime()}function u(t){k&&(e.WeixinJSBridge?t():g.addEventListener&&g.addEventListener("WeixinJSBridgeReady",t,!1))}if(!e.jWeixin){var f,p={config:"preVerifyJSAPI",onMenuShareTimeline:"menu:share:timeline",onMenuShareAppMessage:"menu:share:appmessage",onMenuShareQQ:"menu:share:qq",onMenuShareWeibo:"menu:share:weiboApp",onMenuShareQZone:"menu:share:QZone",previewImage:"imagePreview",getLocation:"geoLocation",openProductSpecificView:"openProductViewWithPid",addCard:"batchAddCard",openCard:"batchViewCard",chooseWXPay:"getBrandWCPayRequest",openEnterpriseRedPacket:"getRecevieBizHongBaoRequest",startSearchBeacons:"startMonitoringBeacons",stopSearchBeacons:"stopMonitoringBeacons",onSearchBeacons:"onBeaconsInRange",consumeAndShareCard:"consumedShareCard",openAddress:"editAddress"},m=function(){var e={};for(var t in p)e[p[t]]=t;return e}(),g=e.document,b=g.title,w=navigator.userAgent.toLowerCase(),h=navigator.platform.toLowerCase(),x=!(!h.match("mac")&&!h.match("win")),v=-1!=w.indexOf("wxdebugger"),k=-1!=w.indexOf("micromessenger"),y=-1!=w.indexOf("android"),_=-1!=w.indexOf("iphone")||-1!=w.indexOf("ipad"),S=(L=w.match(/micromessenger\/(\d+\.\d+\.\d+)/)||w.match(/micromessenger\/(\d+\.\d+)/))?L[1]:"",I={initStartTime:l(),initEndTime:0,preVerifyStartTime:0,preVerifyEndTime:0},C={version:1,appId:"",initTime:0,preVerifyTime:0,networkType:"",isPreVerifyOk:1,systemType:_?1:y?2:-1,clientVersion:S,url:encodeURIComponent(location.href)},T={},A={_completes:[]},M={state:0,data:{}};u(function(){I.initEndTime=l()});var P=!1,E=[],B=(f={config:function(t){d("config",T=t);var n=!1!==T.check;u(function(){if(n)i(p.config,{verifyJsApiList:c(T.jsApiList)},function(){A._complete=function(e){I.preVerifyEndTime=l(),M.state=1,M.data=e},A.success=function(e){C.isPreVerifyOk=0},A.fail=function(e){A._fail?A._fail(e):M.state=-1};var e=A._completes;return e.push(function(){!function(e){if(!(x||v||T.debug||S<"6.0.2"||C.systemType<0)){var t=new Image;C.appId=T.appId,C.initTime=I.initEndTime-I.initStartTime,C.preVerifyTime=I.preVerifyEndTime-I.preVerifyStartTime,B.getNetworkType({isInnerInvoke:!0,success:function(e){C.networkType=e.networkType;var i="https://open.weixin.qq.com/sdk/report?v="+C.version+"&o="+C.isPreVerifyOk+"&s="+C.systemType+"&c="+C.clientVersion+"&a="+C.appId+"&n="+C.networkType+"&i="+C.initTime+"&p="+C.preVerifyTime+"&u="+C.url;t.src=i}})}}()}),A.complete=function(t){for(var i=0,n=e.length;i<n;++i)e[i]();A._completes=[]},A}()),I.preVerifyStartTime=l();else{M.state=1;for(var e=A._completes,t=0,o=e.length;t<o;++t)e[t]();A._completes=[]}}),B.invoke||(B.invoke=function(t,i,n){e.WeixinJSBridge&&WeixinJSBridge.invoke(t,a(i),n)},B.on=function(t,i){e.WeixinJSBridge&&WeixinJSBridge.on(t,i)})},ready:function(e){0!=M.state?e():(A._completes.push(e),!k&&T.debug&&e())},error:function(e){S<"6.0.2"||(-1==M.state?e(M.data):A._fail=e)},checkJsApi:function(e){i("checkJsApi",{jsApiList:c(e.jsApiList)},(e._complete=function(e){if(y){var t=e.checkResult;t&&(e.checkResult=JSON.parse(t))}e=function(e){var t=e.checkResult;for(var i in t){var n=m[i];n&&(t[n]=t[i],delete t[i])}return e}(e)},e))},onMenuShareTimeline:function(e){o(p.onMenuShareTimeline,{complete:function(){i("shareTimeline",{title:e.title||b,desc:e.title||b,img_url:e.imgUrl||"",link:e.link||location.href,type:e.type||"link",data_url:e.dataUrl||""},e)}},e)},onMenuShareAppMessage:function(e){o(p.onMenuShareAppMessage,{complete:function(t){"favorite"===t.scene?i("sendAppMessage",{title:e.title||b,desc:e.desc||"",link:e.link||location.href,img_url:e.imgUrl||"",type:e.type||"link",data_url:e.dataUrl||""}):i("sendAppMessage",{title:e.title||b,desc:e.desc||"",link:e.link||location.href,img_url:e.imgUrl||"",type:e.type||"link",data_url:e.dataUrl||""},e)}},e)},onMenuShareQQ:function(e){o(p.onMenuShareQQ,{complete:function(){i("shareQQ",{title:e.title||b,desc:e.desc||"",img_url:e.imgUrl||"",link:e.link||location.href},e)}},e)},onMenuShareWeibo:function(e){o(p.onMenuShareWeibo,{complete:function(){i("shareWeiboApp",{title:e.title||b,desc:e.desc||"",img_url:e.imgUrl||"",link:e.link||location.href},e)}},e)},onMenuShareQZone:function(e){o(p.onMenuShareQZone,{complete:function(){i("shareQZone",{title:e.title||b,desc:e.desc||"",img_url:e.imgUrl||"",link:e.link||location.href},e)}},e)},updateTimelineShareData:function(e){i("updateTimelineShareData",{title:e.title,link:e.link,imgUrl:e.imgUrl},e)},updateAppMessageShareData:function(e){i("updateAppMessageShareData",{title:e.title,desc:e.desc,link:e.link,imgUrl:e.imgUrl},e)},startRecord:function(e){i("startRecord",{},e)},stopRecord:function(e){i("stopRecord",{},e)},onVoiceRecordEnd:function(e){o("onVoiceRecordEnd",e)},playVoice:function(e){i("playVoice",{localId:e.localId},e)},pauseVoice:function(e){i("pauseVoice",{localId:e.localId},e)},stopVoice:function(e){i("stopVoice",{localId:e.localId},e)},onVoicePlayEnd:function(e){o("onVoicePlayEnd",e)},uploadVoice:function(e){i("uploadVoice",{localId:e.localId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},downloadVoice:function(e){i("downloadVoice",{serverId:e.serverId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},translateVoice:function(e){i("translateVoice",{localId:e.localId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},chooseImage:function(e){i("chooseImage",{scene:"1|2",count:e.count||9,sizeType:e.sizeType||["original","compressed"],sourceType:e.sourceType||["album","camera"]},(e._complete=function(e){if(y){var t=e.localIds;try{t&&(e.localIds=JSON.parse(t))}catch(e){}}},e))},getLocation:function(e){},previewImage:function(e){i(p.previewImage,{current:e.current,urls:e.urls},e)},uploadImage:function(e){i("uploadImage",{localId:e.localId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},downloadImage:function(e){i("downloadImage",{serverId:e.serverId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},getLocalImgData:function(e){!1===P?(P=!0,i("getLocalImgData",{localId:e.localId},(e._complete=function(e){if(P=!1,0<E.length){var t=E.shift();wx.getLocalImgData(t)}},e))):E.push(e)},getNetworkType:function(e){i("getNetworkType",{},(e._complete=function(e){e=function(e){var t=e.errMsg;e.errMsg="getNetworkType:ok";var i=e.subtype;if(delete e.subtype,i)e.networkType=i;else{var n=t.indexOf(":"),o=t.substring(n+1);switch(o){case"wifi":case"edge":case"wwan":e.networkType=o;break;default:e.errMsg="getNetworkType:fail"}}return e}(e)},e))},openLocation:function(e){i("openLocation",{latitude:e.latitude,longitude:e.longitude,name:e.name||"",address:e.address||"",scale:e.scale||28,infoUrl:e.infoUrl||""},e)}},n(f,"getLocation",function(e){i(p.getLocation,{type:(e=e||{}).type||"wgs84"},(e._complete=function(e){delete e.type},e))}),n(f,"hideOptionMenu",function(e){i("hideOptionMenu",{},e)}),n(f,"showOptionMenu",function(e){i("showOptionMenu",{},e)}),n(f,"closeWindow",function(e){i("closeWindow",{},e=e||{})}),n(f,"hideMenuItems",function(e){i("hideMenuItems",{menuList:e.menuList},e)}),n(f,"showMenuItems",function(e){i("showMenuItems",{menuList:e.menuList},e)}),n(f,"hideAllNonBaseMenuItem",function(e){i("hideAllNonBaseMenuItem",{},e)}),n(f,"showAllNonBaseMenuItem",function(e){i("showAllNonBaseMenuItem",{},e)}),n(f,"scanQRCode",function(e){i("scanQRCode",{needResult:(e=e||{}).needResult||0,scanType:e.scanType||["qrCode","barCode"]},(e._complete=function(e){if(_){var t=e.resultStr;if(t){var i=JSON.parse(t);e.resultStr=i&&i.scan_code&&i.scan_code.scan_result}}},e))}),n(f,"openAddress",function(e){i(p.openAddress,{},(e._complete=function(e){var t;(t=e).postalCode=t.addressPostalCode,delete t.addressPostalCode,t.provinceName=t.proviceFirstStageName,delete t.proviceFirstStageName,t.cityName=t.addressCitySecondStageName,delete t.addressCitySecondStageName,t.countryName=t.addressCountiesThirdStageName,delete t.addressCountiesThirdStageName,t.detailInfo=t.addressDetailInfo,delete t.addressDetailInfo,e=t},e))}),n(f,"openProductSpecificView",function(e){i(p.openProductSpecificView,{pid:e.productId,view_type:e.viewType||0,ext_info:e.extInfo},e)}),n(f,"addCard",function(e){for(var t=e.cardList,n=[],o=0,a=t.length;o<a;++o){var r=t[o],s={card_id:r.cardId,card_ext:r.cardExt};n.push(s)}i(p.addCard,{card_list:n},(e._complete=function(e){var t=e.card_list;if(t){for(var i=0,n=(t=JSON.parse(t)).length;i<n;++i){var o=t[i];o.cardId=o.card_id,o.cardExt=o.card_ext,o.isSuccess=!!o.is_succ,delete o.card_id,delete o.card_ext,delete o.is_succ}e.cardList=t,delete e.card_list}},e))}),n(f,"chooseCard",function(e){i("chooseCard",{app_id:T.appId,location_id:e.shopId||"",sign_type:e.signType||"SHA1",card_id:e.cardId||"",card_type:e.cardType||"",card_sign:e.cardSign,time_stamp:e.timestamp+"",nonce_str:e.nonceStr},(e._complete=function(e){e.cardList=e.choose_card_info,delete e.choose_card_info},e))}),n(f,"openCard",function(e){for(var t=e.cardList,n=[],o=0,a=t.length;o<a;++o){var r=t[o],s={card_id:r.cardId,code:r.code};n.push(s)}i(p.openCard,{card_list:n},e)}),n(f,"consumeAndShareCard",function(e){i(p.consumeAndShareCard,{consumedCardId:e.cardId,consumedCode:e.code},e)}),n(f,"chooseWXPay",function(e){i(p.chooseWXPay,r(e),e)}),n(f,"openEnterpriseRedPacket",function(e){i(p.openEnterpriseRedPacket,r(e),e)}),n(f,"startSearchBeacons",function(e){i(p.startSearchBeacons,{ticket:e.ticket},e)}),n(f,"stopSearchBeacons",function(e){i(p.stopSearchBeacons,{},e)}),n(f,"onSearchBeacons",function(e){o(p.onSearchBeacons,e)}),n(f,"openEnterpriseChat",function(e){i("openEnterpriseChat",{useridlist:e.userIds,chatname:e.groupName},e)}),n(f,"launchMiniProgram",function(e){i("launchMiniProgram",{targetAppId:e.targetAppId,path:function(e){if("string"==typeof e&&0<e.length){var t=e.split("?")[0],i=e.split("?")[1];return t+=".html",void 0!==i?t+"?"+i:t}}(e.path),envVersion:e.envVersion},e)}),n(f,"miniProgram",{navigateBack:function(e){e=e||{},u(function(){i("invokeMiniProgramAPI",{name:"navigateBack",arg:{delta:e.delta||1}},e)})},navigateTo:function(e){u(function(){i("invokeMiniProgramAPI",{name:"navigateTo",arg:{url:e.url}},e)})},redirectTo:function(e){u(function(){i("invokeMiniProgramAPI",{name:"redirectTo",arg:{url:e.url}},e)})},switchTab:function(e){u(function(){i("invokeMiniProgramAPI",{name:"switchTab",arg:{url:e.url}},e)})},reLaunch:function(e){u(function(){i("invokeMiniProgramAPI",{name:"reLaunch",arg:{url:e.url}},e)})},postMessage:function(e){u(function(){i("invokeMiniProgramAPI",{name:"postMessage",arg:e.data||{}},e)})},getEnv:function(t){u(function(){t({miniprogram:"miniprogram"===e.__wxjs_environment})})}}),f),R=1,j={};return g.addEventListener("error",function(e){if(!y){var t=e.target,i=t.tagName,n=t.src;if(("IMG"==i||"VIDEO"==i||"AUDIO"==i||"SOURCE"==i)&&-1!=n.indexOf("wxlocalresource://")){e.preventDefault(),e.stopPropagation();var o=t["wx-id"];if(o||(o=R++,t["wx-id"]=o),j[o])return;j[o]=!0,wx.ready(function(){wx.getLocalImgData({localId:n,success:function(e){t.src=e.localData}})})}}},!0),g.addEventListener("load",function(e){if(!y){var t=e.target,i=t.tagName;if(t.src,"IMG"==i||"VIDEO"==i||"AUDIO"==i||"SOURCE"==i){var n=t["wx-id"];n&&(j[n]=!1)}}},!0),t&&(e.wx=e.jWeixin=B),B}var L})},"5d42":function(e,t,i){"use strict";var n=i("871d"),o=i.n(n);o.a},"871d":function(e,t,i){var n=i("aaa1");"string"===typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);var o=i("4f06").default;o("44b3ef19",n,!0,{sourceMap:!1,shadowMode:!1})},"9dd4":function(e,t,i){"use strict";i.r(t);var n=i("cc20"),o=i.n(n);for(var a in n)"default"!==a&&function(e){i.d(t,e,function(){return n[e]})}(a);t["default"]=o.a},aaa1:function(e,t,i){t=e.exports=i("2350")(!1),t.push([e.i,".container_wrap[data-v-370eb4a5]{background-color:#f9f9f9;width:100%;-webkit-box-sizing:border-box;box-sizing:border-box}.address_input[data-v-370eb4a5]{height:%?100?%;width:100%;margin-top:%?20?%}uni-radio-group[data-v-370eb4a5]{height:%?192?%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;width:100%;-webkit-box-sizing:border-box;box-sizing:border-box}.radio_wrap img[data-v-370eb4a5]{width:%?32?%;height:%?32?%;margin-right:%?10?%}.uni-center-item[data-v-370eb4a5]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;padding:%?16?% %?0?%}.input_wrap[data-v-370eb4a5]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;padding:%?0?% %?40?% %?20?%}.input_wrap .input_info[data-v-370eb4a5]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;padding-top:%?28?%}.input_wrap .input_info .item_text[data-v-370eb4a5]{font-size:%?28?%;color:#070707}.input_wrap uni-input[data-v-370eb4a5]{margin:%?20?% %?0?%}.info[data-v-370eb4a5]{font-size:%?28?%;color:#b8b8b8;padding:%?30?% %?40?% %?10?%}.wrap[data-v-370eb4a5]{background-color:#fff}.item_wrap[data-v-370eb4a5]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;padding:%?30?% %?40?%;height:%?94?%;-webkit-box-sizing:border-box;box-sizing:border-box;border-bottom:1px solid #f2f2f2;background-color:#fff}.item_wrap .item_text[data-v-370eb4a5]{font-size:%?28?%;color:#000}.item_wrap .item_info[data-v-370eb4a5]{font-size:%?28?%;color:#6e6e6e}.item_wrap .item_title[data-v-370eb4a5]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-justify-content:space-around;-ms-flex-pack:distribute;justify-content:space-around}.item_wrap .item_service[data-v-370eb4a5]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;font-size:%?24?%;color:#6e6e6e}.item_wrap .item_service img[data-v-370eb4a5]{width:%?26?%;height:%?26?%}.item_right[data-v-370eb4a5]{font-size:%?28?%;color:#6e6e6e;text-align:right}.info_title[data-v-370eb4a5]{color:rgba(0,0,0,.7);font-size:%?34?%;background-color:#f9f9f9;height:%?96?%;border-bottom:1px solid #f2f2f2;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;padding-left:%?40?%;-webkit-box-sizing:border-box;box-sizing:border-box}.info_title .circle[data-v-370eb4a5]{border-radius:50%;width:%?32?%;height:%?32?%;text-align:center;line-height:%?32?%;background-color:rgba(0,0,0,.1);color:#fff;font-size:%?28?%;margin-right:%?8?%}.info_title .active[data-v-370eb4a5]{background-color:#427dff!important;margin-right:%?0?%!important}.info_title .line[data-v-370eb4a5]{width:%?20?%;height:%?2?%;background-color:#d6d6d6;margin-right:%?12?%}.content_wrap[data-v-370eb4a5]{width:90%;margin:%?-180?% 5% %?0?%;height:%?332?%;background-color:#fff;border-radius:%?20?%;-webkit-box-shadow:%?0?% %?0?% %?20?% %?0?% #eaeaea;box-shadow:%?0?% %?0?% %?20?% %?0?% #eaeaea;padding:%?0?% %?16?%;-webkit-box-sizing:border-box;box-sizing:border-box;position:relative;z-index:1}.content_item[data-v-370eb4a5]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;color:#000;font-size:%?34?%;height:%?166?%;padding:%?0?% %?24?%;.text{color:#427dff;font-size:%?24?%}}.row_item[data-v-370eb4a5]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.arraw[data-v-370eb4a5]{width:%?18?%;height:%?18?%;border-top:%?6?% solid #d9d9d9;border-right:%?6?% solid #d9d9d9;-webkit-transform:rotate(45deg);-ms-transform:rotate(45deg);transform:rotate(45deg);margin-left:%?10?%}.place-holder[data-v-370eb4a5]{font-size:%?28?%;color:#b2b2b2}.button[data-v-370eb4a5]{margin:%?40?% 5%;width:90%;height:%?94?%;line-height:%?94?%;color:#fff;background-color:#427dff;border-radius:%?10?%;text-align:center;position:absolute;bottom:%?0?%}.bottom_wrap[data-v-370eb4a5]{width:100%;position:fixed;bottom:%?0?%;left:%?0?%;border-top:1px solid #ccc;height:%?120?%;line-height:%?120?%;color:#000;font-size:%?32?%;background-color:#fff;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row}.bottom_wrap .bottom_left[data-v-370eb4a5]{padding-left:%?44?%;-webkit-box-flex:2;-webkit-flex:2;-ms-flex:2;flex:2}.bottom_wrap .bottom_right[data-v-370eb4a5]{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;background-color:#427dff;color:#fff;font-size:%?30?%;text-align:center}.bottom_wrap .bottom_money[data-v-370eb4a5]{color:red;margin-left:%?10?%}",""])},cc20:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r(i("a34a")),o=i("4dd9"),a=r(i("2d39"));function r(e){return e&&e.__esModule?e:{default:e}}function s(e,t,i,n,o,a,r){try{var s=e[a](r),c=s.value}catch(d){return void i(d)}s.done?t(c):Promise.resolve(c).then(n,o)}function c(e){return function(){var t=this,i=arguments;return new Promise(function(n,o){var a=e.apply(t,i);function r(e){s(a,n,o,r,c,"next",e)}function c(e){s(a,n,o,r,c,"throw",e)}r(void 0)})}}var d={data:function(){return{global:{},name:"",mobile:"",address:"",items:[{name:"微信支付",icon_url:o.BASE_IMAGE_URL+"weixin_pay.png"}],current:0,openid:"",licheng_order_id:"",jiaoqiang_order_id:""}},methods:{next:function(){wx.navigateTo({url:"../pay_one/pay_one?jiaoqiang_order_id="+this.jiaoqiang_order_id})},radioChange:function(e){console.log(e.mp.detail.value)},quotationsToOrder:function(){var e=c(n.default.mark(function e(){var t,i,a;return n.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,(0,o.quotationsToOrder)(76);case 2:t=e.sent,t.success&&t.orders.length>0&&(i=t.orders[0],1==i.type&&(this.licheng_order_id=i.id),a=t.orders[1],2==a.type&&(this.jiaoqiang_order_id=a.id));case 4:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}(),H5login:function(){var e=c(n.default.mark(function e(){var t,i;return n.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,(0,o.H5login)();case 2:t=e.sent,200==t.code&&(i=t.data.token,console.log(i),i&&uni.setStorageSync("token",i));case 4:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}(),pay:function(){var e=c(n.default.mark(function e(){var t,i,r,s;return n.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(t=this,this.address){e.next=4;break}return wx.showToast({icon:"none",title:"请输入地址",duration:1e3}),e.abrupt("return");case 4:return i={name:this.global.name,mobile:this.global.mobile,address:this.address,paytype:1},e.next=7,(0,o.pay)(this.licheng_order_id,i);case 7:r=e.sent,r.success&&(s=r.result,console.log(s),console.log(s.timestamp),a.default.config({debug:!0,appId:"wx49aad3a138063b53",timestamp:s.timestamp,nonceStr:s.nonceStr,signature:s.paySign,jsApiList:["getBrandWCPayRequest"]}),a.default.ready(function(){a.default.checkJsApi({jsApiList:["getBrandWCPayRequest"],success:function(e){a.default.invoke("getBrandWCPayRequest",{appId:"wx49aad3a138063b53",timeStamp:s.timestamp,nonceStr:s.nonceStr,package:s.package,signType:"MD5",paySign:s.paySign},function(e){"get_brand_wcpay_request:ok"==e.err_msg?(wx.showToast({title:"支付成功",icon:"none",duration:1e3}),t.next()):wx.showToast({title:"支付失败",icon:"none",duration:1e3})})},fail:function(e){console.log(e),wx.showToast({title:"支付失败",icon:"none",duration:1e3})}})}),a.default.error(function(e){wx.showToast({title:"支付失败",icon:"none",duration:1e3})}));case 9:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}()},onLoad:function(){this.global=wx.getStorageSync("global"),this.name=this.global.name,this.mobile=this.global.mobile,console.log(a.default),this.quotationsToOrder()}};t.default=d},e131:function(e,t,i){"use strict";var n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"container_wrap container-fill"},[e._m(0),i("div",{staticClass:"info"},[e._v("收件信息")]),i("div",{staticClass:"wrap"},[i("div",{staticClass:"item_wrap"},[i("span",{staticClass:"item_text"},[e._v("姓名：")]),i("v-uni-input",{staticClass:"item_right",attrs:{placeholder:"请输入姓名"},model:{value:e.name,callback:function(t){e.name=t},expression:"name"}})],1),i("div",{staticClass:"item_wrap"},[i("span",{staticClass:"item_text"},[e._v("手机号码：")]),i("v-uni-input",{staticClass:"item_right",attrs:{placeholder:"请输入手机号"},model:{value:e.mobile,callback:function(t){e.mobile=t},expression:"mobile"}})],1),i("div",{staticClass:"input_wrap"},[i("div",{staticClass:"input_info"},[i("span",{staticClass:"item_text"},[e._v("设备安装/保单寄送地址：")]),e._e()]),i("v-uni-textarea",{staticClass:"address_input",attrs:{type:"text",placeholder:"请输入详细地址"},model:{value:e.address,callback:function(t){e.address=t},expression:"address"}})],1)]),i("div",{staticClass:"info"},[e._v("支付方式")]),i("v-uni-radio-group",{on:{change:function(t){t=e.$handleEvent(t),e.radioChange(t)}}},e._l(e.items,function(t,n){return i("v-uni-label",{key:n,staticClass:"item_wrap",staticStyle:{"padding-left":"40upx","padding-right":"40upx"}},[i("v-uni-view",{staticClass:"radio_wrap uni-inline-item"},[i("img",{attrs:{src:t.icon_url}}),i("span",{staticClass:"price"},[e._v(e._s(t.name))])]),i("v-uni-view",[i("v-uni-radio",{attrs:{checked:n===e.current,color:"#427DFF"}})],1)],1)}),1),i("div",{staticClass:"bottom_wrap"},[e._m(1),i("span",{staticClass:"bottom_right",on:{click:function(t){t=e.$handleEvent(t),e.pay(t)}}},[e._v("立即支付")])])],1)},o=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"wrap"},[n("div",{staticClass:"info_title"},[n("span",{staticClass:"circle active"},[e._v("1")]),n("span",{staticStyle:{margin:"0rpx 12rpx 0rpx 10rpx"}},[e._v("服务费用")]),n("span",{staticClass:"line active"}),n("span",{staticClass:"line"}),n("span",{staticClass:"circle"},[e._v("2")]),n("span",[e._v("交强险")])]),n("div",{staticClass:"item_wrap"},[n("div",[n("span",{staticClass:"item_text"},[e._v("设备押金：")]),n("span",{staticClass:"item_info"},[e._v("（可退还）")])]),n("span",{staticClass:"item_right"},[e._v("200元")])]),n("div",{staticClass:"item_wrap",staticStyle:{height:"148rpx"}},[n("div",{staticClass:"item_title"},[n("span",{staticClass:"item_text"},[e._v("账户预存：")]),n("div",{staticClass:"item_service"},[n("img",{attrs:{src:i("e5fd"),mode:"widthFix"}}),n("span",[e._v("服务费：40元/月+0.07元/公里")])])]),n("span",{staticClass:"item_right"},[e._v("200元")])])])},function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"bottom_left"},[i("span",[e._v("实付")]),i("span",{staticClass:"bottom_money"},[e._v("¥1370")])])}];i.d(t,"a",function(){return n}),i.d(t,"b",function(){return o})},e5fd:function(e,t){e.exports="data:image/png;base64,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"}}]);