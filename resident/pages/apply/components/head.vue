<template>
	<view class="header_wrap">
		<view class="back_wrap center">
			<u-icon @click="back" name="arrow-leftward" color="#222" size="34"></u-icon>
		</view>
		<view class="center_wrap center">
			<text class="center_txt">复诊配方详情</text>
		</view>
		<view class="close_wrap center">
			<text class="close_txt">关闭</text>
		</view>
	</view>
</template>

<script>
	export default {
	methods:{
		back(){
			uni.navigateBack({
				url: '../index/index'
			});
		}
	},
	}
</script>

<style scoped lang="scss">
	.header_wrap{
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 30rpx 24rpx;
		background-color: #fff;
		.back_wrap{
			flex: 1;
		}
		.center_wrap{
			flex: 8;
			.center_txt{
				font-weight: 600;
			}
		}
		.close_wrap{
			flex: 1;
			.close_txt{
				color: #333;
			}
		}
	}
</style>
