<template>
	<view class="content">
		<view class="input">
			<u-field v-model="userInfo.personName" label=" 姓名" label-width="150" placeholder="请填写姓名" required icon="man-add">
			</u-field>
			<u-field v-model="userInfo.personCardId" label=" 身份证号" label-width="150" placeholder="请填写身份证号" required icon="coupon">
			</u-field>
			<u-field @click="showAction" v-model="userInfo.personGenderName" :disabled="true" label=" 性别" label-width="150"
				placeholder="请选择性别" right-icon="arrow-down-fill" required icon="man">
			</u-field>
			<u-action-sheet @click="clickItem" :list="sexList" v-model="showsex"></u-action-sheet>
			<u-calendar v-model="showcalendar" @change="changeCalendar" :mode="mode"></u-calendar>
			<u-field @click="showCalendar" v-model="userInfo.personBirthDate" :disabled="true" label=" 出生日期" label-width="150"
				placeholder="请填写出生日期" required right-icon="arrow-down-fill" icon="calendar">
			</u-field>
			<u-field v-model="userInfo.personPhoneNo" label=" 手机号" label-width="150" placeholder="请填写手机号" required icon="kefu-ermai">
			</u-field>
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
				userInfo:{
					personName:'',
					personCardId: '',
					personPhoneNo: '',
					personGenderName: '',
					personBirthDate: '',
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
			},
			showCalendar() {
				this.showcalendar = true
			},
			submitInfo() {
				if (this.userInfo.personBirthDate == '' || this.userInfo.personGenderName == '' || this.userInfo.personName == '' || this.userInfo.personCardId == ''||this.userInfo.personPhoneNo == '') {
					this.$refs.uTips.show({
						title: '必填内容不能为空',
						type: 'error',
						duration: '2300'
					})
				} else {
					var UserInfo = JSON.stringify(this.userInfo)
					this.$event.notify('userEvent',UserInfo)
					uni.navigateTo({
						url: '../apply/apply'
					});
				}
			}
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
	
	.btn_wrap{
		padding: 50rpx 24rpx 15rpx;
		text-align: center;
	}
	.submitBtn{
		width: 100%;
		height: 73rpx;
		background-color: #29bd6b;
		border-radius: 10rpx;
		color: #fff;
		font-size: 35rpx;
		display:flex;
		justify-content:center;
		align-items:center
	}
</style>
