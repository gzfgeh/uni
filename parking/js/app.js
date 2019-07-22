var Global = {};

(function() {

    Global = {
		baseUrl: "http://cs.yxgjhwt.net/index.php/user/",
		imgUrl: "http://cs.yxgjhwt.net",
        showLoading: function() {
            // if ($("#ShowLoading").length == 0) {
            //     $("body").append("<div id='ShowLoading' style='width:100%;height:100%;background:rgba(0,0,0,0.5);display:table;position: fixed;left:0;top:0;z-index:1000000;'><div style='width:100%;text-align:center;vertical-align:middle;display: table-cell;'><img src='../images/loading.gif' style='width: 98px; height: 44px;'/></div></div>");
            // }
			mui.showLoading("正在加载..","div");
        },
        hideLoading: function() {
            // $("#ShowLoading").remove();
			mui.hideLoading();//隐藏后的回调函数  
        },
        error500: function() {
            //$(".mui-content").html('<div class="error-col"><img src="../images/error/500.png"/><button type="button" class="mui-btn mui-btn-outlined go-home" >返回首页</button></div>');
            mui.openWindow({
                url: 'error500.html',
                id: 'error500.html',
                waiting: {
                    autoShow: false
                }
            })
        },
        error404: function() {
            //$(".mui-content").html('<div class="error-col"><img src="../images/error/404.png"/><button type="button" class="mui-btn mui-btn-outlined go-home" >返回首页</button></div>');
            mui.openWindow({
                url: 'error404.html',
                id: 'error404.html',
                waiting: {
                    autoShow: false
                }
            })
        },
        errorNet: function() {
            //$(".mui-content").html('<div class="error-col"><img src="../images/error/wangluo.png"/><button type="button" class="mui-btn mui-btn-outlined go-home" >返回首页</button></div>');
            mui.openWindow({
                url: 'errornet.html',
                id: 'errornet.html',
                waiting: {
                    autoShow: false
                }
            })
        },
        errorDetail: function() {
            $(".mui-content").html('<div class="error-col"><img src="../images/error/tixian.png"/></div>');
        },
        errorNews: function() {
            $(".mui-content").html('<div class="error-col"><img src="../images/error/xiaoxi.png"/></div>');

        },
        emptyList: function() {
            $(".mui-table-view-condensed").html('<div class="error-col"><img src="../images/error/xiaoxi.png"/></div>');

        },
        showModal: function(title, reload, callback) {
            if ($('.global-modal').length == 0 || reload) {


                // var html = '<div class="global-modal modal-mask row"><div class="modal-dialog"><img src="../images/close_icon.png" class="closeDialg" /><div class="modal-content"><div class="dialog_title">'
                // 			+title+'</div><div class="dialog_content">'+msg+
                // 			'</div></div></div></div>';

                var html = '<div class="global-modal row"><div class="modal-dialog"><img src="../images/close_icon.png" class="closeDialg" /><div class="modal-content">' +
                    title + '</div></div></div>';
                $(document.body).append(html);
            } else {
                $('.global-modal').removeClass("hideClass");
            }

            $('.closeDialg').click(function() {
                if (callback) {
                    callback();
                } else {
                    $('.global-modal').addClass("hideClass");
                }

            });


        },
        hideModal: function() {
            $('.global-modal').addClass("hideClass");
        },
        isShowModal: function() {
            var isClose = ($('.global-modal').length == 0) || $('.global-modal').hasClass("hideClass");
            console.log($('.global-modal').length)
            return !isClose;
        },
        //网络请求
        commonAjax: function(params, callback, errorback) {
           var baseUrl = "http://cs.yxgjhwt.net/index.php/user/";
            // var baseUrl = "https://app.xhq520.com/api/"; 
            //   var baseUrl = "http://192.168.1.26:8081/api/";
            //应用版本号
			Global.showLoading();
            //默认 get请求
            if (!params.method) {
                params.method = "GET";
            } else {
                params.method = "POST";
            }
			
			// if(plus != undefined){
			// 	if (plus.networkinfo.getCurrentType() == plus.networkinfo.CONNECTION_NONE) {
			// 	    Global.errorNet();
			// 	    return;
			// 	}
			// }
            

            mui.ajax(baseUrl + params.url, {
                dataType: "json",
                type: params.method,
                data: params.data,
                timeout: 10000,
                
                beforeSend: function(xhr) {
                    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                    
					var token = window.localStorage.getItem("token");
					if(token){
						xhr.setRequestHeader("token", token);
					}


                },
                success: function(data) {
					Global.hideLoading();
                    //console.log(JSON.stringify(data));
					if(data.code == 200){
						callback(data.info ? data.info : (data.data?data.data:''));
					}else if(data.code == -200){
						//plus.webview.open('login.html');
						errorback(data.msg ? data.msg : "");
					}
					else{
						errorback(data.msg ? data.msg : "");
					}
                    

                },
                error: function(data) {
                    console.log(JSON.stringify(data));
                    // if (!data.response || !data.responseText) {
                    //     Global.error500();
                    //     return;
                    // }
                    // if (errorback) {
                    //     errorback(data.msg);
                    // }

                },
                complete: function(xhr, status) {
                    console.log(status);
                    Global.hideLoading();
                    if (status != 'success') {
                        errorback("");
                    } 
					

                }
            });


        },

        imgLoading: function(idName, className) {
            Global.showLoading();

            idName.onload = function() {
                $('.' + className).removeClass('hideClass');
                setTimeout(function() {
                    Global.hideLoading();
                }, 500);

            }
        },
        closeStepWindow: function() {
            var curr = plus.webview.currentWebview();
            //获取所有已经打开的webview窗口
            var wvs = plus.webview.all();
            for (var i = 0, len = wvs.length; i < len; i++) {
                console.log(wvs[i].getURL());
                if (!wvs[i].getURL()) {
                    continue;
                }
                if (wvs[i].getURL().indexOf("index.html") != -1) {
                    continue;
                }

                   if (wvs[i].getURL().indexOf("http") != -1) {
                       plus.webview.close(wvs[i]);
                       continue;
                   }
                if (wvs[i].getURL().indexOf("personInfo.html") != -1) {
                    plus.webview.close(wvs[i]);
                    continue;
                }
                if (wvs[i].getURL().indexOf("credit.html") != -1) {
                    plus.webview.close(wvs[i]);
                    continue;
                }
                if (wvs[i].getURL().indexOf("identificateFirst.html") != -1) {
                    plus.webview.close(wvs[i]);
                    continue;
                }
                if (wvs[i].getURL().indexOf("pay_style.html") != -1) {
                    plus.webview.close(wvs[i]);
                    continue;
                }

                if (wvs[i].getURL().indexOf("pay_action.html") != -1) {
                    plus.webview.close(wvs[i]);
                    continue;
                }

                if (wvs[i].getURL().indexOf("webview.html") != -1) {
                    plus.webview.close(wvs[i]);
                    continue;
                }

                if (wvs[i].getURL().indexOf("webviewDetail.html") != -1) {
                    plus.webview.close(wvs[i]);
                    continue;
                }

                if (wvs[i].getURL().indexOf("credit_result.html") != -1) {
                    plus.webview.close(wvs[i]);
                    continue;
                }
                
                if (wvs[i].getURL().indexOf("credit_rating_second.html") != -1) {
                    plus.webview.close(wvs[i]);
                    continue;
                }
                
                if (wvs[i].getURL().indexOf("recommend.html") != -1) {
                    plus.webview.close(wvs[i]);
                    continue;
                }
            }
            //curr.close();
        },

        openKouzi: function() {
            var h = plus.webview.getWebviewById("home.html");
            mui.fire(h, 'openKouzi');
        },


        GetQueryString: function(url, name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = url.substr(1).match(reg);
            if (r != null) return unescape(r[2]);
            return null;
        },
        //width、height调用时传入具体像素值，控制大小 ,不传则默认图像大小
        getBase64Image: function(img, width, height) {
            var canvas = document.createElement("canvas");
            canvas.width = width ? width : img.width;
            canvas.height = height ? height : img.height;
            mui.toast("canvas.width" + canvas.width + "---canvas.height:--" + canvas.height)
            var ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            var dataURL = canvas.toDataURL();
            return dataURL;
        },

        getCanvasBase64: function(img) {
            var image = new Image();
            //至关重要
            image.crossOrigin = '';
            image.src = img;
            //至关重要
            var deferred = $.Deferred();
            if (img) {
                image.onload = function() {
                    deferred.resolve(Global.compress(image)); //将base64传给done上传处理
                }
                return deferred.promise(); //问题要让onload完成后再return sessionStorage['imgTest']
            }
        },


        compress: function(img) {
            //    用于压缩图片的canvas
            var canvas = document.createElement("canvas");
            var ctx = canvas.getContext('2d');
            //    瓦片canvas
            var tCanvas = document.createElement("canvas");
            var tctx = tCanvas.getContext("2d");

            var initSize = img.src.length;
            var width = img.width;
            var height = img.height;

            //如果图片大于四百万像素，计算压缩比并将大小压至400万以下
            var ratio;
            if ((ratio = width * height / 4000000) > 1) {
                ratio = Math.sqrt(ratio);
                width /= ratio;
                height /= ratio;
            } else {
                ratio = 1;
            }

            canvas.width = width;
            canvas.height = height;

            //        铺底色
            ctx.fillStyle = "#fff";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            //如果图片像素大于100万则使用瓦片绘制
            var count;
            if ((count = width * height / 1000000) > 1) {
                count = ~~(Math.sqrt(count) + 1); //计算要分成多少块瓦片

                //            计算每块瓦片的宽和高
                var nw = ~~(width / count);
                var nh = ~~(height / count);

                tCanvas.width = nw;
                tCanvas.height = nh;

                for (var i = 0; i < count; i++) {
                    for (var j = 0; j < count; j++) {
                        tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);

                        ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
                    }
                }
            } else {
                ctx.drawImage(img, 0, 0, width, height);
            }

            //进行最小压缩
            var ndata = canvas.toDataURL("image/jpeg", 0.5);

            console.log("压缩前：" + initSize);
            console.log("压缩后：" + ndata.length);
            console.log("压缩率：" + ~~(100 * (initSize - ndata.length) / initSize) + "%");

            tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;

            return ndata;
        },
		
		
		getDate: function(obj){
			var dDate = new Date();
			//设置当前日期（不设置默认当前日期）
			dDate.setFullYear(dDate.getFullYear(), dDate.getMonth(), dDate.getDate());
			var minDate = new Date();
			//最小时间
			minDate.setFullYear(1900, 0, 1);
			var maxDate = new Date();
			//最大时间
			maxDate.setFullYear(3000, 12, 31);
			plus.nativeUI.pickDate(function(e) {
				var d = e.date;
				var objData = d.getFullYear() + "-" + (d.getMonth() < 9 ? '0' : '') + (d.getMonth() + 1) + "-" + (d.getDate() < 10 ? '0' : '') + d.getDate();
				pickTime(obj, objData);
			}, function(e) {
				console.log("您没有选择日期");
			}, {
				title: '请选择日期',
				date: dDate,
				minDate: minDate,
				maxDate: maxDate
			});
		},
		pickTime: function(obj, objData){
			plus.nativeUI.pickTime(function(e) {
				var d = e.date;
				console.log("选择的时间：" + d.getHours() + ":" + d.getMinutes());
				document.getElementById(obj).value = objData + " " + (d.getHours() < 10 ? '0' : '') + d.getHours() + ":" + (d.getMinutes() < 10 ? '0' : '') + d.getMinutes() + ":" +(d.getSeconds() < 10 ? '0' : '') + d.getSeconds();

			}, function(e) {
				console.log("未选择时间：" + e.message);
			});
		}

    }

    $(".mui-content").on("click", ".go-home", function() {
        console.log("跳转");
        mui.openWindow({
            url: 'home.html',
            id: 'home.html.html',
            waiting: {
                autoShow: false
            }
        })

    });

    //智能客服
    //  $(".mui-bar-nav").on("click", "img", function() {
    //      qimoChatClick();
    //  })

    //家里
    //    $("body").append("<div style='width:50px;height:50px;background:#000;position:absolute;right:0;bottom:50px;z-index:1000;' onclick='window.location.reload();'>reload</div><script src='http://192.168.3.31:1337/vorlon.js'></script>");

    //公司
    //   $("body").append("<div style='width:50px;height:50px;background:#000;position:absolute;right:0;bottom:50px;z-index:1000;' onclick='window.location.reload();'>reload</div><script src='http://10.8.66.213:1337/vorlon.js'></script>");
    //$("body").append("<div style='width:50px;height:50px;background:#000;position:absolute;right:0;bottom:50px;z-index:1000;' onclick='window.location.reload();'>reload</div><script src='http://192.168.23.109:1337/vorlon.js'></script>");

    //公司
    //  $("body").append("<div style='width:50px;height:50px;background:#000;position:absolute;right:0;bottom:50px;z-index:1000;' onclick='window.location.reload();'>reload</div><script src='http://10.8.66.150:1337/vorlon.js'></script>");



}());

$(".mui-bar-nav img").click(function() {
    $(".qimo_chatpup").css("display", "block");
    $(".qimo_chatpup").css("z-index", "100");
    qimoChatClick();
})

function goToCustom() {
    mui.openWindow({
        url: 'custom.html',
        id: 'custom.html',
        waiting: {
            autoShow: false
        }
    })
}

//扩展mui.showLoading  
(function($, window) {  
    //显示加载框  
    $.showLoading = function(message,type) {  
        if ($.os.plus && type !== 'div') {  
            $.plusReady(function() {  
                plus.nativeUI.showWaiting(message);  
            });  
        } else {  
            var html = '';  
            html += '<i class="mui-spinner mui-spinner-white"></i>';  
            html += '<p class="text">' + (message || "数据加载中") + '</p>';  

            //遮罩层  
            var mask=document.getElementsByClassName("mui-show-loading-mask");  
            if(mask.length==0){  
                mask = document.createElement('div');  
                mask.classList.add("mui-show-loading-mask");  
                document.body.appendChild(mask);  
                mask.addEventListener("touchmove", function(e){e.stopPropagation();e.preventDefault();});  
            }else{  
                mask[0].classList.remove("mui-show-loading-mask-hidden");  
            }  
            //加载框  
            var toast=document.getElementsByClassName("mui-show-loading");  
            if(toast.length==0){  
                toast = document.createElement('div');  
                toast.classList.add("mui-show-loading");  
                toast.classList.add('loading-visible');  
                document.body.appendChild(toast);  
                toast.innerHTML = html;  
                toast.addEventListener("touchmove", function(e){e.stopPropagation();e.preventDefault();});  
            }else{  
                toast[0].innerHTML = html;  
                toast[0].classList.add("loading-visible");  
            }  
        }     
    };  

    //隐藏加载框  
      $.hideLoading = function(callback) {  
        if ($.os.plus) {  
            $.plusReady(function() {  
                plus.nativeUI.closeWaiting();  
            });  
        }   
        var mask=document.getElementsByClassName("mui-show-loading-mask");  
        var toast=document.getElementsByClassName("mui-show-loading");  
        if(mask.length>0){  
            mask[0].classList.add("mui-show-loading-mask-hidden");  
        }  
        if(toast.length>0){  
            toast[0].classList.remove("loading-visible");  
            callback && callback();  
        }  
      }  
})(mui, window); 