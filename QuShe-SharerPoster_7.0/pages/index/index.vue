<template>
	<view class="content">
		<view class="flex_row_c_c modalView" :class="qrShow?'show':''" @tap="hideQr()">
			<view class="flex_column">
				<view class="backgroundColor-white padding1vh border_radius_10px">
					<image :src="poster.finalPath" mode="widthFix" class="posterImage"></image>
				</view>
				<view class="flex_row marginTop2vh">
					<button type="primary" size="mini" @tap.prevent.stop="saveImage()">保存图片</button>
					<button type="primary" size="mini" @tap.prevent.stop="share()">分享图片</button>
				</view>
			</view>
		</view>
		<button type="primary" @tap="shareFc()">生成海报</button>
		<view class="hideCanvasView">
			<canvas class="hideCanvas" canvas-id="default_PosterCanvasId" :style="{width: (poster.width||0) + 'px', height: (poster.height||0) + 'px'}"></canvas>
		</view>
	</view>
</template>

<script>
	import _app from '@/util/QS-SharePoster/app.js';
	import getSharePoster from '@/util/QS-SharePoster/QS-SharePoster.js';
	export default {
		data() {
			return {
				poster: {},
				qrShow: false,
				canvasId: 'default_PosterCanvasId',
			}
		},
		onLoad() {

		},
		methods: {
			async shareFc() {
				try {
					if (!this.poster.finalPath) {
						let d = await getSharePoster({
							type: 'testShareType',
							posterCanvasId: this.canvasId,
							qrCodeArray: (bgObj, type) => {
								return [{
									text: '你好，我是取舍',
									image: '../../static/home_head_bg.png',
									size: 200,
									dx: 50,
									dy: bgObj.height - 300
								}]
							},
							imagesArray: (bgObj, type) => { //接收的第一个参数为背景图片的信息, 第二个参数是自定义标识（感觉这里用不到）, 图片为示例图片
								return [{
									url: '../../static/logo.png',
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
					this.qrShow = true;
				} catch (e) {
					_app.hideLoading();
					_app.showToast(JSON.stringify(e));
					console.log(JSON.stringify(e));
				}
			},
			saveImage() {
				uni.saveImageToPhotosAlbum({
					filePath: this.poster.finalPath,
					success(res) {
						_app.showToast('保存成功');
					}
				})
			},
			share() {
				// #ifdef APP-PLUS
				_app.getShare(false, false, 2, '', '', '', this.poster.finalPath, false, false);
				// #endif

				// #ifndef APP-PLUS
				_app.showToast('分享了');
				// #endif
			},
			hideQr() {
				this.qrShow = false;
			}
		}
	}
</script>

<style>
	.hideCanvasView {
		position: relative;
	}

	.hideCanvas {
		position: fixed;
		top: -99999upx;
		left: -99999upx;
		z-index: -99999;
	}

	.flex_row_c_c {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.modalView {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		opacity: 0;
		outline: 0;
		transform: scale(3);
		perspective: 2500upx;
		background: rgba(0, 0, 0, 0.6);
		transition: all .3s ease-in-out;
		pointer-events: none;
		backface-visibility: hidden;
		z-index: 999;
	}

	.modalView.show {
		opacity: 1;
		transform: scale(1);
		pointer-events: auto;
	}

	.flex_column {
		display: flex;
		flex-direction: column;
	}

	.backgroundColor-white {
		background-color: white;
	}

	.border_radius_10px {
		border-radius: 10px;
	}

	.padding1vh {
		padding: 1vh;
	}

	.posterImage {
		width: 60vw;
	}

	.flex_row {
		display: flex;
		flex-direction: row;
	}

	.marginTop2vh {
		margin-top: 2vh;
	}
</style>
