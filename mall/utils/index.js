export function formatLocation(longitude, latitude) {
	if (typeof longitude === 'string' && typeof latitude === 'string') {
		longitude = parseFloat(longitude)
		latitude = parseFloat(latitude)
	}

	longitude = longitude.toFixed(2)
	latitude = latitude.toFixed(2)

	return {
		longitude: longitude.toString().split('.'),
		latitude: latitude.toString().split('.')
	}
}

export function getPosition () {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        let latitude = position.coords.latitude
        let longitude = position.coords.longitude
        let data = {
          latitude: latitude,
          longitude: longitude
        }
        resolve(data)
      }, function (err) {
        reject(err)
      })
    } else {
      reject('你的浏览器不支持当前地理位置信息获取')
    }
  })
}

export function isWeiXin(){
  //window.navigator.userAgent属性包含了浏览器类型、版本、操作系统类型、浏览器引擎类型等信息，这个属性可以用来判断浏览器类型
  var ua = window.navigator.userAgent.toLowerCase();
  //通过正则表达式匹配ua中是否含有MicroMessenger字符串
  if(ua.match(/MicroMessenger/i) == 'micromessenger'){
	return true;
  }else{
	return false;
  }
}

export function setTitleColor(){
	// let interval =  setInterval(()=>{
	// 	
	// 	uni.setNavigationBarColor({
	// 		frontColor:"#ffffff",
	// 		backgroundColor: "#ffffff"
	// 	});
	// 	
	// }, 1);
	// 
	// setTimeout(()=>{
	// 	clearInterval(interval);
	// 	
	// 	setTimeout(()=>{
	// 		uni.setNavigationBarColor({
	// 			frontColor:"#000000",
	// 			backgroundColor: "#FFCA0A"
	// 		});
	// 	}, 1)
	// 	
	// }, 200);
}