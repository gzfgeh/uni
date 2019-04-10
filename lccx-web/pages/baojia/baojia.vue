<template>
    <div class="container_wrap container-fill">
  
    
	  <image src="../../static/img/baojia.png" class="head_img" />

	  <div class="content_wrap">
		<div class="content_item" style="border-bottom: 2upx solid #f3f3f3;">
		  <span class="text">投保地区</span>
		  <div class="row_item" @click="showMulLinkageTwoPicker">
			<span>{{pickerText}}</span>
			<span class="arraw"></span>
		  </div>
		</div>

		<div class="content_item">
		  <span class="text">车牌号</span>
		  <div class="uni-inline-item">
			  <span @tap="showKeyBoard">{{activeText}}</span>
			  <image :src="activeImg" @tap="showKeyBoard"></image>
			  <input type="text" placeholder="请输入车牌号" v-model="license_no"
				placeholder-class="place-holder" @blur="watchInput">
		  </div>
		  
		</div>

	  </div>

	  <button class="button btn-primary abs" hover-class="button-hover" @tap="quotation">
		  下一步
	  </button>
	  
	  <button class="button_contact btn-primary abs" hover-class="button-hover" @tap="callPhone">
	  		  客服热线：400-088-0329
	  </button>
	  
	  <mpvue-picker :themeColor="themeColor" ref="mpvuePicker" :mode="mode" :deepLength="deepLength" :pickerValueDefault="pickerValueDefault"
	   @onConfirm="onConfirm" @onCancel="onCancel" :pickerValueArray="pickerValueArray"></mpvue-picker>
	  
	  
	  <div class="mask_dialog" @tap="hideKeyBoard" v-if="isShowKeyBoard"></div>
	  <div class="bottom_keyboard" v-if="isShowKeyBoard">
		  <div class="keyboard_one_wrap">
			  <span v-for="(item, index) in keyboardOne" :key="index" @tap="selectItem(item)"
			  :class="{active: (item == activeText)}">
				  {{item}}
			  </span>
		  </div>
		  <div class="keyboard_one_wrap" style="padding-left: 66upx;">
			  <span v-for="(item, index) in keyboardTwo" :key="index" @tap="selectItem(item)"
			  :class="{active: (item == activeText)}">
			  				  {{item}}
			  </span>
		  </div>
		  <div class="keyboard_one_wrap" style="padding-left: 100upx;">
			  <span v-for="(item, index) in keyboardThree" :key="index" @tap="selectItem(item)"
			  :class="{active: (item == activeText)}">
			  				  {{item}}
			  </span>
		  </div>
		  <div class="keyboard_one_wrap" style="padding-left: 136upx;">
			  <span v-for="(item, index) in keyboardFour" :key="index" @tap="selectItem(item)"
			  :class="{active: (item == activeText)}">
			  				  {{item}}
			  </span>
		  </div>
	  </div>

		<!--弹窗-->
		<div class="modal-mask" @tap="hideModal" v-if="showModal"></div>
		  <div class="modal-dialog" v-if="showModal">
		  <div class="modal-title">您有1条未完成的报价</div>
		  <div class="modal-content">
		    是否查看未完成报价订单？
		  </div>
		  <div class="modal-footer" >
		    <div class="btn_wrap" @click="closeModal">
		      <span>是</span>
		    </div>
			
			<div class="no_btn_wrap" @click="closeModal">
			  <span>否</span>
			</div>
			
		  </div>
		</div>
		
	</div>
</template>

<script>
    import service from '../../service.js';
    import mInput from '../../components/m-input.vue';
	import mpvuePicker from '../../components/mpvue-picker/mpvuePicker.vue';
	import cityData from '../../common/city.data.js';
	
	import { BASE_IMAGE_URL,quotations,H5login} from "@/utils/api";

    export default {
        components: {
            mInput,
			mpvuePicker
        },
        data() {
            return {
                keyboardOne: ['京','沪','苏','浙','皖','辽','赣','鲁','豫','鄂'],
                keyboardTwo: ['湘','粤','贵','津','冀','晋','蒙','闽','吉'],
                keyboardThree: ['琼','渝','川','桂','云','藏','陕','甘'],
                keyboardFour: ['青','黑','宁','新','港','澳','台'],
				isShowKeyBoard: false,
				activeText: "陕",
				activeImg: "../../static/img/arrow_down_icon.png",
				pickerValueDefault:[0],
				mode: '',
				deepLength: 1,
				themeColor: '#007AFF',
				mulLinkageTwoPicker: cityData,
				pickerData: [
						  {code: 610100, value:'西安市'},
						  {code: 610200, value:'铜川市'},
						  {code: 610300, value:'宝鸡市'},
						  {code: 610400, value:'咸阳市'},
						  {code: 610500, value:'渭南市'},
						  {code: 610600, value:'延安市'},
						  {code: 610700, value:'汉中市'},
						  {code: 610800, value:'榆林市'},
						  {code: 610900, value:'安康市'},
						  {code: 611000, value:'商洛市'},

						  {code: 450100, value:'南宁市'},
						  {code: 450200, value:'柳州市'},
						  {code: 450300, value:'桂林市'},
						  {code: 450400, value:'梧州市'},
						  {code: 450500, value:'北海市'},
						  {code: 450600, value:'防城港市'},
						  {code: 450700, value:'钦州市'},
						  {code: 450800, value:'贵港市'},
						  {code: 450900, value:'玉林市'},
						  {code: 451000, value:'百色市'},
						  {code: 451100, value:'贺州市'},
						  {code: 451200, value:'河池市'},
						  {code: 451300, value:'来宾市'},
						  {code: 451400, value:'崇左市'}
				  ],
				  pickerValueArray: [['陕西省', '广西省'],
						[
						  '西安市',
						  '铜川市',
						  '宝鸡市',
						  '咸阳市',
						  '渭南市',
						  '延安市',
						  '汉中市',
						  '榆林市',
						  '安康市',
						  '商洛市'
						]
					  
					],
				  pickerValueIndex: [0, 0],
				  pickerText: '',
				  pickerCode: 610100,
				  showModal: false,
				  license_no: '',
				  city_name: '西安'
	  
            }
        },
		watch: {
			isShowKeyBoard(curVal, oldVal){
				this.activeImg = oldVal ? BASE_IMAGE_URL+"arrow_down_icon.png"
					: BASE_IMAGE_URL+"arrow_up_icon.png";
			}
		},
        methods: {
			showKeyBoard(){
				this.isShowKeyBoard = true;
			},
			hideKeyBoard(){
				this.isShowKeyBoard = false;
			},
			selectItem(item){
				this.activeText = item;
				this.isShowKeyBoard = false;
			},
			// 二级联动选择
			showMulLinkageTwoPicker() {
				this.pickerValueArray = this.mulLinkageTwoPicker
				this.mode = 'multiLinkageSelector'
				this.deepLength = 2
				this.pickerValueDefault = [0, 0]
				this.$refs.mpvuePicker.show()
			},
			onConfirm(e) {
				console.log(e);
				this.pickerCode = e.value[1];
				this.city_name = e.label.split("-")[1];
				this.pickerText = this.city_name;
				this.activeText = e.index[0] == 1 ? '桂' : '陕';
			},
			onCancel(e){
				
			},
			
			async H5login(){
				let params = {
					partner_id: uni.getStorageSync("partner_id"),
					imei: uni.getStorageSync("imei")
				};
				
				let res = await H5login(params);
				if(res.code == 200){
					let token = res.data.token;
					console.log(token);
					if(token){
						uni.setStorageSync('token', token);
					}
					
				}
			},
			
			callPhone(){
				window.location.href = "tel:4000880329";
			},
			watchInput: function(e){
				console.log(e.mp.detail.value);
				let value = e.mp.detail.value;
				this.license_no = this.license_no.toLocaleUpperCase();
				if(value.length != 6){
				  wx.showToast({
					icon: 'none',
					title: '请输入正确的车牌号',
					duration: 1000
				  });
				  return;
				}
				
				let temp = value.substring(0, 1);
				 let p = /[a-z]/i;
				if(!p.test(temp)){
				  wx.showToast({
					icon: 'none',
					title: '请输入正确的车牌号',
					duration: 1000
				  });
				}
				
			  },
			next(id){
				uni.navigateTo({
				  url: "../user/user?license_no="+(this.activeText+this.license_no)+"&id="+id
				})
			},
			async quotation(){
				let that = this;
				this.license_no = this.license_no.toLocaleUpperCase();
				if((this.license_no.length != 6) && (this.license_no.length != 7)){
				  wx.showToast({
					icon: 'none',
					title: '请输入正确的车牌号',
					duration: 1000
				  });
				  return;
				}

				let temp = this.license_no.substring(0, 1);
				 let p = /[a-z]/i;
				if(!p.test(temp)){
				  wx.showToast({
					icon: 'none',
					title: '请输入正确的车牌号',
					duration: 1000
				  });
				  return;
				}

				let params = {
				  city: that.pickerCode,
				  license_no: this.activeText+this.license_no,
				  city_name: this.city_name
				};
				

				let res = await quotations(params);
				if(res.code == 200){
				  console.log(res);
				  params.quotation_id = res.data.id;
				  uni.setStorageSync("global", params);
				  that.next(params.quotation_id);
				}else{
				  uni.showToast({
					icon: 'none',
					title: res.msg,
					duration: 1000
				  });
				}
			  },
			
            
        },
		
		onLoad () {
			this.pickerText = this.pickerValueArray[1][this.pickerValueIndex[1]];
			this.H5login();
		},
  
    }
</script>

<style>
	.container_wrap {
  background-color: #FFFFFF;
  width: 100%;
}
.head_img{
  width: 100%;
  height: 626upx;
}

.content_wrap{
  width: 90%;
  margin: -180upx 5% 0upx;
  height: 332upx;
  background-color: #FFFFFF;
  border-radius: 20upx;
  box-shadow: 0upx 0upx 20upx 0upx #EAEAEA;
  padding: 0upx 16upx;
  box-sizing: border-box;
  position: relative;
  z-index: 1;
}

.content_item{
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #000000;
  font-size: 34upx;
  height: 166upx;
  padding: 0upx 24upx;
}

.content_item .text{
    color: #427DFF;
    font-size: 24upx;
	margin-bottom: 10upx;
  }
  
  .content_item image{
	  width: 16upx;
	  height: 12upx;
	  margin-left: 10upx;
	  margin-right: 10upx;
  }

.row_item{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.arraw{
    width: 18upx;
    height: 18upx;
    border-top: 6upx solid #D9D9D9;
    border-right: 6upx solid #D9D9D9;
    transform: rotate(45deg);
    margin-left: 10upx;
  }

  .place-holder{
  font-size: 28upx;
  color: #b2b2b2;
}

.button{
  margin: 40upx 5%;
  width: 90%;
  height: 94upx;
	line-height: 94upx;
	color: #ffffff;
	background-color: #427DFF;
	border-radius: 10upx;
	text-align: center;
	position: absolute;
	bottom: 108upx;
	font-size: 32upx;
}

.button_contact{
  margin: 40upx 5%;
  width: 90%;
  height: 94upx;
	line-height: 94upx;
	color: #427DFF;
	background-color: rgba(0,0,0,0);
	border-radius: 10upx;
	text-align: center;
	position: absolute;
	bottom: 0upx;
	border: 2upx solid #427DFF;
	font-size: 32upx;
}

.bottom_keyboard{
	position: fixed;
	bottom: 0upx;
	width: 100%;
	height: 394upx;
	background-color: #E5E5E7;
	color: #0A0A0A;
	font-size: 34upx;
	z-index: 100;
	padding-top: 22upx;
	box-sizing: border-box;
}

.bottom_keyboard span{
	width: 60upx;
	height: 80upx;
	line-height: 80upx;
	text-align: center;
	border-radius: 8upx;
	background-color: #FFFFFF;
	margin-right: 10upx;
	display: inline-block;
	
}

.bottom_keyboard span:nth-last-child(1){
	margin-right: 0upx;
}

.keyboard_one_wrap{
	padding: 0upx 30upx;
	margin-bottom: 10upx;
}

.active{
	color: #FFFFFF;
	background-color: #427DFF!important;
}

	
.mask_dialog{
	position: fixed;
	top: 0upx;
	left: 0upx;
	width: 100%;
	height: 100%;
	z-index: 10;
	background-color: rgba(0,0,0,0);
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
  background: #427DFF;
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

</style>
