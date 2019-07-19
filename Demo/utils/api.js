import request from './request'
var qs = require('qs')

export const BASE_IMAGE_URL = 'https://apitest.baobaoloufu.com/';

/**
 * 发送验证码
 */
export function sendCode(phone, type) {
    return request.get('User/User/sendCode?phone='+phone+"&type="+type)
}

/**
 * 注册
 */
export function register(phone, smsVercode,password,clientID) {
    return request.get('User/User/register?phone='+phone+"&smsVercode="+smsVercode+"&password="+password+"&clientID="+clientID+"&platform="+uni.getSystemInfoSync().platform)
}

/**
 * 登陆
 */
export function login(phone,pwd,clientID) {
    return request.get('User/User/login?phone='+phone+"&type=1&pwd="+pwd+"&clientID="+clientID+"&deviceID=&userCode=&platform="+uni.getSystemInfoSync().platform)
}

/**
 * VIP 登陆
 */
export function loginVIP(vipCode,clientID) {
    return request.get('User/User/login?vipCode='+vipCode+"&type=6&clientID="+clientID+"&deviceID=&userCode=&platform="+uni.getSystemInfoSync().platform)
}

/**
 * 找回密码
 */
export function forget(phone,smsVercode,pwd,clientID) {
    return request.get('User/User/login?phone='+phone+"&smsVercode="+smsVercode+"&type=3&pwd="+pwd+"&clientID="+clientID+"&deviceID=&userCode=&platform="+uni.getSystemInfoSync().platform)
}

/**
 * 注销登录
 */
export function logout(userID) {
    return request.get('User/User/logout?userID='+userID)
}

/**
 * 楼宇列表
 */
export function getYzByRegionId(params) {
    return request.get('Address/Index/getYzByRegionId',params)
}

/**
 * 保存用户选择楼宇
 */
export function addUserChooseBuilding(userID,buildingID) {
    return request.get('Address/Index/addUserChooseBuilding?userID='+userID+'&buildingID='+buildingID)
}

/**
 * 获取城市列表
 */
export function getCityList() {
    return request.get('Address/Index/getCityList')
}

/**
 * 查询地址列表
 */
export function getAllAddress(params) {
    return request.post('Address/Index/getAllAddress', qs.stringify(params))
}

/**
 * 新增地址列表
 */
export function saveAddress(params) {
    return request.post('Address/Index/saveAddress', qs.stringify(params))
}

/**
 * 省市区
 */
export function region(params) {
    return request.post('Address/Index/region', qs.stringify(params))
}

/**
 * 地址管理
 */
export function addressManage(params) {
    return request.post('Address/Index/addressManage', qs.stringify(params))
}

/**
 * 用户绑定企业号
 */
export function addQycompany(params) {
    return request.post('Qycompany/index/addQycompany', qs.stringify(params))
}

/**
 * 计算快递价格
 */
export function calculateExpressPrice(params) {
    return request.post('Order/Index/calculateExpressPrice', qs.stringify(params))
}


/**
 * 同城订单价格计算
 */
export function calculateExpressPriceTongCheng(params) {
    return request.post('Order/Index/calculateExpressPriceTongCheng', qs.stringify(params))
}

/**
 * 提交快递订单
 */
export function createOrder(params) {
    return request.post('Order/Index/createOrder', qs.stringify(params))
}

/**
 * 提交快递订单
 */
export function createOrderTongCheng(params) {
    return request.post('Order/Index/createOrderTongCheng', qs.stringify(params))
}


/**
 * 支付宝支付调用
 */
export function expressPrepareForAlipay(params) {
    return request.post('Pay/Index/alipay_app', qs.stringify(params))
}


/**
 * 微信支付调用
 */
export function expressUnifiedOrder(params) {
    return request.post('Pay/Index/expressUnifiedOrder', qs.stringify(params))
}



export function getOrderList(params) {
    return request.post('Order/Index/getOrderList', qs.stringify(params))
}

/**
 * 快递订单详情
 */
export function getOrderDetail(params) {
    return request.post('Order/Index/getOrderDetail', qs.stringify(params))
}


/**
 * 快递订单详情
 */
export function cancelOrder(params) {
    return request.post('Order/Index/cancelOrder', qs.stringify(params))
}

/**
 * 快递查询
 */
export function getExpressInfoByorderSN(params) {
    return request.post('logistics/logistics/getExpressInfoByorderSN', qs.stringify(params))
}

/**
 * 企业解绑
 */
export function deleteQyCompany(params) {
    return request.post('Qycompany/Index/deleteQyCompany', qs.stringify(params))
}

/**
 * 收件列表
 */
export function getQsOrderList(params) {
    return request.post('User/User/getQsOrderList', qs.stringify(params))
}


/**
 * 首页轮播
 */
export function getBanners(position,buildingID) {
    return request.get('Home/index/getBanners?position='+position+'&buildingID='+buildingID)
}

/**
 * 首页功能模块
 */
export function getServiceLeftMenuList(buildingID) {
    return request.get('Home/index/getServiceLeftMenuList?buildingID='+buildingID)
}

/**
 * 宝宝团队
 */
export function getYZCourierList(buildingID) {
    return request.get('Courier/Courier/getYZCourierList?buildingID='+buildingID)
}

/**
 * 楼层索引
 */
export function getLouYuListByYzID(buildingID, companyType) {
    return request.get('Courier/Courier/getLouYuListByYzID?buildingID='+buildingID+"&companyType="+companyType)
}

/**
 * 更新用户信息
 */
export function updateUserInfo(params) {
    return request.post('User/User/updateUserInfo', qs.stringify(params))
}


/**
 * 退款申请
 */
export function RefundOrder(params) {
    return request.post('Order/index/RefundOrder', qs.stringify(params))
}

/**
 * 系统消息获取
 */
export function getMessageListByType(params) {
    return request.post('User/User/getMessageListByType', qs.stringify(params))
}

/**
 * 标记消息为已读
 */
export function MessageRead(params) {
    return request.post('User/User/MessageRead', qs.stringify(params))
}

/**
 * 云闪付
 */
export function yunshanfu_app(orderID) {
    return request.get('pay/index/yunshanfu_app?orderID='+orderID)
}


/**
 * 意见反馈
 */
export function feedback(content) {
    return request.get('user/user/feedback?userID='+uni.getStorageSync("userInfo").userID+"&content="+content)
}

/**
 * 加入我们
 */
export function joinus(params) {
    return request.post('user/user/joinus', qs.stringify(params))
}

/**
 * 招聘信息
 */
export function zhaopin() {
    return request.get('user/user/zhaopin')
}

/**
 * 外卖订单提交
 */
export function create_takeout_order(params) {
    return request.post('Order/index/create_takeout_order', qs.stringify(params))
}

/**
 * 外卖订单列表
 */
export function orderList_takeout(params) {
    return request.post('Order/Index/orderList_takeout', qs.stringify(params))
}

/**
 * 外卖支付宝支付
 */
export function takeout_order_alipay(params) {
    return request.post('Pay/Index/takeout_order_alipay', qs.stringify(params))
}

/**
 * 外卖微信支付
 */
export function takeout_order_wxpay(params) {
    return request.post('Pay/Index/takeout_order_wxpay', qs.stringify(params))
}


/**
 * 首页基础模块
 */
export function getHomePageConfigNew(buildingID) {
    return request.get('home/index/getHomePageConfigNew?buildingID='+buildingID)
}

/**
 * 用户信息
 */
export function getuserInfobyuserID() {
    return request.get('user/user/getuserInfobyuserID?userID='+uni.getStorageSync("userInfo").userID)
}

/**
 * 版本更新
 */
export function getAppVersion(versionName) {
    return request.get('Crontab/Nobase/getAppVersion?versionName='+versionName+"&platform=android")
}

/**
 * 首页公告
 */
export function getTopLine() {
    return request.get('home/index/getTopLine?buildingID='+uni.getStorageSync("userInfo").buildingName)
}

/**
 * 饮水服务合同
 */
export function getConfigList(params) {
    return request.post('Home/Index/getConfigList', qs.stringify(params))
}

/**
 * 饮水服务类型
 */
export function getwaterTypeAndPrice(params) {
    return request.post('home/index/getwaterTypeAndPrice', qs.stringify(params))
}

/**
 *  提交饮水服务订单
 */
export function create_water_order(params) {
    return request.post('order/index/create_water_order', qs.stringify(params))
}

/**
 *  提交饮水服务订单
 */
export function water_order_list(orderStatus, page) {
    return request.get('order/index/water_order_list?userID='+uni.getStorageSync("userInfo").userID+"&limit=10&orderStatus="+orderStatus+"&page="+page)
}

/**
 *  饮水服务订单 微信支付
 */
export function water_order_wxpay(params) {
    return request.post('Pay/Index/water_order_wxpay',qs.stringify(params))
}

/**
 *  饮水服务订单 微信支付
 */
export function water_order_alipay(params) {
    return request.post('Pay/Index/water_order_alipay',qs.stringify(params))
}

/**
 *  饮水服务订单 取消服务订单
 */
export function cancel_water_order(params) {
    return request.post('order/index/cancel_water_order',qs.stringify(params))
}

/**
 *  饮水服务订单 详情
 */
export function water_order_detail(params) {
    return request.post('order/index/water_order_detail',qs.stringify(params))
}

/**
 *  外卖价格
 */
export function getWaterPrice() {
    return request.get('home/index/getWaterPrice')
}

/**
 *  服务订单 提交
 */
export function service(params) {
    return request.post('order/index/service',qs.stringify(params))
}


/**
 *  服务订单 退款
 */
export function waterRefund(params) {
    return request.post('order/index/Refund_waterOrder',qs.stringify(params))
}

/**
 *  获取待打印列表
 */
export function getPrintOrderList(params) {
    return request.post('order/index/getPrintOrderList',qs.stringify(params))
}

/**
 *  打印订单
 */
export function insertOrderToPrintask(params) {
    return request.post('order/index/insertOrderToPrintask',qs.stringify(params))
}

/**
 *  商品分类
 */
export function goods_type() {
    return request.get('Mall/Goods/goods_type')
}


/**
 *  商品列表
 */
export function goods_list(params) {
    return request.post('Mall/Goods/goods_list',qs.stringify(params))
}

/**
 *  商品详情
 */
export function goods_detail(params) {
    return request.post('Mall/Goods/goods_detail',qs.stringify(params))
}
/*
 *  店铺分类
 */
export function getStoreType(params) {
    return request.post('mall/goods/getStoreType',qs.stringify(params))
}

/*
 *  店铺标签分类
 */
export function getStoreTag(params) {
    return request.post('mall/goods/getStoreTag',qs.stringify(params))
}

/**
 *  店铺列表
 */
export function getStoreList(params) {
    return request.post('mall/goods/getStoreList',qs.stringify(params))
}

/**
 *  店铺详情
 */
export function store_detail(params) {
    return request.post('mall/goods/store_detail',qs.stringify(params))
}

/**
 *  商城首页轮播
 */
export function getBannerByYzID() {
    return request.post('mall/index/getBannerByYzID', qs.stringify({yzID: uni.getStorageSync("userInfo").yzID}))
}

/**
 *  商品搜索
 */
export function search(params) {
    return request.post('mall/goods/search',qs.stringify(params))
}

/**
 *  收藏
 */
export function collect(params) {
    return request.post('mall/goods/collect',qs.stringify(params))
}

/**
 *  收藏列表
 */
export function collect_list(params) {
    return request.post('mall/goods/collect_list',qs.stringify(params))
}

/**
 *  购物车删减
 */
export function shopcart(params) {
    return request.post('mall/goods/shopcart',qs.stringify(params))
}

/**
 *  购物车列表
 */
export function shopcart_list(params) {
    return request.post('mall/goods/shopcart_list',qs.stringify(params))
}

/**
 *  购物车清空
 */
export function shopcartDel(params) {
    return request.post('Mall/Goods/shopcartDel',qs.stringify(params))
}

/**
 *  购物车优惠券列表
 */
export function couponList(params) {
    return request.post('mall/goods/couponList',qs.stringify(params))
}

/**
 *  商城提交订单
 */
export function create_order(params) {
    return request.post('mall/goods/create_order',qs.stringify(params))
}

/**
 *  商城订单 微信支付
 */
export function mall_order_wxpay(params) {
    return request.post('Pay/Index/mall_order_wxpay',qs.stringify(params))
}

/**
 *  商城订单 支付宝支付
 */
export function mall_alipay_app(params) {
    return request.post('Pay/Index/mall_alipay_app',qs.stringify(params))
}

/**
 *  商城订单列表
 */
export function order_list(params) {
    return request.post('Mall/Goods/order_list',qs.stringify(params))
}

/**
 *  商城订单详情
 */
export function order_detail(params) {
    return request.post('Mall/Goods/order_detail',qs.stringify(params))
}

/**
 *  商城订单取消
 */
export function cancel_order(params) {
    return request.post('Mall/Goods/cancel_order',qs.stringify(params))
}

/**
 *  运费
 */
export function freight(params) {
    return request.post('Mall/Goods/freight',qs.stringify(params))
}

/**
 *  物流查询
 */
export function getMallExpressInfoByorder(params) {
    return request.post('logistics/logistics/getMallExpressInfoByorder',qs.stringify(params))
}

/**
 *  商城退款
 */
export function Refund_mallOrder(params) {
    return request.post('mall/goods/Refund_mallOrder',qs.stringify(params))
}

/**
 *  确认信息页面
 */
export function order_goods_list(params) {
    return request.post('mall/goods/order_goods_list',qs.stringify(params))
}


/**
 *  我的优惠券
 */
export function user_coupon(params) {
    return request.post('Mall/Goods/user_coupon',qs.stringify(params))
}

/**
 *  问卷调查
 */
export function question(params) {
    return request.post('mall/goods/question',qs.stringify(params))
}

/**
 *  问卷调查 提交
 */
export function answer(params) {
    return request.post('mall/goods/answer',qs.stringify(params))
}

/**
 *  特卖店铺
 */
export function sale_store(params) {
    return request.post('mall/goods/sale_store',qs.stringify(params))
}

/**
 *  图文店铺 提交
 */
export function store_submit(params) {
    return request.post('mall/goods/store_submit',qs.stringify(params))
}

/**
 *  提交订单新
 */
export function create_order_new(params) {
    return request.post('mall/goods/create_order_new',qs.stringify(params))
}

/**
 *  福利 时间
 */
export function welfare_coupon_time(params) {
    return request.post('mall/goods/welfare_coupon_time',qs.stringify(params))
}

/**
 *  福利 提交订单
 */
export function create_coupon_order(params) {
    return request.post('mall/goods/create_coupon_order',qs.stringify(params))
}

/**
 *  福利 列表
 */
export function welfare_coupon_list(params) {
    return request.post('mall/goods/welfare_coupon_list',qs.stringify(params))
}

/**
 *  小商品 列表
 */
export function coupon_order_list(params) {
    return request.post('Mall/Goods/coupon_order_list',qs.stringify(params))
}

/**
 *  小商品 列表 详情
 */
export function coupon_order_detail(params) {
    return request.post('Mall/Goods/coupon_order_detail',qs.stringify(params))
}

/**
 *  红星美凯龙 用户信息
 */
export function user_info(params) {
    return request.post('User/User/user_info',qs.stringify(params))
}

/**
 *  红星美凯龙 部门
 */
export function department(params) {
    return request.post('Order/index/department',qs.stringify(params))
}


/**
 *  会员创建订单
 */
export function create_member_order(params) {
    return request.post('Order/index/create_member_order',qs.stringify(params))
}

/**
 *  会员商铺列表
 */
export function member_store(params) {
    return request.post('mall/goods/member_store',qs.stringify(params))
}

/**
 *  会员支付宝微信支付
 */
export function member_alipay_app(params) {
    return request.post('Pay/Index/member_alipay_app',qs.stringify(params))
}

/**
 *  会员微信支付
 */
export function member_order_wxpay(params) {
    return request.post('Pay/Index/member_order_wxpay',qs.stringify(params))
}

/**
 *  关于我们
 */
export function about_us(params) {
    return request.post('Home/Index/about_us',qs.stringify(params))
}
