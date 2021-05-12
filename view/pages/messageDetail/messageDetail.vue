<template>
	<view>
		<view class="msgbox">
			订单发生变化
		</view>
		<view class="orderbox">
			<view class="orders" v-for="(item,i) in detail" :key="i">
				<view> <span class="justy">订单编号</span> <span class="jusad">:</span> <span>{{item.id}}</span></view>
				<view> <span class="justy">商品类型</span> <span class="jusad">:</span> <span>{{item.type|type}}</span></view>
				<view> <span class="justy">商品名称</span> <span class="jusad">:</span> <span>{{item.name}}</span></view>
				<view> <span class="justy">租金</span> <span class="jusad">:</span> <span>{{item.rentPrice}}</span></view>
				<view> <span class="justy">押金</span> <span class="jusad">:</span> <span>{{item.depositPrice}}</span></view>
				<view> <span class="justy">开始时间</span> <span class="jusad">:</span> <span>{{item.beginTime}}</span></view>
				<view> <span class="justy">结束时间</span> <span class="jusad">:</span> <span>{{item.endTime}}</span></view>
			</view>
		</view>
		<view class="btnbox" v-if="status==1">
			<view class="subbtn" @tap="agree">同意</view>
			<view class="subbtn" @tap="refuse">拒绝</view>
		</view>
		<view class="jgbox" v-if="status==0">  
		<!-- //同意 -->
			<view>已同意</view>
		</view>
		<view class="jgbox" v-if="status==2">
			<!-- 拒绝 -->
			<view>已拒绝</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				orderTempId:'',
				detail:[],
				status:''
			}
		},
		methods: {
			async getmsg(){
				let orderTempId = this.orderTempId;
				let res = await this.$u.api.messageDetail({orderTempId});
				this.detail = res.result;
			},
			async agree(){
				let orderTempId = this.orderTempId;
				let res = await this.$u.api.changeAgree({orderTempId,status:'0'});
				uni.navigateBack();
				
			},
			async refuse(){
				let orderTempId = this.orderTempId;
				let res = await this.$u.api.changeAgree({orderTempId,status:'2'});
				uni.navigateBack();
			}
		},
		filters:{
			type(data){
				if(data==1){
					return "化妆师"
				}else if(data==3){
					return "饰品"
				}else if(data==4){
					return "礼服"
				}else{
					return data
				}
			}
		},
		onLoad(option) {
			this.orderTempId = option.scene;
			this.status = option.status;
			this.getmsg();
		}
	}
</script>

<style scoped lang="scss">
	.msgbox{
		text-align: center;
	}
	.orderbox{
		width: 90vw;
		margin: 0 auto;
		color: #333;
		.orders{
			padding: 20rpx 0;
			border-bottom: 1rpx solid #ddd;
			
			.justy{
				display: inline-block;
				width: 120rpx;
				text-align: justify;
				text-justify: distribute-all-lines;
				text-align-last: justify;
				vertical-align:top;
				overflow:hidden; 
				height: 1.2em;
				&::after {
					content: "";
					display: inline-block;
					width: 100%;
					height: 0;
				}
			}
			.jusad{
				margin: 0 10rpx;
			}
		}
	}
	.btnbox{
		@include flexBetween;
		.subbtn {
			width: 47%;
			@include button('24rpx', '100vw', '120rpx');
			margin: 40rpx auto;
		}
	}
	.jgbox{
		margin: 30rpx auto;
		font-size: 26rpx;
		color: #666;
		text-align: center;
	}
</style>
