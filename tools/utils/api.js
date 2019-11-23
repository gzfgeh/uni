import request from './request'
var qs = require('qs')


export const BASE_IMAGE_URL = 'http://nk.pro.youzewang.com/h5/';
export const BASE_URL = 'http://hcpdev.sureemed.com/';

/**
 * 获取 openid
 */
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
 * 注册
 */
export function bindUser(params) {
    return request.post('Api/Weixin/bindUser',qs.stringify(params))
}



/**
 * 首页模块
 */
export function getModuletList() {
    return request.get('Api/Project/getModuletList')
}
/**
 * 模块列表
 */
export function getContentList(type) {
    return request.get('Api/Project/getContentList?type='+type)
}
/**
 * 获取登陆方式
 */
export function getConfig() {
    return request.get('Api/Project/getConfig')
}
/**
 * 提交选择的图片
 */
export function submitPhoto(params) {
    return request.post('Api/Project/submitPhoto',qs.stringify(params))
}


/**
 *  点赞
 */
export function dianzanAndquxiao(params) {
    return request.post('Api/Project/dianzanAndquxiao',qs.stringify(params))
}

/**
 *  日常安排
 */
export function richangAnpai(c_xiaozu_id) {
    return request.get('Api/Project/richangAnpai?c_xiaozu_id='+c_xiaozu_id)
}

/**
 *  照片墙
 */
export function getPhoto(page) {
    return request.get('Api/Project/getPhoto?m_id='+uni.getStorageSync("userInfo").m_id+'&page='+page)
}

/**
 *  我的队友
 */
export function getMyTeam() {
    return request.get('Api/Project/getMyTeam?m_id='+uni.getStorageSync("userInfo").m_id+"&m_z_id="+uni.getStorageSync("userInfo").m_z_id)
}

/**
 *  加入队组
 */
export function joinTeam(params) {
    return request.post('Api/Project/joinTeam', qs.stringify(params))
}


/**
 *  token
 */
export function getToken() {
    return request.get('Api/Project/getToken')
}

/**
 *  紧急联系人
 */
export function getLianxiren() {
    return request.get('Api/Project/getLianxiren')
}

/**
 *  多图上传
 */
export function submitAllPhoto() {
    return request.post('Api/Project/submitAllPhoto',qs.stringify(params))
}

