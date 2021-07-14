<template>
	<view class="content">
		<view class="input">
		<u-field v-model="name" label=" 姓名" label-width="150" placeholder="请填写姓名" required icon="man-add">
		</u-field>
		<u-field v-model="identity" label=" 身份证号" label-width="150" placeholder="请填写身份证号" required icon="coupon">
		</u-field>
		<u-field @click="showAction" v-model="sex" :disabled="true" label=" 性别" label-width="150" placeholder="请选择性别"
			right-icon="arrow-down-fill" required icon="man">
		</u-field>
		<u-action-sheet @click="clickItem" :list="sexList" v-model="showsex"></u-action-sheet>
		<u-calendar v-model="showcalendar" @change="changeCalendar" :mode="mode"></u-calendar>
		<u-field @click="showCalendar" v-model="birthday" :disabled="true" label=" 出生日期" label-width="150" placeholder="请填写出生日期" required
			right-icon="arrow-down-fill" icon="calendar">
		</u-field>
		<u-field v-model="mobile" label=" 手机号" label-width="150" placeholder="请填写手机号" required icon="kefu-ermai"></u-field>
		<view class="bottom">
		<view class="button-view">
			<u-button class="btn" shape="circle" type="success" @click="submitInfo" :ripple="true">提交</u-button>
		</view></view>
		<u-top-tips ref="uTips"></u-top-tips>
	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name: '',
				identity: '',
				mobile: '',
				sex: '',
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
				birthday: ''
			}
		},
		methods: {
			showAction() {
				this.showsex = true;
			},
			clickItem(index) {
				this.sex = this.sexList[index].text;
			},
			changeCalendar(e) {
				this.birthday = e.result
				console.log(this.birthday)
			},
			showCalendar() {
				this.showcalendar = true
			},
			submitInfo() {
				if (this.name == '' || this.identity == '' || this.mobile == '' || this.sex == '' || this.showsex == '' ||
					this.showcalendar == '' ||
					this.birthday == '') {
					this.$refs.uTips.show({
						title: '必填内容不能为空',
						type: 'error',
						duration: '2300'
					})
				} else {
					var res = {
						name: this.name,
						identity: this.identity,
						mobile: this.mobile,
						sex: this.sex,
						showsex: this.showsex,
						showcalendar: this.showcalendar,
						birthday: this.birthday
					}
					console.log(res)
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
	.button-view{
		margin-top: 50rpx;
		width: 80%;
		display: flex;
		justify-content: center;
	}
	.bottom{
		display: flex;
		width: 100%;
		justify-content: center;
	}
	.btn{
		width: 100%;
	}
	.input{
		width: 90%;
		padding-top: 40rpx;
	}
</style>
