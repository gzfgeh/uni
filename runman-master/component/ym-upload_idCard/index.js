// pages/component/ym-upload-idCard/index.js
const app = getApp();
const common = require('../../utils/common.js');
import Notify from '../../dist/notify/notify';
/**
 * cardFace:身份证正面
 * cardVerso：身份证反面
 * 事件
 * uploadIdCard：返回cardFace，cardVerso字段
 * 
 */
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    cardFace: {
      type: String,
      value: {}
    },
    cardVerso: {
      type: String,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    uploadHandle(e) {
      let type = e.currentTarget.dataset.type,
        _this = this,
        typeName = ''
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success(res) {
          // tempFilePath可以作为img标签的src属性显示图片
          console.log(res.tempFilePaths)
          if (type == "1") {
            // 正面
            const face = res.tempFilePaths[0]
            _this.setData({
              cardFace: face
            })
            typeName = 'cardFace'
          } else if (type == "2") {
            // 反面
            const verso = res.tempFilePaths[0]
            _this.setData({
              cardVerso: verso
            })
            typeName = 'cardVerso'
          }
          common.uploadImage(app, res.tempFilePaths[0], res => {
            _this.setData({
              [typeName]: res.imageURL
            })
            let idCard = {}
            // console.log('aa',_this.data, _this.data.cardFace)
            idCard.cardFace = _this.data.cardFace
            idCard.cardVerso = _this.data.cardVerso
            _this.triggerEvent('uploadIdCard', idCard)
          }, (code, message) => {
            Notify(code + message);
          })
        }
      })
    }
  }
})
