import request from './request'
var qs = require('qs')

export const BASE_IMAGE_URL = 'https://www.xiuqiupaopaopao.com/images/';

/**
 * 商品列表
 */
export function goodsList(page, g_type, g_sheng, g_shi, g_qu, g_name) {
    return request.get('Project/goodsList?g_type='+g_type+"&page="+page+
					"&g_sheng="+g_sheng+"&g_shi="+g_shi+"&g_qu="+g_qu+"&g_name="+g_name)
}

/**
 * 商品列表 搜索
 */
export function goodsSearchList(page, g_name, g_sheng, g_shi, g_qu) {
    return request.get('Project/goodsSearchList?g_name='+g_name+"&page="+page+
					"&g_sheng="+g_sheng+"&g_shi="+g_shi+"&g_qu="+g_qu)
}

/**
 * 首页轮播
 */
export function getImgList() {
    return request.get('Project/getImgList')
}

/**
 * 商品详情
 */
export function goodsDetail(id) {
    return request.get('Project/goodsDetail?g_id='+id)
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

/**
 * 提示语
 */
export function getConfig() {
    return request.get('Project/getConfig');
}

