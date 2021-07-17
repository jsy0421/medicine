<template>
	<view class="con_title">
		<view class="line"></view>
		<view class="title_wrap">
			<text class="required_icon" v-if="required">*</text>
			<text class="title_txt">{{ title }}</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'conditionTitle',
		props: {
			title: {
				type: String,
				default:''
			},
			required: {
				type: Boolean,
				default:false
			}
		}
	}
</script>

<style lang="scss">
	.con_title{
		background-color: #fff;
		display: flex;
		align-items: center;
		padding: 26rpx 0;
		border-bottom: .5rpx solid #dedede;
		.line{
			display: inline-block;
			width: 10rpx;
			height: 40rpx;
			border-radius: 10rpx;
			background-color: #1ab95e;
			margin-right: 20rpx;
		}
		.title_wrap{
			display: flex;
			align-items: center;
			.required_icon{
				color: #f10;
				font-size: 30rpx;
				margin-right: 5rpx;
			}
			.title_txt{
				font-size: 32rpx;
			}
		}
	}
</style>
