(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-crop-crop"],{1318:function(n,t,e){"use strict";e.r(t);var o=e("504d"),a=e.n(o);for(var i in o)"default"!==i&&function(n){e.d(t,n,function(){return o[n]})}(i);t["default"]=a.a},"1cf3":function(n,t,e){"use strict";var o=e("d578"),a=e.n(o);a.a},"504d":function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=i(e("a34a")),a=e("9797");function i(n){return n&&n.__esModule?n:{default:n}}function r(n,t,e,o,a,i,r){try{var c=n[i](r),s=c.value}catch(u){return void e(u)}c.done?t(s):Promise.resolve(s).then(o,a)}function c(n){return function(){var t=this,e=arguments;return new Promise(function(o,a){var i=n.apply(t,e);function c(n){r(i,o,a,c,s,"next",n)}function s(n){r(i,o,a,c,s,"throw",n)}c(void 0)})}}var s,u,p,d,l,h,g,v,f,b,m,w=uni.getSystemInfoSync(),x=w.screenWidth,k=w.screenHeight-44,y=(w.pixelRatio,1),I=100,P=w.screenWidth,S={data:function(){return{name:"杨大宝",imageSrc:"https://img-cdn-qiniu.dcloud.net.cn/demo_crop.jpg",isShowImg:!1,cropperInitW:x,cropperInitH:k,cropperW:x,cropperH:k,cropperL:0,cropperT:0,transL:0,transT:0,scaleP:0,imageW:0,imageH:0,cutL:0,cutT:0,cutB:x,cutR:"100%",qualityWidth:P,innerAspectRadio:y}},onLoad:function(n){this.imageSrc=n.image},onNavigationBarButtonTap:function(n){this.getImageInfo()},mounted:function(){this.loadImage()},methods:{updateUserInfo:function(){var n=c(o.default.mark(function n(){return o.default.wrap(function(n){while(1)switch(n.prev=n.next){case 0:return{userID:uni.getStorageSync("userInfo").userID},n.next=3,(0,a.updateUserInfo)();case 3:n.sent;case 4:case"end":return n.stop()}},n,this)}));function t(){return n.apply(this,arguments)}return t}(),setData:function(n){var t=this;Object.keys(n).forEach(function(e){t.$set(t.$data,e,n[e])})},getImage:function(){var n=this;uni.chooseImage({success:function(t){n.setData({imageSrc:t.tempFilePaths[0]}),n.loadImage()}})},loadImage:function(){var n=this;uni.showLoading({title:"图片加载中..."}),uni.getImageInfo({src:n.imageSrc,success:function(t){f=t.width/t.height,f>=1?(b=x,m=x/f):(b=x*f,m=x);var e=b>m?b:m;if(I=e>I?I:e,f>=1){var o=Math.ceil((x/f-(x/f-I))/2),a=o,i=Math.ceil((x-x+I)/2),r=i;n.setData({cropperW:x,cropperH:x/f,cropperL:Math.ceil((x-x)/2),cropperT:Math.ceil((x-x/f)/2),cutL:i,cutT:o,cutR:r,cutB:a,imageW:b,imageH:m,scaleP:b/x,qualityWidth:P,innerAspectRadio:f})}else{var c=Math.ceil((x*f-x*f)/2),s=c,u=Math.ceil((x-I)/2),p=u;n.setData({cropperW:x*f,cropperH:x,cropperL:Math.ceil((x-x*f)/2),cropperT:Math.ceil((x-x)/2),cutL:c,cutT:u,cutR:s,cutB:p,imageW:b,imageH:m,scaleP:b/x,qualityWidth:P,innerAspectRadio:f})}n.setData({isShowImg:!0}),uni.hideLoading()}})},contentStartMove:function(n){s=n.touches[0].pageX,u=n.touches[0].pageY},contentMoveing:function(n){var t=(s-n.touches[0].pageX)*y,e=(u-n.touches[0].pageY)*y;t>0?this.cutL-t<0&&(t=this.cutL):this.cutR+t<0&&(t=-this.cutR),e>0?this.cutT-e<0&&(e=this.cutT):this.cutB+e<0&&(e=-this.cutB),this.setData({cutL:this.cutL-t,cutT:this.cutT-e,cutR:this.cutR+t,cutB:this.cutB+e}),s=n.touches[0].pageX,u=n.touches[0].pageY},contentTouchEnd:function(){},getImageInfo:function(){var n=this;uni.showLoading({title:"图片生成中..."});var t=uni.createCanvasContext("myCanvas");t.drawImage(n.imageSrc,0,0,b,m),t.draw(!0,function(){var t=(n.cropperW-n.cutL-n.cutR)/n.cropperW*b,e=(n.cropperH-n.cutT-n.cutB)/n.cropperH*m,o=n.cutL/n.cropperW*b,i=n.cutT/n.cropperH*m;uni.canvasToTempFilePath({x:o,y:i,width:t,height:e,destWidth:t,destHeight:e,quality:.5,canvasId:"myCanvas",success:function(n){uni.hideLoading(),console.log(n.tempFilePath),uni.uploadFile({url:a.BASE_IMAGE_URL+"User/User/updateUserInfo",filePath:n.tempFilePath,name:"userImage",header:{userToken:uni.getStorageSync("userInfo").token},formData:{userID:uni.getStorageSync("userInfo").userID},success:function(n){if(console.log(n.data),n.data){var t=JSON.parse(n.data);1==t.status?(uni.setStorageSync("userInfo",t.data.userInfo),uni.navigateBack({delta:1})):999==t.status&&uni.navigateTo({url:"/pages/login/login"})}else uni.navigateTo({url:"/pages/login/login"})}})}})})},dragStart:function(n){p=n.touches[0].pageX,d=n.touches[0].pageY,l=this.cutL,g=this.cutR,v=this.cutB,h=this.cutT},dragMove:function(n){var t=n.target.dataset.drag;switch(t){case"right":var e=(p-n.touches[0].pageX)*y;g+e<0&&(e=-g),this.setData({cutR:g+e});break;case"left":e=(p-n.touches[0].pageX)*y;l-e<0&&(e=l),l-e>this.cropperW-this.cutR&&(e=l-(this.cropperW-this.cutR)),this.setData({cutL:l-e});break;case"top":e=(d-n.touches[0].pageY)*y;h-e<0&&(e=h),h-e>this.cropperH-this.cutB&&(e=h-(this.cropperH-this.cutB)),this.setData({cutT:h-e});break;case"bottom":e=(d-n.touches[0].pageY)*y;v+e<0&&(e=-v),this.setData({cutB:v+e});break;case"rightBottom":var o=(p-n.touches[0].pageX)*y,a=(d-n.touches[0].pageY)*y;v+a<0&&(a=-v),g+o<0&&(o=-g);var i=v+a,r=g+o;this.setData({cutB:i,cutR:r});break;default:break}}}};t.default=S},"85a9":function(n,t,e){t=n.exports=e("2350")(!1),t.push([n.i,'\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/* pages/uni-cropper/index.wxss */.uni-content-info[data-v-44903e9c]{\n\t/* position: fixed;\n\ttop: 0;\n\tleft: 0;\n\tright: 0;\n\tbottom: 0;\n\tdisplay: block;\n\talign-items: center;\n\tflex-direction: column; */}.cropper-config[data-v-44903e9c]{padding:%?20?% %?40?%}.cropper-content[data-v-44903e9c]{min-height:%?750?%;width:100%;height:100%}.uni-corpper[data-v-44903e9c]{position:relative;overflow:hidden;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-tap-highlight-color:transparent;-webkit-touch-callout:none;-webkit-box-sizing:border-box;box-sizing:border-box}.uni-corpper-content[data-v-44903e9c]{position:relative}.uni-corpper-content uni-image[data-v-44903e9c]{display:block;width:100%;min-width:0!important;max-width:none!important;height:100%;min-height:0!important;max-height:none!important;image-orientation:0deg!important;margin:0 auto}\n\n/* 移动图片效果 */.uni-cropper-drag-box[data-v-44903e9c]{position:absolute;top:0;right:0;bottom:0;left:0;cursor:move;background:rgba(0,0,0,.6);z-index:1}\n\n/* 内部的信息 */.uni-corpper-crop-box[data-v-44903e9c]{position:absolute;background:hsla(0,0%,100%,.3);z-index:2}.uni-corpper-crop-box .uni-cropper-view-box[data-v-44903e9c]{position:relative;display:block;width:100%;height:100%;overflow:visible;outline:%?1?% solid #69f;outline-color:rgba(102,153,255,.75)}\n\n/* 横向虚线 */.uni-cropper-dashed-h[data-v-44903e9c]{position:absolute;top:33.33333333%;left:0;width:100%;height:33.33333333%;border-top:%?1?% dashed hsla(0,0%,100%,.5);border-bottom:%?1?% dashed hsla(0,0%,100%,.5)}\n\n/* 纵向虚线 */.uni-cropper-dashed-v[data-v-44903e9c]{position:absolute;left:33.33333333%;top:0;width:33.33333333%;height:100%;border-left:%?1?% dashed hsla(0,0%,100%,.5);border-right:%?1?% dashed hsla(0,0%,100%,.5)}\n\n/* 四个方向的线  为了之后的拖动事件*/.uni-cropper-line-t[data-v-44903e9c]{position:absolute;display:block;width:100%;background-color:#69f;top:0;left:0;height:%?1?%;opacity:.1;cursor:n-resize}.uni-cropper-line-t[data-v-44903e9c]:before{content:"";position:absolute;top:50%;right:%?0?%;width:100%;-webkit-transform:translate3d(0,-50%,0);transform:translate3d(0,-50%,0);bottom:0;height:%?41?%;background:rgba(0,0,0,0);z-index:11}.uni-cropper-line-r[data-v-44903e9c]{position:absolute;display:block;background-color:#69f;top:0;right:%?0?%;width:%?1?%;opacity:.1;height:100%;cursor:e-resize}.uni-cropper-line-r[data-v-44903e9c]:before{content:"";position:absolute;top:0;left:50%;width:%?41?%;-webkit-transform:translate3d(-50%,0,0);transform:translate3d(-50%,0,0);bottom:0;height:100%;background:rgba(0,0,0,0);z-index:11}.uni-cropper-line-b[data-v-44903e9c]{position:absolute;display:block;width:100%;background-color:#69f;bottom:0;left:0;height:%?1?%;opacity:.1;cursor:s-resize}.uni-cropper-line-b[data-v-44903e9c]:before{content:"";position:absolute;top:50%;right:%?0?%;width:100%;-webkit-transform:translate3d(0,-50%,0);transform:translate3d(0,-50%,0);bottom:0;height:%?41?%;background:rgba(0,0,0,0);z-index:11}.uni-cropper-line-l[data-v-44903e9c]{position:absolute;display:block;background-color:#69f;top:0;left:0;width:%?1?%;opacity:.1;height:100%;cursor:w-resize}.uni-cropper-line-l[data-v-44903e9c]:before{content:"";position:absolute;top:0;left:50%;width:%?41?%;-webkit-transform:translate3d(-50%,0,0);transform:translate3d(-50%,0,0);bottom:0;height:100%;background:rgba(0,0,0,0);z-index:11}.uni-cropper-point[data-v-44903e9c]{width:%?5?%;height:%?5?%;background-color:#69f;opacity:.75;position:absolute;z-index:3}.point-t[data-v-44903e9c]{top:%?-3?%;left:50%;margin-left:%?-3?%;cursor:n-resize}.point-tr[data-v-44903e9c]{top:%?-3?%;left:100%;margin-left:%?-3?%;cursor:n-resize}.point-r[data-v-44903e9c]{top:50%;left:100%;margin-left:%?-3?%;margin-top:%?-3?%;cursor:n-resize}.point-rb[data-v-44903e9c]{left:100%;top:100%;-webkit-transform:translate3d(-50%,-50%,0);transform:translate3d(-50%,-50%,0);cursor:n-resize;width:%?36?%;height:%?36?%;background-color:#69f;position:absolute;z-index:1112;opacity:1}.point-b[data-v-44903e9c]{left:50%;top:100%;margin-left:%?-3?%;margin-top:%?-3?%;cursor:n-resize}.point-bl[data-v-44903e9c]{left:0;top:100%;margin-left:%?-3?%;margin-top:%?-3?%;cursor:n-resize}.point-l[data-v-44903e9c]{left:0;top:50%;margin-left:%?-3?%;margin-top:%?-3?%;cursor:n-resize}.point-lt[data-v-44903e9c]{left:0;top:0;margin-left:%?-3?%;margin-top:%?-3?%;cursor:n-resize}\n\n/* 裁剪框预览内容 */.uni-cropper-viewer[data-v-44903e9c]{position:relative;width:100%;height:100%;overflow:hidden}.uni-cropper-viewer uni-image[data-v-44903e9c]{position:absolute;z-index:2}',""])},a34a:function(n,t,e){n.exports=e("bbdd")},b431:function(n,t,e){"use strict";e.r(t);var o=e("bd3b"),a=e("1318");for(var i in a)"default"!==i&&function(n){e.d(t,n,function(){return a[n]})}(i);e("1cf3");var r=e("2877"),c=Object(r["a"])(a["default"],o["a"],o["b"],!1,null,"44903e9c",null);t["default"]=c.exports},bbdd:function(n,t,e){var o=function(){return this||"object"===typeof self&&self}()||Function("return this")(),a=o.regeneratorRuntime&&Object.getOwnPropertyNames(o).indexOf("regeneratorRuntime")>=0,i=a&&o.regeneratorRuntime;if(o.regeneratorRuntime=void 0,n.exports=e("96cf"),a)o.regeneratorRuntime=i;else try{delete o.regeneratorRuntime}catch(r){o.regeneratorRuntime=void 0}},bd3b:function(n,t,e){"use strict";var o=function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("v-uni-view",{staticClass:"container"},[e("v-uni-view",{staticClass:"page-body uni-content-info"},[e("v-uni-view",{staticClass:"cropper-content"},[e("v-uni-view",{staticClass:"uni-corpper row_center",style:"width:"+n.cropperInitW+"px;height:"+n.cropperInitH+"px;background:#000"},[e("v-uni-view",{staticClass:"uni-corpper-content"},[e("v-uni-image",{style:"width:"+n.cropperW+"px;height:"+n.cropperH+"px",attrs:{src:n.imageSrc}}),e("v-uni-view",{staticClass:"uni-corpper-crop-box",style:"left:"+n.cutL+"px;top:"+n.cutT+"px;right:"+n.cutR+"px;bottom:"+n.cutB+"px",on:{touchstart:function(t){t.stopPropagation(),t=n.$handleEvent(t),n.contentStartMove(t)},touchmove:function(t){t.stopPropagation(),t=n.$handleEvent(t),n.contentMoveing(t)},touchend:function(t){t.stopPropagation(),t=n.$handleEvent(t),n.contentTouchEnd(t)}}},[e("v-uni-view",{staticClass:"uni-cropper-view-box"},[e("v-uni-view",{staticClass:"uni-cropper-dashed-h"}),e("v-uni-view",{staticClass:"uni-cropper-dashed-v"}),e("v-uni-view",{staticClass:"uni-cropper-line-t",attrs:{"data-drag":"top"},on:{touchstart:function(t){t.stopPropagation(),t=n.$handleEvent(t),n.dragStart(t)},touchmove:function(t){t.stopPropagation(),t=n.$handleEvent(t),n.dragMove(t)}}}),e("v-uni-view",{staticClass:"uni-cropper-line-r",attrs:{"data-drag":"right"},on:{touchstart:function(t){t.stopPropagation(),t=n.$handleEvent(t),n.dragStart(t)},touchmove:function(t){t.stopPropagation(),t=n.$handleEvent(t),n.dragMove(t)}}}),e("v-uni-view",{staticClass:"uni-cropper-line-b",attrs:{"data-drag":"bottom"},on:{touchstart:function(t){t.stopPropagation(),t=n.$handleEvent(t),n.dragStart(t)},touchmove:function(t){t.stopPropagation(),t=n.$handleEvent(t),n.dragMove(t)}}}),e("v-uni-view",{staticClass:"uni-cropper-line-l",attrs:{"data-drag":"left"},on:{touchstart:function(t){t.stopPropagation(),t=n.$handleEvent(t),n.dragStart(t)},touchmove:function(t){t.stopPropagation(),t=n.$handleEvent(t),n.dragMove(t)}}}),e("v-uni-view",{staticClass:"uni-cropper-point point-t",attrs:{"data-drag":"top"},on:{touchstart:function(t){t.stopPropagation(),t=n.$handleEvent(t),n.dragStart(t)},touchmove:function(t){t.stopPropagation(),t=n.$handleEvent(t),n.dragMove(t)}}}),e("v-uni-view",{staticClass:"uni-cropper-point point-tr",attrs:{"data-drag":"topTight"}}),e("v-uni-view",{staticClass:"uni-cropper-point point-r",attrs:{"data-drag":"right"},on:{touchstart:function(t){t.stopPropagation(),t=n.$handleEvent(t),n.dragStart(t)},touchmove:function(t){t.stopPropagation(),t=n.$handleEvent(t),n.dragMove(t)}}}),e("v-uni-view",{staticClass:"uni-cropper-point point-rb",attrs:{"data-drag":"rightBottom"},on:{touchstart:function(t){t.stopPropagation(),t=n.$handleEvent(t),n.dragStart(t)},touchmove:function(t){t.stopPropagation(),t=n.$handleEvent(t),n.dragMove(t)}}}),e("v-uni-view",{staticClass:"uni-cropper-point point-b",attrs:{"data-drag":"bottom"},on:{touchstart:function(t){t.stopPropagation(),t=n.$handleEvent(t),n.dragStart(t)},touchmove:function(t){t.stopPropagation(),t=n.$handleEvent(t),n.dragMove(t)},touchend:function(t){t.stopPropagation(),t=n.$handleEvent(t),n.dragEnd(t)}}}),e("v-uni-view",{staticClass:"uni-cropper-point point-bl",attrs:{"data-drag":"bottomLeft"}}),e("v-uni-view",{staticClass:"uni-cropper-point point-l",attrs:{"data-drag":"left"},on:{touchstart:function(t){t.stopPropagation(),t=n.$handleEvent(t),n.dragStart(t)},touchmove:function(t){t.stopPropagation(),t=n.$handleEvent(t),n.dragMove(t)}}}),e("v-uni-view",{staticClass:"uni-cropper-point point-lt",attrs:{"data-drag":"leftTop"}})],1)],1)],1)],1)],1),e("v-uni-canvas",{style:"position:absolute;border: 1px solid red; width:"+n.imageW+"px;height:"+n.imageH+"px;top:-9999px;left:-9999px;",attrs:{"canvas-id":"myCanvas"}})],1)],1)},a=[];e.d(t,"a",function(){return o}),e.d(t,"b",function(){return a})},d578:function(n,t,e){var o=e("85a9");"string"===typeof o&&(o=[[n.i,o,""]]),o.locals&&(n.exports=o.locals);var a=e("4f06").default;a("95b01902",o,!0,{sourceMap:!1,shadowMode:!1})}}]);