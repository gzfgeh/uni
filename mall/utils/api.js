import request from './request'
var qs = require('qs')
//  测试
export const BASE_IMAGE_URL = request.config.baseURL;
export const BASE_URL = request.config.baseURL;

/**
 * 密码登陆
 */
export function toLogin(params) {
    return request.post('login.php',JSON.stringify(params))
}

/**
 * 获取用户简单信息
 */
export function member(access_token) {
    return request.post('member.php',JSON.stringify({"access_token": access_token}))
}


export function searchStoreList(key) {
    return request.get('searchStoreList.php?key='+key)
}


export function storeInfo(storeID) {
    return request.get('storeInfo.php?storeID='+storeID)
}


export function searchProductList(key, storeID) {
	if(storeID){
		return request.get('searchStoreList.php?storeID='+storeID+"&key="+key)
	}else{
		return request.get("searchStoreList.php?key="+key)
	}
    
}



/**
 * 得到用户信息
 */
export function userinfo() {
    return request.get('user/userinfo')
}
/**
 * 获取首页Banner+分类
 */
export function homebanner() {
    return request.get('sapi/home')
}
/**
 * 获取首页广告列表
 */
export function adlist() {
    return request.get('sapi/ad/list')
}
/**
 * 获取首页内容列表
 */
export function contentlist(params) {
    return request.get('sapi/content/list',qs.stringify(params))
}
/**
 * 获取内容详情
 */
export function content(params) {
    return request.get('sapi/content',qs.stringify(params))
}
/**
 * 获取内容详情评论
 */
export function commentcontent(id,params) {
    return request.get('sapi/comment/content/'+id,qs.stringify(params))
}
/**
 * 点赞内容
 */
export function commentContentLike(id) {
    return request.put('sapi/content/'+id+'/like')
}
/**
 * 点赞评论
 */
export function commentLike(id) {
    return request.put('sapi/comment/'+id+'/like')
}

/**
 * 收藏内容
 */
export function commentContentFavorite(id) {
    return request.put('sapi/content/'+id+'/favorite')
}
/**
 * 分享回调
 */
export function commentContentShare(id) {
    return request.put('sapi/content/'+id+'/share')
}
/**
 * 发表评论内容
 */
export function setCommentContent(id,params) {
    return request.post('sapi/content/'+id+'/comment',qs.stringify(params))
}
/**
 * 获取直播详情
 */
export function getLiveContent(params) {
    return request.get('sapi/content',qs.stringify(params))
}
/**
 * 直播报名
 */
export function livesignup(id) {
    return request.put('sapi/content/'+id+'/signup')
}

/**
 *  
 */
export function userCenter() {
    return request.get('user/usercenter')
}

/**
 *  首页配置
 */
export function homeConfig() {
    return request.get('index/config')
}

/**
 *  首页列表数据
 */
export function homeData() {
    return request.get('index/data')
}

/**
 *  我的页面
 */
export function userMenu() {
    return request.get('user/menu')
}

/**
 *  升级页面
 */
export function upgrade() {
    return request.get('index/upgrade')
}

/**
 *  新闻列表
 */
export function newsList(typeId, publishLong) {
	if(publishLong == 0){
		return request.get('news/list?typeId='+typeId)
	}else{
		return request.get('news/list?typeId='+typeId+'&publishLong='+publishLong)
	}
    
}

/**
 *  检查接口
 */
export function check() {
    return request.get('wallet/withdraw/check')
}

/**
 *  体现申请
 */
export function apply() {
    return request.get('wallet/withdraw/apply')
}

/**
 *  体现申请
 */
export function confirm(params) {
    return request.post('wallet/withdraw/confirm', qs.stringify(params))
}

/**
 *  获取账户余额
 */
export function balance() {
    return request.get('wallet/balance')
}

/**
 *  获取交易明细
 */
export function transList(currentPage) {
    return request.get('wallet/trans/list?currentPage='+currentPage+"&pageSize=20")
}

/**
 *  获取有过绑卡用户的基本信息
 */
export function baseinfo() {
    return request.get('wallet/user/baseinfo')
}

/**
 *  获取交易明细
 */
export function detail(id) {
    return request.get('wallet/trans/detail/'+id)
}

/**
 *  绑卡接口
 */
export function addBank(params) {
    return request.post('wallet/bindbank/add', qs.stringify(params))
}

/**
 *  解绑接口
 */
export function delBank(id) {
    return request.post('wallet/bindbank/delete/'+id)
}

/**
 *  获取提现方式详情
 */
export function detailBank(id) {
    return request.get('wallet/bindbank/detail/'+id)
}

/**
 *  获取提现方式列表
 */
export function listBank() {
    return request.get('wallet/bindbank/list')
}

/**
 *  获取医生详情。
 */
export function getHcp() {
    return request.get('sapi/hcp')
}


/**
 *  开启和患者聊天
 */
export function startChat(to) {
    return request.get('sapi/rongyun/chat?to='+to)
}


export function getChatStatus(params) {
    return request.post('/sapi/hcp/consumers/status', qs.stringify(params))
}

export function getSingleChatStatus(id) {
    return request.get('/sapi/hcp/consumers/status/single?consumer='+id)
}


/**
 *  发送手机验证码
 */
export function preset(params) {
    return request.post('wallet/paycode/preset', qs.stringify(params))
}

/**
 *  发送手机验证码
 */
export function setPwd(params) {
    return request.post('wallet/paycode/set', qs.stringify(params))
}

/**
 *  医生邀请患者
 */
export function qrcode(id) {
    return request.get('api/wechat/qrcode?type=hcp&hcp='+id)
}


/**
 *  得到融云IM token
 */
export function getRongYunToken() {
    return request.get('sapi/rongyun')
}

/**
 *  查询医院
 */
export function queryHospital (params) {
    return request.get('sapi/hospital', qs.stringify(params))
}

/**
 *  获取患者列表
 */
export function consumers(name) {
	if(name){
		return request.get('/sapi/consumers?name='+name)
	}else{
		return request.get('/sapi/consumers')
	}
    
}

/**
 *  医生的积分详情
 */
export function bonus() {
    return request.get('/sapi/hcp/bonus')
}
/**
 *  获取提现账号列表
 */
export function withdrawAccountList(params) {
    return request.get('/sapi/withdrawAccount', qs.stringify(params))
}
/**
 *  添加提现账号
 */
export function addWithdrawAccount(params) {
    return request.post('/sapi/withdrawAccount', qs.stringify(params))
}
/**
 *  修改提现账号
 */
export function updateWithdrawAccount(accountId,params) {
    return request.put('/sapi/withdrawAccount/'+accountId, qs.stringify(params))
}
/**
 *  删除提现账号
 */
export function delWithdrawAccount(accountId) {
    return request.delete('/sapi/withdrawAccount/'+accountId)
}

/**
 *  申请提现
 */
export function withdraw(params) {
    return request.post('/sapi/withdraw', qs.stringify(params))
}

export function getWithdraw() {
    return request.get('/sapi/withdraw')
}

/**
 *  获取医生的咨询费
 */
export function servicePrice() {
    return request.get('/sapi/hcp/servicePrice')
}

/**
 *  获取医生的咨询费
 */
export function updateServicePrice(params) {
    return request.put('/sapi/hcp/servicePrice', qs.stringify(params))
}

/**
 *  常量接口
 */
export function getConsts(lxjp) {
    return request.get('/api/consts/' + lxjp)
}

/**
 *  医生提交基本信息
 */
export function getDepartment() {
  return request.get('/sapi/department')
}

/**
 *  医生提交基本信息
 */
export function postAccount(params) {
  return request.post('/sapi/account/append',qs.stringify(params))
}

/**
 *  查询oss配置
 */
export function getSTS(params) {
  return request.get('/sapi/account/ali', qs.stringify(params))
}

/**
 *  查询oss配置
 */
export function getOSS(params) {
  return request.get('/sapi/account/aliPolicy', qs.stringify(params))
}

/**
 *  上传认证图片
 */
export function postProfile(params) {
  return request.post('/sapi/account/profile', qs.stringify(params))
}

/**
 *  获取分享参数
 */
export function shareToConsumer() {
  return request.get('/sapi/hcp/shareToConsumer')
}

/**
 *  个人中心-消息-我的赞
 */
export function getMyLike(params) {
  return request.get('/sapi/comment/mylike/list', qs.stringify(params))
}

/**
 *  个人中心-消息-我的赞
 */
export function getMyReply(params) {
  return request.get('/sapi/comment/myReply/list', qs.stringify(params))
}

/**
 *  个人中心-我的评论
 */
export function getMyComment(params) {
  return request.get('/sapi/comment/myComment', qs.stringify(params))
}

/**
 *  个人中心-我的收藏
 */
export function getMyFavorite(params) {
  return request.get('/sapi/actions/favorite', qs.stringify(params))
}

export function myIntegralStatistics(page, startTime, endTime) {
  return request.get('/sapi/account/bonusCount?limit=20&page='+page+"&startTime="+startTime+"&endTime="+endTime)
}