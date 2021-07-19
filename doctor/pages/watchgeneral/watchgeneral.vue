<template>
	<view class="content">
		<!-- 分段器 -->
		<view class="subsection">
			<u-subsection :list="list" :current="curNow" @change="sectionChange" :animation="true"
				active-color="#2979ff" inactiveColor="#c0c4cc" bg-color="#ffffff" height="100">
			</u-subsection>
		</view>

		<!-- 复诊配药内容 -->
		<view class="general">
			<view v-for="(item,index) in consultAskList" :key="index">
			<u-card :title="title" :sub-title="subTitle" sub-title-color="#f29100" title-size="26">
				<view class="" slot="body">
					<view class="u-body-item u-flex u-col-between u-p-t-0">
						<image :src="head" mode="aspectFill"></image>
						<view class="u-body-item-title u-line-2">
							<p><text class="person_name person">{{item.personName}}</text><text
									class="person person_gender_name">{{item.personGenderName}}</text><text
									class="person person_gender_name">{{item.personAge}}岁</text></p>
							<p><text class="person_name">药品需求：</text><text>{{item.drugNames}}</text></p>
						</view>
					</view>
				</view>
				<view class="foot" slot="foot">
					<button type="default" @click="start(index)">{{buttonText}}</button>
				</view>
			</u-card>
		</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
						name: '待完成'
					},
					{
						name: '已完成'
					}
				],
				curNow: 0,

				title: '申请时间：2021-07-15 10:10:00',
				subTitle: '待完成',
				buttonText:'开始接诊',

				consultAskList: [{
						consultId: "1415603106268639233",
						orgId: "1",
						orgName: "5号病院",
						deptId: "1",
						deptName: "麻醉科",
						doctorId: "1",
						doctorName: "无语",
						doctorLevelCode: null,
						doctorLevelName: null,
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
						drugNames: "肠炎宁片",
						photoIds: "medicine/mkd/WIN_20210106_12_59_49_Pro.jpg,",
						consultStatus: 1,
						createTime: "2021-07-14T02:50:56.000+00:00",
						acceptTime: null,
						finishTime: null
					},
					{
						consultId: "1415604866139889666",
						orgId: "1",
						orgName: "5号病院",
						deptId: "1",
						deptName: "麻醉科",
						doctorId: "1",
						doctorName: "无语",
						doctorLevelCode: "1",
						doctorLevelName: "主治医师",
						createUserId: "mkd",
						personName: "张三",
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
						drugNames: "肠炎宁片",
						photoIds: "https://gulimail-momoshenchi.oss-cn-hangzhou.aliyuncs.com/medicine/mkd/WIN_20210106_12_59_49_Pro.jpg,",
						consultStatus: 3,
						createTime: "2021-07-14T02:50:56.000+00:00",
						acceptTime: null,
						finishTime: null
					}
				],

				head: "",
				userId:''
			}
		},
		onLoad(option) {
			if (this.person_gender_name === "女") {
				this.head = "../../static/head/woman.png";
			} else {
				this.head = "../../static/head/man.png";
			}
			if (option.userId != undefined){
				this.userId = option.userId
			}
		},
		methods: {
			sectionChange(index) {
				this.curNow = index;
				if (this.curNow === 0) {
					this.subTitle = "待完成";
					this.buttonText = '开始接诊';
				} else {
					this.subTitle = "已完成";
					this.buttonText = '查看处方';
				}
			},
			start(index){
				var consultId = this.consultAskList[index].consultId;
				var consultStatus = this.consultAskList[index].consultStatus;
				uni.navigateTo({
					url:'/pages/watchdetail/watchdetail?consultId=' + consultId + '&consultStatus=' + consultStatus + '&userId=' + this.userId
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f3f4f6;
	}

	.u-card-wrap {
		background-color: $u-bg-color;
		padding: 1px;
	}

	.u-body-item {
		font-size: 32rpx;
		color: #333;
	}

	.u-body-item image {
		width: 120rpx;
		flex: 0 0 120rpx;
		height: 120rpx;
		border-radius: 8rpx;
	}

	.u-body-item-title {
		padding-left: 40rpx;
		line-height: 60rpx;
	}

	.person {
		padding-right: 5%;
	}

	.person_name {
		color: #606266;
	}

	.person_gender_name {
		color: #909399;
	}

	.foot button {
		margin-left: 70%;
		font-size: 30rpx;
		color: #2979ff;
		background-color: #FFFFFF;
		border: 2rpx #2979FF solid;
	}
</style>
