<template>
	<view class="darkbgbox">
		<view class="marginContainer">
			<view class="formbox">
				<!-- //女士信息 -->
				<view class="forms" v-for="(item,i) in orders" :key="i">
					<view class="topas">
						<view class="header">订单</view>
						<span class="dele" @tap="openDelTip(i)">删除</span>
					</view>
					<view class="formin">
						<u-form :model="form" ref="uForm" label-width="170" :label-style="labelstyle">
							<u-form-item label="商品类型">
								<u-input v-model="item.type" type="select" @click="clickInput(i)" />
							</u-form-item>
							<view>
								<u-field v-model="item.beginTime" label="开始时间" :disabled="true" @click="clickgetpac(i)" placeholder="请选择预定开始时间"
								 :border-bottom="false" :field-style="fieldStyle">
								</u-field>
							</view>
							<view>
								<u-field v-model="item.endTime" label="结束时间" :disabled="true" @click="clickputpac(i)" placeholder="请选择结束时间"
								 :border-bottom="false" :field-style="fieldStyle">
								</u-field>
							</view>
							<u-form-item label="商品">
								<u-input v-model="item.name" type="select" @click="clickInput2(i)" />
							</u-form-item>
							<!-- 	<u-field
								v-model="form.gName"
								label="商品类型"
								placeholder="请选择类型"
								:border-bottom="false"
								:field-style="fieldStyle"
							>
							</u-field> -->
							</u-field>
							<u-field v-model="item.rentPrice" label="租金" type="number" placeholder="请输入租金" :border-bottom="false" :field-style="fieldStyle">
							</u-field>
							<u-field v-model="item.depositPrice" label="押金" type="number" placeholder="请输入押金" :border-bottom="false" :field-style="fieldStyle">
							</u-field>
						</u-form>
					</view>
				</view>
				<u-select v-model="goodsTypeShow" :list="goodsType" @confirm="confirmGoodsType" ></u-select>
				<u-select v-model="goodsNameShow" :list="goodsName" @confirm="confirmGoodsName"></u-select>
				<u-calendar v-model="getpac" mode="date" @change="getpacchange" max-date="2050-01-01" :safe-area-inset-bottom="true"></u-calendar>
				<u-calendar v-model="putpac" mode="date" @change="putpacchange" max-date="2050-01-01" :safe-area-inset-bottom="true"></u-calendar>
				<view class="btnbox">
					<view class="subbtn" @tap="createOrder">新增</view>
					<view class="subbtn" @tap="openDelTip2">提交</view>
				</view>
			</view>
		</view>

		<u-toast ref="uToast" />
		<u-modal v-model="showDelTip" :mask-close-able="true" title="删除订单" content="是否删除该订单？" @confirm="deleteOrder"></u-modal>
		<u-modal v-model="showDelTip2" :mask-close-able="true" title="提交订单" content="是否提交该订单？" @confirm="formtest"></u-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone: '',
				orderId: '',
				myOrderId:'',
				currindex:'',
				//样式
				fieldStyle: {
					height: '66rpx',
					paddingLeft: '22rpx',
					border: '1rpx solid #CFCFCF',
					borderRadius: '10rpx'
				},
				labelstyle: {
					paddingLeft: '28rpx'
				},
				orders:[],
				showDelTip:false,
				showDelTip2:false,
				delclickVal:'',
				//表单控制
				getpac: false,
				putpac: false,
				goodsTypeShow: false,
				goodsNameShow: false,
				form: {
					goodsType:'',
					goodsName:'',
					status:''
				},
				goodsType: [{
						value: '1',
						label: '化妆师',
					},
					{
						value: '3',
						label: '饰品'
					},
					{
						value: '4',
						label: '礼服'
					}
				],
				goodsName: [],
				AllgoodsName:[]
			}
		},
		methods: {
			clickInput(i){
				this.goodsTypeShow=!this.goodsTypeShow;
				this.currindex = i;
			},
			clickInput2(i){
				this.goodsNameShow=!this.goodsNameShow;
				this.currindex = i;
				this.getGoodsName()
			},
			clickgetpac(i){
				this.getpac = !this.getpac
				this.currindex = i;
			},
			clickputpac(i){
				this.putpac = !this.putpac
				this.currindex = i;
			},
			getpacchange(e){
				console.log(e)
				let index = this.currindex;
				this.orders[index].beginTime = e.result
				// this.getGoodsName()
			},
			putpacchange(e){
				let index = this.currindex;
				this.orders[index].endTime = e.result
				// this.getGoodsName()
			},
			confirmGoodsType(e) {
				let index = this.currindex;
				console.log(e)
				this.orders[index].type = e[0].label;
				this.orders[index].typeval = e[0].value;
				// this.getGoodsName();
				// console.log(e);
			},
			confirmGoodsName(e) {
				let index = this.currindex; 
				this.orders[index].name = e[0].label;
				this.orders[index].ids = e[0].value;
				this.orders[index].rentPrice = e[0].extra;
				console.log(e);
			},
			async getGoodsName(){
				let index = this.currindex;
				let type = this.orders[index].typeval;
				let startTime = this.orders[index].beginTime
				let endTime = this.orders[index].endTime
				let res = await this.$u.api.getGoodsName({type,startTime,endTime});
				this.goodsName = res.result.list
				// this.AllgoodsName = [...this.AllgoodsName,...res.result.list]
				console.log(res)
			},
			openDelTip(i){
				this.showDelTip = true;
				this.delclickVal = i;
			},
			openDelTip2(){
				this.showDelTip2 = true;
			},
			deleteOrder(){
				this.orders.splice(this.delclickVal, 1);
			},
			async formtest(){  //提交
				let map = JSON.parse(JSON.stringify(this.orders));
				for(let item of map){
					item.type = item.type?this.goodsType.filter((res)=>{return res.label == item.type})[0].value:'';
					item.workId = this.myOrderId;
					item.typeId = item.ids;
					//删除没用的参数
					delete item.id;
					delete item.ids;
					delete item.workNmame;
					delete item.createTime;
					delete item.name;
					// item.name = item.name?this.goodsName.filter((res)=>{return res.label == item.name})[0].value:'';
				}
				console.log(map)
				let res = await this.$u.api.addOrder({orderId:this.orderId,orderDetail:JSON.stringify(map)});
				if(res.code==200){
					this.$u.toast(res.message);
					this.getOrders();
				}
			},
			async getOrders(){
				let res = await this.$u.api.getOrders({orderId:this.orderId});
				for(let item of res.result){
					item.type = this.goodsType.filter((res)=>{return res.value == item.type})[0].label;
				}
				this.orders = res.result;
				console.log(res.result)
			},
			createOrder(){
				this.orders.push({})
			}
		},
		
		onLoad(option) {
			this.orderId = option.scene;
			this.myOrderId = getApp().globalData.userId;
			this.getOrders();
		}
	}
</script>

<style scoped lang="scss">
	.darkbgbox {
		.formbox {

			.forms {
				.topas{
					@include flexBetween;
				}
				.header {
					// height: 76rpx;
					// line-height: 76rpx;
					font-size: 32rpx;
					font-weight: 500;
					color: #1E1E1E;
					position: relative;
					margin-left: 45rpx;
					padding: 20rpx 0;

					&::before {
						content: "";
						display: inline-block;
						width: 13rpx;
						height: 35rpx;
						position: absolute;
						left: -20rpx;
						top: 50%;
						transform: translateY(-50%);
						background: $theme-color;
					}
				}
				.dele{
					font-size: 32rpx;
					font-weight: 500;
					color: #abaaaa;
					margin-right: 20rpx;
				}

				.formin {
					width: 100%;
					background: #FFFFFF;
					border-radius: 10rpx;
					padding: 20rpx 0;

					.textareabox {
						margin: 0 auto;
						width: 665rpx;
						padding: 25rpx;
						box-sizing: border-box;
						border: 1rpx solid #ACACAC;
						border-radius: 10rpx;
						font-size: 24rpx;
						font-weight: 500;
						color: #1E1E1E;

						&:placeholder-shown {
							color: #CFCFCF;
						}

						textarea {
							height: 200rpx;
						}
					}
				}
			}
		}
	}
	.btnbox{
		@include flexBetween;
		.subbtn {
			width: 47%;
			@include button('24rpx', '100vw', '120rpx');
			margin: 40rpx auto;
			border-radius: 0;
		}
	}
	
</style>
