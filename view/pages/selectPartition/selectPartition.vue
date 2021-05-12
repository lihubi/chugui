<template>
	<view class="marginContainer">
		<view class="partibox">
			<view class="partis" v-for="(item,i) in partis" :key="i">
				<view class="title">{{item.first.partitionName}}</view>
				<!-- <image class="titleimg" :src="item.img_url" mode="heightFix"></image> -->
				<!-- <view style="color: #A38B78;">{{item.en.toUpperCase()}}</view> -->
				<view style="color: #A38B78;"></view>
				<view class="childbox">
					<view v-if="!item.secList.length==0">
						<view class="childs" v-for="(item2,i2) in item.secList" :key="i2" @tap="check(i,i2)">
							<view class="name"  >{{item2.partitionName}}</view>
							<view class="selimg"> <image v-show="item2.ischecked" src="../../static/img/select/selected.png" mode="widthFix"></image> </view>
						</view>
					</view>
					<view class="chila" @tap="check(i)" v-else>
						<view class="selimg" > <image v-show="item.first.ischecked" src="../../static/img/select/selected.png" mode="widthFix"></image> </view>
					</view>
				</view>
			</view>
		</view>
		<view class="subbtn" @tap="submit">提交</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				datas:{
					orderId:'',
					workId:'',
					userOrderDetailList :[],
				},
				partis:[]
			}
		},
		methods: {
			to(url,scene){
				uni.navigateTo({
					url: "/pages/" + url + "?scene=" + scene
				})
			},
			check(i,i2){
				if(i2==undefined){
					this.$set(this.partis[i].first,'ischecked',!this.partis[i].first.ischecked)
				}else{
					// this.$set(this.partis[i].first,'ischecked',true)
					this.$set(this.partis[i].secList[i2],'ischecked',!this.partis[i].secList[i2].ischecked)
				}
			},
			async submit(){
				let partisCopy = JSON.parse(JSON.stringify(this.partis))
				let formlist = [];
				let res1 = partisCopy.filter((data) => {
					return data.first.ischecked
				})
				res1.forEach((item,i) => {  //统计选中的父分区
					formlist.push(item.first)
				})
				partisCopy.forEach((item,i) => {  //统计选中的子
					item.secList.forEach((item2,i2) => {
						if(item2.ischecked){
							formlist.push(item2)
						}
					})
				})
				this.datas.userOrderDetailList = JSON.stringify(formlist)
				console.log(this.datas)
				let res = await this.$u.api.setListfq(this.datas);
				if(res.success){
					this.to("selectlifu/selectlifu",this.datas.orderId);
				}
			}
		},
		onLoad(options) {
			this.datas.orderId=options.scene;
			this.datas.workId = getApp().globalData.userId; //获取userID
		},
		async onShow() {
			let res = await this.$u.api.getListfq();
			this.partis = res.result;
			console.log(res);
			
		}
	}
</script>

<style scoped lang="scss">
.subbtn{
	width: 47%;
	@include button('24rpx', '100vw', '120rpx');
	margin: 40rpx auto;
}
.partibox{
	margin-top: 40rpx;
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	.partis{
		width: calc(50% - 15rpx);
		background: linear-gradient(-43deg, #F3F5F9, #F6F5F8);
		border-radius: 10rpx;
		padding: 24rpx;
		box-sizing: border-box;
		&:nth-child(2n-1){
			margin-right: 25rpx;
		}
		text-align: center;
		margin-bottom: 34rpx;
		.title{
			text-align: center;
			font-size: 32rpx;
			font-weight: 400;
			color: #000000;
		}
		.titleimg{
			height: 20rpx;
		}
		.childbox{
			text-align: start;
			font-weight: 500;
			font-size: 24rpx;
			max-height: 275rpx;
			overflow-y: scroll;	
			color: #1E1E1E;
			.chila{
				.selimg{
					margin: 0 auto;
					margin-top: 10rpx;
					width: 32rpx;
					height: 32rpx;
					border-radius: 50%;
					overflow: hidden;
					border: 1rpx solid #E4E7ED;
					image{
						width: 100%;
						height: auto;
					}
				}
			}
			.childs{
				padding: 20rpx 0;
				border-bottom: 1rpx solid rgba($color: #dbdbdb, $alpha: 0.27);
				@include flexBetween;
				&:last-child{
					border-bottom: none;
				}
				.name{
					
				}
				.selimg{
					width: 32rpx;
					height: 32rpx;
					border-radius: 50%;
					overflow: hidden;
					border: 1rpx solid #E4E7ED;
					image{
						width: 100%;
						height: auto;
					}
				}
			}
		}
	}
}
</style>
