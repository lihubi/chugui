<template>
	<view class="darkbgbox">
		<view class="marginContainer">
			<u-field v-model="form.phone" label="手机号" :field-style="fieldStyle" :focus="true" placeholder="请填写手机号">
				<u-button size="mini" slot="right" type="default" @click="getCode">查询</u-button>
			</u-field>
			<view class="formbox" v-if="showform">
				<!-- //女士信息 -->
				<view class="forms">
					<view class="header">女士信息</view>
					<view class="formin">
						<u-field
							v-model="form.gname"
							label="女士姓名"
							placeholder="请输入女士姓名"
							:border-bottom="false"
							:field-style="fieldStyle"
						>
						</u-field>
						<u-field
							v-model="form.gphone"
							label="女士电话"
							type="number"
							placeholder="请输入女士电话"
							:border-bottom="false"
							:field-style="fieldStyle"
							
						>
						</u-field>
						<u-field
							v-model="form.gwx"
							label="女士微信"
							placeholder="请输入女士微信"
							:border-bottom="false"
							:field-style="fieldStyle"
						>
						</u-field>
					</view>
				</view>
				<!-- //男士信息 -->
				<view class="forms">
					<view class="header">男士信息</view>
					<view class="formin">
						<u-field
							v-model="form.bname"
							label="男士姓名"
							placeholder="请输入男士姓名"
							:border-bottom="false"
							:field-style="fieldStyle"
						>
						</u-field>
						<u-field
							v-model="form.bphone"
							label="男士电话"
							type="number"
							placeholder="请输入男士电话"
							:border-bottom="false"
							:field-style="fieldStyle"
							
						>
						</u-field>
						<u-field
							v-model="form.bwx"
							label="男士微信"
							placeholder="请输入男士微信"
							:border-bottom="false"
							:field-style="fieldStyle"
						>
						</u-field>
					</view>
				</view>
				<!-- //婚礼地点 -->
				<view class="forms">
					<view class="header">婚礼地点</view>
					<view class="formin">
						<u-field
							v-model="form.address"
							label="婚礼地点"
							placeholder="请输入婚礼地点"
							:border-bottom="false"
							:field-style="fieldStyle"
						>
						</u-field>
					</view>
				</view>
				<!-- //取还件时间-->
				<!-- <view class="forms">
					<view class="header">取还件时间</view>
					<view class="formin">
						<view>
							<u-field
								v-model="form.startTime"
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
					</view>
				</view> -->
				<!-- //备注-->
	<!-- 			<view class="forms">
					<view class="header">备注</view>
					<view class="formin">
						<view class="textareabox">
							<textarea v-model="form.remarks" value=""  placeholder="请输入详细说明" />
						</view>
					</view>
				</view> -->
				<!-- <view class="subbtn" @tap="formtest">确认录入</view> -->
				<view class="subbtn" @tap="formtest">下一步</view>
			</view>
		</view>
		
		<u-toast ref="uToast" />
		<u-modal v-model="showDelTip2" :mask-close-able="true" title="提示" content="该手机号一定是微信小程序授权的手机号否则无法查到订单" @confirm="createdd"></u-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
				showDelTip2:'',
				showform:false,
				//start表单数据
				form:{
					phone:'',
					bname:'',
					bphone:'',
					bwx:'',
					gname:'',
					gphone:'',
					gwx:'',
					// remarks:'',
					userid:'',
					// startTime:'',
					// endTime:'',
					address:'',
				},
				//end表单数据
				getpac:false,
				putpac:false,
				fieldStyle:{
					height:'66rpx',
					paddingLeft:'22rpx',
					border: '1rpx solid #CFCFCF',
					borderRadius: '10rpx'
				}
			}
		},
		methods: {
			formtest(){
				// 判断男女信息是否填写
				let manNum = false;
				let womanNum = false;
				if(this.form.gname&&this.form.gphone&&this.form.gwx){
					womanNum = true;
				}
				if(this.form.bname&&this.form.bphone&&this.form.bwx){
					manNum = true;
				}
				if(!(womanNum||manNum)){
					this.$refs.uToast.show({
						title: '请填写完整信息',
						type: 'error',
					})
				}else{
					if(this.form.bphone){
						if(!this.$u.test.mobile(this.form.bphone)){
							this.$refs.uToast.show({
								title: '男士电话格式错误',
								type: 'error',
							})
							return false;
						}
					}
					if(this.form.gphone){ 
						if(!this.$u.test.mobile(this.form.gphone)){
							this.$refs.uToast.show({
								title: '女士电话格式错误',
								type: 'error',
							})
							return false;
						}
					}
					console.log("submit")
					this.submit();
				}
				
			},
			getpacchange(e) {
				console.log(e);
				this.form.startTime = e.result
			},
			putpacchange(e) {
				console.log(e);
				this.form.endTime = e.result
			},
			createdd(){
				this.showform = true;
			},
			async getCode(){
				
				this.showform = false;
				let phone = this.form.phone;
				this.form = {phone};
				let res = await this.$u.api.getUserId({phone});
				// this.form = {phone:this.form.phone};
				if(res.result.success=='true'){
					if(res.result.userOrder){
						this.form = res.result.userOrder
							if(res.result.userOrderDetailList){
								this.form.userOrderDetaihuazhuang = res.result.userOrderDetaihuazhuang
								this.form.userOrderDetailList = res.result.userOrderDetailList
								this.form.userOrderDetaishipin = res.result.userOrderDetaishipin
							}
							
					}
				this.createdd();
					
				}else{
					this.showDelTip2 = true;
				}
				
			},
			async submit(){
				this.form.workId = getApp().globalData.userId; //获取userID
				let res = await this.$u.api.submitOrder(this.form);
				// vm.$u.toast(res.message);
				console.log(res);
				
				this.to("orderEntry2/orderEntry2",JSON.stringify(this.form),res.message);
			},
			to(url,scene,id){
				uni.navigateTo({
					url: "/pages/" + url + "?scene=" + scene + "&id=" + id
				})
			},
		},
		onLoad(option) {
			
		},
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
