<template>
	<div class="contain">
		
		<div class="header uni-between-item">
			
			<div class="brand_wrap">
				<img src="../../static/img/baoxian_icon.png" >
				<span>大地车险</span>
			</div>
			
			<div class="price">
				<span>40元/月+0.07元/公里</span>
				<span class="name">交强险 650元+车船税 320元</span>
			</div>
			
		</div>
		
		<div class="address_wrap uni-between-item">
			<span>投保地区</span>
			<span>上海市静安区</span>
		</div>
		
		<div class="title uni-between-item">
			<span>商业险</span>
			<span class="change">调整</span>
		</div>
		
		<div class="content_wrap">
			<div class="content_item uni-between-item">
				<div>
					<span>机动车损失险</span>
					<span class="tag">不计免赔</span>
				</div>
				
				<div>投保</div>
			</div>
			
			<div class="content_item uni-between-item">
				<div>
					<span>第三者责任险</span>
					<span class="tag">不计免赔</span>
				</div>
				
				<div>150万</div>
			</div>
			
			<div class="content_item uni-between-item">
				<span>司机责任险</span>
				<div>150万</div>
			</div>
			
			<div class="content_item uni-between-item">
				<span>乘客责任险</span>
				<div>150万</div>
			</div>
			
			
		</div>
		
		
		<div class="title uni-between-item">
			<span>车主信息</span>
		</div>
		
		<div class="content_wrap">
			<div class="content_item uni-between-item">
				<span>姓名</span>
				
				<div>投保</div>
			</div>
			
			<div class="content_item uni-between-item">
				<span>手机号</span>
				
				<div>150万</div>
			</div>
			
			<div class="content_item uni-between-item">
				<span>身份证号</span>
				<div>150万</div>
			</div>
		</div>
		
		<div class="title uni-between-item">
			<span>车辆信息</span>
		</div>
		
		<div class="content_wrap" style="border-bottom: 2upx solid rgba(0,0,0,0.1); padding-bottom: 60upx;">
			<div class="content_item uni-between-item">
				<span>车牌号码</span>
				
				<div>投保</div>
			</div>
			
			<div class="content_item uni-between-item">
				<span>品牌型号</span>
				
				<div>150万</div>
			</div>
			
			<div class="content_item uni-between-item">
				<span>车辆识别代码</span>
				<div>150万</div>
			</div>
			
			<div class="content_item uni-between-item">
				<span>发动机号码</span>
				
				<div>150万</div>
			</div>
			
			<div class="content_item uni-between-item">
				<span>注册日期</span>
				<div>150万</div>
			</div>
			
		</div>
		
		<div class="license">
			<radio  :checked="true" color="#427DFF">我已阅读并同意</radio>

			<text class="link">《保险条款》</text>
		  </div>


		  <div class=" button" >我要投保</div>
  
		
	</div>
</template>

<script>
</script>

<style>
	.contain{
		width: 100%;
	}
	.header{
		margin-top: 60upx;
		width: 100%;
		padding: 0upx 40upx;
		box-sizing: border-box;
	}
	.brand_wrap{
		display: flex;
		flex-direction: column;
	}
	
	.brand_wrap img{
		width: 124upx;
		height: 34upx;
	}
	
	.brand_wrap span{
		color: #000000;
		font-size: 32upx;
	}
	
	.price {
	  color: #f00;
	  font-size: 32upx;
	  text-align: right;
	  display: flex;
	  flex-direction: column;
	  
	}
	.price .name{
		font-size: 28upx;
		color: #BBBBBB;
	  }
	  
	  .address_wrap{
		  width: 100%;
		  box-sizing: border-box;
		  padding: 40upx;
		  font-size: 30upx;
		  color: #676767;
	  }
	  
	  .title {
		  border-left: #427DFF 10upx solid;
		  padding: 0upx 30upx;
		  font-size: 34upx;
		  color: #3D3D3D;
		  font-weight: 600;
		  background-color: #F9F9F9;
		  height: 70upx;
		  line-height: 70upx;
		  box-sizing: border-box;
		}
		
		.change {
  text-align: right;
  color: #427DFF;
  font-size: 28upx;
}

.content_wrap{
	width: 100%;
	box-sizing: border-box;
	background-color: #FFFFFF;
	padding: 10upx 40upx 30upx;
	font-size: 30upx;
	color: #676767;
}

.content_item{
	margin-top: 10upx;
}

.content_item .tag{
	font-size: 20upx;
	color: #FF4242;
	background-color: #FFF2EC;
	border-radius: 6upx;
	padding: 0upx 10upx;
	margin-left: 32upx;
}

.license {
  padding: 20upx 40upx 0upx;
  border-top: 1upx solid #E4E4E4;
}

.link{
  color: #427DFF;
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
  box-sizing: border-box;
    
}

checkbox .wx-checkbox-input{
   border-radius: 50%;/* 圆角 */
   width: 30upx; /* 背景的宽 */
   height: 30upx; /* 背景的高 */
}
/* 选中后的 背景样式 （红色背景 无边框 可根据UI需求自己修改） */
checkbox .wx-checkbox-input.wx-checkbox-input-checked{
   border: none;
   background: #427DFF;
   padding: 3upx;
}
/* 选中后的 对勾样式 （白色对勾 可根据UI需求自己修改） */
checkbox .wx-checkbox-input.wx-checkbox-input-checked::before{
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
