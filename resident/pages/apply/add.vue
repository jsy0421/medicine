<template>
	<view class="content">
		<view class="input">
			<u-form :model="userInfo" :rules="rules" ref="uForm" :errorType="errorType">
				<u-form-item label="姓名" prop="personName" left-icon="man-add" required>
					<u-input v-model="userInfo.personName" placeholder="请填写姓名" />
				</u-form-item>
				<u-form-item label=" 身份证号" prop="personCardId" required left-icon="coupon">
					<u-input v-model="userInfo.personCardId" placeholder="请填写身份证号" />
				</u-form-item>
				<u-form-item label=" 性别" prop="personGenderName" right-icon="arrow-down-fill" required left-icon="man">
					<u-input @click="showAction" v-model="userInfo.personGenderName" placeholder="请选择性别" />
				</u-form-item>
				<u-form-item label=" 出生日期" prop="personBirthDate" required right-icon="arrow-down-fill" left-icon="calendar">
					<u-input @click="showCalendar" v-model="userInfo.personBirthDate" placeholder="请填写出生日期" />
				</u-form-item>
				<u-form-item label=" 手机号" prop="personPhoneNo" required left-icon="kefu-ermai">
					<u-input v-model="userInfo.personPhoneNo" placeholder="请填写手机号" />
				</u-form-item>
			</u-form>
			<u-action-sheet @click="clickItem" :list="sexList" v-model="showsex"></u-action-sheet>
			<u-calendar v-model="showcalendar" @change="changeCalendar" :mode="mode"></u-calendar>
			<view class="btn_wrap">
				<view class="submitBtn center" @click="submitInfo">
					提交
				</view>
			</view>
			<u-top-tips ref="uTips"></u-top-tips>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				chooseDrugName:'',
				errorType: ['message'],
				rules: {
					personName: [{
						message: '姓名不正确',
						trigger: 'blur,change',
						type: 'string'
					}],
					personCardId: [{
						message: '身份证号格式不正确',
						// 可以单个或者同时写两个触发验证方式
						trigger: 'blur,change',
						type: 'number',
						min: 18,
						max: 18,
					}],
					personPhoneNo: [{
						message: '手机号格式不正确',
						// 可以单个或者同时写两个触发验证方式
						trigger: 'blur,change',
						type: 'number',
						min: 11,
						max: 11,
					}],
				},
				userInfo: {
					personName: '',
					personCardId: '',
					personPhoneNo: '',
					personGenderName: '',
					personBirthDate: '',
					personAge: 0,
					personGenderCode: 0,
				},
				sexList: [{
						text: '男',
					},
					{
						text: '女'
					}
				],
				showsex: false,
				showcalendar: false,
				mode: 'date',
			}
		},
		methods: {
			onReady() {
				this.$refs.uForm.setRules(this.rules);
			},
			showAction() {
				this.showsex = true;
			},
			clickItem(index) {
				this.userInfo.personGenderName = this.sexList[index].text;
			},
			changeCalendar(e) {
				this.userInfo.personBirthDate = e.result
				console.log(this.userInfo.personBirthDate)
				//算年龄
				this.userInfo.personAge = this.$options.methods.getAge(this.userInfo.personBirthDate)
			},
			// 根据日期计算年龄
			getAge(strBirthday) {
				//strBirthday传入格式 2020-04-15
				var returnAge;
				var strBirthdayArr = strBirthday.split('-');
				var birthYear = strBirthdayArr[0];
				var birthMonth = strBirthdayArr[1];
				var birthDay = strBirthdayArr[2];
				//获取当前日期
				var d = new Date();
				var nowYear = d.getFullYear();
				var nowMonth = d.getMonth() + 1;
				var nowDay = d.getDate();
				if (nowYear == birthYear) {
					returnAge = 0; //同年 则为0岁
				} else {
					var ageDiff = nowYear - birthYear; //年之差
					if (ageDiff > 0) {
						if (nowMonth == birthMonth) {
							var dayDiff = nowDay - birthDay; //日之差
							if (dayDiff < 0) {
								returnAge = ageDiff - 1;
							} else {
								returnAge = ageDiff;
							}
						} else {
							var monthDiff = nowMonth - birthMonth; //月之差
							if (monthDiff < 0) {
								returnAge = ageDiff - 1;
							} else {
								returnAge = ageDiff;
							}
						}
					} else {
						returnAge = -1; //返回-1 表示出生日期输入错误 晚于今天
					}
				}
				return returnAge; //返回周岁年龄
			},
			showCalendar() {
				this.showcalendar = true
			},
			submitInfo() {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						console.log('验证通过');
						if (this.userInfo.personGenderName == "男")
							this.userInfo.personGenderCode = 1
						else this.userInfo.personGenderCode = 2
						if (this.userInfo.personBirthDate == '' || this.userInfo.personGenderName == '' || this.userInfo
							.personName == '' || this.userInfo.personCardId == '' || this.userInfo.personPhoneNo == '') {
							this.$refs.uTips.show({
								title: '必填内容不能为空',
								type: 'error',
								duration: '2300'
							})
						} else {
							var UserInfo = JSON.stringify(this.userInfo)
							this.$event.notify('userEvent', UserInfo)
							uni.navigateBack({
								url: '../apply/apply'
							});
						}
					} else {
						console.log('验证失败');
						this.$refs.uTips.show({
							title: '所填内容有误',
							type: 'error',
							duration: '2300'
						})
					}
				});
			},
		}
	}
</script>

<style scoped>
	.content {
		display: flex;
		margin: 0 15upx;
		align-items: center;
		justify-content: center;

	}

	.button-view {
		margin-top: 50rpx;
		width: 80%;
		display: flex;
		justify-content: center;
	}

	.bottom {
		display: flex;
		width: 100%;
		justify-content: center;
	}

	.btn {
		width: 100%;
	}

	.input {
		width: 90%;
		padding-top: 40rpx;
	}

	.btn_wrap {
		padding: 50rpx 24rpx 15rpx;
		text-align: center;
	}

	.submitBtn {
		width: 100%;
		height: 73rpx;
		background-color: #29bd6b;
		border-radius: 10rpx;
		color: #fff;
		font-size: 35rpx;
		display: flex;
		justify-content: center;
		align-items: center
	}
</style>
