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
 * 发送验证码
 */
export function sendCode(params) {
    return request.post('CommonApi/sendCode', qs.stringify(params))
}

/**
 * 绑定手机
 */
export function bindPost(params) {
    return request.post('CommonApi/bindPost',qs.stringify(params));
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

