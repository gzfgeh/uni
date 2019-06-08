import request from './request'
var qs = require('qs')

export const BASE_IMAGE_URL = 'https://bay.2donghua.com/';

/**
 * 商品分类
 */
export function getFirstTypeList() {
    return request.get('Api/Project/getFirstTypeList');
}

/**
 * 商品列表
 */
export function getGoodsList(g_type,page,type,keyword) {
	if(g_type){
		return request.get('Api/Project/getGoodsList?g_type='+g_type+"&page="+page+"&type="+type+"&keyword="+keyword)
	}else{
		return request.get('Api/Project/getGoodsList?page='+page+"&type="+type+"&keyword="+keyword)
	}
    
}

/**
 * 首页轮播
 */
export function getImgList() {
    return request.get('Api/Project/getImgList')
}

/**
 * 商品二级分类
 */
export function getSecondTypeList(t_id) {
    return request.get('Api/Project/getSecondTypeList?t_id='+t_id);
}


/**
 * 绑定手机
 */
export function bindPhone(params) {
    return request.post('Api/Weixin/bindPhone',qs.stringify(params));
}

/**
 * 获取购物车列表
 */
export function getCart(ct_openid) {
    return request.get('Api/Project/getCart?ct_openid='+ct_openid);
}

/**
 * 加入购物车
 */
export function jiaruCart(params) {
    return request.post('Api/Project/jiaruCart', qs.stringify(params));
}

/**
 * 修改购物车 数量
 */
export function saveCart(params) {
    return request.post('Api/Project/saveCart', qs.stringify(params));
}

/**
 * 删除购物车
 */
export function deleteCart(params) {
    return request.post('Api/Project/deleteCart', qs.stringify(params));
}

/**
 * 商品详情
 */
export function goodsDetail(g_id) {
    return request.get('Api/Project/goodsDetail?g_id='+g_id);
}

/**
 * 修改价格
 */
export function getUserInfo(m_openid) {
    return request.get('Project/getUserInfo?m_openid='+m_openid);
}


/**
 * 获取openid
 */
export function getOpenid(code) {
    return request.get('Api/Weixin/getOpenid?code='+code);
}

/**
 * 修改用户信息
 */
export function addSaveUserInfo(params) {
    return request.post('Api/Weixin/addSaveUserInfo', qs.stringify(params));
}

/**
 * 修改用户信息
 */
export function getRecommendList() {
    return request.get('Api/Project/getRecommendList');
}

/**
 * 关于我们
 */
export function aboutUs() {
    return request.get('Api/Project/aboutUs');
}

/**
 * 地址列表
 */
export function getAddressList(a_openid) {
    return request.get('Api/Mall/getAddressList?a_openid='+a_openid);
}

/**
 * 地址列表
 */
export function addAddress(params) {
    return request.post('Api/Mall/addAddress', qs.stringify(params));
}

/**
 * 删除地址
 */
export function deleteAddress(params) {
    return request.post('Api/Mall/deleteAddress', qs.stringify(params));
}

/**
 * 编辑地址
 */
export function editAddress(params) {
    return request.post('Api/Mall/editAddress', qs.stringify(params));
}

/**
 * 下单接口
 */
export function addOrder(params) {
    return request.post('Api/Weixin/addOrder', qs.stringify(params));
}

/**
 * 报修接口
 */
export function baoxiu(params) {
    return request.post('Api/Project/baoxiu', qs.stringify(params));
}

/**
 * 订单列表
 */
export function getOrder(o_status, page) {
    return request.get('Api/Weixin/getOrder?o_openid='+uni.getStorageSync("openid")+"&o_status="+o_status+"&page="+page);
}

/**
 * 发货操作
 */
export function confirmShipping(o_id, o_express_name, o_express_no) {
    return request.get('Api/Mall/confirmShipping?o_id='+o_id+"&o_express_name="+o_express_name+"&o_express_no="+o_express_no);
}

/**
 * 确认收货
 */
export function confirmReceipt(params) {
    return request.post('Api/Mall/confirmReceipt', qs.stringify(params));
}