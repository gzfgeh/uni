<template>
  <div class="contain">

    <div class="list_wrap">
      <div  class="item_wrap" v-for="(item,index) in list" :key="index" >
          <radio :checked="item.checked" @click="changeChecked(item)"></radio>
          <div class="wrap">
            <div class="head_wrap">
              <span>编号：{{item.ct_g_id}}</span>
              <span>{{item.ct_create_time}}</span>
            </div>
            <div class="content_wrap" >
              <img :src="item.g_img" >
              <div class="content_price_wrap" @click="goToDetail(index, 0)">
                <span class="item_name" style="font-size:24upx;">
									{{item.g_sheng}}{{item.g_shi}}{{item.g_qu}}
								</span>
                <span class="item_name">{{item.g_name}}</span>
                <span style="color: #E2723B; font-size:30upx;">￥{{item.g_price}}</span>
              </div>
              <span style="flex: 1;"></span>
              <div class="actionWrap" >
                 
                  <span class="actionClass" @click="reduceAction(index)">-</span>
                  <!-- <span class="item_num">{{item.ct_count}}</span> -->
									<input type="number" class="item_num" v-model="item.ct_count" maxlength="4" @click="inputChange(index)">
                  <span class="actionClass" @click="addAction(index)">+</span>
              </div>
            </div>
            <div class="head_wrap" style="font-size: 24upx;">
              <span>小计：￥{{item.g_price*item.ct_count}}</span>
              <span style="flex: 1;"></span>
              
            </div>
          </div>
      </div>
      
    </div>

    <div class="add_btn_wrap">
      <radio @click="allStatusChange" :checked="allStatus">全选</radio>
      <div class="price_wrap">
        <span>合计：</span>
        <span>￥{{allPrice}}</span>
        <button @click="payNow">结算({{allNum}})</button>
      </div>
    </div>
		
		<!--弹窗-->
		<div class="modal-mask" @tap="hideModal" v-if="showModal"></div>
		  <div class="modal-dialog" v-if="showModal">
		  <div class="modal-title">请输入商品个数</div>
		  <div class="modal-content">
		    <input type="number" maxlength="4" v-model="modalInput" class="modal-input">
		  </div>
		  <div class="modal-footer" >
		    <div class="btn_wrap" @click="sureModal">
		      <span>是</span>
		    </div>
			
			<div class="no_btn_wrap" @click="hideModal">
			  <span>否</span>
			</div>
			
		  </div>
		</div>
		

  </div>
</template>

<script>
import { BASE_IMAGE_URL,getCart,saveCar} from '@/utils/api'


export default {
  data(){
		return {
			item_img: BASE_IMAGE_URL+"temp.png",
			gouwuche: BASE_IMAGE_URL+"gouwuche.png",
			daifahuo: BASE_IMAGE_URL+"daifahuo.png",
			finish: BASE_IMAGE_URL+"finish.png",
			daipingjia: BASE_IMAGE_URL+"daipingjia.png",
			quanbudingdan: BASE_IMAGE_URL+"quanbudingdan.png",
			mall_img: BASE_IMAGE_URL+"mall_img.png",
			list: [],
			isEmpty: false,
			allStatus: false,
			page: 1,
			loading_text: '记录为空，没有数据',
			deleteIcon: BASE_IMAGE_URL+'del_addr_icon.png',
			typeIndex: 0,
			allPrice: 0,
			allNum: 0,
			indexList: [],
			paramsType: 1,
			showModal: false,
			modalInput: 0,
			modalIndex: 0
		}
    
  },
  methods: {
    deleteOrder: function(item){
      let that = this;
      wx.showModal({
          title: '警告',
          content: '是否删除当前订单?',
          success: function (res) {
              
              if(res.confirm){
                  that.deleteMallOrder(item.mo_id);
              }
          }
      })
    },
		inputChange: function(index){
			this.showModal = true;
			this.modalInput = this.list[index].ct_count;
			this.modalIndex = index;
		},
		hideModal: function(){
			this.showModal = false;
		},
		sureModal: function(){
			this.list[this.modalIndex].ct_count = this.modalInput;
			this.$forceUpdate();
			this.showModal = false;
			this.calcStatus();
		},
    async deleteMallOrder(id){
      let params = {
        mo_id: id
      };

      let res = await deleteMallOrder(params);
      if(res.code == 1000){
        wx.showToast({
          icon: 'none',
          text: '删除成功'
        });


        this.changeType(0);
      }
    },
    goToDetail: function(index, ind){
      let sp_id ;
      if(this.typeIndex == 1){
        sp_id = this.list[index].ct_g_id;
        const url = "../goodsDetail/main?id="+sp_id;
        wx.navigateTo({ url });
      }else{
        wx.setStorageSync("shoppingItem", this.list[index]);
        const url = "../orderDetail/main";
        wx.navigateTo({ url });
      }
      
    },
    changeChecked: function(item){
      console.log(item);
      item.checked = !item.checked;
      this.calcStatus();
    },
    calcStatus: function(){
      let that = this;
      this.allNum = 0;
      this.allPrice = 0;
      this.indexList = [];
      this.list.map(function(item, index){
        if(item.checked){
          that.allNum++;
          that.allPrice += item.g_price*item.ct_count;
          that.indexList.push(index);
        }
        if(that.allNum == that.list.length){
          that.allStatus = true;
        }else{
          that.allStatus = false;
        }
      });
    },
    recommand: function(index){
      let item = this.list[index];
      wx.setStorageSync("recommand", item);
      const url = "../recommand/main";
      wx.navigateTo({ url });
    },
    deleteAction: function(index){
      let that = this;
      wx.showModal({
          title: '警告',
          content: '是否删除当前物品?',
          success: function (res) {
              
              if(res.confirm){
                  that.deleteCart(index);
              }
          }
      })
    },
    reduceAction: function(index){
      
      this.addCart(index, 1);
    },
    addAction: function(index){
      
      this.addCart(index, 0);
    },
    async deleteCart(index){
      let params = {
        ct_id: this.list[index].ct_id,
      };
      let result = await deleteCart(params);
      if(result.code == 1000){
        wx.showToast({
            title: '删除成功',
            icon: 'none',
            duration: 1000
        });
        this.getCart();
      }
    },

    async addCart(index, type){
      if(type == 0){
        this.list[index].ct_count++;
      }else{
        if(this.list[index].ct_count != 1){
          this.list[index].ct_count --;
        }
      };
			
      let params = {
        ct_openid: wx.getStorageSync("openid"),
        ct_g_id: this.list[index].ct_g_id,
        ct_count: this.list[index].ct_count
      };
      let result = await saveCar(params);
      if(result.code == 1000){
        this.calcStatus();
      }
    },
    allStatusChange: function(){
      let that = this;
      this.allStatus = !this.allStatus;
      this.allPrice = 0;
      this.allNum = this.list.length;
      this.list.map(function(item, index){
        if(that.allStatus){
          item.checked = true;
          that.allPrice += item.g_price*item.ct_count;
          that.indexList.push(index);
        }else{
          item.checked = false;
          that.indexList = [];
          that.allPrice = 0;
        }
        
      });

    },
    async getCart(){
      this.allPrice = 0;
      this.allNum = 0;
      this.allStatus = false;
      let result = await getCart(uni.getStorageSync("openid"));
      if(result.code == 1000){
        this.list = result.data;
        this.isEmpty = true;
        this.loading_text = "";
        this.list.map(function(item){
          item.checked = false;
        });
      }else{
        wx.showToast({
            title: result.msg,
            icon: 'none',
            duration: 1000
        })
      }
    },

    async payNow(){
      if(this.allPrice == 0){
        wx.showToast({
            title: '没有选择商品',
            icon: 'none',
            duration: 1000
        })
        return;
      }
			
			
      let body = '';
      let that = this;
      let selectItems = [];
			let goodsDetail = [];
      this.indexList.map(function(item, index){
				let p = {
					go_g_id: that.list[item].ct_g_id,
					go_count: that.list[item].ct_count
				}
        goodsDetail.push(p);
        selectItems.push(that.list[item]);
      })
      console.log("body");
      body = body.substring(0, body.length-1);
      
      let params = {
          o_money: this.allPrice,
          o_openid: uni.getStorageSync('openid'),
          goodsDetail: goodsDetail,
          o_address: ''
      };
      uni.setStorageSync('params', params);
      uni.setStorageSync('selectItems', selectItems);
      const url = "../pay_address/pay_address";
      uni.navigateTo({ url });
      return;
			
			
			
      let result = await weixinPay(params);
      console.log(result);
      if(result.code == 1000){
        that.buyDisabled = true;
        wx.requestPayment({
          'timeStamp': result.timeStamp,
          'nonceStr': result.nonceStr,
          'package': result.package,
          'signType': 'MD5',
          'paySign': result.paySign,
          'success':function(res){
              console.log(res);
              wx.showToast({
                  title: '支付成功',
                  icon: 'none',
                  duration: 1000
              });
              wx.navigateBack({
                  delta: 10
              })
          },
          'fail':function(res){
              console.log(res);
              wx.showToast({
                  title: '支付失败',
                  icon: 'none',
                  duration: 1000
              });
              that.buyDisabled = false;
          }
        })
      }else{
        wx.showToast({
            title: '支付失败',
            icon: 'none',
            duration: 1000
        });
      }
    }

  },

  onLoad(){
		this.getCart();
  },


}
</script>

<style>
page{
  background: #DDDDDD;
  height: 100%;
}
.contain{
  background: #DDDDDD;
  height: 100%;
	width: 100%;
}

.edit_wrap{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  background: #ffffff;
  border-bottom: 1upx solid #dddddd;
  font-size: 30upx;
  height: 100upx;
  padding: 0upx 20upx;
  margin-top: 120upx;
}

.edit_wrap img{
  width: 60upx;
  height: 60upx;
}

.list_wrap{
  border-top: 1px solid #dddddd;
	width: 100%;
	margin-bottom: 100upx;
}
.item_wrap{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10upx;
  align-items: center;
  background: #ffffff;
  padding: 0upx 40upx 0upx 20upx;
	width: 100%;
}

.item_wrap img{
  width: 120upx;
  height: 120upx;
}

.item_num{
  display: inline-block;
	color: #000;
	width: 60upx;
	text-align: center;
	font-size: 24upx;
}

.content_price_wrap{
  display: flex;
  flex-direction: column;
  margin-left: 20upx;
  justify-content: space-around;
  height: 100%;
}

.add_btn_wrap{
  position: fixed;
  bottom: 0upx;
  left: 0upx;
  width: 100%;
  height: 100upx;
  padding: 20upx;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: #ffffff;
  box-sizing: border-box;
  font-size: 25upx;
	box-shadow:0px 0px 14upx 0px rgba(0,0,0,0.5);
}

button{
  width: 200upx;
  height: 60upx;
  line-height: 60upx;
  text-align: center;
  margin-left: 10upx;
  color: #ffffff;
  background: #E2723B!important;
  font-size: 25upx;
}

.add_btn_wrap span{
  font-size: 34upx;
}

.price_wrap{
  display: flex;
  flex-direction: row;
  align-items: center;
	font-size: 34upx;
}

.search_wrap{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  height: 120upx;
  background: #ffffff;
  margin-bottom: 10upx;
  position: fixed;
  top: 0upx;
  left: 0upx;
  width: 100%;
  border-bottom: 1upx solid #dddddd;
}

.search_wrap img{
  width: 80upx;
  height: 80upx;
  padding: 20upx;
}

.loading{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100upx;
  padding: 20upx auto;
}

.actionClass{
  background: #ffffff;
  display: inline-block;
  height: 40upx;
  line-height: 40upx;
  text-align: center;
  width: 60upx;
  color: #000000;
  border-radius: 10upx;
  border: 1upx solid #dddddd;
}

.actionWrap{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding: 10upx 0upx;
  min-width: 200upx;
}

.head_wrap{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 80upx;
  font-size: 25upx;
}

.content_wrap{
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 20upx 0upx;
  border-bottom: 1upx solid #dddddd;
}

.content_wrap img{
  width: 100upx;
  height: 100upx;
  min-width: 100upx;
}

.wrap{
  display: flex;
  flex-direction: column;
  width: 100%;
}

.item_name{
  font-size: 30upx;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
  text-align: left;
  max-width: 300upx;
}



.modal-mask {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: #000;
  opacity: 0.5;
  overflow: hidden;
  z-index: 9000;
  color: #fff;
}

.modal-dialog {
  width: 80%;
  overflow: hidden;
  position: fixed;
  top: 20%;
  left: 0;
  z-index: 9999;
  background: #ffffff;
  margin: 10%;
  border-radius: 12upx;
}

.modal-title {
  padding-top: 50upx;
  font-size: 36upx;
  color: #000000;
  font-weight: bold;
  text-align: center;
}

.modal-content {
  padding: 40upx 52upx;
  font-size: 28upx;
  color: rgba(0,0,0,0.6);
  text-align: center;
}

.modal-footer {
  display: flex;
  flex-direction: row;
  font-size: 34upx;
  padding: 0upx 50upx;
}

.btn_wrap{
	flex: 1;
  height: 94upx;
  margin: 20upx 5%;
  background: #E2723B;
  border-radius: 12upx;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-size: 34upx;
}

.no_btn_wrap{
	flex: 1;
	height: 94upx;
	margin: 20upx 5%;
	background: rgba(0,0,0,0.15);
	border-radius: 12upx;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	color: #ffffff;
	font-size: 34upx;
}

.modal-input{
	border: 1px solid rgba(0,0,0,0.15);;
}


checkbox .wx-checkbox-input{
   border-radius: 50%;/* 圆角 */
   width: 40upx; /* 背景的宽 */
   height: 40upx; /* 背景的高 */
}
/* 选中后的 背景样式 （红色背景 无边框 可根据UI需求自己修改） */
checkbox .wx-checkbox-input.wx-checkbox-input-checked{
   border: none;
   background: #E2723B;
   padding: 3upx;
}
/* 选中后的 对勾样式 （白色对勾 可根据UI需求自己修改） */
checkbox .wx-checkbox-input.wx-checkbox-input-checked::before{
   border-radius: 50%;/* 圆角 */
   width: 40upx;/* 选中后对勾大小，不要超过背景的尺寸 */
   height: 40upx;/* 选中后对勾大小，不要超过背景的尺寸 */
   line-height: 40upx;
   text-align: center;
   font-size:25upx; /* 对勾大小 30upx */
   color:#fff; /* 对勾颜色 白色 */
   background: transparent;
   transform:translate(-50%, -50%) scale(1);
   -webkit-transform:translate(-50%, -50%) scale(1);
}


</style>
