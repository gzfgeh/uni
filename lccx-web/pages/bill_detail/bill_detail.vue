<template>
<div class="container">

  <div class="row select_type">
    <div class="col_center item" @click="changeType(0)">
      <div class="tab_item">
        <span class="titleType" :class="{'active': (currentTab == 0)}">全部</span>
        <span :class="{'active_line': (currentTab == 0)}"></span>
      </div>
      
    </div>
    
    <div class="col_center item" @click="changeType(1)">
      <div class="tab_item">
        <span class="titleType" :class="{'active': (currentTab == 1)}">未付款</span>
        <span :class="{'active_line': (currentTab == 1)}"></span>
      </div>
      
    </div>
    
    <div class="col_center item" @click="changeType(2)">
      <div class="tab_item">
        <span class="titleType" :class="{'active': (currentTab == 2)}">已完成</span>
        <span :class="{'active_line': (currentTab == 2)}"></span>
      </div>
      
    </div>
    
  </div>

  <div class="list_wrap">
      <div class="ticket" v-for="(item,index) in list" :key="index" @click="next(item)"
				v-if="((item.type == 1) || (item.type == 2))">
        <div class="main">
          <div class="title" v-if="item.type == 1">里程车险</div>
          <div class="title" v-if="item.type == 2">交强险</div>
          <div class="text">被保险人：{{item.name}}</div>
          <div class="text">保障期限：{{item.starts_on}} - {{item.ends_on}}</div>
          <image src="../../static/img/dai_pay_icon.png" mode="widthFix" v-if="item.status == 1"/>
					<image src="../../static/img/finish_icon.png" mode="widthFix" v-if="item.status >= 3"/>
        </div>

        <div class="link" v-if="item.status == 1">
          <span class="pay_text">立即付款</span>
        </div>

        <div class="link" v-if="item.status >= 3">
          查看详情
        </div>

      </div>
  </div>
  

  <div class=" no_data_wrap" v-if="list.length == 0">
    <img src="../../static/img/no_data.png" class="no_data">
    <span>暂无订单信息</span>
  </div>

</div>
</template>
<script>
import { BASE_IMAGE_URL,getOrders} from "@/utils/api";

export default {
  data(){
	  return{
		  currentTab: 0,
		  list: [],
		  dai_pay_icon: BASE_IMAGE_URL+"dai_pay_icon.png",
		  finish_icon: BASE_IMAGE_URL+"finish_icon.png",
			baozhangzhong_icon: BASE_IMAGE_URL+"baozhangzhong_icon.png",
    weiqibao_icon: BASE_IMAGE_URL+"weiqibao_icon.png",
    yidaoqi_icon: BASE_IMAGE_URL+"yidaoqi_icon.png",
	  }
    
  },

  methods: {
    changeType: function(index){
      console.log(index);
      this.currentTab = index;
			window.scrollTo(0,0);
      this.getOrders();
    },
    async getOrders(){
			this.list = [];
      let res = await getOrders();
      if(res.code == 200){
				if(this.currentTab == 0){
					res.data.map(data => {
						if(data.type == 1 || data.type == 2){
							this.list.push(data);
						}
					})
				}else if(this.currentTab == 1){
					res.data.map(data => {
						if(data.type == 1 || data.type == 2){
							if(data.status == 1){
								this.list.push(data);
							}
						}
					})
				}else{
					res.data.map(data => {
						if(data.type == 1 || data.type == 2){
							if(data.status >= 3){
								this.list.push(data);
							}
						}
					})
				}
        // this.list = res.data;
      }
    },

    next: function(item){
      let index = item.type;
      if(item.status == 1){
        //未付款
        if(index == 1){
          //里程车险
          const url = "../pay_address/pay_address?id="+item.id;
          wx.navigateTo({ url });
        }else{
          //交强险
          wx.showModal({
            title: '提示',
            content: '请先支付里程车险，再支付交强险,现在为您跳转',
            success: function (res) {
                if (res.cancel) {
                  //点击取消,默认隐藏弹框
                } else {
                  //点击确定
                  const url = "../pay_address/pay_address?id="+item.id;
                    wx.navigateTo({ url });
                }
            }
          });
        }

      }else{
        //已付款
        if(index == 1){
          //里程车险
          const url = "../order_one_detail/order_one_detail?id="+item.id;
          wx.navigateTo({ url });
        }else{
          //交强险
          const url = "../order_two_detail/order_two_detail?id="+item.id;
          wx.navigateTo({ url });

        }

        
      }
    }

  },

  onLoad () {
    this.getOrders();
  },


}
</script>

<style lang="scss">
.container {
  background-color: #F3F3F3;
  font-size: 26rpx;
	width: 100%;
}
.list_wrap{
  margin-top: 130rpx;
  background-color: #F3F3F3;
}
.select_type{
  height: 100rpx;
  align-items: center;
  justify-content: space-around;
  background: #ffffff;
  color: rgba(0,0,0,0.4);
  font-size: 28rpx;
  position: fixed;
  width: 100%;
  z-index: 10;
  padding: 0rpx 100rpx;
  box-sizing: border-box;
}

.tab_item{height: 100rpx; line-height: 100rpx; position: relative;}

.active_line{background-color: #427DFF; width: 100%;height: 6rpx;position: absolute;bottom: 0rpx;left: 0rpx;}
.active{color: #427DFF;}

.hoverClass{opacity: 0.8;}
.row{display: flex; flex-direction: row; align-items: center; justify-content: center;}
.col_center{display: flex; flex-direction: column; align-items: center; justify-content:center}
.item{height: 100rpx;position: relative; flex: 1;}
.no_data_wrap{height: 100%; width: 100%; position: absolute; z-index: 1;
		display: flex; flex-direction: column; align-items: center; justify-content: center;}
	.no_data_wrap img{width: 288rpx; height: 270rpx;}
	.no_data_wrap span{color: #9F9F9F; font-size: 28rpx; margin-top: 40upx;}

  .ticket {
  background-color: #fff;
  border-radius: 10rpx;
  padding: 40rpx 40rpx 20rpx 40rpx;
  box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.03);
  margin: 0rpx 30rpx 30rpx 30rpx;
  .main {
    border-bottom: 1px solid #F1F1F1;
    position: relative;
    image{
      position: absolute;
      right: 0rpx;
      top: 0rpx;
      width: 168rpx;
    }
    .title {
      padding-bottom: 20rpx;
      font-size: 34rpx;
      color: #4d4d4d;
      font-weight: bold;
    }
    .text {
      color: #9F9F9F;
      font-size: 26rpx;
    }
    .text:last-child {
      margin-bottom: 30rpx;
    }
  }
  .link {
    text-align: center;
    color: #3A7FF7;
    font-size: 26rpx;
    padding-top: 20rpx;
  }
  .pay_text{
    color: #3A7FF7;
    font-size: 26rpx;
    background-color: #E9F3FB;
    border-radius: 26rpx;
    padding: 8rpx 24rpx;
  }
}

</style>
