<template>
	<view class="doc_wrap">
		<view class="doc_info_wrap">
			<view class="avatar_wrap">
				<image 
					src="../../../static/center-selected.png" 
					mode="aspectFill"
					class="avatar_img"
				></image>
			</view>
			
			<view class="doc_name_wrap">
				<view class="name_title">
					<text class="doc_name_txt">张医生</text>
					<text class="tag">主任医师</text>
				</view>
				<view class="sort">呼吸内科</view>
			</view>
		</view>
		
		<view class="change_doc_wrap" @click="changeDoctor">
			<text class="change_doc_txt">更换医生</text>
			<u-icon name="arrow-right" color="#999" size="30"></u-icon>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'DoctorWrap',
		data() {
			return {
				
			}
		},
		methods:{
			changeDoctor(){
				
			}
		}
	}
</script>

<style lang="scss">
	.doc_wrap{
		margin-top: 8rpx;
		margin-bottom: 25rpx;
		padding: 18rpx 24rpx;
		border: #fff;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #fff;
		.doc_info_wrap{
			display: flex;
			align-items: center;
			.avatar_wrap{
				width: 140rpx;
				height: 140rpx;
				border-radius: 100%;
				overflow: hidden;
				margin: 18rpx;
				.avatar_img{
					width: 100%;
					height: 100%;
				}
			}
			.doc_name_wrap{
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				.name_title{
					display: flex;
					align-items: center;
					.doc_name_txt{
						font-size: 32rpx;
						font-weight: 600;
						margin-right: 10rpx;
					}
					.tag{
						display: inline-block;
						padding: 4rpx 10rpx;
						border: .5rpx solid #ff9900;
						border-radius: 30rpx;
						font-size: 24rpx;
						color: #ff9900;
					}
				}
				.sort{
					font-size: 28rpx;
					margin-top: 18rpx;
				}
			}
		}
			
		.change_doc_wrap{
			display: flex;
			align-items: center;
			color: #999;
			.change_doc_txt{
				line-height: 0;
				margin-right: 14rpx;
			}
		}
	}
</style>
