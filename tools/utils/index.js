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

export function canvasImage(imgList, type=0, titleObject, canvasIds, callback){
	// 初始化画布，小程序里面一定要有canvasid，它是以这个为标识来识别的
	    const ctx = wx.createCanvasContext(canvasIds)
	    // 合成多张图片的时候，放到一个数组里面，进行遍历
		let imgWidth = 0;
		let imgHeight = 0;
	    imgList.forEach((item, index) => {
	        
			if(type == 0){
				// 横向
				let width = item.width*300/item.height;
				ctx.drawImage(
				    item.path,
				    imgWidth,
				    0,
				    width,
				    300
				);
				imgHeight = 300;
				imgWidth += width;
				console.log(index);
			}else{
				//竖向
				let height = item.height*300/item.width;
				ctx.drawImage(
				    item.path,
				    0,
				    imgHeight,
				    300,
				    height
				);
				imgHeight += height;
				imgWidth = 300;
			}
			console.log(imgWidth + "-----" + imgHeight);
	    })
		console.log(imgWidth + "-----" + imgHeight);
	    // 写文字水印
		if(titleObject){
			ctx.setFontSize(titleObject.fontSize)
			ctx.fillText(titleObject.content, titleObject.x, titleObject.y)
		}
	    
	    // 画出canvas上面的图片
	    ctx.draw(false, setTimeout(function () {
	        // wx.canvasToTempFilePath这个一定要写在ctx.draw里面的回调里面，是坑勿跳
			wx.getSystemInfo({
				success: function(data){
					let pixelRatio = data.pixelRatio;
					wx.canvasToTempFilePath({
					    canvasId: canvasIds,
					    destWidth: imgWidth*pixelRatio,
					    destHeight: imgHeight*pixelRatio,
						width: imgWidth,
						height: imgHeight,
					    quality: 1,
					    success: function (res) {
					        console.log(res.tempFilePath)
					        callback(res.tempFilePath)
					    },
					    fail: function (res) {
					        console.log(res)
					    }
					})
					
				}
			});
			
	        
	    }, 200))
}