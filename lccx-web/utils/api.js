import request from './request'
var qs = require('qs')

export const BASE_IMAGE_URL = 'https://api.kaikaibao.com.cn/lccx/images/';

/**
 * 快速报价
 */
export function quotations(params) {
    return request.post('3.1/quotations', qs.stringify(params))
}
