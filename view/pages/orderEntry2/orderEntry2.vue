<template>
	<view class="darkbgbox">
		<view class="marginContainer">
			<view class="formbox">
				<!-- //取还件时间-->
				<view class="forms">
					<view class="header">日期录入</view>
					<view class="formin">
						<view>
							<u-field
								v-model="form.pickupTime"
								label="取件时间"
								:disabled="true"
								@click="getpac = !getpac"
								placeholder="请选择取件时间"
								:border-bottom="false"
								:field-style="fieldStyle"
							>
							</u-field>
							<u-calendar v-model="getpac" mode="date" @change="getpacchange" max-date="2050-01-01" :safe-area-inset-bottom="true"></u-calendar>
						</view>
						<view>
							<u-field
								v-model="form.endTime"
								label="还件时间"
								:disabled="true"
								@click="putpac = !putpac"
								placeholder="请选择还件时间"
								:border-bottom="false"
								:field-style="fieldStyle"
							>
							</u-field>
							<u-calendar v-model="putpac" mode="date" @change="putpacchange" max-date="2050-01-01" :safe-area-inset-bottom="true"></u-calendar>
						</view>
						<view>
							<u-field
								v-model="form.marryTime"
								label="婚礼日期"
								:disabled="true"
								@click="wedpac = !wedpac"
								placeholder="请选择婚礼日期"
								:border-bottom="false"
								:field-style="fieldStyle"
							>
							</u-field>
							<u-calendar v-model="wedpac" mode="date" @change="wedpacchange" max-date="2050-01-01" :safe-area-inset-bottom="true"></u-calendar>
						</view>
					</view>
				</view>
				<!-- <view class="subbtn" @tap="formtest">确认录入</view> -->
				<view class="subbtn" @tap="submit">下一步</view>
			</view>
		</view>
		
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone:'',
				//start表单数据
				form:{
				id:'',
				pickupTime:'',
				endTime:'',
				marryTime:''
				},
				//end表单数据
				getpac:false,
				putpac:false,
				wedpac:false,
				fieldStyle:{
					height:'66rpx',
					paddingLeft:'22rpx',
					border: '1rpx solid #CFCFCF',
					borderRadius: '10rpx'
				},
				userOrderDetailList:'',
				userOrderDetaihuazhuang:'',
				userOrderDetaishipin:'',
			}
		},
		methods: {
			
			getpacchange(e) {
				console.log(e);
				this.form.pickupTime = e.result
			},
			putpacchange(e) {
				console.log(e);
				this.form.endTime = e.result
			},
			wedpacchange(e) {
				console.log(e);
				this.form.marryTime = e.result
			},
	
		
			async submit(){
				let res = await this.$u.api.submitOrder2(this.form);
				// vm.$u.toast(res.message);
				console.log(res);
				if(this.userOrderDetailList=='1'){
					this.to("selectPartition/selectPartition",this.form.id); //跳选择礼服
				}else if(this.userOrderDetailList=='0'){
					this.to("selectlifu/selectlifu",this.form.id);
				}else{
					this.to("selectPartition/selectPartition",this.form.id); //跳选择礼服
				}
				
			},
			to(url,scene){
				uni.navigateTo({
					url: "/pages/" + url + "?scene=" + scene
				})
			},
		},
		onLoad(option) {
			let datas = JSON.parse(option.scene)
			this.form.id = option.id;
			this.form.endTime = datas.endTime;
			this.form.marryTime = datas.marryTime;
			this.form.pickupTime = datas.pickupTime;
			this.userOrderDetailList = datas.userOrderDetailList;
			this.userOrderDetaihuazhuang = datas.userOrderDetaihuazhuang;
			this.userOrderDetaishipin = datas.userOrderDetaishipin;
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
