<template>
	<view class="leftcontainer">
		<view v-for="(item,i) in navs" :key="i" class="tabs" 
		:class="item.id==current?'active':''"
		@tap="changetap(item.id)"
		>
			<image v-if="baseUrl" :src="item.imageUrl|imgBase" mode="widthFix"></image>
			<image v-else :src="item.imageUrl" mode="widthFix"></image>
			<view class="name">{{item.partitionName}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			navs:{
				type:Array,
				default:{}
			},
			baseUrl:{  //是否拼接域名
			    type:Boolean,
			    default:true
			}
		},
		data() {
			return {
				keyword:'',
				current:''
			}
		},
		methods: {
			changetap(id){
				this.current = id;
				this.$emit('changetap',id)
			}
		},
		mounted() {
			console.log(this.navs)
		}
	}
</script>


<style scoped lang="scss">
	.leftcontainer{
		width: 223rpx;
		height: calc(100vh - 110rpx);
		overflow-y: scroll;
		border: 1px solid #D5D5D5;
		border-left: none;
		border-bottom: none;
		border-radius: 0 32rpx 0 0;
		position: absolute;
		background: #fff;
		top: 0;
		left: 0;
		.tabs{
			width: 187rpx;
			height: 139rpx;
			margin: 10rpx auto;
			border-radius: 10rpx;
			@include flexColumn;
			image{
				width: 54rpx;
				height: 54rpx;
			}
			.name{
				font-size: 24rpx;
				font-weight: 400;
				color: #686868;
				margin-top: 21rpx;
			}
			
		}
		.active{
			background-color: #D5D5D5;
		}
	}
	
</style>
