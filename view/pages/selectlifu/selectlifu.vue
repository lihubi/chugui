<template>
	<view class="darkbgbox">
		<view class="marginContainer">
			<view class="formbox">
				<!-- //女士信息 -->
				<view class="forms" v-for="(item,i) in orders" :key="i">
					<view class="topas">
						<view class="header">订单{{i+1}}</view>
					</view>
					<view class="formin">
						<u-form :model="form" ref="uForm" label-width="170" :label-style="labelstyle">
							<u-form-item label="分区" v-if="item.partitionFirMame">
								<u-input v-model="item.partitionFirMame" type="text" disabled />
							</u-form-item>
							<u-form-item label="子分区" v-if="item.partitionSecMame">
								<u-input v-model="item.partitionSecMame" type="text" disabled />
							</u-form-item>
							<u-form-item label="礼服">
								<u-input v-model="item.fullName" type="select" @click="clickInput2(i)" />
								<u-select v-model="item.isShow" :list="item.goodList" @confirm="confirmGoodsType" ></u-select>
							</u-form-item>
						</u-form>
					</view>
				</view>
				<view class="btnbox">
					<view class="subbtn" @tap="pass">跳过</view>
					<view class="subbtn" @tap="formtest">提交</view>
				</view>
				<view class="btnbox">
					<view class="subbtn" @tap="tofq">选择分区</view>
				</view>
			</view>
		</view>

		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				currValue:'',
				orderId:'',
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
			}
		},
		methods: {
			to(url,scene){
				uni.navigateTo({
					url: "/pages/" + url + "?scene=" + scene
				})
			},
			tofq(){
				uni.redirectTo({
				  url: '/pages/selectPartition/selectPartition?scene=' + this.orderId
				})
			},
			clickInput2(i){
				console.log(i)
				this.currValue = i
				this.$set(this.orders[i],'isShow',!this.orders[i].isShow)
				
			},
			confirmGoodsType(e){
				this.orders[this.currValue].fullName = e[0].label
				this.orders[this.currValue].fullId = e[0].value
					console.log(e)
			},
			async getfullDress3(id,partitionFirId,partitionSecId){
				let res = await this.$u.api.getfullDress3({id,partitionFirId,partitionSecId});
				let res2 = []
				for(let item of res.result){
					res2.push({
						label:item.fullName,
						value:item.id
					})
				}
				return res2;
			},
			
			async formtest(){  //提交
				let map = []
				for(let item of this.orders){
					map.push({
						id:item.id,
						partitionTypeId:item.partitionTypeId,
						partitions:item.partitions,
						selid:item.fullId
					})
				}
		
				console.log(map)
				let res = await this.$u.api.setfullDress3({userOrderBean:JSON.stringify(map)});
				if(res.code==200){
					this.to("selectDresser/selectDresser",this.orderId);
				}
				
			},
			async getOrders(){
				let res = await this.$u.api.getOrders22({orderId:this.orderId});
				this.orders = res.result;
				this.orders.forEach((item,i) => {
					this.getfullDress3(item.id,item.partitions,item.partitionTypeId).then((res) => {
						item.goodList = res
					})
				})
				// console.log(this.orders)
			},
			pass(){
				this.to("selectDresser/selectDresser",this.orderId);
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
