import request from './request'
var qs = require('qs')


export const BASE_IMAGE_URL = 'https://gzf.liangyicloud.xyz/h5/images/';
export const BASE_URL = 'https://gzf.liangyicloud.xyz/';


export function getImgList() {
    return request.get('Api/Project/getImgList')
}

export function getConfig() {
    return request.get('Api/Project/getConfig')
}

export function getIpAddressInfo(ip) {
    return request.get('Api/DouYin/getIpAddressInfo?ip='+ip)
}

export function getHostByName(host) {
    return request.get('Api/DouYin/getHostByName?host='+host)
}

export function getNoShuiYin(url) {
    return request.get('Api/DouYin/getNoShuiYin?url='+url)
}

/**
 *  多图上传
 */
export function submitAllPhoto() {
    return request.post('Api/Project/submitAllPhoto',qs.stringify(params))
}

