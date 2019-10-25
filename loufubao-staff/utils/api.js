import request from './request'
var qs = require('qs')

export const BASE_IMAGE_URL = 'https://apitest.baobaoloufu.com/';

/**
 * 发送验证码
 */
export function sendCode(phone, type) {
    return request.get('User/User/sendCode?phone='+phone+"&type="+type)
}

/**
 * 注册
 */
export function register(phone, smsVercode,password,clientID) {
    return request.get('User/User/register?phone='+phone+"&smsVercode="+smsVercode+"&password="+password+"&clientID="+clientID+"&platform="+uni.getSystemInfoSync().platform)
}

/**
 * 登陆
 */
export function login(params) {
    return request.post('user/user/courierLogin', qs.stringify(params))
}

/**
 * VIP 登陆
 */
export function loginVIP(vipCode,clientID) {
    return request.get('User/User/login?vipCode='+vipCode+"&type=6&clientID="+clientID+"&deviceID=&userCode=&platform="+uni.getSystemInfoSync().platform)
}

/**
 * 找回密码
 */
export function forget(phone,smsVercode,pwd,clientID) {
    return request.get('User/User/login?phone='+phone+"&smsVercode="+smsVercode+"&type=3&pwd="+pwd+"&clientID="+clientID+"&deviceID=&userCode=&platform="+uni.getSystemInfoSync().platform)
}

/**
 * 注销登录
 */
export function logout(userID) {
    return request.get('User/User/logout?userID='+userID)
}

/**
 * 楼宇列表
 */
export function getYzByRegionId(params) {
    return request.get('Address/Index/getYzByRegionId',params)
}

/**
 * 核销记录列表
 */
export function writeOff_record(params) {
    return request.post('mall/goods/writeOff_record', qs.stringify(params))
}

/**
 * js-sdk
 */
export function getJSSDKConfig() {
    return request.get('Home/Index/getJSSDKConfig')
}
