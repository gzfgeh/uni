<template>
<div class="container">
  
  <div>
	  
      <div class="title">
        商业险调整
      </div>
	  
	  <div class="item_wrap uni-center-item">
		  <span>起保日期</span>
		  <span class="uni-flex-item"></span>
		  
		  <picker mode="multiSelector" :value="dateTime" @change="changeDateTime"
		  @columnchange="changeDateTimeColumn" :range="dateTimeArray">
		    <view class="tui-picker-detail">
		      {{dateTimeArray[0][dateTime[0]]}}-{{dateTimeArray[1][dateTime[1]]}}-{{dateTimeArray[2][dateTime[2]]}} {{dateTimeArray[3][dateTime[3]]}}:{{dateTimeArray[4][dateTime[4]]}}:{{dateTimeArray[5][dateTime[5]]}}
		    </view>
		  </picker>
		  
		  <span class="arraw"></span>
	  </div>
	  
	  <div class="item_wrap uni-between-item">
		  <span>机动车损失险</span>
		  <div class="radio_wrap">
			<radio :value="value" color="#427DFF" class="radio"/>
			<span>不计免赔</span>
		  </div>
		  
		  <div class="uni-between-item">
			  <picker :range="dataList" :value="jidongIndex" @change="jidongChange">
				<div>
				  {{dataList[jidongIndex]}}
				</div>
			  </picker>
			  <span class="arraw"></span>
		  </div>
	  </div>
	  
	  
	  <div class="item_wrap uni-between-item">
		  <span>机动车损失险</span>
		  <div class="radio_wrap">
			<radio :value="value" color="#427DFF" class="radio"/>
			<span>不计免赔</span>
		  </div>
		  
		  <div class="uni-between-item">
			  <picker :range="moneyList" :value="jidongIndex" @change="jidongChange">
				<div>
				  {{moneyList[moneyIndex]}}
				</div>
			  </picker>
				<span class="arraw"></span>
		  </div>
	  </div>
	  
	  <div class="item_wrap uni-between-item">
		  <span>司机责任险</span>
		  <span class="uni-flex-item"></span>
		  
		  <div class="uni-between-item">
			  <picker :range="siJiList" :value="siJiIndex" @change="siJiChange">
				<div>
				  {{siJiList[siJiIndex]}}
				</div>
			  </picker>
				<span class="arraw"></span>
		  </div>
	  </div>
	  
	  <div class="item_wrap uni-between-item">
		  <span>乘客责任险</span>
		  <span class="uni-flex-item"></span>
		  
		  <div class="uni-between-item">
			  <picker :range="siJiList" :value="siJiIndex" @change="siJiChange">
				<div>
				  {{siJiList[siJiIndex]}}
				</div>
			  </picker>
				<span class="arraw"></span>
		  </div>
	  </div>
	  
	  <div class="item_wrap uni-between-item">
	  		  <span>盗抢险</span>
	  		  <span class="uni-flex-item"></span>
	  		  
	  		  <div class="uni-between-item">
	  			  <picker :range="siJiList" :value="siJiIndex" @change="siJiChange">
	  				<div>
	  				  {{siJiList[siJiIndex]}}
	  				</div>
	  			  </picker>
	  				<span class="arraw"></span>
	  		  </div>
	  </div>
	  
	  <div class="item_wrap uni-between-item">
	  		  <span>划痕险</span>
	  		  <span class="uni-flex-item"></span>
	  		  
	  		  <div class="uni-between-item">
	  			  <picker :range="siJiList" :value="siJiIndex" @change="siJiChange">
	  				<div>
	  				  {{siJiList[siJiIndex]}}
	  				</div>
	  			  </picker>
	  				<span class="arraw"></span>
	  		  </div>
	  </div>
	  
	  <div class="item_wrap uni-between-item">
	  		  <span>自燃险</span>
	  		  <span class="uni-flex-item"></span>
	  		  
	  		  <div class="uni-between-item">
	  			  <picker :range="siJiList" :value="siJiIndex" @change="siJiChange">
	  				<div>
	  				  {{siJiList[siJiIndex]}}
	  				</div>
	  			  </picker>
	  				<span class="arraw"></span>
	  		  </div>
	  </div>
	  
      <div class="title">
        交强险
      </div>
	  
	  <div class="item_wrap uni-center-item">
	  		  <span>起保日期</span>
	  		  <span class="uni-flex-item"></span>
	  		  
	  		  <picker mode="multiSelector" :value="dateTime" @change="changeDateTime"
	  		  @columnchange="changeDateTimeColumn" :range="dateTimeArray">
	  		    <view class="tui-picker-detail">
	  		      {{dateTimeArray[0][dateTime[0]]}}-{{dateTimeArray[1][dateTime[1]]}}-{{dateTimeArray[2][dateTime[2]]}} {{dateTimeArray[3][dateTime[3]]}}:{{dateTimeArray[4][dateTime[4]]}}:{{dateTimeArray[5][dateTime[5]]}}
	  		    </view>
	  		  </picker>
	  		  
	  		  <span class="arraw"></span>
	  </div>
	  
	  <div class="item_wrap uni-between-item">
	  		  <span>自燃险</span>
	  		  <span class="uni-flex-item"></span>
	  		  
	  		  <div class="uni-between-item">
	  			  <picker :range="siJiList" :value="siJiIndex" @change="siJiChange">
	  				<div>
	  				  {{siJiList[siJiIndex]}}
	  				</div>
	  			  </picker>
	  				<span class="arraw"></span>
	  		  </div>
	  </div>
	  
      
    
    <div class=" button" @click="devices">立即报价</div>

  </div>

    <!--弹窗-->
    <div class="modal-mask" @tap="hideModal" v-if="showModal"></div>
      <div class="modal-dialog" v-if="showModal">
      <div class="modal-title">报价失败</div>
      <div class="modal-content">
        请确认您的爱车是否已进入投保期。若仍报价失败，请稍后重试。
      </div>
      <div class="modal-footer" >
        <div class="btn_wrap" hover-class="btn_hover" @click="closeModal">
          
          <span>返回</span>
        </div>
      </div>
    </div>

</div>
</template>

<script>

	import {dateTimePicker, getMonthDay} from '../../common/dateTimePicker.js'
	
	export default {
	  data () {
		return {
		  step: 1,
		  siJiList: ["1万","2万","3万","4万"],
		  siJiIndex: 0,
		  dataList: ["投保","不投保"],
		  jidongIndex: 0,
		  moneyList: ["150万","200万","300万","400万"],
		  cateIndex: 0,
		  cateResList: [],
		  license_no: '',
		  phone: '',
		  imei: '',
		  codeText: '发送验证码',
		  codeNum: 60,
		  interval: {},
		  phone_code: '',
		  model: 0,
		  licensePlaceHolder: "请输入车牌号",
		  phonePlaceHolder: "请输入手机号",
		  phoneCodePlaceHolder: "请输入验证码",
		  imeiPlaceHolder: "请输入IMEI",
		  dateTimeArray: [],
		  dateTime: '',
		  startYear: 2000,
		  endYear: 2050,
		  showModal: false,
		  value: "true",
		  moneyIndex: 0
		}
	  },

	  methods: {
		  jidongChange(e){
			  console.log(e.detail.value);
			  this.jidongIndex = e.detail.value;
		  },
		changeDateTime(e){
		  console.log(e.mp.detail.value);
		  this.dateTime = e.mp.detail.value;
		},
		changeDateTimeColumn(e){
		  var arr = this.dateTime, dateArr = this.dateTimeArray;

		  arr[e.mp.detail.column] = e.mp.detail.value;
		  dateArr[2] = getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);

		  this.dateTimeArray = dateArr;
		  this.dateTime = arr;
		  
		},

		imeiFocus: function(e){
		  this.imeiPlaceHolder = "";
		},
		phoneFocus: function(e){
		  this.phonePlaceHolder="";
		},
		phoneInput: function(e){
		  this.phonePlaceHolder="请输入手机号";
		},
		phoneCodeFocus: function(e){
		  this.phoneCodePlaceHolder="";
		},
		phoneCodeInput: function(e){
		  this.phoneCodePlaceHolder="请输入验证码";
		},

		licenseFocus: function(e){
		  this.licensePlaceHolder="";
		},
		//车牌号监听
		watchInput: function(e){
			return;
		  console.log(e.mp.detail.value);
		  let value = e.mp.detail.value;
		  if((value.length>=7) && (value.length<=8)){
			if(!isChinese(value[0])){
			  wx.showToast({
				icon: 'none',
				title: '第二位请输入汉字',
				duration: 1000
			  });
			  return;
			}else if((value[1]>='a'&&value[1]<='z')||(value[1]>='A'&&value[1]<='Z')){
			  //正确输入
			  this.license_no= value.toLocaleUpperCase();
			}else{
			  //输入错误
			  wx.showToast({
				icon: 'none',
				title: '车牌号应为7~8位',
				duration: 1000
			  });
			}
		  }else{
			wx.showToast({
				icon: 'none',
				title: '请输入正确的车牌号',
				duration: 1000
			  });
		  }
		  
		  this.licensePlaceHolder="请输入车牌号";
		},
		brandChange(e){
		  console.log(e.mp.detail.value);
		  if(this.brandIndex != e.mp.detail.value){
			this.brandIndex = e.mp.detail.value;
			if(this.brandIndex>0){
			  this.getSeries(this.brandResList[this.brandIndex-1].id);
			}
			this.cateIndex = 0;
			this.model = '';
		  }
		  
		},
		cateChange(e){
		  console.log(e.mp.detail.value);
		  if(this.cateIndex != e.mp.detail.value){
			this.cateIndex = e.mp.detail.value;
			if(this.cateIndex>0){
			  this.getModels(this.cateResList[this.cateIndex-1].id);
			}
			this.areaIndex = 0;
			this.model = '';
		  }
		  
		},
		areaChange(e){
		  console.log(e.mp.detail.value);
		  if(this.areaIndex != e.mp.detail.value){
			this.areaIndex = e.mp.detail.value;
			if(this.areaIndex>0){
			  this.model = this.areaResIndex[this.areaIndex-1].id;
			}
		  }
		  
		},

		async getBrands(){
		  let res = await getBrands();
		  if(res.code == 200){
			console.log(res.data);
			this.brandResList = res.data;
			let that = this;
			this.brandList = ['请选择品牌'];
			res.data.map(function(item){
			  that.brandList.push(item.name);
			})
		  }
		},

		async getSeries(brand_id){
		  let res = await getSeries(brand_id);
		  if(res.code == 200){
			console.log(res.data);
			this.cateResList = res.data;
			let that = this;
			this.cateList = ['请选择车系'];
			res.data.map(function(item){
			  that.cateList.push(item.name);
			})
		  }
		},

		async getModels(series_id){
		  let res = await getModels(series_id);
		  if(res.code == 200){
			console.log(res.data);
			this.areaResIndex = res.data;
			let that = this;
			this.areaList = ['请选择车型'];
			res.data.map(function(item){
			  that.areaList.push(item.year+" "+item.name);
			})
		  }
		},

		async devices(){
		  this.showModal = true;
		},
		
		closeModal(){
			this.showModal = false;
		},

		async getDevice(device_id){
		  let result = await getDevice();
		  if(result.code == 200){
			if(result.data.length > 0){
			  console.log(result.data[0]);
			  wx.setStorageSync("deviceItem", result.data[0]);
			  this.next(device_id);
			}
		  }
		},

		async activation(){
		  if (this.phone == null || this.phone.length != 11){
			wx.showToast({
			  icon: 'none',
			  title: '手机号输入错误',
			  duration: 1000
			});
			return;
		  }

		   var that = this;

		  if (that.codeText == '发送验证码' && that.codeNum == 60){
				let params = {
				  mobile: this.phone
				}
				let result = await activation(params);
				if(result.code == 200){
				  wx.showToast({
					icon: 'none',
					title: '发送成功',
					duration: 1000
				  });

				  that.interval = setInterval(function () {
					that.codeNum--;
					that.codeText = that.codeNum + 's';
					if (that.codeNum == 0) {
					  that.codeNum = 60;
					  that.codeText = '发送验证码';
					  clearInterval(that.interval);
					}
				  }, 1000);

				}
		  }
		  
		},

	  },

	  onLoad () {
		this.cateList = ['请选择车系'];
		this.areaList = ['请选择车型'];
		var obj = dateTimePicker(this.startYear, this.endYear);
		console.log("obj----------------");
		console.log(obj);
		this.dateTimeArray = obj.dateTimeArray;
		this.dateTime = obj.dateTime;
	  },

	}
</script>

<style >
.container {
  background-color: #F9F9F9;
  width: 100%;
}

.title{
	color: #989898;
	font-size: 26upx;
	padding: 18upx 0upx 14upx 42upx;
	border-bottom: rgba(0,0,0,0.1) solid 2upx;
}

.item_wrap{
	padding: 26upx 28upx 26upx 36upx;
	font-size: 28upx;
	color: rgba(0,0,0,0.4);
	background-color: #FFFFFF;
	border-bottom: rgba(0,0,0,0.1) solid 2upx;
}

.item_input{
  font-size: 30upx;
  color: #515151;
  min-width: 100upx;
}

.zan-panel{
  margin-top: 0upx;
}

.zan-panel-title{
  padding-top: 30upx;
  padding-bottom: 15upx;
  color: #989898;
  font-size: 26upx;
}

.note {
  padding: 10upx;
  font-size: 24upx;
  text-align: center;
  color: #999;
}
#step1 {
  height: 100%;
  height: 100vh;
}


.line{
  color: #D5D5D5;
  background-color: #D5D5D5;
  display: inline-block;
  width: 4upx;
  height: 50upx;
  margin: auto 34upx;
}

.code{
  color: #427DFF;
  font-size: 14px;
}

.phone_code_wrap{
  flex-direction: row;
  align-items: center;
}

.inputClass{
  opacity: 1
}

.picker{
  font-size: 28upx;
  color: #b2b2b2;
}

.place-holder{
  font-size: 28upx;
  color: #b2b2b2;
}

.zan-cell{
  justify-content: space-between;
  height: 94upx;
  line-height: normal;
  box-sizing: border-box;
}

.zan-cell__hd{
  font-size: 28upx;
  color: #000000;
  opacity: 0.3;
}

.arraw{
    width: 18upx;
    height: 18upx;
    border-top: 3upx solid #ADADAD;
    border-right: 3upx solid #ADADAD;
    transform: rotate(45deg);
    margin-left: 10upx;
}

.button{
  margin: 0upx 5%;
  width: 90%;
  height: 94upx;
    line-height: 94upx;
    color: #ffffff;
    background-color: #427DFF;
    border-radius: 10upx;
    text-align: center;
    position: fixed;
	bottom: 30upx;
	font-size: 32upx;
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
  top: 15%;
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
  color: rgba(0,0,0,0.6)
}

.modal-footer {
  display: flex;
  flex-direction: row;
  font-size: 34upx;
}

.btn_wrap{
  width: 80%;
  height: 94upx;
  margin: 20upx 10%;
  background: #427DFF;
  border-radius: 12upx;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: #ffffff;
}

.btn_wrap img{
  width: 44upx;
  height: 44upx;
  margin-right: 12upx;
}

.btn_wrap span{
  font-size: 34upx;
}
.btn_hover{
  background: #0000FF;
}


picker{
  margin-right: 10upx;
  color: rgba(0,0,0,0.7);
  font-size: 30upx;
}

picker div{
	min-width: 100upx;
	text-align: right;
}

.radio_wrap{
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
  font-size: 24upx;
  color: rgba(0,0,0,0.7)
}

/* 未选中的 背景样式 */
radio .wx-radio-input{
   border-radius: 50%;/* 圆角 */
   width: 30upx; /* 背景的宽 */
   height: 30upx; /* 背景的高 */
}
/* 选中后的 背景样式 （红色背景 无边框 可根据UI需求自己修改） */
radio .wx-radio-input.wx-radio-input-checked{
   border: none;
   background: #427DFF;
   padding: 2upx;
}
/* 选中后的 对勾样式 （白色对勾 可根据UI需求自己修改） */
radio .wx-radio-input.wx-radio-input-checked::before{
   border-radius: 50%;/* 圆角 */
   width: 30upx;/* 选中后对勾大小，不要超过背景的尺寸 */
   height: 30upx;/* 选中后对勾大小，不要超过背景的尺寸 */
   line-height: 30upx;
   text-align: center;
   font-size:20upx; /* 对勾大小 30upx */
   color:#fff; /* 对勾颜色 白色 */
   background: transparent;
   transform:translate(-50%, -50%) scale(1);
   -webkit-transform:translate(-50%, -50%) scale(1);
}

</style>