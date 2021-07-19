<template>
	<view class="apply_page">
		<view class="form">
			<view class="form_item" @click="addInfo">
				<view class="label">
					<text class="label_txt">申请时间： 2021-05-26</text>
					<text class="label_txt_complete">待完成</text>

				</view>
			</view>
		</view>

		<view class="form">
			<view class="form_item" @click="addInfo">
				<view class="label">
					<text class="label_txt">问诊人</text>
				</view>
				<view class="value">
					<text v-model="UserInfo.personName">ccc</text>
					<text v-model="UserInfo.personGenderName">aaa</text>
					<text v-model="UserInfo.personAge">13岁</text>
				</view>
			</view>

			<u-select v-model="hospitalsPickerShow" :list="allHospitalsList" @confirm="handlePickerHospitalConfirm">
			</u-select>

			<view class="form_item add_drugs_form">
				<view class="label">
					<text class="label_txt">所需药品</text>
				</view>
			</view>
			<view class="drugs_list">
				<block>
					<view class="drugs_item">
						<text class="drugs_name">dasha</text>
					</view>
				</block>
			</view>

			<view class="form_item">
				<view class="label">
					<text class="label_txt">历史诊断</text>
				</view>
				<view class="value">
					感冒</view>
			</view>
		</view>

		<view class="condition_item">
			<ConditionTitle title="病情描述" :required="true"></ConditionTitle>
			<view class="condition_content">
				分为氛围斤斤计较急急急急急急急急急急急急
			</view>
		</view>

		<view class="condition_item upload">
			<ConditionTitle title="病情照片"></ConditionTitle>
			<view class="condition_content">
				<view class="pr_img_list">
					<view class="pr_img_item" v-for="(item,index) in imgList" :key="index"
						@tap="handlePreviewImg(item,index)">
						<u-icon class="img_close_icon" name="close-circle-fill" color="#f10" size="38"
							@tap.stop="deletePrImg(index)"></u-icon>
						<image :src="item.url" mode="aspectFill" class="pr_img"></image>
					</view>
					<image src="../../static/center-selected.png" class="avatar_img" width="100" height="100"></image>
					<image src="../../static/center-selected.png" class="avatar_img" width="100" height="100"></image>
					<image src="../../static/center-selected.png" class="avatar_img" width="100" height="100"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import ConditionTitle from './components/conditiontitle.vue'

	export default {
		components: {
			ConditionTitle
		},
		data() {
			
		},
		onShow() {
			
		},
		onLoad() {
			
		},
		methods: {
		
		}
	}
</script>

<style lang="scss">
	.apply_page {
		background-color: #f2f2f2;
		min-height: 100vh;


		.form {
			background-color: #fff;
			padding: 0 24rpx 24rpx;
			margin-bottom: 25rpx;

			.form_item {
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 28rpx 0;
				// border-bottom: .5rpx solid #dedede;

				.label {
					color: #666;
					font-size: 30rpx;
					
					.label_txt_complete{
						color: #f5971d;
						font-size: 32rpx;
						margin-right: 6rpx;
					}

					.label_required_icon {
						color: #f10;
						font-size: 32rpx;
						margin-right: 6rpx;
					}
				}

				.value {
					display: flex;
					align-items: center;

					text {
						margin-left: 8rpx;
						line-height: 0;
					}

					.value_txt {
						color: #999;
					}
				}
			}

			.ye_block {
				border: .5rpx solid yellow;
				width: 100%;
				height: 70rpx;
				margin-top: 10rpx;
			}

			.add_drugs_form {
				border: 0;
			}

			.drugs_list {
				display: flex;
				flex-flow: row wrap;
				padding: 30rpx 12rpx;

				.drugs_item {
					position: relative;
					display: inline-block;
					text-align: center;
					padding: 6rpx 13rpx;
					border-radius: 8rpx;
					background-color: #dbf1e1;
					color: #18b566;
					font-size: 26rpx;
					margin-right: 38rpx;
					margin-bottom: 30rpx;

					.drug_close_icon {
						position: absolute;
						right: -12rpx;
						top: -12rpx;
					}
				}
			}
		}

		.condition_item {
			padding: 0 24rpx;
			background-color: #fff;
			margin-bottom: 25rpx;

			.condition_content {
				padding: 22rpx 0rpx 45rpx;

				.upload_notice_txt {
					color: #888;
					font-size: 28rpx;
					text-indent: 2em;
					margin-top: 50rpx;
				}

				.pr_img_list {
					display: flex;

					.pr_img_item {
						position: relative;
						margin-right: 24rpx;
						margin-bottom: 24rpx;
						width: 200rpx;
						height: 200rpx;

						.img_close_icon {
							position: absolute;
							right: -20rpx;
							top: -20rpx;
						}

						.pr_img {
							width: 100%;
							height: 100%;
						}
					}
				}
			}
		}



	}
</style>
