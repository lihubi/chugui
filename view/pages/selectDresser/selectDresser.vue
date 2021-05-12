<template>
	<view class="marginContainer">
		<view class="partibox">
			<view class="partis" v-for="(item,i) in partis" :key="i">
				<view class="title">{{item[0].level}}</view>
				<!-- <image class="titleimg" :src="item.img_url" mode="heightFix"></image> -->
				<!-- <view style="color: #A38B78;">{{item.en.toUpperCase()}}</view> -->
				<view class="childbox">
					<view>
						<view class="childs" v-for="(item2,i2) in item" :key="i2" @tap="check(item[0].level, item2.id)">
							<view class="name"  >{{item2.area}}</view>
							<view class="selimg"> <image v-show="item2.id==form.levelId" src="../../static/img/select/selected.png" mode="widthFix"></image> </view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="zhulibox" @tap="form.isWant = !form.isWant">
			<view>选择化妆师助理</view>
			<view class="selborder">
				<view class="selimg"> <image v-show="form.isWant" src="../../static/img/select/selected.png" mode="widthFix"></image> </view>
			</view>
		</view>
		<!-- //郊县 -->
		<view class="areabox">
			<view class="title">郊县:</view>
			<view class="arealist">
				鹿泉,正定,栾城,灵寿,元氏平山,深泽,高邑,赞皇,井陉,矿区
				赵县,无极,行唐,晋州新乐,宁晋,辛集
			</view>
		</view>
		<!-- //外地 -->
		<view class="areabox">
			<view class="title">外地:</view>
			<view class="arealist">
				邯郸,邢台,保定,沧州,廊坊,承德,定州,涿州,沙河,迁安
				武安,三河,泊头,高碑店,任丘,河间,沧州,冀州,深州
			</view>
		</view>
		<!-- //偏远地区 -->
		<view class="areabox">
			<view class="title">偏远地区:</view>
			<view class="arealist">
				张家口,唐山,秦皇岛,遵化,山东,山西,东北,北京,天津等...
			</view>
		</view>
		<view class="btnbox">
			<view class="subbtn" @tap="pass">跳过</view>
			<view class="subbtn" @tap="submit">提交</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				ares:['鹿泉','正定','鹿泉','正定','鹿泉','正定'],
				
				form:{
					isWant:false,
					orderId:'',
					workId:'',
					levelId:'',
					area:''
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
			check(id1,id2){
				this.form.levelId = id2;
				this.form.area = id1;
			},
			async submit(){
				let form2 = JSON.parse(JSON.stringify(this.form))
				form2.isWant = form2.isWant?'1':'0'
				let res = await this.$u.api.setDresserAreas(form2);
				if(res.success){
					console.log(res)
					this.to('selectShipin/selectShipin',this.form.orderId)
				}
			},
			async getmsg(){
				
				let res = await this.$u.api.getDresserAreas(this.datas);
				if(res.success){
					this.partis = res.result
					console.log(res)
				}
			},
			async gethzs(){
				let res = await this.$u.api.queryHzs({id:this.form.orderId});
				if(res.success){
					console.log(res)
					this.form.levelId = res.result.partitions
					this.form.isWant = res.result.isWant=='1'?true:false
				}
			},
			pass(){
				this.to('selectShipin/selectShipin',this.form.orderId)
			}
		},
		onLoad(options) {
			this.form.orderId=options.scene;
			this.form.workId = getApp().globalData.userId; //获取userID
			this.getmsg();
			this.gethzs();
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
.zhulibox{
	width: 100%;
	height: 73rpx;
	background: linear-gradient(-43deg, #F3F5F9, #F6F5F8);
	border-radius: 10rpx;
	padding: 0 26rpx;
	box-sizing: border-box;
	font-size: 24rpx;
	font-weight: 500;
	color: #1E1E1E;
	@include flexBetween;
	.selborder{
		display: flex;
		align-items: center;
		.shifou{
			margin-left: 30rpx;
		}
		.selimg{
			width: 32rpx;
			height: 32rpx;
			border-radius: 50%;
			overflow: hidden;
			border: 1rpx solid #E4E7ED;
			margin-left: 15rpx;
			image{
				width: 100%;
				height: auto;
			}
		}
	}
	
}
.areabox{
	margin-top: 24rpx;
	width: 100%;
	background: #F9FAFC;
	// opacity: 0.53;
	border-radius: 10rpx;
	padding: 25rpx;
	box-sizing: border-box;
	.title{
		font-size: 26rpx;
		font-weight: bold;
		color: #000000;
	}
	.arealist{
		margin-top: 28rpx;
		display: flex;
		align-items: center;
		font-size: 24rpx;
		font-weight: 500;
		color: #4D4D4D;
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
