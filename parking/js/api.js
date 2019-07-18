var fly=require("flyio");


//设置超时
fly.config.timeout=10000;
//设置请求基地址
fly.config.baseURL="https://wendux.github.io/";



//给所有请求添加自定义header
fly.interceptors.request.use(function(request){
    //应用版本号
    request.headers["appVersion"]=plus.runtime.version;
	//设备唯一标识
    request.headers["deviceId"]=plus.device.uuid;
    //系统的版本信息
    request.headers["osVersion"]=plus.os.version;
    request.headers["appType"]=plus.os.name;
    request.headers["appName"]="xhq";
    
    var token = window.localStorage.getItem("token");
    if(token){
        request.headers["Authorization"]="Bearer "+token;
    }
    mui.toast(request.body);
    //打印出请求体
    console.log(request.body);
    
    Global.showLoading();
    return request;
});

//添加响应拦截器，响应拦截器会在then/catch处理之前执行
fly.interceptors.response.use(
    function(response){
        Global.hideLoading();
        //只将请求结果的data字段返回
        return response.data
    },
    function(err) {
        Global.hideLoading();
        //发生网络错误后会走到这里
        return Promise.resolve("");
    }
)


