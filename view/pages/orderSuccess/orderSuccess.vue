<template>
	<view class="darkbgbox">
		<view class="formbox">
			<view class="forms">
				<view class="header">金额</view>
				<view class="formin">
					<u-field
						v-model="msg.rentPrice"
						label="租金"
						placeholder="请输入租金"
						:border-bottom="false"
						:field-style="fieldStyle"
					>
					</u-field>
					<u-field
						v-model="msg.depositPrice"
						label="押金"
						placeholder="请输入押金"
						:border-bottom="false"
						:field-style="fieldStyle"
					>
					</u-field>
				</view>
			</view>
		</view>
		<view class="subbtn" @tap="submit">完成</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				orderId:'',
				workId:'',
				msg:{}
			}
		},
		methods: {
			async getmsg(){
				let res = await this.$u.api.userOrderPrice({id:this.orderId});
				if(res.success){
					console.log(res)
					this.msg = res.result
					// this.to('selectShipin/selectShipin',this.form.orderId)
				}
			},
			async submit(){
				let res = await this.$u.api.setPrice({deposit:this.msg.depositPrice,id:this.orderId,rent:this.msg.rentPrice});
				if(res.success){
					// console.log(res)
					// this.to('selectShipin/selectShipin',this.form.orderId)
					 uni.switchTab({  
					     url: '/pages/mine/mine'  
					 });  
				}
			}
		},
		onLoad(options) {
			this.orderId=options.scene;
			this.workId = getApp().globalData.userId; //获取userID
			this.getmsg();
		}
	}
</script>

<style scoped lang="scss">
	.darkbgbox{
		.formbox{
				
			.forms{
				.header{
					// height: 76rpx;
					// line-height: 76rpx;
					font-size: 32rpx;
					font-weight: 500;
					color: #1E1E1E;
					position: relative;
					margin-left: 45rpx;
					padding: 20rpx 0;
					&::before{
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
				.formin{
					width: 100%;
					background: #FFFFFF;
					border-radius: 10rpx;
					padding: 20rpx 0;
					.textareabox{
						margin: 0 auto;
						width: 665rpx;
						padding: 25rpx;
						box-sizing: border-box;
						border: 1rpx solid #ACACAC;
						border-radius: 10rpx;
						font-size: 24rpx;
						font-weight: 500;
						color: #1E1E1E;
						&:placeholder-shown{
							color: #CFCFCF;
						}
						textarea{
							height: 200rpx;
						}
					}
				}
			}
		}
	}
	.subbtn{
		@include button('24rpx','100vw','120rpx');
		margin-top: 137rpx;
		border-radius: 0;
		margin-bottom: 30rpx;
	}
</style>
