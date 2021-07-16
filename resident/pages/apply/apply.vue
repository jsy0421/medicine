<template>
	<view class="content">
		<Head></Head>
		<view class="doctor">
			<view class="doctorInfo">
				<view class="avatar" @click="changeDoctor">
					<image src="../../static/center-selected.png" mode="aspectFill" class="avatar_img"></image>
				</view>
				<view class="doctorName">
					<view class="name_title">
						<text class="doc_name_txt" v-model="DoctorInfo.doctorName">{{DoctorInfo.doctorName}}</text>
						<text class="tag" v-model="DoctorInfo.levelName">{{DoctorInfo.levelName}}</text>
					</view>
					<view class="sort" v-model="DoctorInfo.deptName">{{DoctorInfo.deptName}}</view>
				</view>
			</view>

			<view class="changeDoctor" @click="changeDoctor">
				<text class="change_doc_txt">更换医生</text>
				<u-icon name="arrow-right" color="#999" size="30"></u-icon>
			</view>
		</view>
		
		<view class="Form">
			<view class="form_item" @click="addInfo">
				<view class="label_wrap">
					<text class="label_required_icon">*</text>
					<text class="label_txt">问诊人</text>
				</view>
				<view class="value" v-if="UserInfo.personName.length>0">
					<text v-model="UserInfo.personName">{{UserInfo.personName}}</text>
					<text v-model="UserInfo.personGenderName">{{UserInfo.personGenderName}}</text>
					<text v-model="UserInfo.personAge">{{UserInfo.personAge}}岁</text>
				</view>
			</view>
		</view>
		
		<u-select v-model="hospitalsPickerShow" :list="allHospitalsList" @confirm="handlePickerHospitalConfirm">
		</u-select>
	</view>
</template>

<script>
	import Head from './components/head.vue'

	export default {
		components: {
			Head,
		},
		data() {
			return {
				UserInfo: {
					personName:'',
					personCardId: '',
					personPhoneNo: '',
					personGenderName: '',
					personBirthDate: '',
					personAge:0,
				},
				DoctorInfo: {
					doctorId: '',
					doctorName: '姓名',
					levelName: '职位',
					avatarUrl: '../../static/center-selected.png',
					deptName: '科室'
				},
				drugsList: [],
				hospitalsPickerShow: false,
				chooseHospital: '',
				allHospitalsList: []
			}
		},
		onLoad() {
			this.$event.on('userEvent', (UserInfo) => { 
				this.UserInfo = JSON.parse(UserInfo)
				console.log(this.UserInfo)
			})
			this.$event.on('doctorEvent', (DoctorInfo) => { 
				this.DoctorInfo = JSON.parse(DoctorInfo)
				console.log(this.DoctorInfo)
			})
			uni.request({
				url: `${this.$Url}/organization/get`, //这里的lid,page,pagesize只能是数字或字母?????
				method: 'GET',
				success: (res) => {
					res.data.result.forEach(item => {
						var single = {
							label : item.organizationName,
							value : item.organizationId
						}
						this.allHospitalsList.push(single)
					})
				},
				fail: (err) => {
					console.log(err)
				}
			})
		},
		methods: {
			handlePickerHospitalConfirm(data) {
				this.chooseHospital = data[0].value
				//带医院id跳转
				uni.navigateTo({
					url: '../apply/choosedoc?orgId='+this.chooseHospital
				});
			},
			changeDoctor() { //选择医院 
				this.hospitalsPickerShow = true
			},
			addInfo(){
				uni.navigateTo({
					url:'./add'
				});
			}
		}
	}
</script>

<style lang="scss">
	.content {
		margin: 0 15upx;
	}

	.doctor {
		margin-top: 8rpx;
		margin-bottom: 25rpx;
		padding: 18rpx 24rpx;
		border: #fff;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #fff;

		.doctorInfo {
			display: flex;
			align-items: center;

			.avatar {
				width: 140rpx;
				height: 140rpx;
				border-radius: 100%;
				overflow: hidden;
				margin: 18rpx;

				.avatar_img {
					width: 100%;
					height: 100%;
				}
			}

			.doctorName {
				display: flex;
				flex-direction: column;
				justify-content: space-between;

				.name_title {
					display: flex;
					align-items: center;

					.doc_name_txt {
						font-size: 32rpx;
						font-weight: 600;
						margin-right: 10rpx;
					}

					.tag {
						display: inline-block;
						padding: 4rpx 10rpx;
						border: .5rpx solid #ff9900;
						border-radius: 30rpx;
						font-size: 24rpx;
						color: #ff9900;
					}
				}

				.sort {
					font-size: 28rpx;
					margin-top: 18rpx;
				}
			}
		}

		.changeDoctor {
			display: flex;
			align-items: center;
			color: #999;

			.change_doc_txt {
				line-height: 0;
				margin-right: 14rpx;
			}
		}
	}
	
	.Form {
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
	
			.label_wrap {
				color: #666;
				font-size: 30rpx;
	
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
		.ye_block_wrap{
			border: .5rpx solid yellow;
			width: 100%;
			height: 70rpx;
			margin-top: 10rpx;
		}
	
		.add_drugs_form {
			border: 0;
		}
	
		.drugs_list_wrap {
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
</style>
