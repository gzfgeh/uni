## 可直接拖进项目运行

---
## 作者想说
二维码生成参考了 `诗小柒` 的二维码生成器， 感谢 `诗小柒`!
也感谢qq：1846492969 的帮助

如果该插件有什么问题还请大家说出来哦，还有如果有什么建议的话也可以提下呐 ~
如果觉得好用，可以回来给个五星好评么~~(❁´◡`❁)\*✲ﾟ\*  蟹蟹~拜托啦~

---
## 组件简介
一款自我感觉良好、实用的海报生成器

---
#  更新说明

| 版本号| 更新说明|
| --------- | -------- |
| v7.0| 修复背景图片不能使用本地图片问题, 若使用本地路径图片, 建议写绝对路径, 注：网络图片与本地图片的区分是以图片路径字符串substring(0, 4)是否为http来判断的  |
| v6.0| 修复QS-SharePoster.js文件中281行的传参不正确问题  |
| v5.0| imageArray中的图片可设置圆形图片------circleSet属性，详见2.0.2  |
| v4.0| imageArray属性新增infoCallBack属性，该属性类型为Function, 接受一个对象，该对象是该项图片的图片信息，该方法需返回一个对象，对象里的属性可以是原本imageArray中项内属性除url外的所有属性，infoCallBack返回的对象属性会覆盖原先的属性, 获取自身的图片信息后可以更好的绘制海报啦~   |
| v3.0| `修复背景图存储本地机制, 建议更新`， 背景图从后端获取后会以‘/’字符分割后的最后一位为name，QS-SharePoster会判断此name是不是和本地相同，若不同则从后端获取重新生成，若相同则使用本地路径，name判断通过后，还会判断图片宽高信息，不通过则重新获取，所以， 若后端需换背景图，则将新上传的图片命名不要相同与前一次, 或宽高不同于前一次即可 |
| v2.0| 新增backgroudImage、type属性，完善文档  |

#  1. 使用说明
```
因为canvas的初始值id问题， 本来想封装成组件可以更加简便，但目前还是引入js使用

1、`需先配置并完善QS-SharePoster文件下的app.js文件中的getPosterUrl方法`，该方法为返回背景图片网络路径(目前使用鬼刀的图片网络路径), 注意： 获取的背景图会以“/”字符split后的最后一位为该背景图的name，最终会存储于缓存`并保存文件于本地`，方便下次使用不必重复下载
2、在需使用的vue页面中`创建一个canvas`，并自定义id，该id需传入js方法中，并`动态绑定宽高`
3、引入项目中util文件下的QS-SharePoster.js，该js文件`导出一个方法`
4、使用引入的方法。 该方法`接收一个对象`，并返回一个`Promise对象`，在页面中可以使用async、await的方式，也可以用then方法, `该方法最终返回绘制好的海报临时路径`

本地存储机制: 背景图从后端获取后会以‘/’字符分割后的最后一位为name，QS-SharePoster会判断此name是不是和本地相同，若不同则从后端获取重新生成，若相同则使用本地路径，name判断通过后，还会判断图片宽高信息，不通过则重新获取，所以， 若后端需换背景图，则将新上传的图片命名不要相同与前一次, 或宽高不同于前一次即可

示例代码:
```

```html
<template>
 <view>
  <view class="hideCanvasView">
	<canvas class="hideCanvas" canvas-id="default_PosterCanvasId" :style="{width: (poster.width||0) + 'px', height: (poster.height||0) + 'px'}"></canvas>
  </view>
 </view>
</template>
```

```javascript

<script>
  //script
 import getSharePoster from '@/util/QS-SharePoster/QS-SharePoster.js';
 export default {
		data() {
			return {
				poster: {},
				canvasId: 'default_PosterCanvasId',
			}
		},
		methods: {
			async shareFc() {
				try {
					if (!this.poster.finalPath) {
						let d = await getSharePoster({
							type: 'testShare',
							posterCanvasId: this.canvasId,
							qrCodeArray: (bgObj, type) => {
								return [{
									text: '你好，我是取舍',
									image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1559644434957&di=0db394a4ae41b6cff704fa3d4cbd997b&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201806%2F30%2F20180630233629_GueV4.thumb.700_0.jpeg',
									size: 200,
									dx: 50,
									dy: bgObj.height - 300
								}]
							},
							imagesArray: (bgObj, type) => { //接收的第一个参数为背景图片的信息, 第二个参数是自定义标识（感觉这里用不到）, 图片为示例图片
								return [{
									url: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1314428097,3858988978&fm=26&gp=0.jpg',
									dx: 300,
									dy: bgObj.height - 300,
									circleSet: { // 圆形图片
										circle: true
									},
									infoCallBack(imageInfo) {
										let scale = 200/imageInfo.height;
										return {
											dWidth: imageInfo.width*scale,
											dHeight: 200
										}
									}
								}]
							},
							setCanvasWH: (bgObj, type) => { // 为动态设置画布宽高的方法，
								this.poster = bgObj;
							},
							setDraw: (obj) => {
								let {
									Context,
									bgObj,
									type
								} = obj;
								Context.setFillStyle('black');
								Context.setGlobalAlpha(0.3);
								Context.fillRect(0, bgObj.height - 400, bgObj.width, 400);
								Context.setGlobalAlpha(1);
								Context.setFillStyle('white');
								Context.setFontSize(50);
								let text = '取舍'
								Context.fillText(text, bgObj.width - text.length * 50 - 50, bgObj.height - 185);
							}
						});
						this.poster.finalPath = d.poster.tempFilePath;
					}
				} catch (e) {
					_app.hideLoading();
					_app.showToast(JSON.stringify(e));
					console.log(JSON.stringify(e));
				}
			}
		}
	}
</script>

```

# 2. 传入参数详解

`注：所有传入的图片路径可以是网络路径也可以是本地路径, 本地图片与网络图片的区分是以图片路径字符串substring(0, 4)是否为http来判断的`

| 属性名 | 是否必填 | 值类型 | 默认值 | 说明 |
| --------- | -------- | -----: | --: | --: |
| posterCanvasId | 是 |  String |  | 页面中绘制海报的画布的id |
| type |   | all|    |   自定义标识，用于逻辑判断 |
| backgroundImage |  | String |  | 背景图片路径，优先级大于app.js中getPosterUrl方法返回的路径，`一般不建议使用` |
| reserve| | Boolean | false | 本次绘制是否接着上一次绘制 |
| qrCodeArray| | Array \| Function| | 需绘制的二维码数组，若传入的类型为Function，则可以接收两个参数，第一个参数是背景图片的宽高等信息，第二个参数为自定义标识type ， 且必须return一个数组，推荐传入Function类型, `详见2.0.1`|
| imagesArray| | Array \| Function | |需绘制的图片数组，若传入的类型为Function，则可以接收两个参数，第一个参数是背景图片的宽高等信息，第二个参数为自定义标识type ， 且必须return一个数组，推荐传入Function类型,`详见2.0.2` |
| setCanvasWH| （一般来说）是| Function | | 动态设置画布宽高的方法，该方法返回两个参数，第一个参数是背景图片的宽高等信息，第二个参数为自定义标识type，可以根据背景图给画布定宽高，`详见2.0.3` |
| setCanvasToTempFilePath| | Function  | | 设置绘制完毕后的生成海报临时路劲参数,该参数有默认, 一般可以不用填, `详见 2.0.4`|
| setDraw| | Function | | 自定义绘制方法，该方法接收一个对象, `详见 2.0.5` |

## 2.0.1 qrCodeArray参数详解
```
该参数可以是一个数组，也可以是一个方法, `若传入一个方法，则必须return一个数组`
数组中的项内属性: (基本与诗小柒的二维码生成器传入参数差不多，就是多了dx、dy)
```

| 属性名 | 是否必填 | 值类型 | 默认值 | 说明 |
| --------- | -------- | -----: | --: | --: |
| text| 是 |  String |  | 二维码内容 |
| size|   | Number|  |  二维码大小 |
| dx|   | Number|  |  二维码在x轴上的位置 |
| dy|   | Number|  |  二维码在y轴上的位置 |
| background|   | String |  |  二维码背景色 |
| foreground|   | String |  |  二维码前景色 |
| correctLevel|   | String |  |  二维码容错级别 |
| image|   | String |  |  二维码中心的图片，可以是网络路径也可以是本地路径 |
| imageSize|   | String |  |   二维码图标大小 |

传入为Function类型示例代码: (推荐使用Function类型)
```javascript
qrCodeArray: (bgObj, type) => { //接收的第一个参数为背景图片的信息, 第二个参数是自定义标识（感觉这里用不到）, 图片为示例图片
	return [{
		text: '你好，我是取舍',
		image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1559644434957&di=0db394a4ae41b6cff704fa3d4cbd997b&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201806%2F30%2F20180630233629_GueV4.thumb.700_0.jpeg',
		size: 200,
		dx: 50,
		dy: bgObj.height - 300
		}]
}
```


## 2.0.2 imagesArray参数详解
```
该参数可以是一个数组，也可以是一个方法, `若传入一个方法，则必须return一个数组`
数组中的项内属性: (与官方文档中的drawImage方法传入的参数一致，一般最多填前5个参数)
```

| 属性名 | 是否必填 | 值类型 | 默认值 | 说明 |
| --------- | -------- | -----: | --: | --: |
| url| 是 |  String |  | 图片路径，可以是网络路径也可以是本地路径 |
| dx|   | Number|  |  图像的左上角在目标canvas上 X 轴的位置 |
| dy|   | Number|  |  图像的左上角在目标canvas上 Y 轴的位置 |
| dWidth|   | Number|  |  在目标画布上绘制图像的宽度，允许对绘制的图像进行缩放 |
| dHeight|   | Number|  |  在目标画布上绘制图像的高度，允许对绘制的图像进行缩放 |
| sx|   | Number|  |  源图像的矩形选择框的左上角 X 坐标 |
| sy|   | Number|  |  源图像的矩形选择框的左上角 Y 坐标 |
| sWidth|   | Number|  |   源图像的矩形选择框的高度 |
| sHeight|   | Number|  |   源图像的矩形选择框的高度 |
| circleSet(5.0新增)|   | Object|  |   图片圆形设置, 详见2.0.2.0.3 |
| infoCallBack (4.0新增)|   | Function|  |  接收自身图片信息并返回新参数的回调函数, 详见2.0.2.0.2示例 |

### 2.0.2.0.1传入为Function类型示例代码(无infoCallBack ): (推荐使用Function类型)
```javascript
imagesArray: (bgObj, type) => { //接收的第一个参数为背景图片的信息, 第二个参数是自定义标识）, 图片为示例图片
	return [{
		url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1559722952847&di=ce05a7206d3e0adeb1909a70ff7410ae&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201708%2F16%2F20170816080523_TmCUK.thumb.700_0.jpeg',
		dx: 300,
		dy: bgObj.height - 300,
		dWidth: 200,
		dHeight: 200
}]
}
```

### 2.0.2.0.2传入为Function类型示例代码(含infoCallBack ): (推荐使用Function类型)
```javascript
imagesArray: (bgObj, type) => { //接收的第一个参数为背景图片的信息, 第二个参数是自定义标识（感觉这里用不到）, 图片为示例图片
  return [{
  	url: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1314428097,3858988978&fm=26&gp=0.jpg',
  	dx: 300,
  	dy: bgObj.height - 300,
  	infoCallBack(imageInfo) { //接受自身的图片信息对象
  		let scale = 200/imageInfo.height;
  		return {  // 需return新参数， 会覆盖原先的参数
  			dWidth: imageInfo.width*scale,
  			dHeight: 200
  		}
  	}
  }]
}
```

### 2.0.2.0.3 circleSet属性详解
| 属性名 | 是否必填 | 值类型 | 默认值 | 说明 |
| --------- | -------- | -----: | --: | --: |
| circle|  |  Boolean|  | 是否设置圆形 |
| r|  |  Number| 详见下方2.0.2.0.3.0.1 | 圆形半径 |
| x|  |  Number| 详见下方2.0.2.0.3.0.1 | 圆形x坐标 |
| y|  |  Number| 详见下方2.0.2.0.3.0.1 | 圆形y坐标 |

注： r、x、y的值最终会传至Context.arc()方法, 并都有默认值，详见下方2.0.2.0.3.0.1

### 2.0.2.0.3.0.1 r、x、y默认值详解
r的默认值先判断是否有dWidth和dHeight,若有则取两者之间值较小的, 若无，则判断img自身的宽高取两者之间较小的，最终除以2<br />x的默认值为(dx  || 0 + r)<br />y的默认值为(dy || 0 + r)


## 2.0.3 setCanvasWH参数详解
```
该参数传入一个方法，该方法返回两个参数，接收的第一个参数为背景图片的信息, 第二个参数是自定义标识）
注： 确保能够改变画布大小，不然会有问题
```

示例代码:
```javascript
setCanvasWH: (bgObj, type) => { // 为动态设置画布宽高的方法，
	this.poster = bgObj;
},
```


## 2.0.4 setCanvasToTempFilePath参数详解
```
该参数传入一个方法，该方法返回两个参数，接收的第一个参数为背景图片的信息, 第二个参数是自定义标识）
该参数有默认， 一般可以不用填
必须return一个对象, 格式: (与官方文档中的setCanvasToTempFilePath方法传入的参数基本一致，除了canvasid与回调函数不用传)
```

| 属性名 | 是否必填 | 值类型 | 默认值 | 说明 |
| --------- | -------- | -----: | --: | --: |
| x| |  Number |  | 画布x轴起点（默认0） |
| y|   | Number|  |  画布y轴起点（默认0） |
| width|   | Number|  |  画布宽度（默认为canvas宽度-x）|
| height|   | Number|  |  画布高度（默认为canvas高度-y） |
| destWidth|   | Number|  | 输出图片宽度（默认为 width * 屏幕像素密度） |
| destHeight|   | Number|  |  输出图片高度（默认为 height * 屏幕像素密度） |
| fileType|   | String|  |  目标文件的类型，只支持 'jpg' 或 'png'。默认为 'png' |
| quality|   | Number|  |   图片的质量，取值范围为 (0, 1]，不在范围内时当作1.0处理 |


## 2.0.5 setDraw参数详解
```
该参数传入一个方法，该方法返回一个对象，该对象有三个参数{Context,bgObj,type}，分别是绘图上下文、背景图片的信息、自定义标识，可以在此方法中绘制自定义内容
示例代码:
```

```javascript
setDraw: (obj) => {
		let {
			Context,
			bgObj,
			type
		} = obj;
		Context.setFillStyle('black');
		Context.setGlobalAlpha(0.3);
		Context.fillRect(0, bgObj.height - 400, bgObj.width, 400);
		Context.setGlobalAlpha(1);
		Context.setFillStyle('white');
		Context.setFontSize(50);
		let text = '取舍'
		Context.fillText(text, bgObj.width - text.length * 50 - 50, bgObj.height - 185);
}
```

