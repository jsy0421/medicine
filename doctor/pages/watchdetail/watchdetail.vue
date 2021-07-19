<template>
	<view class="apply_page">
		<view class="form">
			<view class="form_item">
				<view class="label">
					<text class="label_txt"><text
							class="label_text">申请时间：</text>{{detail.createTime | dataFormat}}</text>
					<text class="label_txt_complete">待完成</text>
				</view>
			</view>
		</view>

		<view class="form">
			<view class="form_item">
				<view class="label">
					<text class="label_txt label_text">问诊人</text>
				</view>
				<view class="value">
					<text>{{detail.personName}}</text>
					<text>{{detail.personGenderName}}</text>
					<text>{{detail.personAge}}岁</text>
				</view>
			</view>

			<view class="form_item add_drugs_form">
				<view class="label">
					<text class="label_txt label_text">所需药品</text>
				</view>
			</view>
			<view class="drugs_list">
				<block>
					<view class="drugs_item">
						<text class="drugs_name">{{detail.drugNames}}</text>
					</view>
				</block>
			</view>


		</view>

		<view class="condition_item">
			<view class="form_item">
				<view class="label">
					<text class="label_txt label_text">历史诊断</text>
				</view>
				<view class="value">
					{{detail.diagnosis}}
				</view>
			</view>
			<view class="con_title">
				<view class="title_wrap">
					<text class="title_txt">病情描述 :</text>
				</view>
			</view>
			<view class="condition_content">
				{{detail.question}}
			</view>
		</view>

		<view class="condition_item upload">
			<ConditionTitle title="病情照片"></ConditionTitle>
			<view class="condition_content">
				<view class="pr_img_list">
					<view class="pr_img_item" v-for="(item,index) in image" :key="index">
						<image :src="image[index]" mode="aspectFill" class="pr_img"></image>
					</view>
				</view>
			</view>
		</view>
		<view class="button">
		<view class="" v-if="consultStatus == 3">
			<button class="watchPrescription" @click="watchPrescription()">查看处方</button>
		</view>
		<view class="" v-else>
		<!-- 两个按钮 -->
		
			<button class="prescription" @click="prescription()">处方</button>
			<button class="finish" @click="finish()">完成接诊</button>
		</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				detail: {
					consultId: "1415604866139889666", //
					orgId: "1", //
					orgName: "5号病院",
					deptId: "1",
					deptName: "麻醉科",
					doctorId: "1", //
					doctorName: "无语", //
					doctorLevelCode: "1",
					doctorLevelName: "主治医师",
					createUserId: "mkd",
					personName: "李白",
					personCardType: "1", 
					personCardId: "330303200343431230",
					personGenderCode: "1",
					personGenderName: "男",
					personBirthDate: "2012-01-14T16:00:00.000+00:00",
					personAge: 12,
					personPhoneNo: "13656646985",
					question: "呼吸困难",
					diagnosis: "急性扁桃体炎",
					drugIds: "1",
					drugNames: "肠炎宁片", //
					photoIds: "https://gulimail-momoshenchi.oss-cn-hangzhou.aliyuncs.com/medicine/mkd/WIN_20210106_12_59_49_Pro.jpg,https://gulimail-momoshenchi.oss-cn-hangzhou.aliyuncs.com/medicine/mkd/WIN_20210106_12_59_49_Pro.jpg",
					consultStatus: 1,
					createTime: "2021-07-14T02:50:56.000+00:00",
					acceptTime: null,
					finishTime: null
				},
				image:[],
				consultId:'',
				consultStatus:-1,
				userId:''
			}

		},
		filters: {
			dataFormat(time) {
				var data = time.substring(0, 10);
				var second = time.substring(11, 19);
				return data + " " + second;
			}
		},
		onLoad(option) {
			if (option.consultId != undefined){
				this.consultId = option.consultId;
				this.consultStatus = option.consultStatus;
				this.userId = option.userId;
				console.log(this.consultId);
				console.log(this.consultStatus);
				this.image=this.detail.photoIds.split(",");
				console.log(this.image);
			}
		},
		methods: {
			prescription(){
				uni.navigateTo({
					url:'/pages/makeprescription/makeprescription?consultId=' + this.detail.consultId + '&doctorId=' + this.detail.doctorId + '&orgId=' + this.detail.orgId + '&doctorName=' + this.detail.doctorName + '&drugNames=' + this.detail.drugNames + '&userId=' + this.userId
				})
			},
			watchPrescription(){
				uni.navigateTo({
					url:'/pages/prescription/prescription'
				})
			}
		}
	}
</script>

<style lang="scss">
	.apply_page {
		background-color: #f2f2f2;
		min-height: 100vh;

		.form {
			background-color: #fff;
			padding: 0 30rpx;
			margin-bottom: 25rpx;

			.form_item {
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 28rpx 0;

				.label {
					color: #666;
					font-size: 30rpx;

					.label_text {
						color: #909399;
					}

					.label_txt_complete {
						color: #f5971d;
						font-size: 32rpx;
						margin-left: 140rpx;
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
						font-size: 30rpx;
						margin-left: 15rpx;
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
				padding: 0rpx 12rpx;

				.drugs_item {
					position: relative;
					display: inline-block;
					text-align: center;
					padding: 6rpx 13rpx;
					border-radius: 20rpx;
					background-color: #FFFFFF;
					border: 3rpx #71d5a1 solid;
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
			padding: 0 30rpx;
			background-color: #fff;
			margin-bottom: 25rpx;

			.form_item {
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 28rpx 0;

				.label {
					color: #666;
					font-size: 30rpx;

					.label_text {
						color: #909399;
					}

					.label_txt_complete {
						color: #f5971d;
						font-size: 32rpx;
						margin-left: 160rpx;
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

			.condition_content {
				padding-bottom: 20rpx;
				padding-left: 20rpx;
				font-size: 30rpx;

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

		.con_title {
			background-color: #fff;
			display: flex;
			align-items: center;
			padding: 26rpx 0;

			.line {
				display: inline-block;
				width: 10rpx;
				height: 40rpx;
				border-radius: 10rpx;
				background-color: #1ab95e;
				margin-right: 20rpx;
			}

			.title_wrap {
				display: flex;
				align-items: center;

				.required_icon {
					color: #f10;
					font-size: 30rpx;
					margin-right: 5rpx;
				}

				.title_txt {
					font-size: 32rpx;
					color: #909399;
				}
			}
		}
		
		.button {
			position: fixed;
			bottom: 0rpx;
			width: 100%;
			z-index: 9999;
		}
		
		.button button {
			height: 100rpx;
		}
		
		.prescription {
			float: left;
			width: 50%;
			background-color: #2b85e4;
			border-radius: 0;
			color: #FFFFFF;
			font-size: 32rpx;
		}
		.finish {
			float: right;
			width: 50%;
			border-radius: 0;
			font-size: 32rpx;
		}
		
		.watchPrescription{
			background-color: #2b85e4;
			border-radius: 0;
			color: #FFFFFF;
			font-size: 32rpx;
		}
		
		
	}
</style>
