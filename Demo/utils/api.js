import request from './request'
var qs = require('qs')

export const BASE_IMAGE_URL = 'https://www.gzfgeh.xyz/';

/**
 *  关于我们
 */
export function about_us(params) {
    return request.post('Home/Index/about_us',qs.stringify(params))
}

export function getShareData(shareUrl) {
    return request.get('Api/Weixin/getShareData?shareUrl='+shareUrl)
}
