<template>
	<view class="content">
		<view class="input">
			<u-form :model="userInfo" ref="uForm">
				<u-form-item label="姓名" prop="name" left-icon="man-add" required>
					<u-input v-model="userInfo.personName" placeholder="请填写姓名"/>
				</u-form-item>
				<u-form-item label=" 身份证号" required left-icon="coupon">
					<u-input v-model="userInfo.personCardId" placeholder="请填写身份证号"/>
				</u-form-item>
				<u-form-item  label=" 性别" right-icon="arrow-down-fill" required left-icon="man">
					<u-input @click="showAction" v-model="userInfo.personGenderName" placeholder="请选择性别"/>
				</u-form-item>
				<u-form-item label=" 出生日期" required right-icon="arrow-down-fill" left-icon="calendar">
					<u-input @click="showCalendar" v-model="userInfo.personBirthDate" placeholder="请填写出生日期"/>
				</u-form-item>
				<u-form-item label=" 手机号" placeholder="请填写手机号" required left-icon="kefu-ermai">
					<u-input v-model="userInfo.personPhoneNo" placeholder="请填写手机号"/>
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
				userInfo: {
					personName: '',
					personCardId: '',
					personPhoneNo: '',
					personGenderName: '',
					personBirthDate: '',
					personAge: 0,
					personGenderCode:0,
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
				this.userInfo.personAge=this.$options.methods.getAge(this.userInfo.personBirthDate)
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
				if(this.userInfo.personGenderName=="男")
					this.userInfo.personGenderCode=1
				else	this.userInfo.personGenderCode=2
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
