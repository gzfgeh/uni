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
export function getGoodsList(g_type,page) {
    return request.get('Api/Project/getGoodsList?g_type='+g_type+"&page="+page)
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
    return request.get('Project/getCart?ct_openid='+ct_openid);
}

/**
 * 加入购物车
 */
export function jiaruCart(params) {
    return request.post('Project/jiaruCart', qs.stringify(params));
}

/**
 * 修改购物车 数量
 */
export function saveCart(params) {
    return request.post('Project/saveCart', qs.stringify(params));
}

/**
 * 删除购物车
 */
export function deleteCart(params) {
    return request.post('Project/deleteCart', qs.stringify(params));
}

/**
 * 修改价格
 */
export function goodsEdit(params) {
    return request.post('Project/goodsEdit', qs.stringify(params));
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
    return request.get('Api/Weixin/addSaveUserInfo', qs.stringify(params));
}
