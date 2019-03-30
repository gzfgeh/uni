import request from './request'
var qs = require('qs')

export const BASE_IMAGE_URL = 'https://www.xiuqiupaopaopao.com/images/';

/**
 * 商品列表
 */
export function goodsList(page, g_type) {
    return request.get('Project/goodsList?g_type='+g_type+"&page="+page)
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
