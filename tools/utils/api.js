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

export function uploadFile(file) {
    return request.upload('Api/CommonApi/uploadFile', {file: qs.createReadStream(file)})
}

export function getOpenid(code) {
    return request.get('Api/Weixin/getOpenid?code='+code)
}

/**
 * 保存用户信息
 */
export function userInfoSave(params) {
    return request.post('Api/Weixin/updateUserInfo', qs.stringify(params))
}

/**
 *获取用户信息
 */
export function getUserInfo(openid) {
    return request.get('Api/Weixin/getUserInfo?openid='+openid)
}



/**
 *  多图上传
 */
export function submitAllPhoto() {
    return request.post('Api/Project/submitAllPhoto',qs.stringify(params))
}

