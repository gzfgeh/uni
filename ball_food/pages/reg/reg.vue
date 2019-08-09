<template>
  <div class="wrap">
    
    <div class="header_wrap">
      <div class="item_wrap" 
      @click="chooseImage(0)">
        <img  :src="licencePic">
        <span>提交身份证正面照</span>
      </div>

      <div class="item_wrap" @click="chooseImage(1)">
        <img :src="certificatePic">
        <span>提交身份证背面照</span>
      </div>

    </div>

    <div style="margin-top: 100upx; text-align: left; margin-left: 10%;">
      <input type="radio" :checked="radioChecked" @click="agreeClick"/>
        <span style="color: #858585">同意广告协议，</span>
        <span style="text-decoration:underline; color:#4f4F4F" @click="look">查看协议</span>  
    </div>
    
    <button class="submit" @click="submitSuccess">提交</button>
  </div>
</template>

<script>
import { BASE_IMAGE_URL,shenHe,uploadFile,bindUser } from '@/utils/api'

export default {
  data() {
	  return{
		  radioChecked: false,
		  licencePic: '../../static/img/add_pic.png',
		  certificatePic: '../../static/img/add_pic.png',
		  nowDateNum: '',
		  startTimeValue: '',
		  sex: '',
		  content: ''
	  }
  },
  methods: {
     look: function(){
      uni.downloadFile({
          url: 'https://www.xiuqiupaopaopao.com/images/corright.doc',
          success: function (res) {
              var filePath = res.tempFilePath
              uni.openDocument({
                  filePath: filePath,
                  fileType:'doc',
                  success: function (res) {
                      console.log(res);
                      console.log('打开文档成功'+res)
                  }
              })
          }
      })
    },
    async submitSuccess(){
		uni.navigateBack({
			delta: 10
		})
		return;
		
      if(!this.radioChecked){
        wx.showToast({
            title: '未同意广告协议',
            icon: "none",
            duration: 1000
        })
        return;
      }

      if(this.licencePic.indexOf("add_pic.png") != -1){
        
        wx.showToast({
            title: '请上传营业执照',
            icon: "none",
            duration: 1000
        })
        return;
      }

      if(this.certificatePic.indexOf("add_pic.png") != -1){
        
        wx.showToast({
            title: '请上传法人身份证',
            icon: "none",
            duration: 1000
        })
        return;
      }

      

      var params = {
        s_shenfenzheng: this.certificatePic,
        s_zhizhao: this.licencePic,
        s_openid : wx.getStorageSync('openid')
      }

      var result = await shenHe(params);
      console.log(result);
      if(result.code == 1000){
        const url = '../applySuccess/main'
        uni.navigateTo({ url });
      }
      
    },
    agreeClick : function(){
      this.radioChecked = !this.radioChecked;
    },
     chooseImage: function(index){
		 	var that = this;
			uni.chooseImage({
				count: 1, // 默认9  
				sizeType: ['original'], // 可以指定是原图还是压缩图，默认二者都有  
				sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
				success: function (res) {
					// 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
					console.log(res.tempFilePaths[0]);
					

				  uni.uploadFile({
					url: 'https://www.xiuqiupaopaopao.com/index.php?g=Api&m=CommonApi&a=uploadFile',
					filePath: res.tempFilePaths[0],
					name: 'file',
					header: {"Content-Type":"multipart/form-data"},
					formData: {},
					success: function(data){
					  console.log(JSON.parse(data.data).data.url);
					  
					  uni.showToast({
						  title: '上传成功',
						  icon: "none",
						  duration: 1000
					  })
					  var url = 'https://www.xiuqiupaopaopao.com/'+JSON.parse(data.data).data.url;
					  if(index == 0){
						that.licencePic = url;
					  }else{
						that.certificatePic = url;
					  }
					}
				  })
				}
			})
     },
    
    uploadFile: function(file, ind, allLength){
            let that = this;
            wx.uploadFile({
                url: 'https://www.xiuqiupaopaopao.com/index.php?g=Api&m=CommonApi&a=uploadFile',
                filePath: file,
                name: 'file',
                header: {"Content-Type":"multipart/form-data"},
                formData: {},
                success: function(data){
                    
                    let filePath = 'https://www.xiuqiupaopaopao.com/'+JSON.parse(data.data).data.url;
                    that.imageList.push(filePath);
                    if(allLength-1 == ind){
                        wx.hideLoading();
                    }
                },
                fail: function(){
                    wx.hideLoading();
                    wx.showToast({
                        title: '图片太大或者图片格式不支持，请重新上传',
                        icon: 'none',
                        duration: 1000
                    })
                }
            })
        },

  },

  onLoad: function(){
    
  }
}
  
</script>

<style lang="scss" scoped="">
.wrap{
  display: flex;
  flex-direction: column;
  padding: 40upx;
  color: #c7c8c9;
  background: #fff;
  width: 100%;
}

.header_wrap{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: 400upx;
}

.item_wrap{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #000;
  width: 50%;
  span{
	  font-size: 24upx;
  }
}

.item_wrap img{
  width: 180upx;
  height: 180upx;
  border-radius: 20upx;
  margin-bottom: 20upx;
}

.submit{
  width: 90%;
  background: #f00;
  color: #fff;
  border-radius: 80upx;
  margin-top: 40upx;
}






</style>
