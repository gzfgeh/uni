import request from './request'
var qs = require('qs')


export const BASE_IMAGE_URL = 'https://gzf.liangyicloud.xyz/h5/images/';
export const BASE_URL = 'https://gzf.liangyicloud.xyz/';


export function getImgList() {
    return request.get('Api/Project/getImgList')
}

/**
 *  多图上传
 */
export function submitAllPhoto() {
    return request.post('Api/Project/submitAllPhoto',qs.stringify(params))
}

