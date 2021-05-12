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
						<u-form  label-width="170" :label-style="labelstyle">
							<u-form-item label="饰品分类">
								<u-input v-model="item.type" type="select" @click="clickInput(i)" />
							</u-form-item>
							<u-form-item label="饰品">
								<u-input v-model="item.name" type="select" @click="clickInput2(i)" />
							</u-form-item>
						</u-form>
					</view>
				</view>
				<u-select v-model="goodsTypeShow" :list="typeList" @confirm="confirmGoodsType" ></u-select>
				<u-select v-model="goodsNameShow" :list="goodsName" @confirm="confirmGoodsName"></u-select>
				<view class="subbtn" @tap="createOrder">新增</view>
				<view class="subbtn" @tap="formtest">提交</view>
				<view class="subbtn" @tap="pass">跳过</view>
				
			</view>
		</view>

		<u-toast ref="uToast" />
		<u-modal v-model="showDelTip" :mask-close-able="true" title="删除订单" content="是否删除该订单？" @confirm="deleteOrder"></u-modal>
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
				typeList:[],
				showDelTip:false,
				delclickVal:'',
				//表单控制
				goodsTypeShow: false,
				goodsNameShow: false,
				goodsName: [],
				AllgoodsName:[]
			}
		},
		methods: {
			to(url,scene){
				uni.navigateTo({
					url: "/pages/" + url + "?scene=" + scene
				})
			},
			clickInput(i){
				this.goodsTypeShow=!this.goodsTypeShow;
				this.currindex = i;
			},
			clickInput2(i){
				this.goodsNameShow=!this.goodsNameShow;
				this.currindex = i;
				// this.getGoodsName()
			},
			confirmGoodsType(e) {
				let index = this.currindex;
				this.orders[index].type = e[0].label;
				this.orders[index].partitions = e[0].value;
				this.getGoodsName(e[0].value);
				// console.log(e);
			},
			confirmGoodsName(e) {
				let index = this.currindex; 
				this.orders[index].name = e[0].label;
				this.orders[index].selid = e[0].value;
				// console.log(e);
			},
			async getGoodsName(partitionFirId){
				let id = this.orderId;
				let goodsName = [];
				let res = await this.$u.api.getOrnaments({id,partitionFirId});
				for(let item of res.result){
					goodsName.push({
						value:item.id,
						label:item.ornamentsName
					})
				}
				this.goodsName = goodsName
				// this.AllgoodsName = [...this.AllgoodsName,...res.result.list]
				console.log(res)
			},
			openDelTip(i){
				this.showDelTip = true;
				this.delclickVal = i;
			},
			deleteOrder(){
				this.orders.splice(this.delclickVal, 1);
			},
			async formtest(){  //提交
				let map = JSON.parse(JSON.stringify(this.orders));
				
				console.log(map)
				let res = await this.$u.api.setOrnaments({orderId:this.orderId,workId:this.myOrderId,userOrderShipinBean:JSON.stringify(map)});
				if(res.code==200){
					this.$u.toast(res.message);
					// this.getOrders();
					this.to('orderSuccess/orderSuccess',this.orderId)
				}
			},
			pass(){
				this.to('orderSuccess/orderSuccess',this.orderId)
			},
			async getListfq(){  //获取饰品分区
				let res = await this.$u.api.getProject({type:8});
				let typeList = [];
				for(let item of res.result){
					typeList.push({
						value:item.id,
						label:item.name
					})
				}
				this.typeList = typeList;
			},
			async getOrnamentOrder(){
				let res = await this.$u.api.getOrnamentOrder({id:this.orderId});
				if(res.code==200){
					for(let item of res.result){
						this.orders.push({
							type:item.partitionName,
							name:item.ornamentsName,
							partitions:item.partitions,
							selid:item.fullDressId
						})
					}
					
				}
			},
			createOrder(){
				this.orders.push({})
			}
		},
		
		onLoad(option) {
			this.orderId = option.scene;
			this.myOrderId = getApp().globalData.userId;
			this.getListfq();
			this.getOrnamentOrder();
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
	.subbtn {
		width: 47%;
		@include button('24rpx', '100vw', '120rpx');
		margin: 40rpx auto;
		border-radius: 0;
	}
	
</style>
