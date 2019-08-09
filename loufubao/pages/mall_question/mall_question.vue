<template>
  <div >
    
    <div class="content">为了给您提供更好的服务，希望您能抽出几分钟时间，我们非常重视每位用户的宝贵意见，期待您的参与！现在我们就马上开始吧！</div>
    
    <div class="contain">
			
      <div class="item_wrap" v-for="(item, index) in list" :key="index">
        <div>{{index+1}}. <span style="color: #ff0000;">*</span> {{item.name}}</div>
        <radio-group class="radio-group"  >
          <label class="radio" @click="goToChange(index, 1)">
            <radio :checked="item.value == 1" />是
          </label>
					
					<label class="radio" @click="goToChange(index, 0)">
            <radio :checked="item.value == 0"/>否
          </label>
					
        </radio-group>
				
				
      </div>

    </div>

	<div class="button"  @tap="answer">
	  <button >立即提交</button>
	</div>

  </div>
</template>

<script>
import { BASE_IMAGE_URL,answer,question } from "@/utils/api";

export default {
  data() {
	  return {
			lc_id: 0,
			wc_id: 0,
			user_coupon_id: 0,
			list: []
	  }
    
  },

  methods: {
	  next(){
		  uni.navigateTo({
				url: '../fuli_post/fuli_post'
		  })
	  },
    async answer(){
			let answerStr = "";
			this.list.map((item) => {
				if(item.value == -1){
					wx.showToast({
							title: "问题打完，才能领取哦",
							icon: 'none',
							duration: 1000
					})
					return;
				}
					answerStr += (item.value+",")
			});
			answerStr = answerStr.substring(0, answerStr.length-1);
			if(!answerStr){
				wx.showToast({
							title: "问题打完，才能领取哦",
							icon: 'none',
							duration: 1000
					})
					return;
			};
      let params = {
				user_id: uni.getStorageSync("userInfo").userID,
        answer: answerStr,
        wc_id: this.wc_id,
				lc_id: this.lc_id
      };
      let res = await answer(params);
      if(res.status == 1){
        
				if(res.data && parseInt(res.data.type) == 2){
					//小商品
					uni.setStorageSync("couponItem", res.data);
					this.next();
				}else{
					//优惠券
					uni.showToast({
            title: "领取成功",
            icon: 'none',
            duration: 1000
        });
					setTimeout(()=>{
						uni.redirectTo({
							url: '/pages/coupon_list/coupon_list'
						});
					}, 1000);
					
				}
      }else{
        wx.showToast({
            title: res.message,
            icon: 'none',
            duration: 1000
        })
      }

      
    },

    goToChange: function(index, type) {
      console.log(index)
			this.list[index].value = type;
      console.log(this.list[index].value);
      
    },

    async question(){
			let params = {
				lc_id: this.lc_id,
				wc_id: this.wc_id
			};
      let res = await question(params);
      if(res.status == 1){
        this.list = JSON.parse(res.data);
        this.list.map( (item) => {
					item.value = -1;
				})
      }else{
				wx.showToast({
            title: res.message,
            icon: 'none',
            duration: 1000
        })
				setTimeout(()=>{
					uni.navigateBack({
						delta:2
					})
				}, 1000)
				
			}
    }

  },

  onLoad(opt){
		
		this.lc_id = opt.lc_id;
		this.wc_id = opt.wc_id;
		console.log(opt.lc_id);
		console.log(opt.wc_id);
    this.question();
  }

};
</script>

<style>
page {
  background: #FFFFFF;
}

.radio-group{margin-top: 40upx;}
.radio{margin-right: 80upx!important;}

.contain {
  background: #FFFFFF;
  height: 100%;
  padding: 20rpx;
  color: #000000;
}

.title{
  font-size: 40rpx;
  font-weight: bold;
  color: #000000;
}

.content{
  font-size: 35rpx;
  color: #000000;
  padding: 20rpx;
	text-align: center;
}

.item_wrap{
  margin-bottom: 40rpx;
  font-size: 36rpx;
  padding: 30upx;
  box-shadow:0px 6upx 54upx 0px rgba(221,221,221,0.41);
}



.button{
  margin: 0upx 0%;
  width: 100%;
  height: 174upx;
	line-height: 174upx;
	background-color: #ffffff;
	border-radius: 0upx;
	text-align: center;
	font-size: 32upx;
	position: fixed;
	bottom: 0upx;
}

.button button{
	margin: 40upx 5%;
  width: 90%;
  height: 94upx;
	line-height: 94upx;
	color: #ffffff;
	background-color: #427DFF;
}


</style>
