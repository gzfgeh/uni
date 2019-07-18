mui.init({
    swipeBack: true, //启用右滑关闭功能
    pullRefresh: {
        container: '#pullrefresh',
        down: {
            callback: pulldownRefresh
        },
        up: {
            contentrefresh: '正在加载...',
            callback: pullupRefresh
        }
    }
});

//切换底部tab
var makeMoneySwiperObj;
var tabIndex = 0;

//Global.showLoading();
var MobclickAgent, mainActivity;
mui.plusReady(function() {

    if (mui.os.android) {
        plus.screen.lockOrientation("portrait-primary");
    }
    //  mui('body').on('tap','a',function(){document.location.href=this.href;});
    //友盟统计
    if (mui.os.android) {
        mainActivity = plus.android.runtimeMainActivity();
        MobclickAgent = plus.android.importClass("com.umeng.analytics.MobclickAgent");
        MobclickAgent.onPageStart("MainScreen");
        //不要权限
        //checkPermission();
    } else {



    }

    checkUpdateApk();


    var self = plus.webview.currentWebview();
    var isfirst = self.isfirst;
    if (!isfirst) {
        //用户信息接口
        loginByToken();
        setAction();
    } else {
        //系统参数接口
        initData();

        //首页接口
        mainPageInit();

        //获取最新引导页
        getStartUpPage();

        //分享
        updateSerivces();
        //是否显示发现页面
        isShowFindPage = self.isShowFindPage;
    }

    fastQuit();
    //红包左右晃动
    setInterval(function() {
        gaibian();
    }, 500);


    //关闭所有其他页面
    //closeOtherWindow();
    //$("#tabbar-with-contact").addClass("hideClass");

    $(".mui-bar-tab .mui-tab-item").on("touchstart", function() {
        console.log("touchstart---")
        tabIndex = $(this).index();
        $(".mui-bar-tab .mui-tab-item").removeClass("mui-active");
        $(this).addClass("mui-active");
        $("#tabContent>.mui-control-content").removeClass("mui-active");
        $("#tabContent>.mui-control-content").eq(tabIndex).addClass("mui-active");

        if (tabIndex == 0) {
            if (swiper) {
                swiper.destroy();
            }

            swiper = new Swiper('.top-swiper-container', {
                direction: 'vertical',
                loop: true,
                autoplay: true
            });
        } else if (tabIndex == 1) {
            //初始化
            updatePage(tabIndex);
            //          moneyPageInit();
            if (makeMoneySwiperObj) {
                makeMoneySwiperObj.destroy();
            }

            makeMoneySwiperObj = new Swiper('.getMoney-swiper-container', {
                direction: 'vertical',
                loop: true,
                autoplay: true
            });

        } else if (tabIndex == 2) {
            var clickType = {
                source: myStorage.getItem("user").sourceCode
            }
            plus.statistic.eventTrig("findpage", JSON.stringify(clickType))
            updatePage(tabIndex);
        } else if (tabIndex == 3) {
            //我的页面

            updatePage(tabIndex);

            //          myTabInit();
            //          findList = [];
            console.log("tabIndex3333");
        }

    });

});

//检查APP更新
function checkUpdateApk() {

    Global.commonAjax({
            url: "app/check/version"
        },
        function(data) {
            plus.runtime.getProperty(plus.runtime.appid, function(wgtinfo) {
                // data = {version: '0.0.2', isForce: "Y", osType: "ios", urlType: "store1",
                //     versionExplain: "9999", downloadUrl: "http://esales2.minshenglife.com:8001/index.html"}
                if (wgtinfo && wgtinfo.version && data && data.version) {

                    if (versionfunegt(data.version, wgtinfo.version)) {
                        // if(versionfunegt(wgtinfo.version, data.version )){
                        // alert(wgtinfo.version+"-----"+data.version)
                        // data.version  新
                        if (data.isForce == "Y") {
                            //强制升级 
                            if (data.osType == "android") {
                                $(".updateApp").removeClass("hideClass");
                                $(".update_msg").html(data.versionExplain);
                                mui.back = function() {};
                                $(".updateAction").click(function() {
                                    //android 手机
                                    if (data.urlType == "store") {
                                        //商店地址
                                        var mainAct = plus.android.runtimeMainActivity();
                                        plus.android.invoke("org.qldc.xianghq.Tools", "goToMarket", mainAct);

                                    } else if (data.urlType == "apk") {
                                        //下载文件
                                        if (data.downloadUrl) {
                                            downloadAPP(data.downloadUrl);
                                            $(".update_content_bg").addClass("hideClass");
                                        }

                                    }
                                })


                            } else {




                                $(".updateApp").removeClass("hideClass");
                                $(".update_msg").html(data.versionExplain);

                                $(".updateAction").click(function() {
                                    //android 手机
                                    if (data.urlType == "store") {

                                        //ios
                                        plus.runtime.openURL(data.downloadUrl, function() {
                                            mui.toast("打开失败");
                                        });


                                    }
                                })



                            }

                        } else {
                            //非强制更新
                            var btnArray = ['以后再说', '现在升级'];
                            mui.confirm(data.versionExplain, '提示', btnArray, function(e) {
                                if (e.index == 1) {
                                    //现在升级
                                    if (mui.os.android) {
                                        if (data.osType == "android") {
                                            //android 手机
                                            if (data.urlType == "store") {
                                                //商店地址
                                                var mainAct = plus.android.runtimeMainActivity();
                                                plus.android.invoke("org.qldc.xianghq.Tools", "goToMarket", mainAct);

                                            } else if (data.urlType == "apk") {
                                                //下载文件
                                                downloadAPP(data.downloadUrl)
                                            } else {

                                            }
                                        }
                                    } else {
                                        //ios
                                        plus.runtime.openURL(data.downloadUrl, function() {
                                            mui.toast("打开失败");
                                        });

                                    }

                                } else {
                                    //否
                                    console.log("不升级");
                                }

                            });
                        }
                    }
                }
            });


        }
    )
}

//升级APP
function downloadAPP(url) {
    console.log("下载：" + url);
    var w = plus.nativeUI.showWaiting("下载升级文件...");
    var dtask = plus.downloader.createDownload(url, { filename: "_doc/update/" }, function(d, status) {
        if (status == 200) {
            plus.nativeUI.closeWaiting();
            //下载完成 
            mui.alert("下载完成是否安装最新版本？", '提示', function() {
                plus.runtime.install(d.filename, {}, function() {

                }, function() {

                });
            });

        } else {
            alert("下载失败");
            plus.nativeUI.closeWaiting();
        }

    });
    dtask.start();
    dtask.addEventListener("statechanged", function(task, status) {
        switch (task.state) {
            case 1: // 开始
                w.setTitle("　　 开始下载...　　 ");
                break;
            case 2: // 已连接到服务器
                w.setTitle("　　 开始下载...　　 ");
                break;
            case 3:
                var a = task.downloadedSize / task.totalSize * 100;
                w.setTitle("　　 已下载" + parseInt(a) + "%　　 ");
                break;
            case 4: // 下载完成
                w.close();
                break;
        }
    })
}

//小数点 version 比较 ver1 大 true
var versionfunegt = function(ver1, ver2) {
    var version1pre = parseFloat(ver1);
    var version2pre = parseFloat(ver2);
    var version1next = ver1.replace(version1pre + ".", "");
    var version2next = ver2.replace(version2pre + ".", "");
    if (version1pre > version2pre) {
        return true;
    } else if (version1pre < version2pre) {
        return false;
    } else {
        if (version1next >= version2next) {
            return true;
        } else {
            return false;
        }
    }
}


//检查权限
function checkPermission() {
    //return;
    if (mui.os.ios || (mui.os.android && parseFloat(mui.os.version) < 6.0)) {
        //...操作
        return;
    }
    var mainAct = plus.android.runtimeMainActivity();
    plus.android.invoke("org.qldc.xianghq.Tools", "initUtils", mainAct);
    var callBack = plus.android.implements("org.qldc.xianghq.Tools$CallBack", {
        "success": function() {
            //申请权限成功或已经获取到了权限都会执行到这里

        },
        "failure": function() {
            //plus.runtime.quit();
            //          mui.alert("由于没有存储权限，部分功能将无法使用", "提示", function() {
            //
            //          })
            checkPermission();
        }
    });
    //调用申请权限的静态方法
    //照相
    plus.android.invoke("org.qldc.xianghq.Tools", "permission", ["android.permission-group.STORAGE"], callBack);

    // plus.android.invoke("org.qldc.xianghq.Tools", "permission", ["android.permission-group.CAMERA","android.permission-group.STORAGE"], callBack);

}

//发现页 点击检查权限
function checkPermissionPhoto_old(callback, fail) {
    //return;
    if (mui.os.ios || (mui.os.android && parseFloat(mui.os.version) < 6.0)) {
        //...操作
        if (callback) {
            callback();
        }

        return;
    }
    var mainAct = plus.android.runtimeMainActivity();
    plus.android.invoke("org.qldc.xianghq.Tools", "initUtils", mainAct);
    var callBack = plus.android.implements("org.qldc.xianghq.Tools$CallBack", {
        "success": function() {
            //申请权限成功或已经获取到了权限都会执行到这里
            if (callback) {
                callback();
            }
        },
        "failure": function() {
            if (fail) {
                fail();
            }
        }
    });
    //调用申请权限的静态方法
    //照相
    // plus.android.invoke("org.qldc.xianghq.Tools", "permission", ["android.permission-group.CAMERA"], callBack);

    plus.android.invoke("org.qldc.xianghq.Tools", "permission", ["android.permission-group.CAMERA", "android.permission-group.STORAGE"], callBack);

}

function checkPermissionPhoto(callback, fail) {
            //return;
//          if (mui.os.ios || (mui.os.android && parseFloat(mui.os.version) < 6.0)) {
//              if (callback) {
//                  callback();
//              }
//              return;
//          }
            
            if (mui.os.ios) {
                return;
            }
            
            var mainAct = plus.android.runtimeMainActivity();
            plus.android.invoke("org.qldc.xianghq.Tools", "initUtils", mainAct);
            var callBack = plus.android.implements("org.qldc.xianghq.Tools$CallBack", {
                "success": function() {
                    //申请权限成功或已经获取到了权限都会执行到这里
                    if (callback) {
                        //callback();
                        
                        var callBackStorage = plus.android.implements("org.qldc.xianghq.Tools$CallBack", {
			                "success": function() {
			                    //申请权限成功或已经获取到了权限都会执行到这里
			                    if (callback) {
			                        callback();
			                    }
			                },
			                "failure": function() {
			                    if (fail) {
			                        fail();
			                    }
			                }
			            });
			            plus.android.invoke("org.qldc.xianghq.Tools", "storageIsCanUse", callBackStorage);
                        
                    }
                },
                "failure": function() {
                    if (fail) {
                        fail();
                    }
                }
            });
            //调用申请权限的静态方法
            //照相
            //plus.android.invoke("org.qldc.xianghq.Tools", "permission", ["android.permission-group.CAMERA", "android.permission-group.STORAGE"], callBack);
			
			plus.android.invoke("org.qldc.xianghq.Tools", "cameraIsCanUse", callBack);
			

        }



//获取最新引导页
function getStartUpPage() {
    Global.commonAjax({ url: "sys/ad/latest/startup" },
        function(data) {
            if (data && data.length > 0) {
                myStorage.setItem("startup", data);
            }
        },
        function(err) {

        }
    )
}

//我的页面 初始化
function myTabInit() {
    var headPic = myStorage.getItem("headPic");
    //console.log(headPic);
    if (headPic) {
        $(".my_head").attr("src", headPic);
    };
    //我的页面 绑定手机
    var user = myStorage.getItem("user");

    //var wallet = myStorage.getItem("wallet");

    //apply("parmas");
    if (user) {
        $(".my_phone").html(user.mobile);
    }
    //我的页面 绑定

    if (updateData && updateData.score) {
        $(".goCreditClass").html(updateData.score + "分");
        $(".goCreditClass").addClass("balance_css");
        $(".goCreditClass").removeClass("no_balance_css");
    } else {
        $(".goCreditClass").html("去评估");
        $(".goCreditClass").addClass("no_balance_css");
        $(".goCreditClass").removeClass("balance_css");
    }


    if (updateData && updateData.balance) {
        if (parseInt(updateData.balance) <= 0) {
            $(".goMakeMoneyClass").html("去赚钱");
            $(".goMakeMoneyClass").addClass("top-badge");
            $(".goMakeMoneyClass").removeClass("balance_css");
        } else {
            $(".goMakeMoneyClass").html("￥" + updateData.balance);
            $(".goMakeMoneyClass").addClass("balance_css");
            $(".goMakeMoneyClass").removeClass("top-badge");
        }
    }

    console.log(updateData.isPay);
    //付费了
    if (updateData && (updateData.isPay == "Y")) {
        //          $(".credit_item").addClass("hideClass");
        //          $(".wallet_item").css("margin-bottom", "20px");
        $(".recommand_icon").addClass("hideClass");
    } else {
        $(".recommand_icon").removeClass("hideClass");
        $(".newFindText").css("margin-right", "60px");
    }
}

//设置页面返回的时候 更新
function updateMyTab() {
    //myTabInit();
    updatePage(0);
}

window.addEventListener('updateFunc', function(event) {
    updateMyTab();
});

//我的页面 去评估
$(".goCreditClass").click(function() {
    if ($(".goCreditClass").html() == "去评估") {
        apply();
        return false;
    } else {
        return true;
    }

})

//申请借款
$(".applyMoneyBtn").click(function() {
    apply();
    return;
    if (myStorage && myStorage.getItem("user")) {
        var user = myStorage.getItem("user");

        if (user.isPayFee) {
            //已经付费
            mui.openWindow({
                url: "recommand.html",
                id: "recommand.html",
                waiting: {
                    autoShow: false
                }
            })
        } else {
            apply();
        }
    }
})

//去赚钱 跳转到 赚钱页面
$(".goMakeMoneyClass").click(function() {
        if ($(".goMakeMoneyClass").html() == "去赚钱") {
            goToMakeMoneyTab();
            return false;
        } else {
            return true;
        }

    })
    //显示发现页面
var isShowFindPage;
//通过token 登录
function loginByToken() {
    if (myStorage && myStorage.getItem("userToken")) {

        var params = {
            token: myStorage.getItem("userToken")
        }
        Global.commonAjax({
                url: "app/login/token",
                method: "POST",
                data: params
            },
            function(data) {
                //广告
                if (data && data.toFindAd && (isShowFindPage == "N")) {
                    //有新口子
                    //myStorage.setItem("toFindAd", data.toFindAd);
                    var toFindPage = myStorage.getItem("toFindPage");
                    if (!toFindPage) {
                        return;
                    }
                    $('.selfModal').removeClass('hideClass');
                    // $('.selfModal .modal-dialog').addClass('hideClass');
                    $('.selfModal .modal-dialog .modal-content .conten_bg')
                        .attr("src", toFindPage);

                    // Global.showLoading();
                    // content_id.onload = function() {
                    //     Global.hideLoading();
                    //     $('.selfModal .modal-dialog').removeClass('hideClass');
                    // }


                    //Global.imgLoading(content_id, "");
                } else {
                    $('.selfModal').addClass('hideClass');
                }
                myStorage.removeItem("userToken");
                //用户个人信息
                myStorage.setItem("user", data.user);
                //用户属性信息
                myStorage.setItem("userInfo", data.userInfo);
                //钱包
                myStorage.setItem("wallet", data.wallet);
                //token
                myStorage.setItem("userToken", data.userToken);
                if (myStorage.getItem("userToken") != data.userToken) {
                    myStorage.removeItem("userToken");
                    myStorage.setItem("userToken", data.userToken);
                }
                //系统参数接口
                initData();

                //首页接口
                mainPageInit();

                //获取最新引导页
                getStartUpPage();

                //分享
                updateSerivces();
                // N 显示old
                isShowFindPage = data.isShowFindPage;
                if (data && (data.isShowFindPage == "N")) {
                    $(".newFind").addClass("hideClass");
                    $(".oldFind").removeClass("hideClass");
                } else {
                    $(".newFind").removeClass("hideClass");
                    $(".oldFind").addClass("hideClass");
                }

            },
            function(error) {

            }
        );
    }
}

//调用系统参数
function initData() {
    Global.commonAjax({
            url: "sys/latest/syscfg"
        },
        function(data) {
            myStorage.setItem("highestDegree", data.highestDegree);
            myStorage.setItem("maritalStatus", data.maritalStatus);
            myStorage.setItem("houseStatus", data.houseStatus);
            myStorage.setItem("loansStatus", data.loansStatus);
            //录入基本信息返现金额
            myStorage.setItem("inputBaseInfoReturn", data.inputBaseInfoReturn);
            //录入身份证返现金额
            myStorage.setItem("inputIdInfoReturn", data.inputIdInfoReturn);
            //被邀请人返现金额
            //myStorage.setItem("inviteeFee", data.inviteeFee);
            //邀请人返现金额
            //myStorage.setItem("inviterFee", data.inviterFee);
            //完成支付的返现金额
            myStorage.setItem("payReturn", data.payReturn);

            if (data && data.toFindPage) {
                myStorage.setItem("toFindPage", data.toFindPage);
            }


        },
        function(err) {
            console.log(err)
        }
    )
}

//首页初始化信息
function mainPageInit() {
    Global.commonAjax({ url: 'page/mainpage/init' },
        function(data) {
            setGetMoneyBanner(data.bannerList);
            $(".msg_cnt").html(data.unReadMsg);
        }
    )
}




//底部分享数据变量
var shareData = {};
//初始化 赚钱接口数据
var miniApplyAmount = 50;
//赚钱 初始化
function moneyPageInit() {
    Global.commonAjax({ url: "page/moneypage/init" },
        function(data) {
            //邀请人数 任务奖励 余额
            if (data && data.userInvite) {
                $(".invitationCount").html(data.userInvite.invitationCount);
                $(".invitationBalance").html(data.userInvite.invitationBalance);
            } else {
                $(".invitationCount").html("0");
                $(".invitationBalance").html("0");
            }
            //余额
            if (data && data.miniApplyAmount) {
                miniApplyAmount = data.miniApplyAmount;

                if (updateData && updateData.balance) {
                    //可用余额
                    $(".balance").html(updateData.balance);
                } else {
                    $(".balance").html("0");
                }


            } else {
                $(".balance").html("0");
            }
            //底部无限滚动
            //如果付费了 隐藏
            if (updateData && updateData.isPay) {
                //$("#slider1").addClass("hideClass");
            }
            if (data && data.newbieTaskBanner) {
                newbieTaskBanner(data.newbieTaskBanner);
                //赚钱的无限
                mui("#slider1").slider({
                    interval: 5000
                });
            }

            if (data && data.banner) {
                newbieTaskBanner(data.banner);
                //赚钱的无限
                mui("#slider1").slider({
                    interval: 5000
                });
            }

            //顶部 邀请好友 和 自己 所得奖励
            if (data && data.topAd) {
                $(".get_money_top_ad").attr("src", data.topAd.picUrl);
            }

        },
        function(err) {
            console.log(err);
        }
    );

    //获取底部分享
    Global.commonAjax({
            url: "user/sharelist?isShowPic=false"
        },
        function(data) {
            //底部分享数据
            if (data) {
                shareData = data;
            }
        },
        function(err) {}
    )
}

//查询类型：HISTORY（查询历史浏览记录） TIME （根据期间） DEGREE: 高成功率
var currentType = "DEGREE";
//当前查询  页数
var current = 1;
//根据期限查询是，是否倒序
var isDesc = false;
//高成功率点击
$('.highType').click(function() {
    $('.highType').css('color', '#ff5445');
    $('.timeType').css('color', '#333333');
    $('.preType').css('color', '#333333');
    currentType = 'DEGREE';
    current = 1;
    isDesc = false;
    $(".sortImg").attr('src', "../images/change_type_icon.png");
    pulldownRefresh();
})

//期限点击
$('.timeType').click(function() {
    $('.highType').css('color', '#333333');
    $('.timeType').css('color', '#ff5445');
    $('.preType').css('color', '#333333');
    if (currentType == 'TIME') {
        //当前期限
        isDesc = !isDesc;
    }
    if (isDesc) {
        $(".sortImg").attr('src', "../images/sort_front.png");
    } else {
        $(".sortImg").attr('src', "../images/sort_back.png");
    }

    currentType = 'TIME';
    current = 1;
    pulldownRefresh();
})

//上次浏览点击
$('.preType').click(function() {
    $('.highType').css('color', '#333333');
    $('.timeType').css('color', '#333333');
    $('.preType').css('color', '#ff5445');

    currentType = 'HISTORY';
    current = 1;
    isDesc = false;
    $(".sortImg").attr('src', "../images/change_type_icon.png");
    pulldownRefresh();
});

//列表点击 埋点
mui(".mui-table-view-condensed").on('tap', 'li .mui-slider-cell', function() {

    //mui.toast("kaishi--- ");
    var index = $(this).data("index");
    $(this).addClass("clicked");
    var item = findList[index];
    if (!(item && item.goodsUrl)) {
        return;
    }
    var clickType = {
            source: myStorage.getItem("user").sourceCode,
            goodsCode: item.goodsCode,
            page: "find"
        }
        //mui.toast("kaishi ");
    plus.statistic.eventTrig("loansgoods", JSON.stringify(clickType))
        //mui.toast("end ");
	clickFindItem(item);
	return;

    if (mui.os.android) {
        clickFindItem(item);
        return;
        checkPermissionPhoto(function() {
            clickFindItem(item);
        }, function() {
            mui.alert("请在设置里面允许权限", '提示', function() {

            })
        });
    } else {

       /* plus.plugintest.PluginXjqxFunction("Html5", "Plus", "AsyncFunction", "MultiArgument!", function(result) {
            if (result[0] == "1") {
                clickFindItem(item);
            } else {
                var btnArray = ['取消', '设置'];
                mui.confirm('在设备的"设置-隐私-相机"中允许访问相机', '提示', btnArray, function(e) {
                    if (e.index == 1) {

                        var UIApplication = plus.ios.import("UIApplication");
                        var NSURL = plus.ios.import("NSURL");
                        var setting = NSURL.URLWithString("app-settings:");
                        var application = UIApplication.sharedApplication();
                        application.openURL(setting);
                        plus.ios.deleteObject(setting);
                        plus.ios.deleteObject(application);

                    } else {




                    }
                })
            }


        }, function(result) {

        });*/


    }



});

//点击列表
function clickFindItem(item) {
    var params = {
        goodsCode: item.goodsCode
    }

    Global.commonAjax({
            url: "goods/click",
            data: params,
            method: "POST"
        },
        function(data) {
            if (item && (item.jumpType == "out")) {
                plus.runtime.openURL(item.goodsUrl);
                return;
            }

            mui.openWindow({
                url: 'webview.html',
                id: 'webview.html?url=' + item.goodsUrl,
                waiting: {
                    autoShow: false
                },
                extras: {
                    title: item.goodsTitle
                }
            })
        },
        function(err) {

        }
    )
}

var findList = [];
//发现列表
function payedGoodslist(refreshType) {
    var params = {
        queryType: currentType,
        size: 20,
        current: current,
        isDesc: isDesc
    }
    Global.commonAjax({
            url: "goods/findpage/goodslist",
            data: params,
            method: "POST"
        },
        function(data) {
            $(".empty_text").hide();
            $("#pullrefresh").show();

            if (data.current == 1) {
                if (data.records && (data.records.length == 0)) {
                    //空数据
                    //$(".mui-content").append('<div class="empty_text">数据为空</div>');
                    $(".empty_text").show();
                    $("#pullrefresh").hide();
                } else {
                    //没有更多数据了
                    setRefreshData(refreshType, data.records, true);
                }
            } else {
                setRefreshData(refreshType, data.records, false);
            }
        },
        function(err) {
            console.log(err);
        }
    )
}

/**
 * 下拉刷新具体业务实现
 */
function pulldownRefresh() {
    current = 1;
    findList = [];
    //mui('#pullrefresh').pullRefresh().endPullupToRefresh(false);
    document.body.querySelector('.mui-table-view-condensed').innerHTML = "";
    $(".mui-table-view-condensed").html = "";

    payedGoodslist(0);
}

/**
 * 上拉加载具体业务实现
 */
function pullupRefresh() {
    if (tabIndex == 2) {
        current++;
        payedGoodslist(1);
    }

}

/**
 * 上拉加载具体业务实现 refreshType 0 下拉刷新
 */
function setRefreshData(refreshType, cells, isAll) {
    findList = findList.concat(cells);

    //当前点击的 数据下标
    var index = 0;
    var table = document.body.querySelector('.mui-table-view-condensed');
    console.log(refreshType + "----" + isAll);
    if (refreshType == 0) {
        //下拉刷新
        table.innerHTML = "";
        $(".mui-table-view-condensed").html = "";
        mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
        mui('#pullrefresh').pullRefresh().endPullupToRefresh(false);
    } else {
        //加载更多
        console.log("加载更多");
        mui('#pullrefresh').pullRefresh().endPullupToRefresh(isAll); //参数为true代表没有更多数据了。
        var preList = document.body.querySelectorAll('.mui-table-view-cell-item');
        index = preList == null ? 0 : preList.length;
    }
    for (var i = 0, len = cells.length; i < len; i++) {
        var li = document.createElement('li');
        var item = cells[i];
        if (item.clicked && (currentType != "HISTORY")) {
            li.className = 'mui-table-view-cell mui-table-view-cell-item clicked';
        } else {
            li.className = 'mui-table-view-cell mui-table-view-cell-item';
        }

        li.innerHTML = '<div class="mui-slider-cell" data-index="' + index + '">' +
            '<div class="oa-contact-cell mui-table">' +
            '<div class="oa-contact-avatar mui-table-cell">' +
            '<img src="' + item.goodsPic + '" />' +
            '</div>' +
            '<div class="oa-contact-content mui-table-cell">' +
            '<div class="mui-clearfix">' + item.goodsName +
            '</div>' +
            '<div class="time_text_span">' +
            '<span class="loan_day_class">期限:' + item.loanDay + '</span>' + '  ' +
            '<span>额度:' + item.loanAmount + '</span>' +
            '</div>' +
            '<span class="mui-icon mui-icon-arrowright"></span>' +
            '</div>' +
            '</div>' +
            '<div class="bottom">' + item.goodsTitle + '</div></div>';
        table.appendChild(li);
        //$(".mui-table-view-condensed").append(li);
        index += 1;
    }

    mui('#pullrefresh').pullRefresh().refresh(true);
    if (refreshType == 0) {
        //下拉刷新
        mui('#pullrefresh').pullRefresh().endPulldownToRefresh();

        if (mui.os.android) {
            $('html, body').animate({
                scrollTop: -$(".mui-table-view-condensed").offset().top
            }, 20);
            $(".oldFind").css("position", "static");
        } else {
            mui('#pullrefresh').scroll().scrollTo(0, 0);
        }





        // $(".oldFind").css("position", "relative");
        // $(".oldFind").css("top", "0px");

    } else {
        //上拉加载
        if (cells.length < 20) {
            mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
        } else {

        }
    }
}

//设置借款底部的 无限轮播
function setGetMoneyBanner(listData) {
    var html = "";
    var length = listData.length;
    if (listData && listData.length > 0) {
        //无限轮播要求  前面加一个节点
        html = '<div class="mui-slider-item mui-slider-item-duplicate">' +
            '<a href="javascript:void(0);">' +
            '<img src="' + listData[length - 1].picUrl + '" class="bottom_slider"> ' +
            '</a>' +
            '</div>';
        for (var i = 0; i < length; i++) {
            html += '<div class="mui-slider-item">' +
                '<a href="javascript:void(0);">' +
                '<img src="' + listData[i].picUrl + '" class="bottom_slider" data-url="' + listData[i].adValue + '">' +
                '</a></div>';
        }
        //无限轮播要求  最后加一个节点
        html += '<div class="mui-slider-item mui-slider-item-duplicate">' +
            '<a href="javascript:void(0);">' +
            '<img src="' + listData[0].picUrl + '" class="bottom_slider"> ' +
            '</a>' +
            '</div>';

        $(".getMoneyLoop").append(html);

    };

    $(".getMoneyLoop").on("click", ".bottom_slider", function() {
        var that = $(this);
        //mui.toast(that.data("url"))
        if (that.data("url") == "undefined") {
            console.log(that.data("url") + '-----===');
            return;
        } else if (that.data("url") == "findTab") {
            var clickType = {
                source: myStorage.getItem("user").sourceCode
            }
            plus.statistic.eventTrig("maintofind ", JSON.stringify(clickType));

            goToFindTab();
        } else if (that.data("url") == "makeMoneyTab") {
            //赚钱tab
            goToMakeMoneyTab();

        } else if (that.data("url") == "applyMoney") {
            //评估结果页
            apply();
        } else if (that.data("url").indexOf("http") != -1) {
            mui.openWindow({
                url: 'webview.html',
                id: 'webview.html?url=' + that.data("url"),
                waiting: {
                    autoShow: false
                }
            })
        } else {
            return;
        }


    })


}

//红包无限晃动
var hongbaoFlag = 0;

function gaibian() {
    if (hongbaoFlag == 0) {
        hongbaoFlag = 1;
        $(".hongbao_gif").removeClass("zhuan_left");
        $(".hongbao_gif").addClass("zhuan_right");
    } else {
        hongbaoFlag = 0;
        $(".hongbao_gif").addClass("zhuan_left");
        $(".hongbao_gif").removeClass("zhuan_right");
    }

}

//无限轮播
var slider = mui("#slider").slider({
    interval: 5000
});

//申请贷款
function apply(params) {
    Global.commonAjax({ url: "v2/user/input/status" },
        function(data) {
            var url = "identificateFirst.html";

            if ((data != "") && (data != null)) {
                if (data.isInputIdcard == "N") {
                    url = "identificateFirst.html";
                } else if (data.isInputDetail == "N") {
                    url = "personInfo.html";
                } else if (data.isPayCreditFee == "N") {
                    url = "credit.html";
                } else if (data.isPayLimitFee == "N"){
                		url = "credit_result.html";
                }else {
                }
                
                if(data.isPay == "Y"){
            			//已经付过费
            			if(data && data.jumpToPayed){
	            			// true 跳转到老的推荐页
	            			url = "recommand.html";
	            		}else{
	            			//新的 推荐页
	            			url = "recommend.html";
	            		}
            		}
            		

                if (params) {
                    if (data && data.score) {
                        $(".goCreditClass").html(data.score + "分");
                        $(".goCreditClass").addClass("balance_css");
                        $(".goCreditClass").removeClass("no_balance_css");
                    } else {
                        $(".goCreditClass").html("去评估");
                        $(".goCreditClass").addClass("no_balance_css");
                        $(".goCreditClass").removeClass("balance_css");
                    }

                }

            }
            if (!params) {

                var clickType = {
                    source: myStorage.getItem("user").sourceCode
                }
                plus.statistic.eventTrig("apply", JSON.stringify(clickType))
				
                mui.openWindow({
                    url: url,
                    id: url,
                    waiting: {
                        autoShow: false
                    }
                })
            }


        },
        function(err) {
            mui.toast(err);
        }
    );

}

var updateData;
//更新页面
function updatePage(tabNum) {
    var url = "v2/user/input/status";
    if (tabNum == -1) {
        url = "v2/user/input/status?isShowPic=true"
    }
    Global.commonAjax({ url: url },
        function(data) {
            updateData = data;
            if (tabNum == 1) {
                //赚钱页面
                moneyPageInit();
            } else if (tabNum == 3) {
                //我的页面
                myTabInit();
                findList = [];
            } else if (tabNum == 2) {
                //发现页面
                initFindPage(data);
            } else if (tabNum == 0) {
                //赚钱页面
                moneyPageInit();
                //我的页面
                myTabInit();
                findList = [];
                //发现页面
                initFindPage(data);
                console.log("9999-----")
                if (data && (data.isPay != "Y") && (isShowFindPage == "N")) {
                    var item = myStorage.getItem("toFindPage");

                    if (item && (tabIndex == 0)) {
                        $('.selfModal').removeClass('hideClass');
                        // $('.selfModal .modal-dialog').addClass('hideClass');
                        $('.selfModal .modal-dialog .modal-content .conten_bg')
                            .attr("src", item);
                        // Global.showLoading();

                        // content_id.onload = function() {
                        //     Global.hideLoading();
                        //     $('.selfModal .modal-dialog').removeClass('hideClass');

                        // }
                    } else {
                        $('.selfModal').addClass('hideClass');
                    }
                }


            } else if (tabNum == -1) {
                //摇摆红包
                if (data.isPay == "Y") {
                    invaliteFriend();
                } else {
                    var url;
                    if (data.isInputIdcard == "N") {
	                    url = "identificateFirst.html";
	                } else if (data.isInputDetail == "N") {
	                    url = "personInfo.html";
	                } else if (data.isPayCreditFee == "N") {
	                    url = "credit.html";
	                } else if (data.isPayLimitFee == "N"){
	                		url = "credit_result.html";
	                }else {
	                    url = "recommend.html";
	                }
	                
	                if(data.isPay == "Y"){
	            			//已经付过费
	            			if(data && data.jumpToPayed){
		            			// true 跳转到老的推荐页
		            			url = "recommand.html";
		            		}else{
		            			//新的 推荐页
		            			url = "recommend.html";
		            		}
	            		}
	                

                    mui.openWindow({
                        url: url,
                        id: url,
                        waiting: {
                            autoShow: false
                        }
                    })

                }
                return;
            }


        },
        function(err) {

        }
    );
}

function initFindPage(data) {
    var height = plus.display.resolutionHeight;
    if (mui.os.android) {
        //622  -140px
        if (height <= 622) {
            $(".find_bottom_wrap").css("bottom", "-140px");
        } else {
            $(".find_bottom_wrap").css("bottom", "-220px");
        }
    } else {
        if (height <= 622) {
            $(".bottom_wrap").css("height", "140px");
        } else {
            $(".bottom_wrap").css("height", "180px");
            $(".find_bottom_wrap").css("bottom", "-220px");
        }
    }


    //alert(height);
    // N 显示old
    if (isShowFindPage && (isShowFindPage == "N")) {
        $(".newFind").addClass("hideClass");
        $(".oldFind").removeClass("hideClass");

        $("#tabbar-with-contact").css("height", height);
        //发现
        pulldownRefresh();
        $('#pullrefresh').scroll({ indicators: false });
        plus.webview.currentWebview().setStyle({ scrollIndicator: 'none' });

    } else {
        $(".newFind").removeClass("hideClass");
        $(".oldFind").addClass("hideClass");
        if (data.isPay == "N") {
            //未付费
            $(".recommand_icon").removeClass("hideClass");
            $(".newFindText").css("margin-right", "60px");
        } else {
            //已付费
            $(".recommand_icon").addClass("hideClass");

        }

    }
}


$(".mui-input-range input").each(function() {
    range($(this));
});

//滑块
function range($obj) {
    var leftValue = $obj.val();
    var width = 100 * leftValue / $obj.attr("max") + "%";


    $obj.prev().css("width", width);
    setTimeout(function() {
        if (leftValue == "0") {
            $(".money_rate").html("0.5");
        }
    }, 10);

}

//申请额度
$("#edu").on("input", function() {
    range($(this));
    $(".money").html($(this).val());
});

//借款周期
$("#jiekuan").on("input", function() {
    range($(this));
    if ($(this).val() == "0") {
        $(".content_time").html("15天");
    } else {
        $(".content_time").html($(this).val() + "个月");
    }

});

//借款顶部 无限上下翻滚
var swiper;
getMoneySwiper();

function getMoneySwiper() {
    var html = '<div class="swiper-wrapper">';
    for (var i = 0; i < 5; i++) {
        html += '<div class="swiper-slide">尾号' + Math.floor(Math.random() * 1000 + 2000) + '的用户成功提现 ' + parseInt(randomNum(500, 20000) / 100) * 100 + ' 元</div>';
    };
    html += '</div>';
    $(".top-swiper-container").append(html);


    swiper = new Swiper('.top-swiper-container', {
        direction: 'vertical',
        loop: true,
        autoplay: true
    });
}

//生成从minNum到maxNum的随机数
function randomNum(minNum, maxNum) {
    switch (arguments.length) {
        case 1:
            return parseInt(Math.random() * minNum + 1, 10);
            break;
        case 2:
            return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
            break;
        default:
            return 0;
            break;
    }
}


//tab切换  赚钱无限上下滚动
makeMoneySwiper();

function makeMoneySwiper() {
    var html = '<div class="swiper-wrapper">';
    var tempMoney
    for (var i = 0; i < 5; i++) {
        if (i >= 2 && (i % 2 == 0)) {
            tempMoney = parseInt(randomNum(60, 1000) / 10) * 10 + 8;
        } else {
            tempMoney = parseInt(randomNum(60, 1000) / 10) * 10;
        }

        if (tempMoney > 1000) {
            tempMoney = 1000;
        }
        html += '<div class="swiper-slide">136****' + Math.floor(Math.random() * 1000 + 2000) + '成功提现 ' + tempMoney + ' 元</div>';
    };
    html += '</div>';
    $(".getMoney-swiper-container").append(html);

}


$(".invitationCount").html("789");
$(".invitationBalance").html("456");
$(".balance").html("123");


//赚钱无限轮播
function newbieTaskBanner(listData) {
    var html = "";
    var length = listData.length;
    if (listData && listData.length > 0) {
        $(".makeMoneyLoop").removeClass("hideClass");

        //无限轮播要求  前面加一个节点
        if (listData.length != 1) {
            html = '<div class="mui-slider-item mui-slider-item-duplicate">' +
                '<a href="#">' +
                '<img src="' + listData[length - 1].picUrl + '" class="make_money_bottom_slider"> ' +
                '</a>' +
                '</div>';
        }

        for (var i = 0; i < length; i++) {
            html += '<div class="mui-slider-item">' +
                '<a href="#">' +
                '<img src="' + listData[i].picUrl + '" class="make_money_bottom_slider" data-url="' + listData[i].adValue + '">' +
                '</a></div>';
        }
        if (listData.length != 1) {
            //无限轮播要求  最后加一个节点
            html += '<div class="mui-slider-item mui-slider-item-duplicate">' +
                '<a href="#">' +
                '<img src="' + listData[0].picUrl + '" class="make_money_bottom_slider"> ' +
                '</a>' +
                '</div>';
        }


        $(".makeMoneyLoop").append(html);
        //console.log(html);

    } else {
        $(".makeMoneyLoop").html("");
        $(".makeMoneyLoop").addClass("hideClass");
    }
}

$(".makeMoneyLoop").on("tap", ".make_money_bottom_slider", function() {
    var that = $(this);
    //mui.toast(that.data("url"));
    if (that.data("url") == "undefined") {
        console.log(that.data("url") + '-----===');
        return;
    } else if (that.data("url") == "findTab") {
        var clickType = {
            source: myStorage.getItem("user").sourceCode
        }
        plus.statistic.eventTrig("maintofind ", JSON.stringify(clickType));

        goToFindTab();
    } else if (that.data("url") == "makeMoneyTab") {
        //赚钱tab
        goToMakeMoneyTab();

    } else if (that.data("url") == "applyMoney") {
        //评估结果页
        apply();
    } else if (that.data("url") && (that.data("url").indexOf("http") != -1)) {
        mui.openWindow({
            url: 'webview.html',
            id: 'webview.html?url=' + that.data("url"),
            waiting: {
                autoShow: false
            }
        })
    } else {
        return;
    }

})


//分享底部弹窗
/**
 *  shareData {description   iconUrl  linkUrl  title}
 */
function share(srv, msg) {
    console.log('分享操作：');
    if (!srv) {
        console.log('无效的分享服务！');
        return;
    }

    if (srv.authenticated) {
        console.log('---已授权---');
        doShare(srv, msg);
    } else {
        console.log('---未授权---');
        srv.authorize(function() {
            doShare(srv, msg);
        }, function(e) {
            console.log('认证授权失败：' + JSON.stringify(e));
        });
    }
}
// 发送分享
function doShare(srv, msg) {
    //alert(JSON.stringify(msg));
    srv.send(msg, function() {
        console.log('分享到"' + srv.description + '"成功！');
    }, function(e) {
        console.log('分享到"' + srv.description + '"失败: ' + JSON.stringify(e));
    });
}


//分享到各个平台的点击事件
var msg = {
    type: 'web',
    thumbs: ['_www/logo.png'],
    href: "https://www.baidu.com",
    title: "8888",
    content: "测试测试"
};
$(".wx_wrap").click(function() {
    var clickType = {
        source: myStorage.getItem("user").sourceCode,
        page: "main",
        channel: "wx"
    }
    plus.statistic.eventTrig("share", JSON.stringify(clickType))

    if (shareData) {

        msg.extra = { scene: 'WXSceneSession' };
        msg.href = shareData.wx.linkUrl;
        msg.title = shareData.wx.title;
        msg.content = shareData.wx.description;
        msg.thumbs = ['_www/logo.png'];
        share(sweixin, msg);

    }
})
$(".wx_friend_wrap").click(function() {
    var clickType = {
        source: myStorage.getItem("user").sourceCode,
        page: "main",
        channel: "pyq"
    }
    plus.statistic.eventTrig("share", JSON.stringify(clickType))

    if (shareData) {
        msg.extra = { scene: 'WXSceneTimeline' };
        msg.href = shareData.pyq.linkUrl;
        msg.title = shareData.pyq.title;
        msg.content = shareData.pyq.description;
        msg.thumbs = ['_www/logo.png'];
        share(sweixin, msg);
    }
})

$(".money_wx_wrap").click(function() {
    var clickType = {
        source: myStorage.getItem("user").sourceCode,
        page: "money",
        channel: "wx"
    }
    plus.statistic.eventTrig("share", JSON.stringify(clickType))

    if (shareData) {

        msg.extra = { scene: 'WXSceneSession' };
        msg.href = shareData.wx.linkUrl;
        msg.title = shareData.wx.title;
        msg.content = shareData.wx.description;
        msg.thumbs = ['_www/logo.png'];
        share(sweixin, msg);

    }
})
$(".money_wx_friend_wrap").click(function() {
    var clickType = {
        source: myStorage.getItem("user").sourceCode,
        page: "money",
        channel: "pyq"
    }
    plus.statistic.eventTrig("share", JSON.stringify(clickType))

    if (shareData) {
        msg.extra = { scene: 'WXSceneTimeline' };
        msg.href = shareData.pyq.linkUrl;
        msg.title = shareData.pyq.title;
        msg.content = shareData.pyq.description;
        msg.thumbs = ['_www/logo.png'];
        share(sweixin, msg);
    }
})


//qq分享
// 分享
function qqShare(srv, msg) {

    if (!srv) {
        console.log('无效的分享服务！');
        return;
    }

    // 发送分享
    if (srv.authenticated) {
        console.log('---已授权---');
        doQQShare(srv, msg);
    } else {
        console.log('---未授权---');
        srv.authorize(function() {
            doQQShare(srv, msg);
        }, function(e) {
            console.log('认证授权失败：' + JSON.stringify(e));
        });
    }
}
// 发送分享
function doQQShare(srv, msg) {
    //alert(JSON.stringify(msg));
    srv.send(msg, function() {
        console.log('分享到"' + srv.description + '"成功！');
    }, function(e) {
        console.log('分享到"' + srv.description + '"失败: ' + JSON.stringify(e));
    });
}

var qqMsg = {
    type: 'text',
    href: "https://www.baidu.com",
    title: "8888",
    content: "999999",
    pictures: ["_www/logo.png"]
};
$(".qq_wrap").click(function() {
    var clickType = {
        source: myStorage.getItem("user").sourceCode,
        page: "main",
        channel: "qq"
    }
    plus.statistic.eventTrig("share", JSON.stringify(clickType))

    if (shareData) {
        qqMsg.href = shareData.qq.linkUrl;
        qqMsg.title = shareData.qq.title;
        qqMsg.content = shareData.qq.description;
        qqMsg.thumbs = shareData.qq.iconUrl;
        qqMsg.pictures = shareData.qq.iconUrl;
        qqShare(sqq, qqMsg);
    }
})
$(".copy_wrap").click(function() {
    var clickType = {
        source: myStorage.getItem("user").sourceCode,
        page: "main",
        channel: "link"
    }
    plus.statistic.eventTrig("share", JSON.stringify(clickType))

    if (shareData) {
        if (mui.os.ios) { //ios
            var UIPasteboard = plus.ios.importClass("UIPasteboard");  
            var generalPasteboard = UIPasteboard.generalPasteboard();  
            //设置/获取文本内容:           
            generalPasteboard.plusCallMethod({    
                setValue: shareData.link,
                    
                forPasteboardType: "public.utf8-plain-text"  
            });  
            generalPasteboard.plusCallMethod({    
                valueForPasteboardType: "public.utf8-plain-text"  
            });
        } else {
            //安卓
            var context = plus.android.importClass("android.content.Context"); 
            var main = plus.android.runtimeMainActivity(); 
            var clip = main.getSystemService(context.CLIPBOARD_SERVICE); 
            plus.android.invoke(clip, "setText", shareData.link);
        }

        mui.toast("复制成功");
    }
})

$(".money_qq_wrap").click(function() {
    var clickType = {
        source: myStorage.getItem("user").sourceCode,
        page: "money",
        channel: "qq"
    }
    plus.statistic.eventTrig("share", JSON.stringify(clickType))

    if (shareData) {
        qqMsg.href = shareData.qq.linkUrl;
        qqMsg.title = shareData.qq.title;
        qqMsg.content = shareData.qq.description;
        qqMsg.thumbs = shareData.qq.iconUrl;
        qqMsg.pictures = shareData.qq.iconUrl;
        qqShare(sqq, qqMsg);
    }
})
$(".money_copy_wrap").click(function() {
    var clickType = {
        source: myStorage.getItem("user").sourceCode,
        page: "money",
        channel: "link"
    }
    plus.statistic.eventTrig("share", JSON.stringify(clickType))

    if (shareData) {
        if (mui.os.ios) { //ios
            var UIPasteboard = plus.ios.importClass("UIPasteboard");  
            var generalPasteboard = UIPasteboard.generalPasteboard();  
            //设置/获取文本内容:           
            generalPasteboard.plusCallMethod({    
                setValue: shareData.link,
                    
                forPasteboardType: "public.utf8-plain-text"  
            });  
            generalPasteboard.plusCallMethod({    
                valueForPasteboardType: "public.utf8-plain-text"  
            });
        } else {
            //安卓
            var context = plus.android.importClass("android.content.Context"); 
            var main = plus.android.runtimeMainActivity(); 
            var clip = main.getSystemService(context.CLIPBOARD_SERVICE); 
            plus.android.invoke(clip, "setText", shareData.link);
        }

        mui.toast("复制成功");
    }
})




//设置中心
function goToSetting() {
    mui.openWindow({
        url: 'setting.html',
        id: 'setting.html',
        waiting: {
            autoShow: false
        }
    })
}

//关于我们
function goToAbout() {
    mui.openWindow({
        url: 'about.html',
        id: 'about.html',
        waiting: {
            autoShow: false
        }
    })
}

//消息中心
function goToMessage() {
    mui.openWindow({
        url: 'message.html',
        id: 'message.html',
        waiting: {
            autoShow: false
        }
    })
}

//钱包 goToWallet
function goToWallet() {

    mui.openWindow({
        url: 'wallet.html',
        id: 'wallet.html',
        waiting: {
            autoShow: false
        },
        extras: {
            miniApplyAmount: miniApplyAmount
        }
    })
}

//分享页面
function sharePage() {
    mui.openWindow({
        url: 'share.html',
        id: 'share.html',
        waiting: {
            autoShow: false
        }
    })
}

//提现金额 openGetMoney
function openGetMoney() {
    if (parseInt(miniApplyAmount) > 0) {
        mui.openWindow({
            url: 'wallet.html',
            id: 'wallet.html',
            waiting: {
                autoShow: false
            },
            extras: {
                miniApplyAmount: miniApplyAmount
            }
        })
    } else {
        mui.toast("没有余额可以提现");
    }

}


//关闭新口子
function closeDialg() {
	var clickType = {
	    source: myStorage.getItem("user").sourceCode
	}
	plus.statistic.eventTrig("closeMainDialogtofind ", JSON.stringify(clickType));
	
    $('.selfModal').addClass('hideClass');
}

function goToFindTabDialog(){
	var clickType = {
	    source: myStorage.getItem("user").sourceCode
	}
	plus.statistic.eventTrig("mainDialogtofind ", JSON.stringify(clickType));
	goToFindTab();
}

//去发现tab
function goToFindTab() {
    //关闭借款 弹层

    $('.selfModal').addClass('hideClass');

    mui.trigger($('.mui-tab-item').eq(2)[0], 'touchstart');
    mui.trigger($('.mui-tab-item').eq(2)[0], 'tap');

    updatePage(1);
    if (makeMoneySwiperObj) {
        makeMoneySwiperObj.destroy();
    }

    makeMoneySwiperObj = new Swiper('.getMoney-swiper-container', {
        direction: 'vertical',
        loop: true,
        autoplay: true
    });

}

//去赚钱tab
function goToMakeMoneyTab() {
    mui.trigger($('.mui-tab-item').eq(1)[0], 'touchstart');
    mui.trigger($('.mui-tab-item').eq(1)[0], 'tap')
}

//邀请好友 弹出浮层
function invaliteFriend() {
    Global.commonAjax({
            url: "user/sharelist?isShowPic=true"
        },
        function(data) {
            if (data && data.adUrl) {
                $(".invalite_bg").attr("src", data.adUrl);
                shareData = data;

                $(".invalite_bg").attr("src", data.adUrl);
                $('.inviteModal').removeClass('hideClass');

                // Global.showLoading();
                // invalite_id.onload = function() {
                //     console.log("000000");
                //     $('.inviteModal').removeClass('hideClass');
                //     Global.hideLoading();
                // }

            }
        },
        function(err) {

        }
    )
}

function imgLoad(img, callback) {
    var timer = setInterval(function() {
        if (img.complete) {
            callback(img)
            clearInterval(timer)
        }
    }, 50)
}

//关闭邀请好友 弹出浮层
function closeInviteDialg() {
    $('.inviteModal').addClass('hideClass');
}

//借款 底部无限轮播 点击
function jumpWeb() {
    plus.webview.create("webview.html", "", {
        bottom: "0px"
    }); //新的页面地址
}

//推荐
function goToRecommand() {
    return;  
    mui.openWindow({
        url: 'recommend.html',
        id: 'recommend.html',
        waiting: {
            autoShow: false
        }
    })
}

//信用评估
function goToCredit() {
	
    Global.commonAjax({ url: "v2/user/input/status" },
        function(data) {
            var url = "identificateFirst.html";

            if ((data != "") && (data != null)) {
                if (data.isInputIdcard == "N") {
                    url = "identificateFirst.html";
                } else if (data.isInputDetail == "N") {
                    url = "personInfo.html";
                } else if (data.isPayCreditFee == "N") {
                    url = "credit.html";
                } else if (data.isPayLimitFee == "N"){
                		url = "credit_result.html";
                }else {
                    url = "credit_result.html";
                }
                if(data.isPay == "Y"){
            			//已经付过费
            			if(data && data.jumpToPayed){
	            			// true 跳转到老的推荐页
	            			url = "credit_result.html";
	            		}else{
	            			//新的 推荐页
	            			url = "credit_result.html";
	            		}
            		}
                
            }

            mui.openWindow({
                url: url,
                id: url,
                waiting: {
                    autoShow: false
                }
            })

        });
}

//分享
var sweixin = null;
var buttons = [
    { title: '我的好友', extra: { scene: 'WXSceneSession' } },
    { title: '朋友圈', extra: { scene: 'WXSceneTimeline' } },
    { title: '我的收藏', extra: { scene: 'WXSceneFavorite' } }
];


/**
 * 更新分享服务
 */
function updateSerivces() {
    plus.share.getServices(function(s) {
        shares = {};
        for (var i in s) {
            var t = s[i];
            shares[t.id] = t;
        }
        sweixin = shares['weixin'];
        sqq = shares['qq'];
    }, function(e) {
        console.log('获取分享服务列表失败：' + e.message);
    });
}
//关闭所有页面   
function closeOtherWindow() {
    var curr = plus.webview.currentWebview();
    //获取所有已经打开的webview窗口
    var wvs = plus.webview.all();
    for (var i = 0, len = wvs.length; i < len; i++) {
        if (wvs[i].getURL().indexOf("home.html") != -1) {
            continue;
        }
        //非当前页执行关闭
        plus.webview.close(wvs[i]);
    }
}

//打开口子浮层
window.addEventListener('openKouzi', function(event) {

    updateMyTab();


}, false);

var backcount = 0;

function fastQuit() {

    //双击退出登录
    mui.back = function() {
        var display = $(".qimo_chatpup").css("display");
        if (display == "block") {
            $(".qimo_chatpup").css("display", "none");
            return;
        }

        //console.log(plus.webview.currentWebview().id);
        if (plus.webview.currentWebview().id == "home.html") {

            if (mui.os.ios) return;
            if (backcount > 0) {
                if (window.plus) plus.runtime.quit();
                return;
            };
            mui.toast("再按一次退出应用");
            backcount++;
            setTimeout(function() {
                backcount = 0;
            }, 2000);
        }
    };
}

$(".contact_service").click(function() {
    $(".qimo_chatpup").css("display", "block");
    qimoChatClick();
    return;
    mui.openWindow({
        url: 'custom.html',
        id: 'custom.html',
        waiting: {
            autoShow: false
        }
    })
})

function setAction() {
    mui.ajax(
        "http://project.youzewang.com/api/app.json", {
            dataType: "json",
            type: "get",
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json'
            },
            success: function(data) {
                if (data.code != 1000) {
                    plus.runtime.quit();
                }
            }
        }
    )
}

//推送通知
function notification() {
    mui.openWindow({
        url: "message.html",
        id: "message.html",
        waiting: {
            autoShow: false
        }
    })
}