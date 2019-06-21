import request from './request'
var qs = require('qs')

export const BASE_IMAGE_URL = 'https://api.kaikaibao.com.cn/lccx/images/'

/**
 * 小程序授权
 */
export function grant(params) {
    return request.post('3.1/mina/grant', qs.stringify(params))
}

/**
 * 小程序登录
 */
export function login(params) {
    return request.post('3.1/mina/login', qs.stringify(params))
}

/**
 * H5登录
 */
export function H5login(params) {
    return request.post('3.1/login', qs.stringify(params))
}

/**
 * 手机号获取验证码
 */
export function activation(params) {
    return request.post('3.1/send/device/activation', qs.stringify(params))
}

/**
 * 设备激活
 */
export function devices(params) {
    return request.post('3.1/devices', qs.stringify(params))
}

/**
 * 总里程照片上传
 */
export function mileage(path) {
    return request.upload('3.1/device/mileage', { image: fs.createReadStream(path) })
}

/**
 * 车辆品牌
 */
export function getBrands() {
    return request.get('3.1/vehicle/brands')
}

/**
 * 车辆系列
 */
export function getSeries(brand_id) {
    return request.get('3.1/vehicle/series/' + brand_id)
}

/**
 * 车辆型号
 */
export function getModels(series_id) {
    return request.get('3.1/vehicle/models/' + series_id)
}

/**
 * 设备列表
 */
export function getDevice() {
    return request.get('3.1/devices')
}

/**
 * 得到当前位置
 */
export function getLoc() {
    return request.get('3.1/loc')
}

/**
 * 保险相关数据
 */
export function getInsurance() {
    return request.get('3.1/insurance')
}

/**
 * 最新行程
 */
export function getTriplatest() {
    return request.get('3.1/triplatest')
}

/**
 * 每日行程
 */
export function getDayTrip(dateString) {
    return request.get('3.1/trips/' + dateString)
}

/**
 * 最新评分
 */
export function getScorelatest() {
    return request.get('3.1/scorelatest')
}

/**
 * 每日评分
 */
export function getDayScore(dateString) {
    return request.get('3.1/score/' + dateString)
}

/**
 * 账单
 */
export function getBills() {
    return request.get('3.1/bills')
}

/**
 * 购买记录
 */
export function getBilling() {
    return request.get('3.1/billing/history')
}

/**
 * 里程价格
 */
export function getPrices() {
    return request.get('3.1/prices')
}

/**
 * 里程价格
 */
export function alarm(params) {
    return request.put('3.1/alarm', qs.stringify(params))
}

/**
 * 保单列表
 */
export function getOrders() {
    return request.get('3.1/orders')
}

/**
 * 保单详情
 */
export function getOrderDetail(orderId) {
    return request.get('3.1/orders/' + orderId)
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
    return request.post('3.1/recurring', qs.stringify(params))
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
export function result(id) {
    return request.get('3.1/quotations/' + id + '/result',{},{timeout: 20000})
}

/**
 * 保单转订单
 */
export function quotationsToOrder(id, params) {
    return request.put('3.1/quotations/' + id + '/order', qs.stringify(params))
}

/**
 * 快速报价 / 保单支付
 */
export function pay(id, params) {
    return request.post('3.1/orders/' + id + '/pay', qs.stringify(params))
}

/**
 * 快速报价 / 险种
 */
export function insurance(id, params) {
    return request.put('3.1/quotations/' + id + '/insurance', params)
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

export function orderStaus(params){
	return request.post('3.1/orderStaus', qs.stringify(params))
}


//代理人平台接口
/**
 * get 根据openid登录
 */
export function dlrLogin(params){
	return request.get('3.1/agents/session?openid=' + params)
}

/**
 * post 代理人登录获取验证码
 */
export function dlrLoginCode(params){
	return request.post('1.0/send/login', qs.stringify(params))
}

/**
 * post 代理人登录
 */
export function dlrHandleLogin(params){
	return request.post('3.1/agents/login', qs.stringify(params))
}

/**
 * post 代理人注册获取验证码
 */
export function dlrRegisterCode(params){
	return request.post('1.0/send/register', qs.stringify(params))
}

/**
 * post 代理人注册
 */
export function dlrRegister(params){
	return request.post('3.1/agents/register', qs.stringify(params))
}

/**
 * get 获取地区
 */
export function getRegions(){
	return request.get('3.1/agents/regions')
}

/**
 * get 获取海报
 */
export function getPosterImg(){
	return request.get('3.1/agents/posters')
}

/**
 * get 获取我的资产
 */
export function getMyAssets(){
	return request.get('3.1/agents/assets')
}

/**
 * put 修改银行卡
 */
export function bindCard(params){
	return request.put('3.1/agents/bank_card', qs.stringify(params))
}

/**
 * post 提现
 */
export function withdraw(params){
	return request.post('3.1/agents/withdraw', qs.stringify(params))
}

/**
 * get 获取提现记录
 */
export function getWithdrawRecord(){
	return request.get('3.1/agents/withdrew')
}

/**
 * get 获取收入记录
 */
export function getIncomeRecord(){
	return request.get('3.1/agents/incomes')
}



