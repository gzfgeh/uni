import request from './request'
var qs = require('qs')

export const BASE_IMAGE_URL = 'https://api.kaikaibao.com.cn/lccx/images/'

/**
 * 小程序授权
 */
export function grant(params) {
    return request.post('3.0/mina/grant', qs.stringify(params))
}

/**
 * 小程序登录
 */
export function login(params) {
    return request.post('3.0/mina/login', qs.stringify(params))
}

/**
 * 手机号获取验证码
 */
export function activation(params) {
    return request.post('3.0/send/device/activation', qs.stringify(params))
}

/**
 * 设备激活
 */
export function devices(params) {
    return request.post('3.0/devices', qs.stringify(params))
}

/**
 * 总里程照片上传
 */
export function mileage(path) {
    return request.upload('3.0/device/mileage', { image: fs.createReadStream(path) })
}

/**
 * 车辆品牌
 */
export function getBrands() {
    return request.get('3.0/vehicle/brands')
}

/**
 * 车辆系列
 */
export function getSeries(brand_id) {
    return request.get('3.0/vehicle/series/' + brand_id)
}

/**
 * 车辆型号
 */
export function getModels(series_id) {
    return request.get('3.0/vehicle/models/' + series_id)
}

/**
 * 设备列表
 */
export function getDevice() {
    return request.get('3.0/devices')
}

/**
 * 得到当前位置
 */
export function getLoc() {
    return request.get('3.0/loc')
}

/**
 * 保险相关数据
 */
export function getInsurance() {
    return request.get('3.0/insurance')
}

/**
 * 最新行程
 */
export function getTriplatest() {
    return request.get('3.0/triplatest')
}

/**
 * 每日行程
 */
export function getDayTrip(dateString) {
    return request.get('3.0/trips/' + dateString)
}

/**
 * 最新评分
 */
export function getScorelatest() {
    return request.get('3.0/scorelatest')
}

/**
 * 每日评分
 */
export function getDayScore(dateString) {
    return request.get('3.0/score/' + dateString)
}

/**
 * 账单
 */
export function getBills() {
    return request.get('3.0/bills')
}

/**
 * 购买记录
 */
export function getBilling() {
    return request.get('3.0/billing/history')
}

/**
 * 里程价格
 */
export function getPrices() {
    return request.get('3.0/prices')
}

/**
 * 里程价格
 */
export function alarm(params) {
    return request.put('3.0/alarm', qs.stringify(params))
}

/**
 * 保单列表
 */
export function getOrders() {
    return request.get('3.0/orders')
}

/**
 * 保单详情
 */
export function getOrderDetail(orderId) {
    return request.get('3.0/orders/' + orderId)
}

/**
 * 快速报价
 */
export function quotations(params) {
    return request.post('3.1/quotations', qs.stringify(params))
}

/**
 * 报价 获取车辆信息
 */
export function getVechileData(params) {
    return request.post('3.1/getVechileData', qs.stringify(params))
}

/**
 * 报价 获取车辆品牌 (精确)
 */
export function getModelExactness(params) {
    return request.post('3.1/getModelExactness', qs.stringify(params))
}

/**
 * 报价 获取车辆品牌 (模糊)
 */
export function getModelMistiness(params) {
    return request.post('3.1/getModelMistiness', qs.stringify(params))
}

/**
 * 报价 获取投保起期
 */
export function getEffectiveDate(params) {
    return request.post('3.1/getEffectiveDate', qs.stringify(params))
}

/**
 * 报价 精准报价
 */
export function getExactQoute(params) {
    return request.post('3.1/getExactQoute', qs.stringify(params))
}

/**
 * 报价 核保
 */
export function applyUnderwrite(params) {
    return request.post('3.1/applyUnderwrite', qs.stringify(params))
}

/**
 * 报价 充值
 */
export function deposit(params) {
    return request.post('3.1/deposit', qs.stringify(params))
}

/**
 * 报价 自动续费
 */
export function recurring(params) {
    return request.post('3.0/recurring', qs.stringify(params))
}

/**
 * 快速报价 / 填写基本信息
 */
export function basic(id, params) {
    return request.put('3.1/quotations/' + id + '/basic', qs.stringify(params))
}

/**
 * 快速报价 / 结果
 */
export function result(id, params) {
    return request.put('3.1/quotations/' + id + '/result', qs.stringify(params))
}

/**
 * 快速报价 / 保单支付
 */
export function pay(id, params) {
    return request.post('3.1/quotations/' + id + '/pay', qs.stringify(params))
}

/**
 * 快速报价 / 险种
 */
export function insurance(id, params) {
    return request.put('3.1/quotations/' + id + '/insurance', qs.stringify(params))
}

/**
 * OCR
 */
export function ocr(params) {
    return request.post('3.1/ocr', qs.stringify(params))
}


/**
 * 快速报价 / 车辆信息
 */
export function vehicle(id, params) {
    return request.put('3.1/quotations/' + id + '/vehicle', qs.stringify(params))
}

/**
 * get 保单信息
 */
export function getQuotations(id) {
    return request.get('3.1/quotations/' + id)
}

/**
 * get 历史账单
 */
export function history(time) {
    return request.get('3.1/billing/history/' + time)
}
